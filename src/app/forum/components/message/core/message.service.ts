import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Message } from './message.models';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { RubriqueComponent } from '../../rubrique/component/rubrique.component';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private httpClient: HttpClient) { }
    /**
     * Methode pour avoir la liste des messages
     */
    getMessages(): Observable<Message[]> {
        //Verifier si on a des données en cache
        const cachedData = this.getMessagesFromCache();
        if (!!cachedData) {
            // Si oui, retourner les données en cache
            return of(cachedData);
        }
        else {
            // sinon, faire la requete http et mettre en cache les données
            return this.httpClient.get<Message[]>(`${environment.baseUrl}accueil/messages`);
        }
    }

    /**
     * Methode pour avoir la liste des message par rubrique
     * @param rubriqueId
     */
    getMessageByRubrique(rubriqueId: number): Observable<Message[]> {
        return this.httpClient.get<[Message]>(`${environment.baseUrl}accueil/messages/${rubriqueId}`)

    }

    // Methode pour recupérer les données en cache
    private getMessagesFromCache(): Message[] {
        const result = localStorage.getItem('APP-FORUM');
        return !!result ? <Message[]>JSON.parse(result) : null;
    }

    // getMessageByRubrique(rubriqueId : number) : Observable<Message[]> {
    //     const cachedData = this.getMessagesFromCache();
    //     if (!!cachedData) {
    //         // Si oui, retourner les données en cache
    //         return of(cachedData);
    //     }
    //     else {
    //         // sinon, faire la requete http et mettre en cache les données
    //         return this.httpClient.get<Message[]>(`${environment.baseUrl}accueil/messages`);
    //     }

    // }

    /**
     * Methode pour Ajouter un message
     * @param _content
     * @param _postedOn
     * @param _rubriqueId
     * @param _utilisateurId
     */

    postMessage(_content: string, _postedOn: Date, _rubriqueId: number, _utilisateurId: Number): Observable<any> {

        return this.httpClient.post(`${environment.baseUrl}accueil/messages`,
            {
                content: _content,
                postedOn: _postedOn,
                rubriqueId: _rubriqueId,
                utilisateurId: _utilisateurId,
            }
        ).pipe(tap(resultat => {
            localStorage.setItem('APP-USER-POST-MESSAGE', JSON.stringify(resultat))
        }));
    }

    /**
     * Supprimmer un message
     * @param id
     */
    deleteMessage(id: number): Observable<any> {
        return this.httpClient.delete<Message>(`${environment.baseUrl}accueil/messages/${id}`);
    }


    /**
     * Update un message
     * @param id
     * @param _content
     * @param _postedOn
     * @param _rubriqueId
     * @param _utilisateurId
     */

    putMessage(id: number, _content: string, _postedOn: Date, _rubriqueId: number, _utilisateurId: Number): Observable<any> {
        return this.httpClient.put(`${environment.baseUrl}accueil/messages/${id}`,
            {
                content: _content,
                postedOn: _postedOn,
                rubriqueId: _rubriqueId,
                utilisateurId: _utilisateurId,
            }
        ).pipe(tap(resultat => {
            localStorage.setItem('APP-USER-PUT-MESSAGE', JSON.stringify(resultat))
        }));
    }



    //   putMessage(id : number , message : Message): Observable<Message>{
    //     return this.httpClient.put<Message>(`${environment.baseUrl}accueil/messages/${id}`, message);

    //   }
}
