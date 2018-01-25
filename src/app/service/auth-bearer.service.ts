import { Injectable } from '@angular/core';
import { environment }       from './../../environments/environment';
import { LoaderService }                         from './../loader/loader.service';
import { HttpClient, HttpHeaders, HttpParams }        from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthBearerService {

  constructor(private http: HttpClient,
    private loaderService: LoaderService){ }

    getAuthToken(): Promise<string> {
        
    let resultToken;

    const authRequestBody = 
    'client_id=remittance-switch&'+
    'client_secret=remittance-switch-secret&'+
    'response_type=token&'+
    'grant_type=client_credentials';

    const authUrl = environment.authAPI;

    console.log("getting bearer auth...");
    return this.http.post<AuthJsonResponse>(authUrl, authRequestBody , {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: 'response' })
    .toPromise()
    .then(
        resp => resp.body['access_token'],

        err => {
            console.log("Cannot get auth token, reverting to previous page");
            this.hideLoader();
        }
    ).catch( err => {
        console.log("Cannot get auth token, reverting to previous page",err);
        this.hideLoader();
    });

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