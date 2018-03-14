import {Component} from "@angular/core";

@Component({
    selector: 'app-users',
    template: `
        <div class="col-md-6 col-lg-4 col-md-offset-0 col-lg-offset-0">
            <app-user-input></app-user-input>
        </div>
        <div class="col-md-6 col-md-offset-0 col-lg-offset-2 right">
            <app-user-list></app-user-list>
        </div>
    `,
    styles: [`        
        @media screen and (min-width: 992px){
         
        }
       @media screen and (max-width: 991px){
           .right{
               margin-top: 50px;
           }
       }
    
    `]
})

export class UsersComponent{}