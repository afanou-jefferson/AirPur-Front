import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';

@Component({
    selector: 'app-compte',
    templateUrl: './compte.component.html',
    styleUrls: ['./compte.component.css']
  })
export class CompteComponent implements OnInit{

    static EMAIL_REGX = '^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*([-]{1})?@[a-z0-9]+([\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$';

    profilForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
      private userService : UserService,
      private router: Router) {


    }

    ngOnInit() {
      this.profilForm = this.formBuilder.group({
        email: ['',
          Validators.compose([
            Validators.required,
            Validators.pattern(CompteComponent.EMAIL_REGX)
          ])
        ],
        password: ['', Validators.required]
      })
    }

    submitChange() {

      if (this.profilForm.valid) {
        const email = this.profilForm.get('email').value;
        const password = this.profilForm.get('password').value;
        const password2 = this.profilForm.get('password').value;
        console.log(email, password);
        this.userService.update(email, password)
          .subscribe(result => {
            console.log(result);
            this.router.navigate(['profile/connexion']);
           }, err => {
            console.log(err);
            alert('Les deux mots de passe ne correspondent pas ')
           })
      }

    }


}
