import { Injectable } from '@angular/core';

import { STEPS } from './workflow.model';

@Injectable()
export class WorkflowService {
  private workflow = [
    { step: STEPS.sendMoney, valid: false},
    { step: STEPS.cashIn, valid: false},
    { step: STEPS.transactionDetail, valid: false},
    { step: STEPS.transactionConfirmation, valid: false},
    { step: STEPS.summary, valid: false}
  ];
  constructor() { }

  validateStep(step: string) {
    // if the state is found, set the valid field to true
    let found = false;
    for(let i=0; i < this.workflow.length && !found; i++){
      if(this.workflow[i].step == step) {
        found = this.workflow[i].valid = true;
      }
    }
    console.log("validated " + step + " step.");
  }

  resetSteps() {
    //reset all steps to invalid
    this.workflow.forEach(elem =>
      { 
        elem.valid = false;
      });
  }

  getFirstInvalidStep(step: string) : string {
    // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.workflow.length && !found && valid; i++) {
            let item = this.workflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;

  }
}
