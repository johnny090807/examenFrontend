import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import {UsersComponent} from "./user/users.component";
import {SubscriptionsComponent} from "./subscription/subscriptions.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'subscriptions', component: SubscriptionsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'users/:userId', component: UsersComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);