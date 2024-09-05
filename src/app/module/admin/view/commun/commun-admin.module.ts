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

import { TauxTvaCreateAdminComponent } from './taux-tva/create/taux-tva-create-admin.component';
import { TauxTvaEditAdminComponent } from './taux-tva/edit/taux-tva-edit-admin.component';
import { TauxTvaViewAdminComponent } from './taux-tva/view/taux-tva-view-admin.component';
import { TauxTvaListAdminComponent } from './taux-tva/list/taux-tva-list-admin.component';
import { ModeReglementCreateAdminComponent } from './mode-reglement/create/mode-reglement-create-admin.component';
import { ModeReglementEditAdminComponent } from './mode-reglement/edit/mode-reglement-edit-admin.component';
import { ModeReglementViewAdminComponent } from './mode-reglement/view/mode-reglement-view-admin.component';
import { ModeReglementListAdminComponent } from './mode-reglement/list/mode-reglement-list-admin.component';

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

    TauxTvaCreateAdminComponent,
    TauxTvaListAdminComponent,
    TauxTvaViewAdminComponent,
    TauxTvaEditAdminComponent,
    ModeReglementCreateAdminComponent,
    ModeReglementListAdminComponent,
    ModeReglementViewAdminComponent,
    ModeReglementEditAdminComponent,
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
  TauxTvaCreateAdminComponent,
  TauxTvaListAdminComponent,
  TauxTvaViewAdminComponent,
  TauxTvaEditAdminComponent,
  ModeReglementCreateAdminComponent,
  ModeReglementListAdminComponent,
  ModeReglementViewAdminComponent,
  ModeReglementEditAdminComponent,
  ],
})
export class CommunAdminModule { }
