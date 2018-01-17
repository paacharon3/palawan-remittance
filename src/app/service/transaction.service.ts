import { LoaderService }                         from './../loader/loader.service';
import { environment }                           from './../../environments/environment';
import { Injectable }                            from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }   from '@angular/common/http';
import { Transaction }                           from '../data/formData.model';
import { Router }                                from "@angular/router";
@Injectable()
export class TransactionService {
    authToken: string;
    // http: HttpClient;
    constructor(private http: HttpClient,
                private router: Router,
                private loaderService: LoaderService) { }

    buildAndSendRequest(transaction: Transaction): Promise<boolean> {
        let success = false;
        console.log("generating send request and sending to remittance server...");
        const authRequestBody = 
            'client_id=remittance-switch&'+
            'client_secret=remittance-switch-secret&'+
            'response_type=token&'+
            'grant_type=client_credentials'
        
        let remittanceRequestBody = { 
            remcoID: transaction.cashInCenter,
            senderMobile: transaction.senderContact,
            senderFirstName: transaction.senderFirstName,
            senderLastName: transaction.senderLastName,
            receiverMobile: transaction.receiverContact,
            receiverFirstName: transaction.receiverFirstName,
            receiverLastName: transaction.receiverLastName,
            amount: transaction.amount,
            serviceFee: transaction.serviceFee,
            destinationBranch: "XXK"
        };

        const authUrl = environment.authAPI;
        const remittanceUrl = environment.sendMoneyAPI;

        this.showLoader();

        this.http.post<AuthJsonResponse>(authUrl, authRequestBody , {
            // withCredentials:true,
            headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded'),
            observe: 'response'
            
        }).subscribe(
            resp => {
                //let headers = new HttpHeaders().set('Authorization', "Bearer " + this.authToken);
                // this.http.post(remittanceUrl,remittanceRequestBody, 
                // { headers: headers }
                // )
                console.log("Getting authorization token: " + resp.headers);
                let resultToken = resp.body['access_token'];
                console.log("First API call (auth request) : " + resultToken);
                
                this.http.post(remittanceUrl, remittanceRequestBody, {
                    observe: 'response',
                    headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + resultToken)
                } ).subscribe(
                    resp => {
                        console.log("Successfully sent money transfer request!", resp);
                        transaction.sevenPayRefNo = resp.body['sevePayRefNo']; //.replace(/-/g,'');
                        transaction.transactionDate = resp.body['transactionDate'];
                        transaction.remittanceRefNo = resp.body['remittanceRefNo'];
                        transaction.transactionExpiryDate = resp.body['expiryDate'];                        
                        success = true;
                        this.hideLoader();
                        this.router.navigate(['/summary']);
                    },
                    err => {
                        console.log("Error occured on Second API call (remittance request)", err.value);
                    }
                );
            },

            err => {
                console.log("Error occured " + err);
                
            }
        )
        return Promise.resolve(success);
    }

    private showLoader(): void {
        console.log("summoning loader...");
        this.loaderService.show();
    }

    private hideLoader(): void {
        console.log("banishing loader...");        
        this.loaderService.hide();
    }
}

export interface AuthJsonResponse {
    results: {'token_type':'', 'access_token':'', 'expires_in':0};
}