import {Component, Input, OnInit} from "@angular/core";

import {NgForm} from "@angular/forms";
import {User} from "./user.model";
import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../errors/error.service";

@Component({
    selector: 'app-user-input',
    templateUrl: './user-input.component.html',
    styles:[`
        button {
            float:right;
            background: linear-gradient(to right,#671E9D, #03AEF1  );
        }
        button:hover{
            color: white;
            border: 0px;
            background: linear-gradient(to right,#03AEF1  , #671E9D);
        }
    `]
})
export class UserInputComponent implements  OnInit{
    @Input() users: User;
    @Input() term;
    constructor(private userService:UserService,
                private authService: AuthService,
                private route: Router,
                private errorService: ErrorService){}

    onSubmit(form: NgForm){
        if(this.users){
            this.users.firstName = form.value.firstName;
            this.users.lastName = form.value.lastName;
            this.users.email = form.value.email;
            this.userService.updateUser(this.users)
                .subscribe(
                    result =>  console.log(result)
                );
            this.users = null;
        }else{
            const user = new User(form.value.firstName, form.value.lastName, form.value.email, form.value.credit);
            this.userService.addUser(user)
                .subscribe(
                    data =>  console.log(data),
                    error => console.log(error)
                );
            form.resetForm();
        }
    }
    onClear (form: NgForm){
        form.resetForm();
    }
    ngOnInit(){
        this.userService.userIsEdit.subscribe(
            (user: User) => this.users = user
        );
    }
    logIn(){
        this.route.navigateByUrl('auth/signin');
    }
}