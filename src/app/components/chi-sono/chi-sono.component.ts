import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chi-sono',
  standalone: true,
  imports: [],
  templateUrl: './chi-sono.component.html',
  styleUrl: './chi-sono.component.scss'
})
export class ChiSonoComponent {

  constructor(
    private scroller: ViewportScroller
  ){}

  contattami(page: string){
    this.scroller.scrollToAnchor(page);

  }

}
