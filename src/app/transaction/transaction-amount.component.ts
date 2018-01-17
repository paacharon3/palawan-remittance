import { AmountValidators } from './../validators/amount.validators';
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { FormDataService }   from '../data/formData.service';
import { Transaction }   from '../data/formData.model';
import { FormBuilder, FormControl, FormGroup, Validators }   from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component ({
    selector: 'transaction-amount'
    ,templateUrl: './transaction-amount.component.html'
})

export class TransactionAmountComponent implements OnInit {
    title = 'Send Money';
    instructionText= 'Input desired transaction amount below';
    instructionText2 = 'Maximum Transaction amount: Php 2,500.00'
    transaction: Transaction;
    transactionAmountForm = new FormGroup({
        amount: new FormControl('',
            [
                Validators.required, 
                Validators.min(1),
                Validators.max(2500),
                Validators.maxLength(6),
                AmountValidators.cannotContainMultiDecimal,
                AmountValidators.cannotContainSpace 
            ]),
    });  

    get amount(){
        return this.transactionAmountForm.get('amount');
    }

    constructor(private router: Router, 
        private formDataService: FormDataService,
        private fb: FormBuilder)   {
           
        }

    ngOnInit() {
        this.transaction = this.formDataService.getTransactionData();
        // this.createForm();
        console.log('Transaction amount feature loaded.');
    }

    save(form: FormGroup): boolean {
        console.log("Validating form : " + form);
        if (!form.valid && !this.transaction.amount) {
            console.log("form is not valid");
            return false;
        }
        let transactionAmount = form.value;
        console.log("Submitting transaction amount: " + Number(transactionAmount.amount) );
        // if(!this.transaction.amount)
        this.formDataService.setTransactionAmount(Number(transactionAmount.amount));
        return true;
    }

    goToCashInCenterForm(form: FormGroup) {
        if(this.save(form)) {
            console.log('Forwarding to cash in center page');
            this.router.navigate(['/cashIn']);
        } else {
            console.log("i cannot go to cash in center");
        }
    }

    createForm() {
        console.log("bootstrapping transaction form...");
        this.transactionAmountForm = this.fb.group ({
            amount: ['', 
                [
                    Validators.required, Validators.min(1), 
                    Validators.max(2500.00),
                ], 
            ],
        });
    }


}