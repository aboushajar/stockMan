import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {MultiSelectModule} from 'primeng/multiselect';

import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

import {LoginAdminComponent} from './login-admin/login-admin.component';
import {RegisterAdminComponent} from './register-admin/register-admin.component';
import {ChangePasswordAdminComponent} from './change-password-admin/change-password-admin.component';
import {ActivationAdminComponent} from './activation-admin/activation-admin.component';
import {ForgetPasswordAdminComponent} from './forget-password-admin/forget-password-admin.component';


import {VenteAdminModule} from './view/vente/vente-admin.module';
import {VenteAdminRoutingModule} from './view/vente/vente-admin-routing.module';
import {DepotAdminModule} from './view/depot/depot-admin.module';
import {DepotAdminRoutingModule} from './view/depot/depot-admin-routing.module';
import {ProduitAdminModule} from './view/produit/produit-admin.module';
import {ProduitAdminRoutingModule} from './view/produit/produit-admin-routing.module';
import {TransfertAdminModule} from './view/transfert/transfert-admin.module';
import {TransfertAdminRoutingModule} from './view/transfert/transfert-admin-routing.module';
import {FournisseurAdminModule} from './view/fournisseur/fournisseur-admin.module';
import {FournisseurAdminRoutingModule} from './view/fournisseur/fournisseur-admin-routing.module';
import {ClientAdminModule} from './view/client/client-admin.module';
import {ClientAdminRoutingModule} from './view/client/client-admin-routing.module';
import {InventaireAdminModule} from './view/inventaire/inventaire-admin.module';
import {InventaireAdminRoutingModule} from './view/inventaire/inventaire-admin-routing.module';
import {CommunAdminModule} from './view/commun/commun-admin.module';
import {CommunAdminRoutingModule} from './view/commun/commun-admin-routing.module';
import {AchatAdminModule} from './view/achat/achat-admin.module';
import {AchatAdminRoutingModule} from './view/achat/achat-admin-routing.module';

import {SecurityModule} from 'src/app/module/security/security.module';
import {SecurityRoutingModule} from 'src/app/module/security/security-routing.module';


@NgModule({
    declarations: [
        LoginAdminComponent,
        RegisterAdminComponent,
        ChangePasswordAdminComponent,
        ActivationAdminComponent,
        ForgetPasswordAdminComponent
    ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
        VenteAdminModule,
        VenteAdminRoutingModule,
        DepotAdminModule,
        DepotAdminRoutingModule,
        ProduitAdminModule,
        ProduitAdminRoutingModule,
        TransfertAdminModule,
        TransfertAdminRoutingModule,
        FournisseurAdminModule,
        FournisseurAdminRoutingModule,
        ClientAdminModule,
        ClientAdminRoutingModule,
        InventaireAdminModule,
        InventaireAdminRoutingModule,
        CommunAdminModule,
        CommunAdminRoutingModule,
        AchatAdminModule,
        AchatAdminRoutingModule,
        SecurityModule,
        SecurityRoutingModule
    ],
    exports: [
        LoginAdminComponent,
        RegisterAdminComponent,
        ChangePasswordAdminComponent,
        ActivationAdminComponent,
        ForgetPasswordAdminComponent,

        VenteAdminModule,
        DepotAdminModule,
        ProduitAdminModule,
        TransfertAdminModule,
        FournisseurAdminModule,
        ClientAdminModule,
        InventaireAdminModule,
        CommunAdminModule,
        AchatAdminModule,
        SecurityModule
    ],

})
export class AdminModule {
}
