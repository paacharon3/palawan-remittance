import { Observable } from 'rxjs/Observable';
import { RemittanceCenter } from './../remittance-center/remittance-center.component';
import { CashInCenter } from './cash-in-center';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams }        from '@angular/common/http';
import { CASHINCENTERS } from './mock-cash-in-centers';
import 'rxjs/add/operator/toPromise';
import { environment }       from './../../environments/environment';
import { LoaderService }                         from './../loader/loader.service';
import { AuthBearerService, AuthJsonResponse } from '../service/auth-bearer.service';

@Injectable()
export class CashInCenterService {  
    private remittanceCenters: {
        remcos: RemittanceCenter[]
    }
    
    constructor(private http: HttpClient,
                private loaderService: LoaderService,
                private authBearerService: AuthBearerService){ 
        
    }
    
    // getAuthToken(): Promise<string> {
        
    //     let myPromise : Promise<CashInCenter[]>;
    //     let resultToken;

    //     const authRequestBody = 
    //     'client_id=remittance-switch&'+
    //     'client_secret=remittance-switch-secret&'+
    //     'response_type=token&'+
    //     'grant_type=client_credentials';
    
    //     const authUrl = environment.authAPI;

    //     console.log("getting bearer auth...");
    //     return this.http.post<AuthJsonResponse>(authUrl, authRequestBody , {
    //         headers: new HttpHeaders()
    //         .set('Content-Type', 'application/x-www-form-urlencoded'),
    //         observe: 'response' })
    //     .toPromise()
    //     .then(
    //         resp => resp.body['access_token'],

    //         err => {
    //             console.log("Cannot get auth token, reverting to previous page");
    //             this.hideLoader();
    //         }
    //     ).catch( err => {
    //         console.log("Cannot get auth token, reverting to previous page",err);
    //         this.hideLoader();
    //     });
    // }

    getRemco(): Promise<CashInCenter[]> {
        this.showLoader();
        const getRemittanceCentersUrl = environment.getRemittanceCentersAPI
        let resultToken;
        let promise = new Promise<CashInCenter[]>((resolve,reject) => {
            this.authBearerService.getAuthToken().then(token => 
                {
                    resultToken = token
                    return this.http.get(getRemittanceCentersUrl, {
                        observe: 'response',
                        headers: new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', 'Bearer ' + resultToken)
                    })
                    .toPromise()
                    .then(
                        resp => {
                            let centers: CashInCenter[] = [];
                            resp.body['data'].map( (data,x) => {
                                
                                console.log("data is : ", data.toString());
                                let remco = new CashInCenter();
                                remco.id = data['remcoID'];//x+1;
                                remco.storeName = data['remcoName'];
                                remco.imgSrc = data['logoUrl'];//"palawan.png"
                                if(remco.id !== "711") { //hard coded disabling of 711 cash out
                                    remco.isAvailable = true;                                   
                                } else {
                                    console.log("disabling REMCO : ", remco.id);
                                    remco.isAvailable = false;
                                }
                                centers.push(remco);
                                console.log("centers size is : " + centers.toString());
                           })
                           this.hideLoader();
                           resolve(centers);                           
                        },
                        msg => {//error
                            console.log("Error in 2nd api call (getting remco)");
                            this.hideLoader();
                            reject(msg);
                        }
                    ).catch( err => {
                            console.log("Error encountered on getting list of remcos: ",err)
                            this.hideLoader();
                        });
                });
            })
        
       return promise;
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

