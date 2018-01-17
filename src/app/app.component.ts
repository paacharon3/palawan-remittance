import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { FormDataService }          from './data/formData.service';
import { Transaction }              from "./data/formData.model";

import { Location }                 from "@angular/common";

@Component({
  selector: 'multi-step-wizard-app',
  templateUrl: './app.component.html'
  // styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Send Money';
  @Input() formData;
  @Input() transactionData;
  

  constructor(private formDataService: FormDataService,
              private location: Location,
              private router: Router
  ) { }

  ngOnInit() {
      this.formData = this.formDataService.getFormData();
      this.transactionData = this.formDataService.getTransactionData();
      console.log(this.title + ' loaded!');
  }

  goBack(): void {
      console.log("Going back to previous path: ",this.location.path);
      this.location.back();
  }
}
