import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {CategorieClientAdminService} from 'src/app/shared/service/admin/client/CategorieClientAdmin.service';
import {CategorieClientDto} from 'src/app/shared/model/client/CategorieClient.model';
import {CategorieClientCriteria} from 'src/app/shared/criteria/client/CategorieClientCriteria.model';
import {SuperCategorieClientDto} from 'src/app/shared/model/client/SuperCategorieClient.model';
import {SuperCategorieClientAdminService} from 'src/app/shared/service/admin/client/SuperCategorieClientAdmin.service';
@Component({
  selector: 'app-categorie-client-create-admin',
  templateUrl: './categorie-client-create-admin.component.html'
})
export class CategorieClientCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validCategorieClientLibelle = true;
   private _validCategorieClientCode = true;
    private _validSuperCategorieClientLibelle = true;
    private _validSuperCategorieClientCode = true;
    private _validSuperCategorieClientStyle = true;

	constructor(private service: CategorieClientAdminService , private superCategorieClientService: SuperCategorieClientAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.superCategorieClientService.findAll().subscribe((data) => this.superCategorieClients = data);
    }



    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new CategorieClientDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }

        }, error => {
            console.log(error);
        });
    }


    public hideCreateDialog() {
        this.createDialog = false;
        this.setValidation(true);
    }





    public  setValidation(value: boolean){
        this.validCategorieClientLibelle = value;
        this.validCategorieClientCode = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateCategorieClientLibelle();
        this.validateCategorieClientCode();
    }

    public validateCategorieClientLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validCategorieClientLibelle = false;
        } else {
            this.validCategorieClientLibelle = true;
        }
    }
    public validateCategorieClientCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validCategorieClientCode = false;
        } else {
            this.validCategorieClientCode = true;
        }
    }


    public async openCreateSuperCategorieClient(superCategorieClient: string) {
    const isPermistted = await this.roleService.isPermitted('SuperCategorieClient', 'add');
    if(isPermistted) {
         this.superCategorieClient = new SuperCategorieClientDto();
         this.createSuperCategorieClientDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get superCategorieClient(): SuperCategorieClientDto {
        return this.superCategorieClientService.item;
    }
    set superCategorieClient(value: SuperCategorieClientDto) {
        this.superCategorieClientService.item = value;
    }
    get superCategorieClients(): Array<SuperCategorieClientDto> {
        return this.superCategorieClientService.items;
    }
    set superCategorieClients(value: Array<SuperCategorieClientDto>) {
        this.superCategorieClientService.items = value;
    }
    get createSuperCategorieClientDialog(): boolean {
        return this.superCategorieClientService.createDialog;
    }
    set createSuperCategorieClientDialog(value: boolean) {
        this.superCategorieClientService.createDialog= value;
    }



    get validCategorieClientLibelle(): boolean {
        return this._validCategorieClientLibelle;
    }

    set validCategorieClientLibelle(value: boolean) {
         this._validCategorieClientLibelle = value;
    }
    get validCategorieClientCode(): boolean {
        return this._validCategorieClientCode;
    }

    set validCategorieClientCode(value: boolean) {
         this._validCategorieClientCode = value;
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


    get items(): Array<CategorieClientDto> {
        return this.service.items;
    }

    set items(value: Array<CategorieClientDto>) {
        this.service.items = value;
    }

    get item(): CategorieClientDto {
        return this.service.item;
    }

    set item(value: CategorieClientDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): CategorieClientCriteria {
        return this.service.criteria;
    }

    set criteria(value: CategorieClientCriteria) {
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
