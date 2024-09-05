import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuard} from 'src/app/zynerator/security/guards/auth.guard';

import { ActivationAdminComponent } from './activation-admin/activation-admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { ForgetPasswordAdminComponent } from './forget-password-admin/forget-password-admin.component';
import { ChangePasswordAdminComponent } from './change-password-admin/change-password-admin.component';

@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },{
                            path: 'forget-password',
                            children: [
                                {
                                    path: '',
                                    component: ForgetPasswordAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },{
                            path: 'change-password',
                            children: [
                                {
                                    path: '',
                                    component: ChangePasswordAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'activation',
                            children: [
                                {
                                    path: '',
                                    component: ActivationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'vente',
                            loadChildren: () => import('./view/vente/vente-admin-routing.module').then(x => x.VenteAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'depot',
                            loadChildren: () => import('./view/depot/depot-admin-routing.module').then(x => x.DepotAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'produit',
                            loadChildren: () => import('./view/produit/produit-admin-routing.module').then(x => x.ProduitAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'transfert',
                            loadChildren: () => import('./view/transfert/transfert-admin-routing.module').then(x => x.TransfertAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'fournisseur',
                            loadChildren: () => import('./view/fournisseur/fournisseur-admin-routing.module').then(x => x.FournisseurAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'client',
                            loadChildren: () => import('./view/client/client-admin-routing.module').then(x => x.ClientAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'inventaire',
                            loadChildren: () => import('./view/inventaire/inventaire-admin-routing.module').then(x => x.InventaireAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'commun',
                            loadChildren: () => import('./view/commun/commun-admin-routing.module').then(x => x.CommunAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'achat',
                            loadChildren: () => import('./view/achat/achat-admin-routing.module').then(x => x.AchatAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'security',
                            loadChildren: () => import('../security/security-routing.module').then(x => x.SecurityRoutingModule),
                            canActivate: [AuthGuard],
                        }
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
