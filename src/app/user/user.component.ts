import {Component, Input, OnInit} from '@angular/core';

import {User} from './user.model';
import {UserService} from './user.service';
import {IdentifierService} from '../identifier/identifier.service';
import {Identifier} from '../identifier/identifier.model';
import {Subscription} from '../subscription/subscription.model';
import {SubscriptionService} from '../subscription/subscription.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles: [`
        *{
            color:black;
        }
        button{
            color: white;
            border: 0px;
            background: linear-gradient(to right, #671E9D , #03AEF1);
        }
        button:hover{
            color: white;
            border: 0px;
            background: linear-gradient(to right,#03AEF1  , #671E9D);
        }
        a.red{
            background: linear-gradient(to right, #671E9D , #03AEF1);
            color: white;
            margin-right: 20px;
        }
        .red .red:hover{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }
        .red .red:active{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
        .tabs{
            float:right;
            height:20px;
        }
        .buttons{
            float:right;
        }
        .dropdown{
            float:left;
        }
        .credit-tab{
            min-height:30px;
        }
        .credit-value{
            float:left;
            padding-top:5px;
        }
        .card-tab .new div{
            float:left;
        }
        .card-tab .new button{
            float:right;
        }
        .card-tab .new{
            width:100%;
        }
        .card-tab .current{
            width:100%;
        }
        .card-tab{
            width:100%;
        }
        .card-button{
            /*!*#FF9900*! Oranje*/
            /*#363636 Grijs*/
            border-radius: 25px;
            color: white;
            padding: 5px 10px;
            text-align: center;
            display: inline-block;
            margin: 4px 2px;
        }
        .properties-tab{
            clear: both;
            width:100%;
            min-height:150px;
        }
        .properties-tab label{
            min-width:85px;
        }
        .properties-tab button{
            clear: both;
            float:right;
        }
        .subscription-tab{
            clear: both;
            width:100%;
            min-height:50px;
        }
        footer{
            clear: both;
        }
    `]
})

export class UserComponent implements OnInit {
    public subscriptions: Subscription[];
    public subscription: Subscription;
    public identifierTemplate: any;
    public credit = 0;
    public tab: string;

    @Input() user: User;

    constructor(private identifierService: IdentifierService,
                private userService: UserService,
                private subscriptionService: SubscriptionService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.identifierTemplate = {
            nfcId: '',
            userId: this.user.userId
        };
        this.subscriptionService.getAllSubscriptionsByAuthId()
            .subscribe(
                (subscriptions: any) => {
                    this.subscriptions = subscriptions;
                }
            );

    }

    onDelete() {

        const myConfirm = confirm('Wilt u "' + this.user.firstName + ' ' + this.user.lastName + '" echt verwijderen?');
        if (myConfirm === false) { return; }
        this.userService.deleteUser(this.user)
            .subscribe(
                result => console.log(result)
            );
    }

    updateUserIdentifiers(user: User) {
        this.identifierService.getAllIdentifiersById(user.userId)
            .subscribe(
              (result: any) => {
                    this.user.identifiers = result;
                }
            );

    }
    updateUserSubscriptions(user: User) {
        // if (user.subscriptionPlan === null) {
        //     // this.subscription = 'Geen abonnement';
        // } else {
      if (user.subscriptionPlan !== undefined) {
        this.subscriptionService.getSubscriptionById(user)
        .subscribe(
          (result: any) => {
                this.subscription = result.obj;
            },
            error => console.error(error)
        );
      }
        // }
    }

    updateUser() {
        // this.user.credit = this.user.credit;
        this.userService.updateUser(this.user)
            .subscribe(
                result =>  console.log(result)
            );
    }

    addCredit() {
        this.user.credit += this.credit * 100;
        this.credit = 0;
        this.userService.updateUser(this.user)
            .subscribe(
                result =>  console.log(result)
            );
    }

    setSubscription(subscription: Subscription) {
        this.subscription = subscription;
    }
    addSubscription() {
      const subscription = new Subscription(
        this.subscription.name,
        this.subscription.description,
        this.subscription.discount,
        this.subscription.subscriptionId
      );
        this.subscriptionService.addUserSubscription(subscription, this.user.userId)
            .subscribe(
                result =>  {
                    this.user.subscriptionPlan = subscription.subscriptionId;
                    console.log(result);
                },
                error => console.error(error)
            );
    }

    createIdentifier() {
        const identifier = new Identifier(this.identifierTemplate.nfcId, this.identifierTemplate.userId);
        this.identifierService.addUserIdentifier(identifier)
            .subscribe(
                result => {
                    this.user.identifiers.push(result);
                    this.updateUserIdentifiers(this.user);
                },
                error => console.error(error)
            );
    }


    deleteIdentifier(identifier: Identifier) {

            this.updateUserIdentifiers(this.user);

        const myConfirm = confirm('Wilt u de kaart "' + identifier.nfcId + '" echt verwijderen?');
        if (myConfirm === false) { return; }
        this.identifierService.deleteIdentifier(identifier)
            .subscribe(
                result =>  {
                    console.log(result);
                    this.updateUserIdentifiers(this.user);
                }
            );
    }
}
