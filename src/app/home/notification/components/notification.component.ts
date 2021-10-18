import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Departement } from '../../main/models/departement.model';
import { DepartementListe } from '../core/departementsListe.model';
import { NotificationService } from '../core/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
  })
export class NotificationComponent implements OnInit{
    departements: DepartementListe[] = [];
    formulaireNotification: FormGroup;
    selectedValue = null;
    constructor(fb: FormBuilder, private notificationService: NotificationService) {
        this.formulaireNotification = fb.group({
            message: [],
            departement: []
          });
    }
    ngOnInit(): void {
      this.notificationService.getDepartements().subscribe(
        listeDepartements => {
          console.log("DEP" ,listeDepartements)
          this.departements = listeDepartements},
        error => console.log(error)
      )
    }

    validNotification() {
      const departement = this.formulaireNotification.get("departement").value;
      const message = this.formulaireNotification.get("message").value;
      console.log("yooo ", departement)
    }
}
