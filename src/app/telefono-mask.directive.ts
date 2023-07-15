import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core';

@Directive({
  selector: '[telefonoMask]'
})
export class TelefonoMaskDirective implements OnInit {
  mask: (string | RegExp)[] = [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  maskedInput: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.maskedInput = createTextMaskInputElement({
      inputElement: this.el.nativeElement,
      mask: this.mask,
      guide: false
    });
  }

  @HostListener('input')
  onInput() {
    this.maskedInput.update();
  }
}
