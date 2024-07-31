import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '../../services/context.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public open: boolean = false;
  private clicked: boolean = false;
  constructor(
    private router: Router,
    private context: ContextService,
    private scroller: ViewportScroller
  ) { }

  ngAfterViewInit() {
    this.context.onMenuClose.subscribe((res) => {
      this.open = res;
      this.openMenu()
    })
  }

  public openMenu() {
    let menu: HTMLElement = document.querySelector('.side-menu')!;
    let menuBar1: HTMLElement = document.querySelector('.menu-button div:nth-child(1)')!;
    let menuBar2: HTMLElement = document.querySelector('.menu-button div:nth-child(2)')!;
    let menuBar3: HTMLElement = document.querySelector('.menu-button div:nth-child(3)')!;
    menu.style.transition = "all 0.3s";
    if (!this.open) {
      menu.style.height = "50vh";
      menuBar1.style.transform = "rotate(45deg)"
      menuBar1.style.top = "50%";
      menuBar2.style.width = "0%";
      menuBar3.style.transform = "rotate(-45deg)"
      menuBar3.style.top = "50%";
      this.open = true;
    } else {
      menu.style.height = "0";
      menuBar1.style.transform = "rotate(0deg)"
      menuBar1.style.top = "0";
      menuBar2.style.width = "100%";
      menuBar3.style.transform = "rotate(0deg)"
      menuBar3.style.top = "100%";
      this.open = false;
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    let page = document.querySelector("html")!;
    if (!this.clicked)
      if (page.scrollTop >= 770 && page.scrollTop < 1499) {
        let links: NodeListOf<HTMLElement> = document.querySelectorAll(".nav-link");
        links.forEach(el => { if (el.classList.contains("active")) el.classList.remove("active") })
        links[1].classList.add("active")
      } else if (page.scrollTop >= 1500 && page.scrollTop < 2099) {
        let links: NodeListOf<HTMLElement> = document.querySelectorAll(".nav-link");
        links.forEach(el => { if (el.classList.contains("active")) el.classList.remove("active") })
        links[2].classList.add("active")
      } else if (page.scrollTop >= 2100) {
        let links: NodeListOf<HTMLElement> = document.querySelectorAll(".nav-link");
        links.forEach(el => { if (el.classList.contains("active")) el.classList.remove("active") })
        links[3].classList.add("active")
      } else {
        let links: NodeListOf<HTMLElement> = document.querySelectorAll(".nav-link");
        links.forEach(el => { if (el.classList.contains("active")) el.classList.remove("active") })
        links[0].classList.add("active")
      }


  }
  goTo(ev: MouseEvent, page: string) {
    this.clicked = true;
    let links: NodeListOf<HTMLElement> = document.querySelectorAll(".nav-link");
    links.forEach(el => { if (el.classList.contains("active")) el.classList.remove("active") })
      let currentActive = ev.target as HTMLElement;
    console.log(currentActive)
    if(currentActive.children.length > 0){
      currentActive.children[0].classList.add("active");
    }else{
      currentActive.classList.add("active");
    }
    this.scroller.scrollToAnchor(page);
    setTimeout(() => {
      this.clicked = false;
    }, 1000);
  }
  scrollTop(){
    let page = document.querySelector("html")!;
    page.scrollTop = 0;
  }
}
