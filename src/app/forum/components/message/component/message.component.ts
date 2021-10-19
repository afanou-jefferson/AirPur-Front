import { Component, OnInit } from '@angular/core';
import { Message } from '../core/message.models';
import { MessageService } from '../core/message.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
//import { Router, ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//A changer aprés
//import { Utilisateur } from '/Users/moussa/AirPur-Front/src/app/home/profil/auth/core/auth.domain';
@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
    messages: Message[] = [];
    selectedMessage: Message;
    messageForm: FormGroup;
    showAddForm = false;
    showUpdateForm = false;
    // A modifier avec le getPirncipal
    userPrenom : string = JSON.parse(localStorage.getItem("utilisateur"))["prenom"];
    // Achanger aprés 
    //utilisateur: Utilisateur = new Utilisateur({});
    //rubriqueId: number;
    constructor(private messageService: MessageService,
        private formBuilder: FormBuilder,
        private router: Router, private route: ActivatedRoute) { }



        // private listeRecharger(){
        //     this.rubriqueService.getRubriques()
    
        //     .subscribe(
        //         result => {
        //             this.rubriques = result;
        //         },
        //         err => {
        //             alert('Une erreur est surveneu');
        //         }
        //     )
        // }

         /* Afficher les messages d'une rubrique donnée */
        // pour activer un route c'est snapshot
        private listeRecharger(){
        const rubrique = this.route.snapshot.params['rubriqueId'];
        console.log(rubrique);
        this.messageService.getMessageByRubrique(rubrique)
            .subscribe(
                result => {
                    this.messages = result;
                },
                err => {
                    alert('Une erreur est survenue dans message');
                }
            )
        }
    ngOnInit(): void {
        // Appel de la fonction listeRecharger
        this.listeRecharger();
        // const rubrique = this.route.snapshot.params['rubriqueId'];
        // console.log(rubrique);
        // this.messageService.getMessageByRubrique(rubrique)
        //     .subscribe(
        //         result => {
        //             this.messages = result;
        //         },
        //         err => {
        //             alert('Une erreur est survenue dans message');
        //         }
        //     )

        /** Le formulaire d'envoi de message faite par FormBuilder qui instencie l'objet et j'utilise un FormGroup ici*/
        this.messageForm = this.formBuilder.group({
            content: ['', Validators.required],
           // postedOn: ['', Validators.required]

        })

        /** Pour récupéré le paramétre passer en url ici le rubriqueId */

        // this.route.queryParams.subscribe(params => {
        //     this.rubriqueId = params['rubriqueId'];
        //   });
    }

    //Utilisateur principal.get Name dans la base de donnée
    // Id rubrique : il faut l'envoyé 
    //const utilisateurId : number = JSON.parse(localStorage.getItem("utilisateur"));

    /**
     * Méthode Pour sélectioner un message dans la liste de message 
     * @param message 
     */
    onSelect(message: Message): void {
        this.selectedMessage = message;
    }
    /**
     * 
     * @param message Pour supprimer un message
     */
    onDelete(message: Message): void {
        this.selectedMessage = message;
        this.messageService.deleteMessage(message.id).subscribe(
            result => {
                this.listeRecharger();
            }
        );
    }

    /**
     * Méthode d'envoi d'un message : le paramétre rubriqueId correspond au paramétre passé en url
     */
    sendMessage() {
        if (this.messageForm.valid) {
            const utilisateurId : number = JSON.parse(localStorage.getItem("utilisateur"))["id"];
            //const user = JSON.parse(localStorage.getItem('currentUser'));
            // const rubriqueId = localStorage.getItem('rubrique');
            //console.log(rubriqueId);
          
           // console.log("aaa111");

         
            // console.log("aaa"+ rechercheId);
            const content = this.messageForm.get('content').value;
            //const postedOn = this.messageForm.get('postedOn').value;
            const postedOn = new Date();

            // le formulaire est envoyé mais j'ai un retour erreur de this.messageService.getMessageByRubrique(rubrique) .subscribe()
            // const rubrique2 = this.route.snapshot.paramMap.get('rubriqueId');
            // const rubriqueId: number = +rubrique2;
            // Récupérer le paramétre passer
            const rubriqueId = this.route.snapshot.params['rubriqueId'];
            //  const rubriqueId : number = 1;
            //const utilisateurId: number = 1;
            console.log("le message envoyé est")
            console.log(content, postedOn, rubriqueId, utilisateurId);

            this.messageService.postMessage(content, postedOn, rubriqueId, utilisateurId)
                .subscribe(result => {
                    console.log(result);
                    //Passer le paramétre rubriqueId
                    //this.router.navigate([`forum/message/${rubriqueId}`]);
                    // Recharger la page
                    this.listeRecharger();
                    // Effacer le formulaire
                    this.messageForm.reset();
                    // Ne pas afficher les erreurs
                    this.messageForm.markAsPristine();
                }, err => {
                    console.log(err);
                    alert('Message non envoyé')
                })
        }

    }


    /**
     * Méthode pour modifier message
     */
    updateMessage(){
        const utilisateurId : number = JSON.parse(localStorage.getItem("utilisateur"))["id"];
        const content = this.messageForm.get('content').value;
        //const postedOn = this.messageForm.get('postedOn').value;
        const postedOn = new Date();
        //const rubriqueId = this.route.snapshot.params['rubriqueId'];
        const rubriqueId : number = 13;
        //const id = this.selectedMessage.id;
        const id : number = 43;
        console.log("le message modifié est")
        console.log(id,content, postedOn, rubriqueId, utilisateurId);
        this.messageService.putMessage(id, content, postedOn, rubriqueId, utilisateurId)
            .subscribe(result => {
                console.log(result);
                //Passer le paramétre rubriqueId
               // this.router.navigate([`forum/message/${rubriqueId}`]);
                // Recharger la page
                this.listeRecharger();
                // Effacer le formulaire
                this.messageForm.reset();
                // Ne pas afficher les erreurs
                this.messageForm.markAsPristine();
            }, err => {
                console.log(err);
                alert('Message non envoyé')
            })

    }
}
