import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home-page'
    , templateUrl: './remittance-home.component.html'
    , styleUrls: ['./remittance-home.component.scss']
})

export class RemittanceHomeComponent implements OnInit {
    title = "Send Money";
    introText1 = "Pera Padala"
    introText2 = "pwede na sa"
    introText3 = `Mura.
Mabilis.
Walang kuskos-balungos`

    constructor(private router: Router) {
        
    }

    ngOnInit() {

    }
    
    goToSend() {
        this.router.navigate(['/sendMoney'])
    }
}