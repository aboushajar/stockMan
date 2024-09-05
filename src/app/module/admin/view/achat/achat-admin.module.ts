import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from "primeng/editor";

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";

import { ReglementAchatCreateAdminComponent } from './reglement-achat/create/reglement-achat-create-admin.component';
import { ReglementAchatEditAdminComponent } from './reglement-achat/edit/reglement-achat-edit-admin.component';
import { ReglementAchatViewAdminComponent } from './reglement-achat/view/reglement-achat-view-admin.component';
import { ReglementAchatListAdminComponent } from './reglement-achat/list/reglement-achat-list-admin.component';
import { EtatAchatCreateAdminComponent } from './etat-achat/create/etat-achat-create-admin.component';
import { EtatAchatEditAdminComponent } from './etat-achat/edit/etat-achat-edit-admin.component';
import { EtatAchatViewAdminComponent } from './etat-achat/view/etat-achat-view-admin.component';
import { EtatAchatListAdminComponent } from './etat-achat/list/etat-achat-list-admin.component';
import { ReglementAchatStatusCreateAdminComponent } from './reglement-achat-status/create/reglement-achat-status-create-admin.component';
import { ReglementAchatStatusEditAdminComponent } from './reglement-achat-status/edit/reglement-achat-status-edit-admin.component';
import { ReglementAchatStatusViewAdminComponent } from './reglement-achat-status/view/reglement-achat-status-view-admin.component';
import { ReglementAchatStatusListAdminComponent } from './reglement-achat-status/list/reglement-achat-status-list-admin.component';
import { AchatCreateAdminComponent } from './achat/create/achat-create-admin.component';
import { AchatEditAdminComponent } from './achat/edit/achat-edit-admin.component';
import { AchatViewAdminComponent } from './achat/view/achat-view-admin.component';
import { AchatListAdminComponent } from './achat/list/achat-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PaginatorModule} from 'primeng/paginator';
import {VenteAdminModule} from "../vente/vente-admin.module";



@NgModule({
  declarations: [

    ReglementAchatCreateAdminComponent,
    ReglementAchatListAdminComponent,
    ReglementAchatViewAdminComponent,
    ReglementAchatEditAdminComponent,
    EtatAchatCreateAdminComponent,
    EtatAchatListAdminComponent,
    EtatAchatViewAdminComponent,
    EtatAchatEditAdminComponent,
    ReglementAchatStatusCreateAdminComponent,
    ReglementAchatStatusListAdminComponent,
    ReglementAchatStatusViewAdminComponent,
    ReglementAchatStatusEditAdminComponent,
    AchatCreateAdminComponent,
    AchatListAdminComponent,
    AchatViewAdminComponent,
    AchatEditAdminComponent,
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
        PaginatorModule,
        TranslateModule,
        FileUploadModule,
        FullCalendarModule,
        CardModule,
        EditorModule,
        TagModule,
        VenteAdminModule,


    ],
  exports: [
  ReglementAchatCreateAdminComponent,
  ReglementAchatListAdminComponent,
  ReglementAchatViewAdminComponent,
  ReglementAchatEditAdminComponent,
  EtatAchatCreateAdminComponent,
  EtatAchatListAdminComponent,
  EtatAchatViewAdminComponent,
  EtatAchatEditAdminComponent,
  ReglementAchatStatusCreateAdminComponent,
  ReglementAchatStatusListAdminComponent,
  ReglementAchatStatusViewAdminComponent,
  ReglementAchatStatusEditAdminComponent,
  AchatCreateAdminComponent,
  AchatListAdminComponent,
  AchatViewAdminComponent,
  AchatEditAdminComponent,
  ],
})
export class AchatAdminModule { }
