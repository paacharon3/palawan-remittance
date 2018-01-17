import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoaderState } from './loader';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  
  loaderState = this.loaderSubject.asObservable();
  
  constructor() { }
  
  show() {
    console.log("LoaderService: show loader!");
    this.loaderSubject.next(<LoaderState>{show: true});
  }
  
  hide() {
    console.log("LoaderService: hide loader!");
    this.loaderSubject.next(<LoaderState>{show: false});
  }
}

