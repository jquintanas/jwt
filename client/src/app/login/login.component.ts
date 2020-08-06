import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  clave: string = "";

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.usuario, this.clave).toPromise().then(
      (data: any) => {
        console.log(data);
        if (data) {
          if (data.token) {
            this.loginService.token = data.token;
            this.router.navigateByUrl("/home");
          }
        }
      }
    ).catch(
      err => { console.log(err); }
    );
  }
}
