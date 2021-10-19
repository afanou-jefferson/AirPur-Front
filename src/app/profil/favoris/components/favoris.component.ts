import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MeteoIndicateur } from 'src/app/map/models/meteoindicateur.model';
import { FavorisAffichage } from '../../compte/core/favoris.model';
import { FavorisService } from '../../compte/core/favoris.service';

@Component({
    selector: 'app-favoris',
    templateUrl: './favoris.component.html',
    styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit, AfterViewInit  {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    favoris: FavorisAffichage[] = [];
    meteos: MeteoIndicateur[] = [];
    @Input() source;
    dataSource: MatTableDataSource<FavorisAffichage> = new MatTableDataSource([]);

    dataSource2: MatTableDataSource<MeteoIndicateur> = new MatTableDataSource([]);
    displayedColumnsMeteo: string[] = ['id', 'date', 'vitesseMoyVent', 'cumulPluie', 'temperatureSol'];
    displayedColumnsPolluant: string[] = ['id', 'dateDebut', 'dateFin', 'nom', 'valeur'];

    constructor(private favorisService: FavorisService) {
        const idUtilisateur:number = JSON.parse(localStorage.getItem("utilisateur")).id;
        console.log("idUtilisateur ", idUtilisateur);
        this.favorisService.getFavoris(idUtilisateur).subscribe(
            favorisServeur => {
                console.log("favorisServeur ", favorisServeur);
                this.favoris = favorisServeur;
                // this.dataSource = new MatTableDataSource(favoris);
                // this.dataSource.paginator = this.paginator;
                // this.dataSource.sort = this.sort;
                // console.log(this.dataSource);
            },
            error => console.log(error)
        );
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }
}
