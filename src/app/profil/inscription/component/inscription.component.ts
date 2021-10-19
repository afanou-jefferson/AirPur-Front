import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../compte/core/user.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
  })
export class InscriptionComponent implements OnInit{

    static EMAIL_REGX = '^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*([-]{1})?@[a-z0-9]+([\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$';

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
      private router: Router,
      private userService : UserService ) {

     }

    //  ngOnInit(){
    //   this.registerForm = this.formBuilder.group({
    //     email: [''],
    //     password: [''],
    //     departement: ['']
    //   });
    // }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        username: ['', Validators.required],
        email: ['',
          Validators.compose([
            Validators.required,
            Validators.pattern(InscriptionComponent.EMAIL_REGX)
          ])
        ],
        password: ['', Validators.required],
      })
    }

    submitRegister() {
      if (this.registerForm.valid) {
        const nom = this.registerForm.get('nom').value;
        const prenom = this.registerForm.get('prenom').value;
        const username = this.registerForm.get('username').value;
        const email = this.registerForm.get('email').value;
        const password = this.registerForm.get('password').value;
        this.userService.register(nom, prenom, username, email, password)
          .subscribe(result => {
            this.router.navigate(['profile/connexion']);
           }, err => {
            alert('Email existe déja')
           })
      }

    }


}
