import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {Auth} from './auth/auth.model';
import {Subscription} from './subscription/subscription.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [UserService]
})
export class AppComponent implements OnInit {
    public allAuths:Auth[];
    public auth: Auth;

    constructor(private authService: AuthService) {}
    // check on if someone is logged in
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    ngOnInit() {
        this.auth = this.authService.auth;
        //Set the apiAdress for the requests to the server :)
        // localStorage.setItem('apiAddress', 'http://192.168.0.105:3000/api/');
        localStorage.setItem('apiAddress', 'http://localhost:3000/api/');
        // localStorage.setItem('apiAddress', 'http://mps.blancoblauw.nl:3000/api/');
            //set the user to check on admin

        if (this.authService.isLoggedIn()) {
            this.authService.getAuthById()
            .subscribe(
              (data: any) => {
                  console.log(data);
                    const auth = new Auth(data.obj.userName, data.obj.password, data.obj._id, data.obj.admin);
                    this.authService.auth = auth;
                    console.log(auth);
                },
                error => console.error(error)
            );
            this.authService.getAuths()
                .subscribe(
                    (data: any) => {
                        const transformedAuths: Auth[] = [];
                        for (const auth of data.obj) {
                            const newAuth = new Auth(
                                auth.userName,
                                auth.password,
                                auth._id,
                                auth.admin
                            )
                            transformedAuths.unshift(newAuth);
                        }
                        this.authService.allAuths = transformedAuths;
                        this.allAuths = transformedAuths;
                    }
                );
        }
    }
}