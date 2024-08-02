import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContextService } from './services/context.service';
import { ViewportScroller } from '@angular/common';
import { ChiSonoComponent } from './components/chi-sono/chi-sono.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { SpecialitaComponent } from './components/specialita/specialita.component';
import { UltimiScattiComponent } from './components/ultimi-scatti/ultimi-scatti.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,ChiSonoComponent,ContattiComponent, SpecialitaComponent, UltimiScattiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'studioFotografico';
  constructor(private context: ContextService, private scroller: ViewportScroller){ }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    let page = document.querySelector("html")!;
    let pageTop = page.scrollTop;
    let pageBottom = window.innerHeight;
    let section: NodeListOf<HTMLElement> = document.querySelectorAll(".tag");
    section.forEach(el => {
      if (pageTop > (el.offsetTop-700)) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    })
    let scrollTopBtn: HTMLElement = document.querySelector(".scroll-top")!;
    let header: HTMLElement = document.querySelector(".header")!;
    if (page.scrollTop > 500) {
      scrollTopBtn.style.right = "20px";
      header.classList.add("scrolled");
    } else {
      scrollTopBtn.style.right = "-5rem";
      header.classList.remove("scrolled");
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      let desc: HTMLElement = document.querySelector(".presentation-desc")!;
      desc.style.opacity = "1";
      desc.style.top = "50%";
      },300);
  }
  goTo(page: string) {

    this.scroller.scrollToAnchor(page);
    this.context.onMenuClose.emit(true);

  }

  public scrollTop() {
    let body = document.querySelector("html")!;
    body.scrollTop = 0
  }
  contattami(page: string){
    this.scroller.scrollToAnchor(page);

  }
}
