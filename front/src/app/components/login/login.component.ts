import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Console } from 'console';
import { UserLogin } from 'src/app/models/user-login';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
      private userService: UserService,
      private router: Router
  ) {}

  form!: FormGroup;
  userLogin!: UserLogin;
  user: any;


  error: string | null | undefined;




  ngOnInit(): void {
    this.initForm();
  }


   initForm() { // initialize the form to create a drawing
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  //  this.userLogin = { userName: "", password: "" };
  //  this.user = {};
  //  this.error = null;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.userLogin = { userName: this.form.value.username, password: this.form.value.password };

    this.userService.login(this.userLogin).subscribe(
      (response: any) => {
        if (response) {
          console.log(response)
          window.localStorage.setItem('name', this.form.value.username);
          window.localStorage.setItem('accessToken', response.accesstoken);
          if(response.user.role == 3){
            this.router.navigate(['employee-demandes']);
          }else if(response.user.role == 2){
            this.router.navigate(['manager']);
          } else if(response.user.role == 1){
            this.router.navigate(['admin']);
          }
          
        } else {
          this.error = "username or password invalid";
          this.initForm();
          console.log(localStorage.getItem('accessToken'));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  initError() {
    this.error = null;
  }

  /*
  reroute() {
    if (this.authService.isLoggedIn()) { //Si l'utilisateur est déjà connecté, le renvoie sur l'accueil.
      this.router.navigate(['accueil']);
    }
  } */
}
