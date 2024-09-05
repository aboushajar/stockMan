import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {TransfertItemAdminService} from 'src/app/shared/service/admin/transfert/TransfertItemAdmin.service';
import {TransfertItemDto} from 'src/app/shared/model/transfert/TransfertItem.model';
import {TransfertItemCriteria} from 'src/app/shared/criteria/transfert/TransfertItemCriteria.model';
import {TransfertDto} from 'src/app/shared/model/transfert/Transfert.model';
import {TransfertAdminService} from 'src/app/shared/service/admin/transfert/TransfertAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
@Component({
  selector: 'app-transfert-item-create-admin',
  templateUrl: './transfert-item-create-admin.component.html'
})
export class TransfertItemCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validTransfertItemSousMarque = true;
   private _validTransfertItemQuantite = true;
    private _validSousMarqueLibelle = true;
    private _validSousMarqueCode = true;
    private _validSousMarqueStatutSousMarque = true;
    private _validTransfertDateTransfert = true;
    private _validTransfertDepotOrigin = true;
    private _validTransfertDepotDestination = true;

	constructor(private service: TransfertItemAdminService , private transfertService: TransfertAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.sousMarqueService.findAll().subscribe((data) => this.sousMarques = data);
        this.transfertService.findAll().subscribe((data) => this.transferts = data);
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
                this.item = new TransfertItemDto();
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
        this.validTransfertItemSousMarque = value;
        this.validTransfertItemQuantite = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateTransfertItemSousMarque();
        this.validateTransfertItemQuantite();
    }

    public validateTransfertItemSousMarque(){
        if (this.stringUtilService.isEmpty(this.item.sousMarque)) {
        this.errorMessages.push('Sous marque non valide');
        this.validTransfertItemSousMarque = false;
        } else {
            this.validTransfertItemSousMarque = true;
        }
    }
    public validateTransfertItemQuantite(){
        if (this.stringUtilService.isEmpty(this.item.quantite)) {
        this.errorMessages.push('Quantite non valide');
        this.validTransfertItemQuantite = false;
        } else {
            this.validTransfertItemQuantite = true;
        }
    }


    public async openCreateTransfert(transfert: string) {
    const isPermistted = await this.roleService.isPermitted('Transfert', 'add');
    if(isPermistted) {
         this.transfert = new TransfertDto();
         this.createTransfertDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get sousMarque(): SousMarqueDto {
        return this.sousMarqueService.item;
    }
    set sousMarque(value: SousMarqueDto) {
        this.sousMarqueService.item = value;
    }
    get sousMarques(): Array<SousMarqueDto> {
        return this.sousMarqueService.items;
    }
    set sousMarques(value: Array<SousMarqueDto>) {
        this.sousMarqueService.items = value;
    }
    get createSousMarqueDialog(): boolean {
        return this.sousMarqueService.createDialog;
    }
    set createSousMarqueDialog(value: boolean) {
        this.sousMarqueService.createDialog= value;
    }
    get transfert(): TransfertDto {
        return this.transfertService.item;
    }
    set transfert(value: TransfertDto) {
        this.transfertService.item = value;
    }
    get transferts(): Array<TransfertDto> {
        return this.transfertService.items;
    }
    set transferts(value: Array<TransfertDto>) {
        this.transfertService.items = value;
    }
    get createTransfertDialog(): boolean {
        return this.transfertService.createDialog;
    }
    set createTransfertDialog(value: boolean) {
        this.transfertService.createDialog= value;
    }



    get validTransfertItemSousMarque(): boolean {
        return this._validTransfertItemSousMarque;
    }

    set validTransfertItemSousMarque(value: boolean) {
         this._validTransfertItemSousMarque = value;
    }
    get validTransfertItemQuantite(): boolean {
        return this._validTransfertItemQuantite;
    }

    set validTransfertItemQuantite(value: boolean) {
         this._validTransfertItemQuantite = value;
    }

    get validSousMarqueLibelle(): boolean {
        return this._validSousMarqueLibelle;
    }
    set validSousMarqueLibelle(value: boolean) {
        this._validSousMarqueLibelle = value;
    }
    get validSousMarqueCode(): boolean {
        return this._validSousMarqueCode;
    }
    set validSousMarqueCode(value: boolean) {
        this._validSousMarqueCode = value;
    }
    get validSousMarqueStatutSousMarque(): boolean {
        return this._validSousMarqueStatutSousMarque;
    }
    set validSousMarqueStatutSousMarque(value: boolean) {
        this._validSousMarqueStatutSousMarque = value;
    }
    get validTransfertDateTransfert(): boolean {
        return this._validTransfertDateTransfert;
    }
    set validTransfertDateTransfert(value: boolean) {
        this._validTransfertDateTransfert = value;
    }
    get validTransfertDepotOrigin(): boolean {
        return this._validTransfertDepotOrigin;
    }
    set validTransfertDepotOrigin(value: boolean) {
        this._validTransfertDepotOrigin = value;
    }
    get validTransfertDepotDestination(): boolean {
        return this._validTransfertDepotDestination;
    }
    set validTransfertDepotDestination(value: boolean) {
        this._validTransfertDepotDestination = value;
    }


    get items(): Array<TransfertItemDto> {
        return this.service.items;
    }

    set items(value: Array<TransfertItemDto>) {
        this.service.items = value;
    }

    get item(): TransfertItemDto {
        return this.service.item;
    }

    set item(value: TransfertItemDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): TransfertItemCriteria {
        return this.service.criteria;
    }

    set criteria(value: TransfertItemCriteria) {
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
