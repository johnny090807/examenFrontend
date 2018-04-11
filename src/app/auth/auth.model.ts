import {Subscription} from '../subscription/subscription.model';

export class Auth {
    constructor(public userName: string,
                public password: string,
                public authId?: string,
                public admin: boolean = false,
                public subscriptions?: Subscription[]) {
}

