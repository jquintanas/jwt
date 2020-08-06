import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = "";
  constructor(private http: HttpClient) { }

  public login(user: string, pass: string) {
    let data = {
      user: user,
      pass: pass
    };
    return this.http.post("http://localhost:3000/login", data);
  }

  public getData() {
    let header = {
      authorization: this.token
    };
    return this.http.get("http://localhost:3000/getData", { headers: header });
  }
}
