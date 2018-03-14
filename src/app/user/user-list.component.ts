import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {UserService} from './user.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-user-list',
    template: `
        <div class="" *ngIf="authService.isLoggedIn()">
            <h4>Zoek hier een gebruiker</h4>
            <hr style="display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #fff200;
                margin: 1em 0;
                padding: 0;
                background-color:#fff200;">
            <div class="form-group">
                <label for="firstName">Zoek op voornaam:</label>
                <input type="text" class="form-control" [(ngModel)]="term.firstName" placeholder="voornaam">
                <br>
                <label for="firstName">Zoek op achternaam:</label>
                <input type="text" class="form-control" [(ngModel)]="term.lastName" placeholder="achternaam">
            </div>
            <hr style="display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #fff200;
                margin: 1em 0;
                padding: 0;
                background-color:#fff200;">
            <app-user
                    [user]="user"
                    *ngFor="let user of users| filterBy:term;">
            </app-user>
        </div>
    `
})
export class UserListComponent implements OnInit {
    users: User;
    public term: any = {firstName : '', lastName: '', userId: ''};
    constructor(private userService: UserService,
                public authService: AuthService) {}

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.userService.getUsers()
                .subscribe(
                    (users: User) => {
                        this.users = users;
                    }
                );
        }
    }
}
