import { Component, OnInit, Input } from '@angular/core';
import { RubriqueService } from '../core/rubrique.service';
import { Rubrique } from '../core/rubrique.models';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../../message/core/message.models';
import { ThisReceiver } from '@angular/compiler';
@Component({
    selector: 'app-rubrique',
    templateUrl: './rubrique.component.html',
    styleUrls: ['./rubrique.component.css']
})
export class RubriqueComponent implements OnInit {
    rubriques: Rubrique[] = [];
    message: Message[] = [];
    selectedRubrique: Rubrique;
    selectedMessage: Message;
    rubriqueForm: FormGroup;
    rubriqueUpdateForm : FormGroup;
    showAddForm = false;
    showUpdateForm = false;
    // To Do : à récupérer aprés par le principal
    userPrenom : string = JSON.parse(localStorage.getItem("utilisateur"))["prenom"];

    //@Input() rubriquelName: string;
    //rubriqueName: string = 'Rubrique1';
    //@Input() rubriqueName: string;
    constructor(private rubriqueService: RubriqueService, private formBuilder: FormBuilder,
        private router: Router, private route: ActivatedRoute) { }


    private listeRecharger(){
        this.rubriqueService.getRubriques()

        .subscribe(
            result => {
                this.rubriques = result;
            },
            err => {
                alert('Une erreur est surveneu');
            }
        )
    }

    ngOnInit(): void {
        // La liste des rubriqes
        
    this.listeRecharger();

    // Formulaire d'envoi
        this.rubriqueForm = this.formBuilder.group({
            content: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required]

        });

    // Formulaire de update
        this.rubriqueUpdateForm = this.formBuilder.group({
            content: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required]
        })

        // this.rubriqueService.getMessageByRubrique(this.rubriqueID)
        // .subscribe(
        //     result => {
        //         this.message = result;
        //     },
        //     err => {
        //         alert("erreur de recuperation")
        //     }
        // )
    }



    /**
     * Méthode pour choisir une rubrique (bouton)
     * @param rubrique 
     */
    onSelect(rubrique: Rubrique): void {
        this.selectedRubrique = rubrique;
        this.router.navigate(['/forum/message', rubrique.id])
    }

    /**
     * Méthode pour supprimer une rubrique (bouton)
     * @param rubriqe 
     */
    
    onDelete(rubriqe: Rubrique): void {
        this.selectedRubrique = rubriqe;
        this.rubriqueService.deleteRubrique(rubriqe.id).subscribe(
            result => {
                this.listeRecharger();
            }
        );

    }

   
    // onSelect2(message: Message): void {
    //     this.selectedMessage = message;
    //     this.router.navigate(['/message',message.rubriqueId])
    // }

    // showMessageById(rubriqueId : number){
    //      return this.rubriqueService
    // }
    //Avoir la listes messages par rubrique

    /**
     * Méthode pour Ajouter une rubrique
     */
    sendRubrique() {
        if (this.rubriqueForm.valid) {
            const content = this.rubriqueForm.get('content').value;
            const postedOn = new Date();
            const title = this.rubriqueForm.get('title').value;
            const description = this.rubriqueForm.get('description').value;
            //const utilisateurId = this.rubriqueForm.get('utilisateurId').value;
            // A modifier récupérer l'ID de l'utilisateur connecté
            const utilisateurId : number = JSON.parse(localStorage.getItem("utilisateur"))["id"];
            //const utilisateurId: number = 1;
            console.log(content, postedOn, title, description);
            this.rubriqueService.postRubriques(content, postedOn, title, description, utilisateurId)
                .subscribe(result => {
                    console.log(result);
                    // Recharger la page
                    this.listeRecharger();
                    // Effacer le formulaire
                    this.rubriqueForm.reset();
                    // Ne pas afficher les erreurs
                    this.rubriqueForm.markAsPristine();
                    //this.router.navigate(['forum/rubrique']);
                }, err => {
                    console.log(err);
                    alert('Rurbique non envoyé')
                })
        }
    }

    /**
     * Update Rubrique
     */

    onUpdate () {
        if (this.rubriqueForm.valid) {
            const content = this.rubriqueForm.get('content').value;
            const postedOn = new Date();
            const title = this.rubriqueForm.get('title').value;
            const description = this.rubriqueForm.get('description').value;
            //const utilisateurId = this.rubriqueForm.get('utilisateurId').value;
            // A modifier récupérer l'ID de l'utilisateur connecté
            const utilisateurId : number = JSON.parse(localStorage.getItem("utilisateur"))["id"];
            //const utilisateurId: number = 1;
            const id = this.route.snapshot.params['rubriqueId'];
            console.log(content, postedOn, title, description);
            this.rubriqueService.putRubrique(id, content, postedOn, title, description, utilisateurId)
                .subscribe(result => {
                    console.log(result);
                    // Recharger la page
                    this.listeRecharger();
                    // Effacer le formulaire
                    this.rubriqueForm.reset();
                    // Ne pas afficher les erreurs
                    this.rubriqueForm.markAsPristine();
                    //this.router.navigate(['forum/rubrique']);
                }, err => {
                    console.log(err);
                    alert('Rurbique non envoyé')
                })
        }
        
    }

    // Supprimer une rubrique

    // delete( rubrique : Rubrique) : void {
    //    // const rubriqueId : number= 1;
    //     this.rubriqueService.deleteRubrique(rubrique.id).subscribe();

    // }

    // Methode pour update une rubrique

}
