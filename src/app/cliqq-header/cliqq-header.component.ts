import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Location }         from "@angular/common";

@Component({
    selector: 'cliqq-header'
    ,templateUrl:'cliqq-header.component.html'
})
export class CliqqHeaderComponent {
    @Input() loc: string;

    constructor(private location: Location,
                private router: Router) { }

    goBack(): void {
        this.location.back();
    }

    redirect() {
        console.log("this.loc ", this.loc);
        this.router.navigate([this.loc]);
    }
}