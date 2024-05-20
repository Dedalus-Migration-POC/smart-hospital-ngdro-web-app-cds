import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Modal, Type } from '../../components/modal/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private modalService: ModalService,
              private viewContainerRef: ViewContainerRef) {}

  // openModal() {
  //   const modalData: Modal = {
  //     type: Type.INFO,
  //     title: 'Informazioni Importanti',
  //     contentBody: 'Questo è il corpo principale del modale.',
  //     contentFooter: 'Piede del modale con ulteriori informazioni o azioni.'
  //   };
  //   this.modalService.open(this.viewContainerRef, modalData);
  // }
}
