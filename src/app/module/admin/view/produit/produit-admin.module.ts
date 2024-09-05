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

import { UniteMesureCreateAdminComponent } from './unite-mesure/create/unite-mesure-create-admin.component';
import { UniteMesureEditAdminComponent } from './unite-mesure/edit/unite-mesure-edit-admin.component';
import { UniteMesureViewAdminComponent } from './unite-mesure/view/unite-mesure-view-admin.component';
import { UniteMesureListAdminComponent } from './unite-mesure/list/unite-mesure-list-admin.component';
import { MarqueCreateAdminComponent } from './marque/create/marque-create-admin.component';
import { MarqueEditAdminComponent } from './marque/edit/marque-edit-admin.component';
import { MarqueViewAdminComponent } from './marque/view/marque-view-admin.component';
import { MarqueListAdminComponent } from './marque/list/marque-list-admin.component';
import { CategorieProduitCreateAdminComponent } from './categorie-produit/create/categorie-produit-create-admin.component';
import { CategorieProduitEditAdminComponent } from './categorie-produit/edit/categorie-produit-edit-admin.component';
import { CategorieProduitViewAdminComponent } from './categorie-produit/view/categorie-produit-view-admin.component';
import { CategorieProduitListAdminComponent } from './categorie-produit/list/categorie-produit-list-admin.component';
import { StatutSousMarqueCreateAdminComponent } from './statut-sous-marque/create/statut-sous-marque-create-admin.component';
import { StatutSousMarqueEditAdminComponent } from './statut-sous-marque/edit/statut-sous-marque-edit-admin.component';
import { StatutSousMarqueViewAdminComponent } from './statut-sous-marque/view/statut-sous-marque-view-admin.component';
import { StatutSousMarqueListAdminComponent } from './statut-sous-marque/list/statut-sous-marque-list-admin.component';
import { SousMarqueCreateAdminComponent } from './sous-marque/create/sous-marque-create-admin.component';
import { SousMarqueEditAdminComponent } from './sous-marque/edit/sous-marque-edit-admin.component';
import { SousMarqueViewAdminComponent } from './sous-marque/view/sous-marque-view-admin.component';
import { SousMarqueListAdminComponent } from './sous-marque/list/sous-marque-list-admin.component';

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

    UniteMesureCreateAdminComponent,
    UniteMesureListAdminComponent,
    UniteMesureViewAdminComponent,
    UniteMesureEditAdminComponent,
    MarqueCreateAdminComponent,
    MarqueListAdminComponent,
    MarqueViewAdminComponent,
    MarqueEditAdminComponent,
    CategorieProduitCreateAdminComponent,
    CategorieProduitListAdminComponent,
    CategorieProduitViewAdminComponent,
    CategorieProduitEditAdminComponent,
    StatutSousMarqueCreateAdminComponent,
    StatutSousMarqueListAdminComponent,
    StatutSousMarqueViewAdminComponent,
    StatutSousMarqueEditAdminComponent,
    SousMarqueCreateAdminComponent,
    SousMarqueListAdminComponent,
    SousMarqueViewAdminComponent,
    SousMarqueEditAdminComponent,
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
  UniteMesureCreateAdminComponent,
  UniteMesureListAdminComponent,
  UniteMesureViewAdminComponent,
  UniteMesureEditAdminComponent,
  MarqueCreateAdminComponent,
  MarqueListAdminComponent,
  MarqueViewAdminComponent,
  MarqueEditAdminComponent,
  CategorieProduitCreateAdminComponent,
  CategorieProduitListAdminComponent,
  CategorieProduitViewAdminComponent,
  CategorieProduitEditAdminComponent,
  StatutSousMarqueCreateAdminComponent,
  StatutSousMarqueListAdminComponent,
  StatutSousMarqueViewAdminComponent,
  StatutSousMarqueEditAdminComponent,
  SousMarqueCreateAdminComponent,
  SousMarqueListAdminComponent,
  SousMarqueViewAdminComponent,
  SousMarqueEditAdminComponent,
  ],
})
export class ProduitAdminModule { }
