import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = environment.API;
  private user: UserInterface[] = [];

  constructor(private http: HttpClient, private authService : AuthService) { }

  createUser(user: any){
    return this.http.post(`${this.baseUrl}/user`, user).pipe(take(1));
  }


}
