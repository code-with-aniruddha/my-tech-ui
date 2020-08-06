import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { ApiService } from './../../services/api-service.service'
import { SharedService } from './../../services/shared.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public ngUnsubscribe: Subject<any> = new Subject();
  specialityFormVisible: boolean;
  specialityForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private shrdSrv: SharedService
  ) { }

  ngOnInit() {
    this.specialityFormVisible = false;
    this.specialityForm = this.fb.group({
      'interest': [''],
      'description': ['']
    })
  }

  addSpeciality(){
    this.specialityFormVisible = true;
  }

  specialityFormVisibleSubmitHandler() {
    console.log(this.specialityForm.value);
    const formData = this.specialityForm.value;
    formData['creator_Id'] = this.shrdSrv.userId;
    console.log(formData);
    this.service.createSpecility(formData).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      console.log(data);
    }, errData => {
      console.log(errData);
  });
  }
}
