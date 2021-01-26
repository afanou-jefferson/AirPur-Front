import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../profil/auth/core/auth.service';
import { MapService } from '../core/map.service';
import { Station } from "../core/station.model";
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
  })

export class MapComponent implements OnInit {
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;


    markers : any[] = [];
    stations : Station[] = [];
    connected : boolean = false;
    center: google.maps.LatLngLiteral;



    constructor(private authServ : AuthService, private mapService: MapService , private router : Router) {
        this.authServ.utilisateurConnecteObs.subscribe(
            utilisateurConnected => {
                if(!utilisateurConnected.estAnonyme()) {
                    this.connected = true;
                }
            },
            utilisateurNoConnected => {
                console.log(utilisateurNoConnected);
            }
        )
    }

    ngOnInit() {
        this.addMarker().subscribe(
            markersOn => {
                this.stations.forEach(station => {
                    this.markers.push({
                        position: {
                            lat: station.latitude,
                            lng: station.longitude,
                        },
                        label: {
                            color: 'white',
                            idStation: station.id,
                            nomStation: `${station.nom}`,
                            
                        },
                        title: 'Station pollution',
                        options: { animation: google.maps.Animation.BOUNCE },
                    })
                })
                console.log("Markers initilialisés");
            },
            error => console.log(error)
        );
    }

     click(event: google.maps.MapMouseEvent) {
        console.log(event)
    }

  addMarker() : Observable<Station[]>{
      //recuperer chaque station
      //pour chaque station ajouter un marker sur la map
    return this.mapService.getAllStation().pipe(
        map(stationServeur => {
            stationServeur.forEach(station => {
                this.stations.push(new Station(station));
            })
            return this.stations;
        }),
    )
  }


  clicked : boolean = false;

  clickMarker(marker: MapMarker, content) {
      this.mapService.getPolluantsByStation(marker.label['idStation']).subscribe(
          releves => {
              this.clicked = true;
              this.mapService.emit(releves);
        },
          error => console.log(error)
      );

      this.router.navigate(['map/listeReleve']);
    //this.infoWindow.open(marker);
  }
}