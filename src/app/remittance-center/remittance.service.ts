import { environment } from './../../environments/environment';
import { Transaction } from './../data/formData.model';
import { CashInCenterService } from './../cash-in-center/cash-in-center.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CashInCenter} from '../cash-in-center/cash-in-center';

@Injectable()
export class RemittanceService {

  constructor(private http: HttpClient,
              private cashInCenterService: CashInCenterService) { }
  
  getServiceFee(cashInCenter: CashInCenter, transaction: Transaction): Promise<number> {
    const getServiceFeeUrl = environment.getServiceFeeAPI
    let getServiceFeeBody = {
      remcoID: cashInCenter.id,
      amount: transaction.amount.toString(),
      destinationBranch: "XXK" //what is XXK?????
    }
    let promise = new Promise<number>((resolve,reject) => {
      this.cashInCenterService.getAuthToken().then(
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
