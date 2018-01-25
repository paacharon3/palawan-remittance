import { environment } from './../../environments/environment';
import { Transaction } from './../data/formData.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CashInCenter} from '../cash-in-center/cash-in-center';
import { AuthBearerService, AuthJsonResponse } from '../service/auth-bearer.service';

@Injectable()
export class RemittanceService {

  constructor(private http: HttpClient,
              private authBearerService: AuthBearerService) { }
  

  getServiceFee(cashInCenter: CashInCenter, transaction: Transaction): Promise<number> {
    const getServiceFeeUrl = environment.getServiceFeeAPI
    const destinationBranch = environment.destinationBranch
    let getServiceFeeBody = {
      remcoID: cashInCenter.id,
      amount: transaction.amount.toString(),
      destinationBranch: destinationBranch //2003 for TEST/DEV, XXK for PROD
    }
    let promise = new Promise<number>((resolve,reject) => {
      this.authBearerService.getAuthToken().then(
        token => {
          let resultToken = token;
          return this.http.post(getServiceFeeUrl, getServiceFeeBody, {
            observe: 'response',
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization','Bearer ' + resultToken)
          })
          .toPromise()
          .then(
            resp => {
              resolve(+resp.body['serviceFee'])
              //resolve(+resp.body['serviceFee']);
            }
          ).catch( err => {
              console.log("Error in response for getServiceFee method. ",err);
            }
          )
        }
      )
    });

    return promise
  }

  getServiceFeeForNewAmount(cashInCenter: CashInCenter, newAmount: number): Promise<number> {
    const getServiceFeeUrl = environment.getServiceFeeAPI
    const destinationBranch = environment.destinationBranch
    let getServiceFeeBody = {
      remcoID: cashInCenter.id,
      amount: newAmount.toString(),
      destinationBranch: destinationBranch //2003 for TEST/DEV, XXK for PROD
    }
    let promise = new Promise<number>((resolve,reject) => {
      this.authBearerService.getAuthToken().then(
        token => {
          let resultToken = token;
          return this.http.post(getServiceFeeUrl, getServiceFeeBody, {
            observe: 'response',
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization','Bearer ' + resultToken)
          })
          .toPromise()
          .then(
            resp => {
              resolve(+resp.body['serviceFee'])
              //resolve(+resp.body['serviceFee']);
            }
          ).catch( err => {
              console.log("Error in response for getServiceFee method. ",err);
            }
          )
        }
      )
    });

    return promise
  }
  
}
