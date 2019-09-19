import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kkmodalbox',
  templateUrl: './kkmodalbox.component.html',
  styleUrls: ['./kkmodalbox.component.css']
})
export class KkmodalboxComponent implements OnInit {
  private modalTitle = '';
  @Input()
  set ModalTitle(value) {
    this.modalTitle = value;
  }
  private modalMessage = '';
  @Input()
  set ModalMessage(value) {
    this.modalMessage = value;
  }
  private modalErrorList = [];
  @Input()
  set ModalErrorList(valuearr) {
    this.modalErrorList = valuearr;
  }
  private modalRef: BsModalRef;
  @ViewChild('template', { static: false }) modal: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalErrorList = [];
  }

  CloseMe() {
    this.modalRef.hide();
  }

  OpenMe() {
    this.modalRef = this.modalService.show(this.modal);
  }
}
