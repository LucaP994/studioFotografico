import { Component, ViewChild } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, NgIf, PopupComponent],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.scss'
})
export class ContattiComponent {
  messaggioRes: string = "";
  @ViewChild(PopupComponent) popup: PopupComponent | undefined;
  public nome: FormControl = new FormControl("", Validators.required);
  public oggetto: FormControl = new FormControl("");
  public email: FormControl = new FormControl("");
  public messaggio: FormControl = new FormControl("", Validators.required);
  public autorizzazioneDati: boolean = false;
  constructor(private mailService: MailService) { }

  inviaMessaggio() {
    this.popup?.showInfo("attendere...", "Invio messaggio in corso")
    let btn: HTMLElement = document.getElementById("inviaMsg")!;
    btn.setAttribute("disabled", "null");
    if (this.nome.valid && this.email.valid && this.oggetto.valid && this.messaggio.valid) {
      let nome: string = this.nome.value;
      let oggetto: string = this.oggetto.value;
      let email: string = this.email.value;
      let messaggio: string = this.messaggio.value;
      this.nome.setValue("")
      this.oggetto.setValue("")
      this.email.setValue("")
      this.messaggio.setValue("")
      this.mailService.sendMail(nome, email, oggetto, messaggio).subscribe({
        next: (res) => {
          this.popup?.setTimer(2000)
          this.popup?.showSuccessPopup("Messaggio inviato!")
          btn.removeAttribute("disabled");
        },
        error: (err) => {
          this.nome.setValue(nome)
          this.oggetto.setValue(oggetto)
          this.email.setValue(email)
          this.messaggio.setValue(messaggio)
          this.popup?.setTimer(3000)
          this.popup?.showErrorPopup("Errore durante l'invio del messaggio!", "Attenzione!")
          btn.removeAttribute("disabled");
        }
      })
    }
    btn.removeAttribute("disabled");
  }
  sendAlert() {
    if (!this.nome.valid || !this.email.valid || !this.oggetto.valid || !this.messaggio.valid) {
      this.popup?.setTimer(3000)
      this.popup?.showErrorPopup("Compilare tutti i campi!", "Attenzione!")
    }else if(this.nome.valid && this.email.valid && this.oggetto.valid && this.messaggio.valid && !this.autorizzazioneDati){
      this.popup?.setTimer(3000)
      this.popup?.showErrorPopup("E' necessario autorizzare il trattamento dei dati personali.", "Attenzione!")
    }
  }
}
