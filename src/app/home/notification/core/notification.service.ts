import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { NotificationComponent } from '../components/notification.component';
import { NotificationCreation } from './notificationCreation.model';
import { Departement } from '../../main/models/departement.model';
import { DepartementListe } from './departementsListe.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient, public dialog: MatDialog) { }


  createNotification(notification: NotificationCreation) : Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

      return this.http.post(`${environment.baseUrl}${environment.createNotification}`,
      {
        message: notification.message,
        dateCreation: notification.dateCreation,
        departementId: notification.departementId,
        utilisateurId: notification.utilisateurId
      }, httpOptions)
  }

  openHistorique() {
    const dialogRef = this.dialog.open(NotificationComponent);

    // On créer ci-dessus une modale qu'on affiche ci dessous
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getDepartements() {
    return this.http.get<DepartementListe[]>(`${environment.baseUrl}${environment.getAllDepartement}`);
  }
}
