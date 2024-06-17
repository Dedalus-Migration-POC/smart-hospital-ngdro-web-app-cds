import { Component, Input } from '@angular/core';

import { Modal, Type } from '../../models/modal';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modal!: Modal;

  Type = Type;

  constructor(private modalService: ModalService) {}

  onClose(): void {
    this.modalService.close();
  }
}
