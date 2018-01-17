import { Directive, Input } from '@angular/core';
import { ReactiveFormsModule, 
  FormGroup, Validators, Validator, 
  ValidatorFn, 
  FormControl, 
  NG_VALIDATORS,
} from '@angular/forms';

import { OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms/src/model';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Directive({
  selector: '[appContactValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ContactValidatorDirective,
    multi:true
  }]
})
export class ContactValidatorDirective {
    @Input('senderContact') public senderContact: string;
    @Input('receiverContact') public receiverContact: string;

    validate(control: AbstractControl): {[key:string]: any} {
        console.log("Validating sender and receiver contact: " + control, control.value);
        

        if(control.root) {
          console.log(control.root.root);
          this.senderContact = control.root.get("senderContact") ? control.root.get("senderContact").value : 'null';
          this.receiverContact = control.root.get("receiverContact") ? control.root.get("receiverContact").value : 'null'; ;
          console.log("sender Contact : ", this.senderContact);
          console.log("reciever Contact : ", this.receiverContact);
          let sc = control.root.get("senderContact");
          let rc = control.root.get("receiverContact");
          if(this.senderContact === this.receiverContact && this.senderContact !== 'null' && this.receiverContact !== 'null'){
            let regexp = new RegExp('^(\\+63|0)\\d{10}$');
            let senderRegExpTest = regexp.test(this.senderContact);
            let receiverRegExpTest = regexp.test(this.receiverContact);
            console.log("senderRegExpTest : ", senderRegExpTest)
            console.log("receiverRegExpTest : ", receiverRegExpTest)            
            if(senderRegExpTest && receiverRegExpTest)
              return { valueEquals: true };
            else 
              return { invalid: true };
          } else if(this.senderContact === 'null' || !this.senderContact) {
            if(sc)
              sc.setErrors({'invalid':true});
          } else if(this.receiverContact === 'null' || !this.receiverContact) {
            if(rc)
              rc.setErrors({'invalid':true});
          }else {
            if(rc)
              rc.setErrors(null);
            if(sc)
              sc.setErrors(null);
          }
        }



        return null
    }

    // validate(fg: NgForm): { [key:string]: any } {
    //     let senderContact = fg.value[this.senderContact];
    //     let receiverContact = fg.value[this.receiverContact];

    //     if(senderContact === receiverContact){
    //       return { valueEquals : false };
    //     }

    //     return null;
    // }
}
