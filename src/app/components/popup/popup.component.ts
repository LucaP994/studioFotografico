import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  title: string | undefined = "";
  message: string = "";
  time: number = 1500;
  isOpen: boolean = false;
  showInfo(message: string, title?: string){
    let popupRef = document.getElementById('popup');
    if(!this.isOpen){
    this.title = title;
    this.message = message;
    popupRef?.classList.remove("error")
    popupRef?.classList.add("info")
    popupRef?.classList.add("show")
    this.isOpen = true
    //setTimeout(()=>{this.cloasePopup()},this.time)
  }else{
    popupRef?.classList.remove("show")
    this.isOpen = false;
    this.showInfo(message, title)
  }
  }
  showSuccessPopup(message: string, title?: string) {
    let popupRef = document.getElementById('popup');
    if(!this.isOpen){
    this.title = title;
    this.message = message;
    popupRef?.classList.remove("error")
    popupRef?.classList.remove("info")
    popupRef?.classList.add("show")
    this.isOpen = true
    setTimeout(()=>{this.cloasePopup()},this.time)
  }else{
    popupRef?.classList.remove("show")
    this.isOpen = false;
    this.showSuccessPopup(message, title)
  }
  }
  showErrorPopup(message: string, title?: string) {
    let popupRef = document.getElementById('popup');
    if(!this.isOpen){
    this.title = title;
    this.message = message;
    popupRef?.classList.add("error")
    popupRef?.classList.add("show")
    this.isOpen = true
    setTimeout(()=>{this.cloasePopup()},this.time)
  }else{
    popupRef?.classList.remove("show")
    this.isOpen = false;
    this.showErrorPopup(message, title)
  }
  }
  cloasePopup(){
    let popupRef = document.getElementById('popup');
    popupRef?.classList.remove("show")
  }
  setTimer(time: number){
    this.time = time;
  }
}
