import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { Observable, of, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Rubrique } from './rubrique.models';
import {Message} from '../../message/core/message.models'


@Injectable({
  providedIn: 'root'
})
export class RubriqueService {

  constructor(private httpClient: HttpClient) { }
  /**
   * Récupéré la liste des rubriques
   */

  getRubriques(): Observable<Rubrique[]> {
    //Verifier si on a des données en cache
    const cachedData = this.getRubriquesFromCache();
    if (!!cachedData) {
      // Si oui, retourner les données en cache
      return of(cachedData);
    } else {
      // sinon, faire la requete http et mettre en cache les données
      return this.httpClient.get<Rubrique[]>(`${environment.baseUrl}accueil/rubriques`)
    }

  }

  /**
   * Methode pour avoir la liste de message (posts) contenue dans une rubrique
   */

  getUnRubrique(): Observable<Rubrique[]> {
    // To do aprés
    const id : number = 9;
    //Verifier si on a des données en cache
    const cachedData = this.getUnRubriqueFromCache();
    if (!!cachedData) {
      // Si oui, retourner les données en cache
      return of(cachedData);
    } else {
      // sinon, faire la requete http et mettre en cache les données
      return this.httpClient.get<Rubrique[]>(`${environment.baseUrl}accueil/rubriques/${id}`)
    }

  }

  /**
   * Methode pour recupérer les données de rubriques en cache
   */

  private getRubriquesFromCache(): Rubrique[] {
    const result = localStorage.getItem('APP-FORUM');
    return !!result ? <Rubrique[]>JSON.parse(result) : null
  }

/**
 * Methode pour recupérer les données d'une rubrique en cache
 */

  private getUnRubriqueFromCache(): Rubrique[] {
    const result = localStorage.getItem('APP-FORUM');
    return !!result ? <Rubrique[]>JSON.parse(result) : null
  }


/**
 * Ajouter une rubrique
 * @param _content
 * @param _postedOn
 * @param _title
 * @param _description
 * @param _utilisateurId
 */

  postRubriques(_content: string, _postedOn: Date, _title: string, _description: string, _utilisateurId : number): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}accueil/rubriques`,
      {
        content: _content,
        postedOn: _postedOn,
        title: _title,
        description: _description,
        utilisateurId : _utilisateurId
      }
    ).pipe(tap(resultat => {
      localStorage.setItem('APP-USER', JSON.stringify(resultat))
    }));
  }


/**
 * Methode pour supprimer une rubrique
 * @param id
 */

deleteRubrique( id : number) : Observable <any> {
  return this.httpClient.delete<Rubrique> (`${environment.baseUrl}accueil/rubriques/${id}`);
}

/**
 * Mettre à jour une rubrique
 * @param id
 * @param _content
 * @param _postedOn
 * @param _title
 * @param _description
 * @param _utilisateurId
 */

putRubrique(id: number, _content: string, _postedOn: Date, _title: string, _description: string, _utilisateurId : number): Observable<any> {
  return this.httpClient.put(`${environment.baseUrl}accueil/rubriques/${id}`,
      {
        content: _content,
        postedOn: _postedOn,
        title: _title,
        description: _description,
        utilisateurId : _utilisateurId
      }
  ).pipe(tap(resultat => {
      localStorage.setItem('APP-USER-PUT-RUBRIQUES', JSON.stringify(resultat))
  }));
}


// /**
//  * Mettre à jour une rubrique
//  * @param id
//  * @param rubrique
//  */

//   putRubrique(id : number , rubrique : Rubrique): Observable<Rubrique>{
//     return this.httpClient.put<Rubrique>(`${environment.baseUrl}accueil/rubriques/${id}`, rubrique );

//   }


}
