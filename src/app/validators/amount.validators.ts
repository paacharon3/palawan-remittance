import { environment } from './../../environments/environment';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AmountValidators {
    
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return {
                cannotContainSpace: true
            }
        }

        return null;
    }

    static cannotContainMultiDecimal(control: AbstractControl) : ValidationErrors | null {
        // console.log("AmountValidators : ", control.value);
        let regexp = new RegExp('^([1-9])(\\d{0,3})(\\.\\d{1,2}){0,1}$');
        let regexp2 = new RegExp('^(0-9){1,4}$');
        const maxAmount = environment.maxTransactionAmount;
        let formControlValue = control.value as string
        let regexResult = regexp.test(formControlValue)
        // console.log("regexResult is: ", regexResult);
        if(!formControlValue || !regexResult ){
            console.log("Not a valid value")
            return {
                invalidInput : true
            }
        } else if ((+formControlValue) > maxAmount){
            console.log("amount cannot be greater than {maxAmount}!");
            return {
                'maxAmountExceeded': {
                    value: 'cannot exceed 2500'
                }
            }
        }

        return null;

    }
}