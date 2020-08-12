import { Directive, HostListener } from '@angular/core';
import { isNumber } from 'util';

@Directive({
  selector: '[appKeyDownMoneda]'
})
export class KeyDownMonedaDirective {

  constructor() { }

  @HostListener('keypress', ['$event'])
  onkeydown( event ) {
    const PUNTO = '.';
    const tecla = event.key;
    const valorActual = event.target.value as string;

    if ( isNaN(event.key) && tecla !== PUNTO ) {

      this.detener(event);

    }

    if ( valorActual.indexOf(PUNTO) > -1 ) {

      if ( tecla === PUNTO ) {

        this.detener(event);

      } else {

        if ( valorActual.split(PUNTO)[1].length === 2 ) {

          this.detener(event);

        }
      }
    }
  }
  detener(ev: any) {
    ev.preventDefault();
  }
}
