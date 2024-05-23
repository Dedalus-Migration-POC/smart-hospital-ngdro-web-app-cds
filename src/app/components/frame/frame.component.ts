import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {
  @Input() urls: string[] = [];

  public sanitizedUrls: SafeResourceUrl[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.sanitizeUrls();
  }

  private sanitizeUrls(): void {
    this.sanitizedUrls = this.urls.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
