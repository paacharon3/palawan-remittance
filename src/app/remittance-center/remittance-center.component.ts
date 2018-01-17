import { CashInCenter } from './../cash-in-center/cash-in-center';
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { FormDataService } from '../data/formData.service';
import { Transaction }   from '../data/formData.model';
CashInCenter
@Component ({
    selector: 'remittance-center'
    ,templateUrl: './remittance-center.component.html'
    ,styleUrls: ['./remittance-center.css']
})

export class RemittanceCenter {
   @Input() cashInCenter: CashInCenter;
   @Input() selected: any;    
   @Input() imgOnly: boolean=false;
   @Input() comingSoon: boolean= false;
}