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

import { SuperCategorieClientCreateAdminComponent } from './super-categorie-client/create/super-categorie-client-create-admin.component';
import { SuperCategorieClientEditAdminComponent } from './super-categorie-client/edit/super-categorie-client-edit-admin.component';
import { SuperCategorieClientViewAdminComponent } from './super-categorie-client/view/super-categorie-client-view-admin.component';
import { SuperCategorieClientListAdminComponent } from './super-categorie-client/list/super-categorie-client-list-admin.component';
import { ClientCreateAdminComponent } from './client/create/client-create-admin.component';
import { ClientEditAdminComponent } from './client/edit/client-edit-admin.component';
import { ClientViewAdminComponent } from './client/view/client-view-admin.component';
import { ClientListAdminComponent } from './client/list/client-list-admin.component';
import { CategorieClientCreateAdminComponent } from './categorie-client/create/categorie-client-create-admin.component';
import { CategorieClientEditAdminComponent } from './categorie-client/edit/categorie-client-edit-admin.component';
import { CategorieClientViewAdminComponent } from './categorie-client/view/categorie-client-view-admin.component';
import { CategorieClientListAdminComponent } from './categorie-client/list/categorie-client-list-admin.component';

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

    SuperCategorieClientCreateAdminComponent,
    SuperCategorieClientListAdminComponent,
    SuperCategorieClientViewAdminComponent,
    SuperCategorieClientEditAdminComponent,
    ClientCreateAdminComponent,
    ClientListAdminComponent,
    ClientViewAdminComponent,
    ClientEditAdminComponent,
    CategorieClientCreateAdminComponent,
    CategorieClientListAdminComponent,
    CategorieClientViewAdminComponent,
    CategorieClientEditAdminComponent,
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
  SuperCategorieClientCreateAdminComponent,
  SuperCategorieClientListAdminComponent,
  SuperCategorieClientViewAdminComponent,
  SuperCategorieClientEditAdminComponent,
  ClientCreateAdminComponent,
  ClientListAdminComponent,
  ClientViewAdminComponent,
  ClientEditAdminComponent,
  CategorieClientCreateAdminComponent,
  CategorieClientListAdminComponent,
  CategorieClientViewAdminComponent,
  CategorieClientEditAdminComponent,
  ],
})
export class ClientAdminModule { }
