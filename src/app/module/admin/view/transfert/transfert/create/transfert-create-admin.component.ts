import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {TransfertAdminService} from 'src/app/shared/service/admin/transfert/TransfertAdmin.service';
import {TransfertDto} from 'src/app/shared/model/transfert/Transfert.model';
import {TransfertCriteria} from 'src/app/shared/criteria/transfert/TransfertCriteria.model';
import {TransfertItemDto} from 'src/app/shared/model/transfert/TransfertItem.model';
import {TransfertItemAdminService} from 'src/app/shared/service/admin/transfert/TransfertItemAdmin.service';
import {DepotDto} from 'src/app/shared/model/depot/Depot.model';
import {DepotAdminService} from 'src/app/shared/service/admin/depot/DepotAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
@Component({
  selector: 'app-transfert-create-admin',
  templateUrl: './transfert-create-admin.component.html'
})
export class TransfertCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;

    private _transfertItemsElement = new TransfertItemDto();


   private _validTransfertDateTransfert = true;
   private _validTransfertDepotOrigin = true;
   private _validTransfertDepotDestination = true;
    private _validDepotOriginCode = true;
    private _validDepotOriginLibelle = true;
    private _validDepotOriginStyle = true;
    private _validDepotDestinationCode = true;
    private _validDepotDestinationLibelle = true;
    private _validDepotDestinationStyle = true;
    private _validTransfertItemsSousMarque = true;
    private _validTransfertItemsQuantite = true;

	constructor(private service: TransfertAdminService , private transfertItemService: TransfertItemAdminService, private depotService: DepotAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.transfertItemsElement.sousMarque = new SousMarqueDto();
        this.sousMarqueService.findAll().subscribe((data) => this.sousMarques = data);
        this.depotService.findAll().subscribe((data) => this.depotOrigins = data);
        this.depotService.findAll().subscribe((data) => this.depotDestinations = data);
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
                this.item = new TransfertDto();
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



    validateTransfertItems(){
        this.errorMessages = new Array();
        this.validateTransfertItemsSousMarque();
        this.validateTransfertItemsQuantite();
    }


    public  setValidation(value: boolean){
        this.validTransfertDateTransfert = value;
        this.validTransfertDepotOrigin = value;
        this.validTransfertDepotDestination = value;
        this.validTransfertItemsSousMarque = value;
        this.validTransfertItemsQuantite = value;
    }

    public addTransfertItems() {
        if( this.item.transfertItems == null )
            this.item.transfertItems = new Array<TransfertItemDto>();
       this.validateTransfertItems();
       if (this.errorMessages.length === 0) {
              this.item.transfertItems.push({... this.transfertItemsElement});
              this.transfertItemsElement = new TransfertItemDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }


    public deletetransfertItems(p: TransfertItemDto) {
        this.item.transfertItems.forEach((element, index) => {
            if (element === p) { this.item.transfertItems.splice(index, 1); }
        });
    }

    public edittransfertItems(p: TransfertItemDto) {
        this.transfertItemsElement = {... p};
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateTransfertDateTransfert();
        this.validateTransfertDepotOrigin();
        this.validateTransfertDepotDestination();
    }

    public validateTransfertDateTransfert(){
        if (this.stringUtilService.isEmpty(this.item.dateTransfert)) {
        this.errorMessages.push('Date transfert non valide');
        this.validTransfertDateTransfert = false;
        } else {
            this.validTransfertDateTransfert = true;
        }
    }
    public validateTransfertDepotOrigin(){
        if (this.stringUtilService.isEmpty(this.item.depotOrigin)) {
        this.errorMessages.push('Depot origin non valide');
        this.validTransfertDepotOrigin = false;
        } else {
            this.validTransfertDepotOrigin = true;
        }
    }
    public validateTransfertDepotDestination(){
        if (this.stringUtilService.isEmpty(this.item.depotDestination)) {
        this.errorMessages.push('Depot destination non valide');
        this.validTransfertDepotDestination = false;
        } else {
            this.validTransfertDepotDestination = true;
        }
    }

    public validateTransfertItemsSousMarque(){
        if (this.transfertItemsElement.sousMarque == null) {
            this.errorMessages.push('SousMarque de la transfertItem est  invalide');
            this.validTransfertItemsSousMarque = false;
        } else {
            this.validTransfertItemsSousMarque = true;
        }
    }
    public validateTransfertItemsQuantite(){
        if (this.transfertItemsElement.quantite == null) {
            this.errorMessages.push('Quantite de la transfertItem est  invalide');
            this.validTransfertItemsQuantite = false;
        } else {
            this.validTransfertItemsQuantite = true;
        }
    }


    get depotDestination(): DepotDto {
        return this.depotService.item;
    }
    set depotDestination(value: DepotDto) {
        this.depotService.item = value;
    }
    get depotDestinations(): Array<DepotDto> {
        return this.depotService.items;
    }
    set depotDestinations(value: Array<DepotDto>) {
        this.depotService.items = value;
    }
    get createDepotDestinationDialog(): boolean {
        return this.depotService.createDialog;
    }
    set createDepotDestinationDialog(value: boolean) {
        this.depotService.createDialog= value;
    }
    get depotOrigin(): DepotDto {
        return this.depotService.item;
    }
    set depotOrigin(value: DepotDto) {
        this.depotService.item = value;
    }
    get depotOrigins(): Array<DepotDto> {
        return this.depotService.items;
    }
    set depotOrigins(value: Array<DepotDto>) {
        this.depotService.items = value;
    }
    get createDepotOriginDialog(): boolean {
        return this.depotService.createDialog;
    }
    set createDepotOriginDialog(value: boolean) {
        this.depotService.createDialog= value;
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

    get validDepotOriginCode(): boolean {
        return this._validDepotOriginCode;
    }
    set validDepotOriginCode(value: boolean) {
        this._validDepotOriginCode = value;
    }
    get validDepotOriginLibelle(): boolean {
        return this._validDepotOriginLibelle;
    }
    set validDepotOriginLibelle(value: boolean) {
        this._validDepotOriginLibelle = value;
    }
    get validDepotOriginStyle(): boolean {
        return this._validDepotOriginStyle;
    }
    set validDepotOriginStyle(value: boolean) {
        this._validDepotOriginStyle = value;
    }
    get validDepotDestinationCode(): boolean {
        return this._validDepotDestinationCode;
    }
    set validDepotDestinationCode(value: boolean) {
        this._validDepotDestinationCode = value;
    }
    get validDepotDestinationLibelle(): boolean {
        return this._validDepotDestinationLibelle;
    }
    set validDepotDestinationLibelle(value: boolean) {
        this._validDepotDestinationLibelle = value;
    }
    get validDepotDestinationStyle(): boolean {
        return this._validDepotDestinationStyle;
    }
    set validDepotDestinationStyle(value: boolean) {
        this._validDepotDestinationStyle = value;
    }
    get validTransfertItemsSousMarque(): boolean {
        return this._validTransfertItemsSousMarque;
    }
    set validTransfertItemsSousMarque(value: boolean) {
        this._validTransfertItemsSousMarque = value;
    }
    get validTransfertItemsQuantite(): boolean {
        return this._validTransfertItemsQuantite;
    }
    set validTransfertItemsQuantite(value: boolean) {
        this._validTransfertItemsQuantite = value;
    }

    get transfertItemsElement(): TransfertItemDto {
        if( this._transfertItemsElement == null )
            this._transfertItemsElement = new TransfertItemDto();
        return this._transfertItemsElement;
    }

    set transfertItemsElement(value: TransfertItemDto) {
        this._transfertItemsElement = value;
    }

    get items(): Array<TransfertDto> {
        return this.service.items;
    }

    set items(value: Array<TransfertDto>) {
        this.service.items = value;
    }

    get item(): TransfertDto {
        return this.service.item;
    }

    set item(value: TransfertDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): TransfertCriteria {
        return this.service.criteria;
    }

    set criteria(value: TransfertCriteria) {
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
