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

import { ReglementVenteCreateAdminComponent } from './reglement-vente/create/reglement-vente-create-admin.component';
import { ReglementVenteEditAdminComponent } from './reglement-vente/edit/reglement-vente-edit-admin.component';
import { ReglementVenteViewAdminComponent } from './reglement-vente/view/reglement-vente-view-admin.component';
import { ReglementVenteListAdminComponent } from './reglement-vente/list/reglement-vente-list-admin.component';
import { EtatVenteCreateAdminComponent } from './etat-vente/create/etat-vente-create-admin.component';
import { EtatVenteEditAdminComponent } from './etat-vente/edit/etat-vente-edit-admin.component';
import { EtatVenteViewAdminComponent } from './etat-vente/view/etat-vente-view-admin.component';
import { EtatVenteListAdminComponent } from './etat-vente/list/etat-vente-list-admin.component';
import { VenteCreateAdminComponent } from './vente/create/vente-create-admin.component';
import { VenteEditAdminComponent } from './vente/edit/vente-edit-admin.component';
import { VenteViewAdminComponent } from './vente/view/vente-view-admin.component';
import { VenteListAdminComponent } from './vente/list/vente-list-admin.component';
import { ReglementVenteStatusCreateAdminComponent } from './reglement-vente-status/create/reglement-vente-status-create-admin.component';
import { ReglementVenteStatusEditAdminComponent } from './reglement-vente-status/edit/reglement-vente-status-edit-admin.component';
import { ReglementVenteStatusViewAdminComponent } from './reglement-vente-status/view/reglement-vente-status-view-admin.component';
import { ReglementVenteStatusListAdminComponent } from './reglement-vente-status/list/reglement-vente-status-list-admin.component';

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



@NgModule({
  declarations: [

    ReglementVenteCreateAdminComponent,
    ReglementVenteListAdminComponent,
    ReglementVenteViewAdminComponent,
    ReglementVenteEditAdminComponent,
    EtatVenteCreateAdminComponent,
    EtatVenteListAdminComponent,
    EtatVenteViewAdminComponent,
    EtatVenteEditAdminComponent,
    VenteCreateAdminComponent,
    VenteListAdminComponent,
    VenteViewAdminComponent,
    VenteEditAdminComponent,
    ReglementVenteStatusCreateAdminComponent,
    ReglementVenteStatusListAdminComponent,
    ReglementVenteStatusViewAdminComponent,
    ReglementVenteStatusEditAdminComponent,
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


  ],
  exports: [
  ReglementVenteCreateAdminComponent,
  ReglementVenteListAdminComponent,
  ReglementVenteViewAdminComponent,
  ReglementVenteEditAdminComponent,
  EtatVenteCreateAdminComponent,
  EtatVenteListAdminComponent,
  EtatVenteViewAdminComponent,
  EtatVenteEditAdminComponent,
  VenteCreateAdminComponent,
  VenteListAdminComponent,
  VenteViewAdminComponent,
  VenteEditAdminComponent,
  ReglementVenteStatusCreateAdminComponent,
  ReglementVenteStatusListAdminComponent,
  ReglementVenteStatusViewAdminComponent,
  ReglementVenteStatusEditAdminComponent,
  ],
})
export class VenteAdminModule { }
