import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionAmountComponent }               from './transaction/transaction-amount.component';
import { CashInCenterComponent }                    from './transaction/cash-in-center.component';
import { TransactionDetailComponent }               from './transaction/transaction-detail.component';
import { TransactionConfirmationComponent }         from './transaction/transaction-confirmation.component';
import { TransactionSummaryComponent }              from './transaction/transaction-summary.component';

/* workflow guards */
import { WorkflowGuard }        from './workflow/workflow-guard.service';
import { WorkflowService }      from './workflow/workflow.service';

export const appRoutes: Routes = [
    // 1st Route
    // { path: 'personal',  component: PersonalComponent },
    // // 2nd Route
    // { path: 'work',  component: WorkComponent },
    // // 3rd Route
    // { path: 'address',  component: AddressComponent },
    // // 4th Route
    // { path: 'result',  component: ResultComponent },
    // 5th Route
    // { path: '',   redirectTo: '/sendMoney', pathMatch: 'full' },
    // 6th Route
    { path: 'sendMoney',    
      component: TransactionAmountComponent
    },
    //cashInCenter
    { path: 'cashIn',       
      component: CashInCenterComponent , 
      // canActivate: [WorkflowGuard]
    },
    //senderReceiver
    { path: 'transactionDetail',    
      component: TransactionDetailComponent, 
      // canActivate: [WorkflowGuard]
    },
    { path: 'transactionConfirmation', 
      component: TransactionConfirmationComponent , 
      // canActivate: [WorkflowGuard]  
    },
    //summaryReceipt  
    { path: 'summary',  
      component: TransactionSummaryComponent, 
      // canActivate: [WorkflowGuard]
    }, 
    { path: '', redirectTo: '/sendMoney', pathMatch:'full' },    
    { path: '**', component: TransactionAmountComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { useHash: true, enableTracing:true }) ],
  exports: [RouterModule],
  providers: [WorkflowGuard]
})

export class AppRoutingModule {}
