import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { KkmodalboxComponent } from '../common/kkmodalbox.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Properties
  insertForm: FormGroup;
  username: FormControl;
  password: FormControl;
  cpassword: FormControl;
  email: FormControl;

  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  @ViewChild(KkmodalboxComponent, { static: false }) modalbox: KkmodalboxComponent;

  constructor(
    private fb: FormBuilder,
    private acct: AccountService,
    private router: Router
  ) { }

  ngOnInit() {

    this.username = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.password = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.cpassword = new FormControl('', [Validators.required, this.MustMatch(this.password)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.errorList = [];

    this.insertForm = this.fb.group(
      {
        username: this.username,
        password: this.password,
        cpassword: this.cpassword,
        email: this.email,
      });
  }

  MustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
      // return null if controls haven't initialised yet
      if (!passwordControl && !cpasswordControl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (cpasswordControl.hasError && !passwordControl.hasError) {
        return null;
      }
      // set error on matchingControl if validation fails
      if (passwordControl.value !== cpasswordControl.value) {
        return { mustMatch: true };
      } else {
        return null;
      }

    };


  }

  onSubmit() {
    const userDetails = this.insertForm.value;
    this.acct.register(userDetails.username, userDetails.password, userDetails.email).subscribe(result => {
      // this.router.navigate(['/login']);
      this.errorList = [];
      this.modalMessage = 'Your Registration is successful, Please kindly confirm via email';
      this.modalTitle = 'Registration';
      this.modalbox.RedirectTo = ['/login'];
      this.modalbox.OpenMe();
    }, error => {
      this.errorList = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < error.error.value.length; i++) {
        this.errorList.push(error.error.value[i]);
      }
      this.modalMessage = 'Your Registration Was Unsuccessful';
      this.modalTitle = 'Error on Registration';
      this.modalbox.OpenMe();
    });
  }

}
