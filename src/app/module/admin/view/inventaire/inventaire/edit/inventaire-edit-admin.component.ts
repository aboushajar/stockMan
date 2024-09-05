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




import {InventaireAdminService} from 'src/app/shared/service/admin/inventaire/InventaireAdmin.service';
import {InventaireDto} from 'src/app/shared/model/inventaire/Inventaire.model';
import {InventaireCriteria} from 'src/app/shared/criteria/inventaire/InventaireCriteria.model';


import {InventaireItemDto} from 'src/app/shared/model/inventaire/InventaireItem.model';
import {InventaireItemAdminService} from 'src/app/shared/service/admin/inventaire/InventaireItemAdmin.service';
import {DepotDto} from 'src/app/shared/model/depot/Depot.model';
import {DepotAdminService} from 'src/app/shared/service/admin/depot/DepotAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';

@Component({
  selector: 'app-inventaire-edit-admin',
  templateUrl: './inventaire-edit-admin.component.html'
})
export class InventaireEditAdminComponent implements OnInit {

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


    private _inventaireItemsElement = new InventaireItemDto();

    private _validInventaireDateInventaite = true;
    private _validInventaireDepot = true;

    private _validDepotCode = true;
    private _validDepotLibelle = true;
    private _validDepotStyle = true;
    private _validInventaireItemsSousMarque = true;
    private _validInventaireItemsQuantiteAnticipe = true;
    private _validInventaireItemsQuantiteReelle = true;
    private _validInventaireItemsDecalage = true;
    private _validInventaireItemsInventaire = true;



    constructor(private service: InventaireAdminService , private inventaireItemService: InventaireItemAdminService, private depotService: DepotAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.inventaireItemsElement.sousMarque = new SousMarqueDto();
        this.sousMarqueService.findAll().subscribe((data) => this.sousMarques = data);

        this.depotService.findAll().subscribe((data) => this.depots = data);
    }

