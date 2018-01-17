import { SignupFormComponent } from './signup-form/signup-form.component';
import { amountValidator } from './transaction/amount-validator.directive';
import { LoaderService } from './loader/loader.service';
import { CashInCenterService }  from './cash-in-center/cash-in-center.service';
import { WorkflowService }      from './workflow/workflow.service';
import { TransactionService }   from './service/transaction.service';
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup }      from '@angular/forms';
import { HttpClientModule }                         from '@angular/common/http';
/* App Root */
import { AppComponent }                             from './app.component';
// import { NavbarComponent }      from './navbar/navbar.component'

/* Feature Components */
import { TransactionAmountComponent }               from './transaction/transaction-amount.component';
import { CashInCenterComponent }                    from './transaction/cash-in-center.component';
import { TransactionDetailComponent }               from './transaction/transaction-detail.component';
import { TransactionConfirmationComponent }         from './transaction/transaction-confirmation.component';
import { TransactionSummaryComponent }              from './transaction/transaction-summary.component';
/* Material */
import { MatCardModule }                            from "@angular/material";
import { BrowserAnimationsModule }                  from "@angular/platform-browser/animations";
import { MatProgressBarModule }                     from '@angular/material/progress-bar';
import { MatProgressSpinnerModule }                 from '@angular/material/progress-spinner'

/* Cliqq Header */
import { CliqqHeaderComponent }                     from './cliqq-header/cliqq-header.component';

/* Remittance Center */
import { RemittanceCenter }                         from './remittance-center/remittance-center.component';

/* Routing Module */
import { AppRoutingModule }                         from './app-routing.module';

/* Shared Service */
import { FormDataService }                          from './data/formData.service';

import { NgxBarcodeModule }                         from 'ngx-barcode';

/* interceptors */
import { HTTP_INTERCEPTORS }                        from '@angular/common/http';
import { TransactionServiceInterceptor }            from './service/transaction-service.interceptor';

/* Remittance Service */
import { RemittanceService }                        from './remittance-center/remittance.service';
import { LoaderComponent }                          from './loader/loader.component';
import { ContactValidatorDirective } from './contact-validator.directive';

@NgModule({
  declarations: [
      AppComponent,
      // NavbarComponent,
      TransactionAmountComponent,
      CashInCenterComponent,
      TransactionDetailComponent,
      TransactionConfirmationComponent,
      TransactionSummaryComponent,
      RemittanceCenter,
      CliqqHeaderComponent,
      LoaderComponent,
      amountValidator,
      ContactValidatorDirective,
      SignupFormComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      MatCardModule,
      NgxBarcodeModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
  ],
  providers: [
      { provide: FormDataService, useClass: FormDataService  },
      { provide: TransactionService, useClass: TransactionService},
      { provide: HTTP_INTERCEPTORS, useClass: TransactionServiceInterceptor, multi:true },
      { provide: WorkflowService, useClass: WorkflowService},
      { provide: RemittanceService, useClass: RemittanceService },
      { provide: CashInCenterService, useClass: CashInCenterService },
      { provide: LoaderService, useClass: LoaderService },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
