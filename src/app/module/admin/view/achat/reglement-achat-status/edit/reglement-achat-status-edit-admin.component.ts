import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {ReglementAchatStatusAdminService} from 'src/app/shared/service/admin/achat/ReglementAchatStatusAdmin.service';
import {ReglementAchatStatusDto} from 'src/app/shared/model/achat/ReglementAchatStatus.model';
import {ReglementAchatStatusCriteria} from 'src/app/shared/criteria/achat/ReglementAchatStatusCriteria.model';



@Component({
  selector: 'app-reglement-achat-status-edit-admin',
  templateUrl: './reglement-achat-status-edit-admin.component.html'
})
export class ReglementAchatStatusEditAdminComponent implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    private _file: any;
    private _files: any;



    private _validReglementAchatStatusCode = true;
    private _validReglementAchatStatusLibelle = true;
    private _validReglementAchatStatusStyle = true;




    constructor(private service: ReglementAchatStatusAdminService , @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
    }

    public prepareEdit() {
    }



 public edit(): void {
        this.submitted = true;
        this.prepareEdit();
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.service.edit().subscribe(religion=>{
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = religion;
            this.editDialog = false;
            this.submitted = false;
            this.item = new ReglementAchatStatusDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validReglementAchatStatusCode = value;
        this.validReglementAchatStatusLibelle = value;
        this.validReglementAchatStatusStyle = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateReglementAchatStatusCode();
        this.validateReglementAchatStatusLibelle();
        this.validateReglementAchatStatusStyle();
    }

    public validateReglementAchatStatusCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validReglementAchatStatusCode = false;
        } else {
            this.validReglementAchatStatusCode = true;
        }
    }

    public validateReglementAchatStatusLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validReglementAchatStatusLibelle = false;
        } else {
            this.validReglementAchatStatusLibelle = true;
        }
    }

    public validateReglementAchatStatusStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
            this.errorMessages.push('Style non valide');
            this.validReglementAchatStatusStyle = false;
        } else {
            this.validReglementAchatStatusStyle = true;
        }
    }







    get validReglementAchatStatusCode(): boolean {
        return this._validReglementAchatStatusCode;
    }
    set validReglementAchatStatusCode(value: boolean) {
        this._validReglementAchatStatusCode = value;
    }
    get validReglementAchatStatusLibelle(): boolean {
        return this._validReglementAchatStatusLibelle;
    }
    set validReglementAchatStatusLibelle(value: boolean) {
        this._validReglementAchatStatusLibelle = value;
    }
    get validReglementAchatStatusStyle(): boolean {
        return this._validReglementAchatStatusStyle;
    }
    set validReglementAchatStatusStyle(value: boolean) {
        this._validReglementAchatStatusStyle = value;
    }


	get items(): Array<ReglementAchatStatusDto> {
        return this.service.items;
    }

    set items(value: Array<ReglementAchatStatusDto>) {
        this.service.items = value;
    }

    get item(): ReglementAchatStatusDto {
        return this.service.item;
    }

    set item(value: ReglementAchatStatusDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): ReglementAchatStatusCriteria {
        return this.service.criteria;
    }

    set criteria(value: ReglementAchatStatusCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        if (this._errorMessages == null) {
            this._errorMessages = new Array<string>();
        }
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validate(): boolean {
        return this.service.validate;
    }

    set validate(value: boolean) {
        this.service.validate = value;
    }


    get activeTab(): number {
        return this._activeTab;
    }

    set activeTab(value: number) {
        this._activeTab = value;
    }


}
