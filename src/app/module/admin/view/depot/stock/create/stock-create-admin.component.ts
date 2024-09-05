import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {StockAdminService} from 'src/app/shared/service/admin/depot/StockAdmin.service';
import {StockDto} from 'src/app/shared/model/depot/Stock.model';
import {StockCriteria} from 'src/app/shared/criteria/depot/StockCriteria.model';
import {DepotDto} from 'src/app/shared/model/depot/Depot.model';
import {DepotAdminService} from 'src/app/shared/service/admin/depot/DepotAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
@Component({
  selector: 'app-stock-create-admin',
  templateUrl: './stock-create-admin.component.html'
})
export class StockCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validStockSousMarque = true;
   private _validStockQuantiteEligibleVente = true;
   private _validStockQuantiteNonEligibleVente = true;
   private _validStockDepot = true;
    private _validSousMarqueLibelle = true;
    private _validSousMarqueCode = true;
    private _validSousMarqueStatutSousMarque = true;
    private _validDepotCode = true;
    private _validDepotLibelle = true;
    private _validDepotStyle = true;

	constructor(private service: StockAdminService , private depotService: DepotAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.sousMarqueService.findAll().subscribe((data) => this.sousMarques = data);
        this.depotService.findAll().subscribe((data) => this.depots = data);
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
                this.item = new StockDto();
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
        this.validStockSousMarque = value;
        this.validStockQuantiteEligibleVente = value;
        this.validStockQuantiteNonEligibleVente = value;
        this.validStockDepot = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateStockSousMarque();
        this.validateStockQuantiteEligibleVente();
        this.validateStockQuantiteNonEligibleVente();
        this.validateStockDepot();
    }

    public validateStockSousMarque(){
        if (this.stringUtilService.isEmpty(this.item.sousMarque)) {
        this.errorMessages.push('Sous marque non valide');
        this.validStockSousMarque = false;
        } else {
            this.validStockSousMarque = true;
        }
    }
    public validateStockQuantiteEligibleVente(){
        if (this.stringUtilService.isEmpty(this.item.quantiteEligibleVente)) {
        this.errorMessages.push('Quantite eligible vente non valide');
        this.validStockQuantiteEligibleVente = false;
        } else {
            this.validStockQuantiteEligibleVente = true;
        }
    }
    public validateStockQuantiteNonEligibleVente(){
        if (this.stringUtilService.isEmpty(this.item.quantiteNonEligibleVente)) {
        this.errorMessages.push('Quantite non eligible vente non valide');
        this.validStockQuantiteNonEligibleVente = false;
        } else {
            this.validStockQuantiteNonEligibleVente = true;
        }
    }
    public validateStockDepot(){
        if (this.stringUtilService.isEmpty(this.item.depot)) {
        this.errorMessages.push('Depot non valide');
        this.validStockDepot = false;
        } else {
            this.validStockDepot = true;
        }
    }


    public async openCreateDepot(depot: string) {
    const isPermistted = await this.roleService.isPermitted('Depot', 'add');
    if(isPermistted) {
         this.depot = new DepotDto();
         this.createDepotDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
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



    get validStockSousMarque(): boolean {
        return this._validStockSousMarque;
    }

    set validStockSousMarque(value: boolean) {
         this._validStockSousMarque = value;
    }
    get validStockQuantiteEligibleVente(): boolean {
        return this._validStockQuantiteEligibleVente;
    }

    set validStockQuantiteEligibleVente(value: boolean) {
         this._validStockQuantiteEligibleVente = value;
    }
    get validStockQuantiteNonEligibleVente(): boolean {
        return this._validStockQuantiteNonEligibleVente;
    }

    set validStockQuantiteNonEligibleVente(value: boolean) {
         this._validStockQuantiteNonEligibleVente = value;
    }
    get validStockDepot(): boolean {
        return this._validStockDepot;
    }

    set validStockDepot(value: boolean) {
         this._validStockDepot = value;
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


    get items(): Array<StockDto> {
        return this.service.items;
    }

    set items(value: Array<StockDto>) {
        this.service.items = value;
    }

    get item(): StockDto {
        return this.service.item;
    }

    set item(value: StockDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): StockCriteria {
        return this.service.criteria;
    }

    set criteria(value: StockCriteria) {
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
