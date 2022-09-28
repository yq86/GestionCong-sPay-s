import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Console } from 'console';
import { UserLogin } from 'src/app/models/user-login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form!: FormGroup;
  userLogin!: UserLogin;
  user: any;


  error: string | null | undefined;

  constructor(
    private userService: UserService
  ) {}


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
    this.userLogin = { userName: this.form.value.username, password: this.form.value.password };
    console.log(this.userLogin);
    this.userService.login(this.userLogin).subscribe(
      (response: any) => {
        if (response) {
          window.localStorage.setItem('name', this.form.value.username);
          window.localStorage.setItem('accessToken', response);
        } else {
          this.error = "username or password invalid";
          this.initForm();
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
