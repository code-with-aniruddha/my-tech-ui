import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { ApiService } from './../../services/api-service.service'
import { SharedService } from './../../services/shared.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public ngUnsubscribe: Subject<any> = new Subject();
  signupForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private shrdSrv: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'fullname': [''],
      'email': [''],
      'password': [''],
      // 'location': [''],
      'userType': ['']
    })
  }

  signupFormSubmitHandler(){
    console.log(this.signupForm.value);
    this.service.createUser(this.signupForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      console.log(data);
      this.shrdSrv.userId = data._id;
      console.log(this.shrdSrv.userId);
      this.router.navigate(['./home']);
    }, errData => {
      console.log(errData);
  });
  }

  getAddressOnChange(event) {
    console.log(event);
  }

}
