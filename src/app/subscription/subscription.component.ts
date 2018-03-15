import {Component, Input} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../user/user.model';
import {Subscription} from './subscription.model';
import {SubscriptionService} from './subscription.service';
import {AuthService} from '../auth/auth.service';
import {Auth} from '../auth/auth.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
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
            min-width:150px;
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

export class SubscriptionComponent {

  public credit = 0;
  public subscriptionPlan;
  public tab: string;
  @Input() subscription: Subscription;
  @Input() auths: Auth;

  public auth: Auth;

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  onEdit() {
    this.subscriptionService.editSubscription(this.subscription)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
  }
  onDelete() {
    const myConfirm = confirm('Wilt u "' + this.subscription.name + '" echt verwijderen?');
    if (myConfirm === false) { return; }
    this.subscriptionService.deleteSubscription(this.subscription)
      .subscribe(
        result => console.log(result),
        error => console.error(error)
      );
  }
  ngOnInit() {
    this.authService.getAuths()
      .subscribe(

        (data: any) => {
            this.auths = data.obj;
        },
        error => console.error(error)
      );
  }

  addSubscription(auth: Auth, sub: Subscription) {
    this.authService.addAuthSubscription(auth, this.subscription)
      .subscribe(
        data  => console.log  (data),
        error => console.error(error.json())
      );
  }
  removeSubscription(auth: Auth, sub: Subscription) {
    this.authService.removeAuthSubscription(auth, this.subscription)
      .subscribe(
        result => console.log(result)
      );
  }

  // onAddOrRemoveSubscription(auth: Auth, sub: Subscription) {
  //   const promise;
  //   const isAdded = this.auth.addSubscription(sub);
  //   if (isAdded === false) {
  //     const isRemoved = this.auth.removeSubscription(sub);
  //     promise = this.authService.removeAuthSubscription(auth, this.subscription)
  //       .subscribe(
  //         result => console.log(result),
  //         error => console.error(error)
  //       );
  //   } else {
  //     promise = this.authService.addAuthSubscription(auth, this.subscription)
  //       .subscribe(
  //         data  => console.log  (data),
  //         error => console.error(error)
  //       );
  //   }
  //   promise
  //     .then(() => console.log('yay'))
  //     .catch(() => console.error('boee'));
  //   console.log(this.auth.SubscriptionPlan);
  // }
  checkIfValid(auths: Auth, sub: Subscription) {
    let out = false;
    console.log(auths, sub);

    for (let subscription of auths.subscriptions) {
      if (subscription.subscriptionId === sub.subscriptionId) {
        out = true;
        return out;
      }
    }4
    return out;
  }
  // checkIfValidId(auths: Auth, sub: Subscription) {
  //   const out = false;
  //   for (const subscription of auths.SubscriptionPlan) {
  //     if (subscription.subscriptionId === this.subscription.subscriptionId) {
  //       out = true;
  //       return out;
  //     } else if (auth.subscriptions !== this.subscription.subscriptionId) {
  //       out = false;
  //       return out;
  //     }
  //   }
  //   return out;
  // }
}