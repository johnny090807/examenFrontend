import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Auth} from './auth/auth.model';

@Component({
    selector: 'app-header',
    template: `

        <img src="https://programmeercursussen.nl/wp-content/uploads/2018/02/logo.png" style="margin-bottom: 20px" >
        <header class="row" >
            <nav class="col-md-8 col-md-offset-0"   >
                <ul class="nav nav-pills red">
                    <li routerLinkActive="active"><a [routerLink]="['/users']">Gebruikers</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/auth']">
                        <span *ngIf="authService.isLoggedIn()===false">Log in</span>
                        <span *ngIf="authService.isLoggedIn()===true">Log out</span></a></li>
                    <li routerLinkActive="active" *ngIf="checkAdmin()"><a [routerLink]="['/subscriptions']">Abonnementen</a></li>

                </ul>
            </nav>
        </header>
    `,
    styles: [`
        a{
            background: linear-gradient(to right, #671E9D , #03AEF1);
            color: white;
            margin-right: 20px;
        }
        .red a:hover{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }
        .red a:active{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }


    `]

})
export class HeaderComponent implements OnInit {

    public isLoggedIn = false;
    public auth: Auth;
    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.isLoggedIn = localStorage.getItem('token') ? true : false;
    }
    checkAdmin() {
        this.auth = this.authService.auth;
        if (!this.auth) { return false; }
        return this.auth.admin;
    }
}