    public prepareEdit() {
        this.item.dateInventaite = this.service.format(this.item.dateInventaite);
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
            this.item = new InventaireDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateInventaireItems(){
        this.errorMessages = new Array();
        this.validateInventaireItemsSousMarque();
        this.validateInventaireItemsQuantiteAnticipe();
        this.validateInventaireItemsQuantiteReelle();
        this.validateInventaireItemsDecalage();
        this.validateInventaireItemsInventaire();
    }

    public setValidation(value: boolean){
        this.validInventaireDateInventaite = value;
        this.validInventaireDepot = value;
        this.validInventaireItemsSousMarque = value;
        this.validInventaireItemsQuantiteAnticipe = value;
        this.validInventaireItemsQuantiteReelle = value;
        this.validInventaireItemsDecalage = value;
        this.validInventaireItemsInventaire = value;
    }

   public addInventaireItems() {
        if( this.item.inventaireItems == null )
            this.item.inventaireItems = new Array<InventaireItemDto>();
       this.validateInventaireItems();
       if (this.errorMessages.length === 0) {
            if(this.inventaireItemsElement.id == null){
                this.item.inventaireItems.push(this.inventaireItemsElement);
            }else{
                const index = this.item.inventaireItems.findIndex(e => e.id == this.inventaireItemsElement.id);
                this.item.inventaireItems[index] = this.inventaireItemsElement;
            }
          this.inventaireItemsElement = new InventaireItemDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs', detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
        }
   }

    public deleteInventaireItems(p: InventaireItemDto) {
        this.item.inventaireItems.forEach((element, index) => {
            if (element === p) { this.item.inventaireItems.splice(index, 1); }
        });
    }

    public editInventaireItems(p: InventaireItemDto) {
        this.inventaireItemsElement = {... p};
        this.activeTab = 0;
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateInventaireDateInventaite();
        this.validateInventaireDepot();
    }

    public validateInventaireDateInventaite(){
        if (this.stringUtilService.isEmpty(this.item.dateInventaite)) {
            this.errorMessages.push('Date inventaite non valide');
            this.validInventaireDateInventaite = false;
        } else {
            this.validInventaireDateInventaite = true;
        }
    }

    public validateInventaireDepot(){
        if (this.stringUtilService.isEmpty(this.item.depot)) {
            this.errorMessages.push('Depot non valide');
            this.validInventaireDepot = false;
        } else {
            this.validInventaireDepot = true;
        }
    }



    private validateInventaireItemsSousMarque(){
        if (this.inventaireItemsElement.sousMarque == null) {
        this.errorMessages.push('SousMarque de la inventaireItem est  invalide');
            this.validInventaireItemsSousMarque = false;
        } else {
            this.validInventaireItemsSousMarque = true;
        }
    }
    private validateInventaireItemsQuantiteAnticipe(){
        if (this.inventaireItemsElement.quantiteAnticipe == null) {
        this.errorMessages.push('QuantiteAnticipe de la inventaireItem est  invalide');
            this.validInventaireItemsQuantiteAnticipe = false;
        } else {
            this.validInventaireItemsQuantiteAnticipe = true;
        }
    }
    private validateInventaireItemsQuantiteReelle(){
        if (this.inventaireItemsElement.quantiteReelle == null) {
        this.errorMessages.push('QuantiteReelle de la inventaireItem est  invalide');
            this.validInventaireItemsQuantiteReelle = false;
        } else {
            this.validInventaireItemsQuantiteReelle = true;
        }
    }
    private validateInventaireItemsDecalage(){
        if (this.inventaireItemsElement.decalage == null) {
        this.errorMessages.push('Decalage de la inventaireItem est  invalide');
            this.validInventaireItemsDecalage = false;
        } else {
            this.validInventaireItemsDecalage = true;
        }
    }
    private validateInventaireItemsInventaire(){
        if (this.inventaireItemsElement.inventaire == null) {
        this.errorMessages.push('Inventaire de la inventaireItem est  invalide');
            this.validInventaireItemsInventaire = false;
        } else {
            this.validInventaireItemsInventaire = true;
        }
    }


    get depot(): DepotDto {
        return this.depotService.item;
    }
    set depot(value: DepotDto) {
        this.depotService.item = value;
    }
    get depots(): Array<DepotDto> {
        return this.depotService.items;
    }
    set depots(value: Array<DepotDto>) {
        this.depotService.items = value;
    }
    get createDepotDialog(): boolean {
        return this.depotService.createDialog;
    }
    set createDepotDialog(value: boolean) {
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

    get inventaireItemsElement(): InventaireItemDto {
        if( this._inventaireItemsElement == null )
            this._inventaireItemsElement = new InventaireItemDto();
         return this._inventaireItemsElement;
    }

    set inventaireItemsElement(value: InventaireItemDto) {
        this._inventaireItemsElement = value;
    }

    get validInventaireDateInventaite(): boolean {
        return this._validInventaireDateInventaite;
    }
    set validInventaireDateInventaite(value: boolean) {
        this._validInventaireDateInventaite = value;
    }
    get validInventaireDepot(): boolean {
        return this._validInventaireDepot;
    }
    set validInventaireDepot(value: boolean) {
        this._validInventaireDepot = value;
    }

    get validDepotCode(): boolean {
        return this._validDepotCode;
    }
    set validDepotCode(value: boolean) {
        this._validDepotCode = value;
    }
    get validDepotLibelle(): boolean {
        return this._validDepotLibelle;
    }
    set validDepotLibelle(value: boolean) {
        this._validDepotLibelle = value;
    }
    get validDepotStyle(): boolean {
        return this._validDepotStyle;
    }
    set validDepotStyle(value: boolean) {
        this._validDepotStyle = value;
    }
    get validInventaireItemsSousMarque(): boolean {
        return this._validInventaireItemsSousMarque;
    }
    set validInventaireItemsSousMarque(value: boolean) {
        this._validInventaireItemsSousMarque = value;
    }
    get validInventaireItemsQuantiteAnticipe(): boolean {
        return this._validInventaireItemsQuantiteAnticipe;
    }
    set validInventaireItemsQuantiteAnticipe(value: boolean) {
        this._validInventaireItemsQuantiteAnticipe = value;
    }
    get validInventaireItemsQuantiteReelle(): boolean {
        return this._validInventaireItemsQuantiteReelle;
    }
    set validInventaireItemsQuantiteReelle(value: boolean) {
        this._validInventaireItemsQuantiteReelle = value;
    }
    get validInventaireItemsDecalage(): boolean {
        return this._validInventaireItemsDecalage;
    }
    set validInventaireItemsDecalage(value: boolean) {
        this._validInventaireItemsDecalage = value;
    }
    get validInventaireItemsInventaire(): boolean {
        return this._validInventaireItemsInventaire;
    }
    set validInventaireItemsInventaire(value: boolean) {
        this._validInventaireItemsInventaire = value;
    }

	get items(): Array<InventaireDto> {
        return this.service.items;
    }

    set items(value: Array<InventaireDto>) {
        this.service.items = value;
    }

    get item(): InventaireDto {
        return this.service.item;
    }

    set item(value: InventaireDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): InventaireCriteria {
        return this.service.criteria;
    }

    set criteria(value: InventaireCriteria) {
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
