import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
//import { BnButtonType } from '../../interfaces/src/bn-button-type';
//import { BnRendererUtil } from '@binom/sdk-utils/renderer';

export enum MatButtonType {
  flat = 'flat',
  raised = 'raised',
  stroked = 'stroked',
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[bnMatbutType]',
  standalone: true,
})
export class BnMatbutTypeDirective {
  //private renderEl: BnRendererUtil;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() set bnMatbutType(val: MatButtonType) {
    /*  this.renderEl.removeClasses([
      'mat-mdc-button',
      'mdc-button--unelevated',
      'mat-mdc-unelevated-button',
      'mdc-button--raised',
      'mat-mdc-raised-button',
      'mdc-button--outlined',
      'mat-mdc-outlined-button',
    ]); */
    this.removeClasses([
      'mat-mdc-button',
      'mdc-button--unelevated',
      'mat-mdc-unelevated-button',
      'mdc-button--raised',
      'mat-mdc-raised-button',
      'mdc-button--outlined',
      'mat-mdc-outlined-button',
    ]);

    let classes = [];

    switch (val) {
      case 'stroked':
        classes = ['mdc-button--outlined', 'mat-mdc-outlined-button'];
        break;
      case 'raised':
        classes = ['mdc-button--raised', 'mat-mdc-raised-button'];
        break;
      case 'flat':
        classes = ['mdc-button--unelevated', 'mat-mdc-unelevated-button'];
        break;
      //case '':
      default:
        classes = ['mat-mdc-button'];
        break;
    }
    this.addClasses(classes);
  }
  constructor() {
    //this.renderEl = new BnRendererUtil(this.renderer, this.el);
  }

  private addClasses(classNames: string[]): void {
    classNames.forEach((className: string) =>
      this.renderer.addClass(this.el.nativeElement, className)
    );
  }

  private removeClasses(values: string[]) {
    values.forEach((remove: string) =>
      this.renderer.removeClass(this.el.nativeElement, remove)
    );
  }
}
