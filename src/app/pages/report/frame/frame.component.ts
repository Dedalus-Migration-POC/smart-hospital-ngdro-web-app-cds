import {Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Dicom } from '../../../models/report';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html'
})
export class FrameComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dicom!: Dicom;
  sanitizedUrl!: SafeResourceUrl | null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dicom']) {
      this.updateUrl();
    }
  }

  updateUrl(): void {
    if (this.dicom?.url.trim().length > 0) {
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dicom.url);
    }
  }

  ngOnDestroy(): void {
    this.sanitizedUrl = null;
  }
}
