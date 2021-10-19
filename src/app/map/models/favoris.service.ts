import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment.prod";

import { FavorisCreation } from "./favorisCreation.model";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
  
export class FavorisService {
    constructor(private http : HttpClient) {

    }

    creerFavoris(favoris : FavorisCreation) : Observable<Object>{
        const httpOptions = {
            headers: new HttpHeaders({
              "Content-Type": "application/json"
            })
          }; 
          
            return this.http.post(`${environment.baseUrl}${environment.createFavoris}`,
            { 
              communeId: favoris.communeId,
              meteo: favoris.meteo,
              air: favoris.air,
              choixDateDebut: favoris.choixDateDebut,
              choixDateFin: favoris.choixDateFin,
              utilisateurId: favoris.utilisateurId
            }, httpOptions)
    }
}