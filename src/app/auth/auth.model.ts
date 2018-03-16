import {Subscription} from '../subscription/subscription.model';

export class Auth {
    constructor(public userName: string,
                public password: string,
                public authId?: string,
                public admin: boolean = false,
                public subscriptions?: Subscription[]) {}


    // public addSubscription(subscription: Subscription): boolean{
    //     // Check if Student already exists
    //     if (this.getSubscriptionById(subscription.subscriptionId)) return false;
    //     // Add student to lecture
    //     this.subscriptions.push(subscription);
    //     // Return true
    //     return true;
    // }
    // public getSubscriptionById(_id: string): Subscription{
    //     // Check students for student with this id
    //     return this.subscriptions.find((subscriptions) => subscriptions.subscriptionId === _id);
    // }
    // public removeSubscription(sub: Subscription): boolean{
    //     // For every student of this lecture
    //     for (let i = 0; i < this.subscriptions.length; i++){
    //         // Get student
    //         const iSubscription = this.subscriptions[i];
    //         // If student matches the target student
    //         if (iSubscription === sub){
    //             // Remove student
    //             this.subscriptions.splice(i,1);
    //             // Remove true
    //             return true;
    //         }
    //     }
    //     // Return false if no match has been found
    //     return false;
    // }
}

