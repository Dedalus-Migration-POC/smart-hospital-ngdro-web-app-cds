import { Component, Inject, Input, OnInit } from '@angular/core';
import { DEPLOY_URL } from '../../../main';

@Component({
  selector: 'app-image',
  standalone: true,
  template: `<img [alt]="alt" [src]="src" [class]="styleClass"
                  [attr.width]="width ? width : null"
                  [attr.height]="height ? height : null"/>`
})
export class ImageComponent implements OnInit {
  @Input({ required: true, alias: 'src' }) src!: string;
  @Input('alt') alt?: string;
  @Input() styleClass?: string;
  @Input() width?: string;
  @Input() height?: string;

  constructor(@Inject(DEPLOY_URL) private deployUrl: string) {}

  ngOnInit(): void {
    this.src = `${this.deployUrl}assets/images/${this.src}`;
  }
}
