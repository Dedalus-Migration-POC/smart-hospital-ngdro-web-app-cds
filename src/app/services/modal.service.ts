import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';

import { ModalComponent } from '../components/modal/modal.component';
import { Modal } from '../models/modal-alert';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: ComponentRef<ModalComponent> | null = null;
  private viewContainerRef: ViewContainerRef | null = null;

  open(viewContainerRef: ViewContainerRef, modalData: Modal) {
    this.viewContainerRef = viewContainerRef;
    if (this.modalRef) {
      this.close();
    }

    const componentRef = this.viewContainerRef.createComponent(ModalComponent);
    componentRef.instance.modal = modalData;
    this.modalRef = componentRef;
  }

  close() {
    if (this.modalRef && this.viewContainerRef) {
      this.viewContainerRef.clear();
      this.modalRef = null;
    }
  }
}
