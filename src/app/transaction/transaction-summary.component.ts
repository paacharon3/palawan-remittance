import { CashInCenter } from './../cash-in-center/cash-in-center';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FormDataService } from '../data/formData.service';
import { Transaction }   from '../data/formData.model';

import  { NgxBarcodeModule } from 'ngx-barcode';

@Component ({
    selector: 'transaction-summary'
    ,templateUrl: './transaction-summary.component.html'
})

export class TransactionSummaryComponent implements OnInit {
    title = '7-Connect Barcode';
    instructionText = "Instructions: Present to 7-Eleven cashier and pay amount due"
    transaction: Transaction;
    form: any;
    validUntilText = 'Payment slip valid until';
    validityDate: string;
    selectedCashInCenter: CashInCenter;

    constructor(private router: Router, 
        private formDataService: FormDataService) {

    }

    ngOnInit(){
        this.transaction = this.formDataService.getTransactionData();
        this.validityDate = this.transaction.transactionExpiryDate
        this.selectedCashInCenter = this.formDataService.getSelectedCashInCenter();
        // this.validityDate = new Date(this.transaction.transactionDate);
        // this.validityDate.setHours(this.validityDate.getHours()+1);
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
        this.router.navigate(['/summary']);
    }
}