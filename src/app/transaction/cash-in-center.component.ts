import { RemittanceService } from './../remittance-center/remittance.service';
import { CashInCenter }      from './../cash-in-center/cash-in-center';
import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { FormDataService }   from '../data/formData.service';
import { Transaction }       from '../data/formData.model';

import { RemittanceCenter }  from "../remittance-center/remittance-center.component";

// cash in center service
import { CashInCenterService } from "../cash-in-center/cash-in-center.service";

import { sevenElevenRemco } from "../cash-in-center/seven-eleven-remco";

// material
import { MatCardModule }     from "@angular/material";
import { FormGroup } from '@angular/forms/src/model';
import { Validators } from '@angular/forms/src/validators';
import { FormBuilder } from '@angular/forms';

@Component ({
    selector: 'cash-in-center'
    ,templateUrl: './cash-in-center.component.html'
    ,providers:[CashInCenterService]
})

export class CashInCenterComponent implements OnInit {
    title = 'Send Money';
    transaction: Transaction;
    form: any;
    cashInCenters: CashInCenter[];
    @Input() selectedCashInCenter: CashInCenter;
    canProceed: boolean = false;
    amount: number;
    instructionText = 'Input desired transaction amount below';
    sevenElevenCashIn: CashInCenter;
    transactionAmountForm: FormGroup;

    constructor(private router: Router, 
        private formDataService: FormDataService,
        private cashInCenterService: CashInCenterService,
        private remittanceService: RemittanceService) {
    }

    ngOnInit() {
        this.transaction = this.formDataService.getTransactionData();
        this.getCashInCenters();
        this.amount = this.transaction.amount;
        if(!this.amount)
            this.amount = 0;
        this.sevenElevenCashIn = sevenElevenRemco;
        console.log('Cash in Center feature loaded.');
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }
        // this.recomputeServiceFee(this.transaction.amount);
        this.formDataService.setCashInCenter(this.selectedCashInCenter);
        return true;
    }

    // goToCashInCenterForm(form: any) {
    //     if(this.save(form)) {
    //         this.router.navigate(['/transactionDetails']);
    //     }
    // }

    goToPrevious(form: any) {
        // if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['/sendMoney']);
        // }
    }

    getCashInCenters(): void {
        this.cashInCenterService
            .getRemco()
            .then( remcos => {
                this.cashInCenters = remcos
                for(let remco of this.cashInCenters){
                    if(this.transaction.amount && remco.isAvailable){
                        this.remittanceService.getServiceFee(remco, this.transaction)
                        .then( serviceFee =>{
                            if(serviceFee){
                                // remco.isAvailable = true;
                                remco.serviceFee = serviceFee;
                            }
                        })
                        .catch( err => {
                            console.log("Cannot assign service fee (no response), invalidating remco");
                        })
                    }
                }
            }).catch( err => {
                console.log("Error in trying to get remco list: ",err);
            });
    }

    goToNext(form: any): void {
        if(this.save(form)) {
            this.router.navigate(['/transactionDetail']);
        }
    }

    // createForm() {
    //     console.log("bootstrapping transaction form...");
    //     this.transactionAmountForm = this.fb.group ({
    //         amount: ['', [Validators.required, Validators.min(1), Validators.max(5000)], ],
    //     });
    // }

    onSelectCashInCenter(cashInCenter: CashInCenter): void {
        console.log('assigning ' + cashInCenter.id);
        let proceedRecompute = false;

        if(this.transaction.amount != this.amount) {
            proceedRecompute = true        
        }  else {
            console.log("skipping recompute service fee, transaction amount is unchanged");
        }

        console.log("Recompute needed?", proceedRecompute);
        this.selectedCashInCenter = cashInCenter;
        if(this.selectedCashInCenter != cashInCenter && proceedRecompute){
            console.log('onSelectCashInCenter : selectedCashInCenter is now ' + this.selectedCashInCenter.id);                        
            this.recomputeServiceFee(this.transaction.amount, this.selectedCashInCenter)            
        }
        // this.formDataService.setCashInCenter(cashInCenter);
    }

    recomputeServiceFee(newAmount: number, cashInCenter: CashInCenter): void {
        console.log("recomputing service fee " + "( " + newAmount + " ). selectedCashInCenter is " + this.selectedCashInCenter.id);       
        
        if(this.selectedCashInCenter != null){
            this.selectedCashInCenter.serviceFee = null;
            this.amount = newAmount;
            this.remittanceService.getServiceFee(this.selectedCashInCenter, this.transaction)
            .then( newServiceFee =>{
                this.selectedCashInCenter.serviceFee = +newServiceFee;
            }).catch( err => {
                console.log("error in recomputing service fee ", err);
            })
        }
    }

    recomputeServiceFeeAll(newAmount: number) {
        console.log("recompute service fee all ");
        if(this.amount != newAmount){
            console.log("recomputing for a new amount : ", newAmount);
            for(let remco of this.cashInCenters){
                remco.serviceFee = null;
                this.remittanceService.getServiceFee(remco, this.transaction)
                .then( newServiceFee =>{
                    remco.serviceFee = +newServiceFee;
                }).catch( err => {
                    console.log("error in recomputing service fee ", err);
                })
            }
        } else {
            console.log("possibly recomputed from enter key or from blur, skipping recompute");
        }
        this.amount = newAmount;
    }
}