import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }
  sendMail(nome:string,email:string,oggetto:string,messaggio:string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append("nome", nome);
    formData.append("oggetto", oggetto);
    formData.append("email", email);
    formData.append("messaggio", messaggio);
    return this.httpClient.post<any>("/sendMail.php", formData)
  }
}
