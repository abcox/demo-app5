import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FileStorageService } from '../../service/file-storage/file-storage.service';
import { isEqual } from 'lodash';

export interface FileTag {
  name: string;
}

@Component({
  selector: 'app-file-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    // tag support:
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './file-detail-page.component.html',
  styleUrl: './file-detail-page.component.scss',
})
export class FileDetailPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fileStorageService = inject(FileStorageService);
  vm$ = this.router.events.pipe(
    //tap(routerEvents => console.log(`route.snapshot`, this.route.snapshot)),
    map(routerEvents => ({
      name: this.route.snapshot.queryParams['name'],
      resource: this.route.snapshot.queryParams['resource'],
    })),
    switchMap(({ name }) =>
      this.getDetail$(name).pipe(
        tap((detail: any) => {
          const tags = this.getTagArrayByKey('tag', detail.tags);
          this.fileTags = tags;
          this.fileTagsOrig = tags;
          console.log(`fileTags`, this.fileTags);
          console.log(`fileTagsOrig`, this.fileTagsOrig);
        }),
        map((detail: any) => ({
          ...detail,
          resource: detail.url,
          //tags: this.getTagArrayByKey('tag', detail.tags),
        })) // todo: fix the typing (ie. "resource: detail.url")
      )
    )
  );

  get anyChanges() {
    const anyChanges = isEqual(this.fileTagsOrig, this.fileTags);
    //console.log(`anyChanges`, anyChanges);
    return !anyChanges;
  }

  ngOnInit() {
    console.log(`fileTags`, this.fileTags);
  }

  getTagArrayByKey(
    keyFilter: string,
    tags: { [key: string]: string }
  ): FileTag[] {
    const result = Object.entries(tags)
      .filter(([key, value]) => key === keyFilter)
      .map(([key, value]) => ({ name: value }) as FileTag);
    console.log(`getTagArrayByKey result`, result);
    return result;
  }

  getDetail$(fileName: string) {
    return this.fileStorageService
      .getDetail({
        containerName: 'public',
        fileName,
        includeTags: true,
      })
      .pipe(tap(response => console.log(`getDetail response`, response)));
  }

  //#region tags

  addOnBlur = true;
  announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fileTags: FileTag[] = [
    /* { name: 'food' },
    { name: 'fast' },
    { name: 'beef' },
    { name: 'comfort' }, */
  ];
  fileTagsOrig!: FileTag[];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tag
    if (value) {
      //this.fileTags.push({ name: value });
      this.fileTags = [...this.fileTags, { name: value }];
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: FileTag): void {
    const index = this.fileTags.indexOf(tag);

    if (index >= 0) {
      this.fileTags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: FileTag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.fileTags.indexOf(tag);
    if (index >= 0) {
      this.fileTags[index].name = value;
    }
  }
  //#endregion tags
}
