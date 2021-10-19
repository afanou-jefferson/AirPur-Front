import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FavorisAffichage } from './favoris.model';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor(private http : HttpClient) { }


  getFavoris(idUtilisateur: number) : Observable<FavorisAffichage[]>{
    return this.http.get<FavorisAffichage[]>(`${environment.baseUrl}${environment.getReleveFavoris}/${idUtilisateur}`);  
  }
}
