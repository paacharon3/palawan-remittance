import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FormDataService } from '../data/formData.service';
import { Transaction }   from '../data/formData.model';


@Component ({
    selector: 'transaction-detail'
    ,templateUrl: './transaction-detail.component.html'
})

export class TransactionDetailComponent implements OnInit {
    title = 'Send Money';
    transaction: Transaction;
    form: any;
    canConfirmButton = true;
    instructionText = "Kindly fill out the form below"

    constructor(private router: Router, 
        private formDataService: FormDataService,
        private fb: FormBuilder) {
        this.form = fb.group({
            
        })
    }

    ngOnInit() {
        this.transaction = this.formDataService.getTransactionData();
        console.log('Transaction detail feature is loaded, getting current transaction data.');
    }

    save(form: NgForm): boolean {
        console.log("Validating Transaction details form");
        console.log("Form : ", form.value);
        if(!form.valid || this.transaction.receiverContact === this.transaction.senderContact){
            return false;
        }

        
        this.formDataService.setTransactionDetails(this.transaction);
        return true;
    }

    goToPrevious(form: any) {
        // if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['/cashIn']);
        // }
    }

    goToNext(form: any): void {
        if(this.save(form)) {
            this.router.navigate(['/transactionConfirmation']);
        } else {
            console.log("cannot proceed to confirmation, form is invalid or sender and receiver contact are the same");
            this.canConfirmButton = false;
        }      
    }

    // setCanConfirm() {
    //     this.canConfirmButtonClass ={
    //         'confirm-button': !this.form.valid,
    //         'confirm-button-true': this.form.valid
    //     };
    // }
   
}