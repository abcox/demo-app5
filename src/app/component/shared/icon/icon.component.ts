import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPTY, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [HttpClientModule],
  template: `<span [innerHTML]="svgIcon()"></span>`,
  styles: 'app-icon { display: inline-block; }',
})
export class SvgIconComponent {
  name = input<string | undefined>(undefined);
  rootPath = input<string | undefined>('assets/icons/');
  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);
  public svgIcon = toSignal(
    toObservable(this.name).pipe(
      switchMap(name => {
        const path = name ? `${this.rootPath()}${name}.svg` : null;
        return this.http.get(path ?? '', { responseType: 'text' }).pipe(
          //tap(response => console.log(`response`, response)),
          map(response => this.sanitizer.bypassSecurityTrustHtml(response))
        );
      })
    )
  );
}
