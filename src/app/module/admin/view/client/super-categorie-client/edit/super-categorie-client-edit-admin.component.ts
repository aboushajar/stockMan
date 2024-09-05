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




import {SuperCategorieClientAdminService} from 'src/app/shared/service/admin/client/SuperCategorieClientAdmin.service';
import {SuperCategorieClientDto} from 'src/app/shared/model/client/SuperCategorieClient.model';
import {SuperCategorieClientCriteria} from 'src/app/shared/criteria/client/SuperCategorieClientCriteria.model';



@Component({
  selector: 'app-super-categorie-client-edit-admin',
  templateUrl: './super-categorie-client-edit-admin.component.html'
})
export class SuperCategorieClientEditAdminComponent implements OnInit {

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



    private _validSuperCategorieClientLibelle = true;
    private _validSuperCategorieClientCode = true;
    private _validSuperCategorieClientStyle = true;




    constructor(private service: SuperCategorieClientAdminService , @Inject(PLATFORM_ID) private platformId?) {
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
            this.item = new SuperCategorieClientDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validSuperCategorieClientLibelle = value;
        this.validSuperCategorieClientCode = value;
        this.validSuperCategorieClientStyle = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateSuperCategorieClientLibelle();
        this.validateSuperCategorieClientCode();
        this.validateSuperCategorieClientStyle();
    }

    public validateSuperCategorieClientLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSuperCategorieClientLibelle = false;
        } else {
            this.validSuperCategorieClientLibelle = true;
        }
    }

    public validateSuperCategorieClientCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validSuperCategorieClientCode = false;
        } else {
            this.validSuperCategorieClientCode = true;
        }
    }

    public validateSuperCategorieClientStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
            this.errorMessages.push('Style non valide');
            this.validSuperCategorieClientStyle = false;
        } else {
            this.validSuperCategorieClientStyle = true;
        }
    }







    get validSuperCategorieClientLibelle(): boolean {
        return this._validSuperCategorieClientLibelle;
    }
    set validSuperCategorieClientLibelle(value: boolean) {
        this._validSuperCategorieClientLibelle = value;
    }
    get validSuperCategorieClientCode(): boolean {
        return this._validSuperCategorieClientCode;
    }
    set validSuperCategorieClientCode(value: boolean) {
        this._validSuperCategorieClientCode = value;
    }
    get validSuperCategorieClientStyle(): boolean {
        return this._validSuperCategorieClientStyle;
    }
    set validSuperCategorieClientStyle(value: boolean) {
        this._validSuperCategorieClientStyle = value;
    }


	get items(): Array<SuperCategorieClientDto> {
        return this.service.items;
    }

    set items(value: Array<SuperCategorieClientDto>) {
        this.service.items = value;
    }

    get item(): SuperCategorieClientDto {
        return this.service.item;
    }

    set item(value: SuperCategorieClientDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): SuperCategorieClientCriteria {
        return this.service.criteria;
    }

    set criteria(value: SuperCategorieClientCriteria) {
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
