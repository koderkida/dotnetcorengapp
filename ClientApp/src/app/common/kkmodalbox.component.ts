import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

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
  get ModalTitle(){
    return this.modalTitle;
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
  get ModalErrorList() {
    return this.modalErrorList;
  }
  private redirectto = [];
  @Input()
  set RedirectTo(value) {
    this.redirectto = value;
  }
  get RedirectTo() {
    return this.redirectto;
  }
  private modalRef: BsModalRef;
  @ViewChild('template', { static: false }) modal: TemplateRef<any>;

  constructor(private modalService: BsModalService,
              private router: Router) { }

  ngOnInit() {
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalErrorList = [];
  }

  CloseMe() {
    this.modalRef.hide();
    if (this.redirectto) {
      this.router.navigate(this.redirectto);
    }
  }

  OpenMe() {
    this.modalRef = this.modalService.show(this.modal);
  }
}
