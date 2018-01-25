import { TransactionService } from './../service/transaction.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FormDataService }   from '../data/formData.service';
import { Transaction }       from '../data/formData.model';

@Component ({
    selector: 'transaction-confirmation'
    ,templateUrl: './transaction-confirmation.component.html'
})

export class TransactionConfirmationComponent implements OnInit {
    title = 'Confirm';
    transaction: Transaction;
    form: any;
    instructionText = 'Kindly confirm the information below'
    totalAmount: number
    errorFromRequest: string;
    showErrorFromRequest = false;
    constructor(private router: Router, 
        private formDataService: FormDataService,
        private transactionService: TransactionService
    ) { }

    ngOnInit(){
        this.transaction = this.formDataService.getTransactionData();
        this.totalAmount = (+this.transaction.amount) + (+this.transaction.serviceFee)
    }

    save(form: any): boolean {
        console.log("Validating form");
        if(!form.valid){
            return false;
        }

        this.formDataService.setTransaction(this.transaction);
        return true;
    }

    goToPrevious(form: any) {
        // if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['/transactionDetail']);
        // }
    }

    goToNext(form: any): void {
        this.formDataService.confirmTransaction(this.transaction);
        this.transactionService.sendCashOutRequest(this.transaction)
            .then(
                resp => {
                    console.log("promise success, transaction created. forwarding to barcode page");
                    this.router.navigate(['/summary']);
                },
                msg => { //error
                    console.log("Failed to create transaction, errorFromRequest : ", msg);
                    this.errorFromRequest = msg.msg;
                    console.log("Error Request is : ", this.errorFromRequest)
                    this.showErrorFromRequest = true;
                }
           ).catch(
               err => {
                   console.log("promise failed. transaction was not created");
               }
           );
    }
}