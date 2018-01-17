import { environment } from './../../environments/environment';
import { Input } from '@angular/core';
import { ReactiveFormsModule, 
    FormGroup, Validators, Validator, 
    ValidatorFn, 
    FormControl, 
    NG_VALIDATORS,
} from '@angular/forms';

import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms/src/model';
@Directive({
    selector: '[amountValidator]',
    providers: [{
        provide: NG_VALIDATORS, 
        useExisting: amountValidator, 
        multi:true
    }]
})

export class amountValidator implements Validator {
    @Input() amountValidator: number;
    
    validate(control: AbstractControl): {[key:string]: any} {
        const maxAmount = environment.maxTransactionAmount;
        // console.log("what is amountValidator? : ", this.amountValidator);
        // console.log("Validating : ",control.value);
        // console.log("against limit : ", maxAmount);
        let regexp = new RegExp('^(\\d{1,4})(\\.\\d{1,2}){0,1}$');
        let validAmountRegexTest = regexp.test(control.value);
        if(!validAmountRegexTest){
            console.log("Not a valid value")
            return {
                'invalidFormat': { value: control.value }
            }
        } else if(control.value > maxAmount){
            console.log("amount cannot be greater than {maxAmount}!");
            return { 
                'contactValidator': { value: control.value }
            };
        } else {
            return null;
        }
         
    }
}