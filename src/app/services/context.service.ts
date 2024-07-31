import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  @Output() onChangeSegment: EventEmitter<string> = new EventEmitter();
  @Output() onMenuClose: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
