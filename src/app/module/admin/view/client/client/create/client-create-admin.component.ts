import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {ClientAdminService} from 'src/app/shared/service/admin/client/ClientAdmin.service';
import {ClientDto} from 'src/app/shared/model/client/Client.model';
import {ClientCriteria} from 'src/app/shared/criteria/client/ClientCriteria.model';
import {CategorieClientDto} from 'src/app/shared/model/client/CategorieClient.model';
import {CategorieClientAdminService} from 'src/app/shared/service/admin/client/CategorieClientAdmin.service';
@Component({
  selector: 'app-client-create-admin',
  templateUrl: './client-create-admin.component.html'
})
export class ClientCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validClientCategorieClient = true;
   private _validClientReference = true;
   private _validClientNom = true;
   private _validClientTelephone = true;
    private _validCategorieClientLibelle = true;
    private _validCategorieClientCode = true;

	constructor(private service: ClientAdminService , private categorieClientService: CategorieClientAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.categorieClientService.findAll().subscribe((data) => this.categorieClients = data);
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
                this.item = new ClientDto();
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
        this.validClientCategorieClient = value;
        this.validClientReference = value;
        this.validClientNom = value;
        this.validClientTelephone = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateClientCategorieClient();
        this.validateClientReference();
        this.validateClientNom();
        this.validateClientTelephone();
    }

    public validateClientCategorieClient(){
        if (this.stringUtilService.isEmpty(this.item.categorieClient)) {
        this.errorMessages.push('Categorie client non valide');
        this.validClientCategorieClient = false;
        } else {
            this.validClientCategorieClient = true;
        }
    }
    public validateClientReference(){
        if (this.stringUtilService.isEmpty(this.item.reference)) {
        this.errorMessages.push('Reference non valide');
        this.validClientReference = false;
        } else {
            this.validClientReference = true;
        }
    }
    public validateClientNom(){
        if (this.stringUtilService.isEmpty(this.item.nom)) {
        this.errorMessages.push('Nom non valide');
        this.validClientNom = false;
        } else {
            this.validClientNom = true;
        }
    }
    public validateClientTelephone(){
        if (this.stringUtilService.isEmpty(this.item.telephone)) {
        this.errorMessages.push('Telephone non valide');
        this.validClientTelephone = false;
        } else {
            this.validClientTelephone = true;
        }
    }


    public async openCreateCategorieClient(categorieClient: string) {
    const isPermistted = await this.roleService.isPermitted('CategorieClient', 'add');
    if(isPermistted) {
         this.categorieClient = new CategorieClientDto();
         this.createCategorieClientDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get categorieClient(): CategorieClientDto {
        return this.categorieClientService.item;
    }
    set categorieClient(value: CategorieClientDto) {
        this.categorieClientService.item = value;
    }
    get categorieClients(): Array<CategorieClientDto> {
        return this.categorieClientService.items;
    }
    set categorieClients(value: Array<CategorieClientDto>) {
        this.categorieClientService.items = value;
    }
    get createCategorieClientDialog(): boolean {
        return this.categorieClientService.createDialog;
    }
    set createCategorieClientDialog(value: boolean) {
        this.categorieClientService.createDialog= value;
    }



    get validClientCategorieClient(): boolean {
        return this._validClientCategorieClient;
    }

    set validClientCategorieClient(value: boolean) {
         this._validClientCategorieClient = value;
    }
    get validClientReference(): boolean {
        return this._validClientReference;
    }

    set validClientReference(value: boolean) {
         this._validClientReference = value;
    }
    get validClientNom(): boolean {
        return this._validClientNom;
    }

    set validClientNom(value: boolean) {
         this._validClientNom = value;
    }
    get validClientTelephone(): boolean {
        return this._validClientTelephone;
    }

    set validClientTelephone(value: boolean) {
         this._validClientTelephone = value;
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


    get items(): Array<ClientDto> {
        return this.service.items;
    }

    set items(value: Array<ClientDto>) {
        this.service.items = value;
    }

    get item(): ClientDto {
        return this.service.item;
    }

    set item(value: ClientDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ClientCriteria {
        return this.service.criteria;
    }

    set criteria(value: ClientCriteria) {
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
