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




import {VenteAdminService} from 'src/app/shared/service/admin/vente/VenteAdmin.service';
import {VenteDto} from 'src/app/shared/model/vente/Vente.model';
import {VenteCriteria} from 'src/app/shared/criteria/vente/VenteCriteria.model';


import {ReglementVenteStatusDto} from 'src/app/shared/model/vente/ReglementVenteStatus.model';
import {ReglementVenteStatusAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteStatusAdmin.service';
import {VenteItemDto} from 'src/app/shared/model/vente/VenteItem.model';
import {VenteItemAdminService} from 'src/app/shared/service/admin/vente/VenteItemAdmin.service';
import {ReglementVenteDto} from 'src/app/shared/model/vente/ReglementVente.model';
import {ReglementVenteAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteAdmin.service';
import {MarqueDto} from 'src/app/shared/model/produit/Marque.model';
import {MarqueAdminService} from 'src/app/shared/service/admin/produit/MarqueAdmin.service';
import {TauxTvaDto} from 'src/app/shared/model/commun/TauxTva.model';
import {TauxTvaAdminService} from 'src/app/shared/service/admin/commun/TauxTvaAdmin.service';
import {CategorieProduitDto} from 'src/app/shared/model/produit/CategorieProduit.model';
import {CategorieProduitAdminService} from 'src/app/shared/service/admin/produit/CategorieProduitAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
import {EtatVenteDto} from 'src/app/shared/model/vente/EtatVente.model';
import {EtatVenteAdminService} from 'src/app/shared/service/admin/vente/EtatVenteAdmin.service';
import {PointVenteDto} from 'src/app/shared/model/depot/PointVente.model';
import {PointVenteAdminService} from 'src/app/shared/service/admin/depot/PointVenteAdmin.service';
import {ClientDto} from 'src/app/shared/model/client/Client.model';
import {ClientAdminService} from 'src/app/shared/service/admin/client/ClientAdmin.service';
import {StockDto} from 'src/app/shared/model/depot/Stock.model';
import {StockAdminService} from 'src/app/shared/service/admin/depot/StockAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';

@Component({
  selector: 'app-vente-edit-admin',
  templateUrl: './vente-edit-admin.component.html'
})
export class VenteEditAdminComponent implements OnInit {

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


    private _venteItemsElement = new VenteItemDto();
    private _reglementVentesElement = new ReglementVenteDto();

    private _validVenteCode = true;
    private _validVenteClient = true;
    private _validVenteDateVente = true;
    private _validVenteMontantPaye = true;
    private _validVenteReste = true;
    private _validVenteVenteItems = true;

    private _validClientCategorieClient = true;
    private _validClientReference = true;
    private _validClientNom = true;
    private _validClientTelephone = true;
    private _validCategorieProduitCode = true;
    private _validCategorieProduitLibelle = true;
    private _validCategorieProduitStyle = true;
    private _validTauxTvaCode = true;
    private _validTauxTvaLibelle = true;
    private _validTauxTvaStyle = true;
    private _validVenteItemsQuantite = true;
    private _validVenteItemsVente = true;
    private _validReglementVentesDateReglement = true;
    private _validReglementVentesModeReglement = true;
    private _validReglementVentesVente = true;
    private _validPointVenteLibelle = true;
    private _validPointVenteCode = true;
    private _validPointVenteStyle = true;
    private _validEtatVenteCode = true;
    private _validEtatVenteLibelle = true;
    private _validEtatVenteStyle = true;



    constructor(private service: VenteAdminService , private marqueService: MarqueAdminService, private reglementVenteStatusService: ReglementVenteStatusAdminService, private tauxTvaService: TauxTvaAdminService, private categorieProduitService: CategorieProduitAdminService, private venteItemService: VenteItemAdminService, private modeReglementService: ModeReglementAdminService, private etatVenteService: EtatVenteAdminService, private pointVenteService: PointVenteAdminService, private reglementVenteService: ReglementVenteAdminService, private clientService: ClientAdminService, private stockService: StockAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.venteItemsElement.stock = new StockDto();
        this.stockService.findAll().subscribe((data) => this.stocks = data);
        this.venteItemsElement.marque = new MarqueDto();
        this.marqueService.findAll().subscribe((data) => this.marques = data);
        this.venteItemsElement.sousMarque = new SousMarqueDto();
        this.sousMarqueService.findAll().subscribe((data) => this.sousMarques = data);

        this.reglementVentesElement.modeReglement = new ModeReglementDto();
        this.modeReglementService.findAll().subscribe((data) => this.modeReglements = data);
        this.reglementVentesElement.reglementVenteStatus = new ReglementVenteStatusDto();
        this.reglementVenteStatusService.findAll().subscribe((data) => this.reglementVenteStatuss = data);

        this.clientService.findAll().subscribe((data) => this.clients = data);
        this.categorieProduitService.findAll().subscribe((data) => this.categorieProduits = data);
        this.tauxTvaService.findAll().subscribe((data) => this.tauxTvas = data);
        this.pointVenteService.findAll().subscribe((data) => this.pointVentes = data);
        this.etatVenteService.findAll().subscribe((data) => this.etatVentes = data);
    }

    public prepareEdit() {
        this.item.dateVente = this.service.format(this.item.dateVente);
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
            this.item = new VenteDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateVenteItems(){
        this.errorMessages = new Array();
        this.validateVenteItemsQuantite();
        this.validateVenteItemsVente();
    }

    public validateReglementVentes(){
        this.errorMessages = new Array();
        this.validateReglementVentesDateReglement();
        this.validateReglementVentesModeReglement();
        this.validateReglementVentesVente();
    }

    public setValidation(value: boolean){
        this.validVenteCode = value;
        this.validVenteClient = value;
        this.validVenteDateVente = value;
        this.validVenteMontantPaye = value;
        this.validVenteReste = value;
        this.validVenteVenteItems = value;
        this.validVenteItemsQuantite = value;
        this.validVenteItemsVente = value;
        this.validReglementVentesDateReglement = value;
        this.validReglementVentesModeReglement = value;
        this.validReglementVentesVente = value;
    }

   public addVenteItems() {
        if( this.item.venteItems == null )
            this.item.venteItems = new Array<VenteItemDto>();
       this.validateVenteItems();
       if (this.errorMessages.length === 0) {
            if(this.venteItemsElement.id == null){
                this.item.venteItems.push(this.venteItemsElement);
            }else{
                const index = this.item.venteItems.findIndex(e => e.id == this.venteItemsElement.id);
                this.item.venteItems[index] = this.venteItemsElement;
            }
          this.venteItemsElement = new VenteItemDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs', detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
        }
   }

    public deleteVenteItems(p: VenteItemDto) {
        this.item.venteItems.forEach((element, index) => {
            if (element === p) { this.item.venteItems.splice(index, 1); }
        });
    }

    public editVenteItems(p: VenteItemDto) {
        this.venteItemsElement = {... p};
        this.activeTab = 0;
    }


   public addReglementVentes() {
        if( this.item.reglementVentes == null )
            this.item.reglementVentes = new Array<ReglementVenteDto>();
       this.validateReglementVentes();
       if (this.errorMessages.length === 0) {
            if(this.reglementVentesElement.id == null){
                this.item.reglementVentes.push(this.reglementVentesElement);
            }else{
                const index = this.item.reglementVentes.findIndex(e => e.id == this.reglementVentesElement.id);
                this.item.reglementVentes[index] = this.reglementVentesElement;
            }
          this.reglementVentesElement = new ReglementVenteDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs', detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
        }
   }

    public deleteReglementVentes(p: ReglementVenteDto) {
        this.item.reglementVentes.forEach((element, index) => {
            if (element === p) { this.item.reglementVentes.splice(index, 1); }
        });
    }

    public editReglementVentes(p: ReglementVenteDto) {
        this.reglementVentesElement = {... p};
        this.activeTab = 0;
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateVenteCode();
        this.validateVenteClient();
        this.validateVenteDateVente();
        this.validateVenteMontantPaye();
        this.validateVenteReste();
        this.validateVenteVenteItems();
    }

    public validateVenteCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validVenteCode = false;
        } else {
            this.validVenteCode = true;
        }
    }

    public validateVenteClient(){
        if (this.stringUtilService.isEmpty(this.item.client)) {
            this.errorMessages.push('Client non valide');
            this.validVenteClient = false;
        } else {
            this.validVenteClient = true;
        }
    }

    public validateVenteDateVente(){
        if (this.stringUtilService.isEmpty(this.item.dateVente)) {
            this.errorMessages.push('Date vente non valide');
            this.validVenteDateVente = false;
        } else {
            this.validVenteDateVente = true;
        }
    }

    public validateVenteMontantPaye(){
        if (this.stringUtilService.isEmpty(this.item.montantPaye)) {
            this.errorMessages.push('Montant paye non valide');
            this.validVenteMontantPaye = false;
        } else {
            this.validVenteMontantPaye = true;
        }
    }

    public validateVenteReste(){
        if (this.stringUtilService.isEmpty(this.item.reste)) {
            this.errorMessages.push('Reste non valide');
            this.validVenteReste = false;
        } else {
            this.validVenteReste = true;
        }
    }

    public validateVenteVenteItems(){
        if (this.stringUtilService.isEmpty(this.item.venteItems)) {
            this.errorMessages.push('Vente items non valide');
            this.validVenteVenteItems = false;
        } else {
            this.validVenteVenteItems = true;
        }
    }



    private validateVenteItemsQuantite(){
        if (this.venteItemsElement.quantite == null) {
        this.errorMessages.push('Quantite de la venteItem est  invalide');
            this.validVenteItemsQuantite = false;
        } else {
            this.validVenteItemsQuantite = true;
        }
    }
    private validateVenteItemsVente(){
        if (this.venteItemsElement.vente == null) {
        this.errorMessages.push('Vente de la venteItem est  invalide');
            this.validVenteItemsVente = false;
        } else {
            this.validVenteItemsVente = true;
        }
    }
    private validateReglementVentesDateReglement(){
        if (this.reglementVentesElement.dateReglement == null) {
        this.errorMessages.push('DateReglement de la reglementVente est  invalide');
            this.validReglementVentesDateReglement = false;
        } else {
            this.validReglementVentesDateReglement = true;
        }
    }
    private validateReglementVentesModeReglement(){
        if (this.reglementVentesElement.modeReglement == null) {
        this.errorMessages.push('ModeReglement de la reglementVente est  invalide');
            this.validReglementVentesModeReglement = false;
        } else {
            this.validReglementVentesModeReglement = true;
        }
    }
    private validateReglementVentesVente(){
        if (this.reglementVentesElement.vente == null) {
        this.errorMessages.push('Vente de la reglementVente est  invalide');
            this.validReglementVentesVente = false;
        } else {
            this.validReglementVentesVente = true;
        }
    }

   public async openCreateReglementVenteStatus(reglementVenteStatus: string) {
        const isPermistted = await this.roleService.isPermitted('ReglementVenteStatus', 'edit');
        if (isPermistted) {
             this.reglementVenteStatus = new ReglementVenteStatusDto();
             this.createReglementVenteStatusDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
   public async openCreateEtatVente(etatVente: string) {
        const isPermistted = await this.roleService.isPermitted('EtatVente', 'edit');
        if (isPermistted) {
             this.etatVente = new EtatVenteDto();
             this.createEtatVenteDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    get client(): ClientDto {
        return this.clientService.item;
    }
    set client(value: ClientDto) {
        this.clientService.item = value;
    }
    get clients(): Array<ClientDto> {
        return this.clientService.items;
    }
    set clients(value: Array<ClientDto>) {
        this.clientService.items = value;
    }
    get createClientDialog(): boolean {
        return this.clientService.createDialog;
    }
    set createClientDialog(value: boolean) {
        this.clientService.createDialog= value;
    }
    get categorieProduit(): CategorieProduitDto {
        return this.categorieProduitService.item;
    }
    set categorieProduit(value: CategorieProduitDto) {
        this.categorieProduitService.item = value;
    }
    get categorieProduits(): Array<CategorieProduitDto> {
        return this.categorieProduitService.items;
    }
    set categorieProduits(value: Array<CategorieProduitDto>) {
        this.categorieProduitService.items = value;
    }
    get createCategorieProduitDialog(): boolean {
        return this.categorieProduitService.createDialog;
    }
    set createCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.createDialog= value;
    }
    get pointVente(): PointVenteDto {
        return this.pointVenteService.item;
    }
    set pointVente(value: PointVenteDto) {
        this.pointVenteService.item = value;
    }
    get pointVentes(): Array<PointVenteDto> {
        return this.pointVenteService.items;
    }
    set pointVentes(value: Array<PointVenteDto>) {
        this.pointVenteService.items = value;
    }
    get createPointVenteDialog(): boolean {
        return this.pointVenteService.createDialog;
    }
    set createPointVenteDialog(value: boolean) {
        this.pointVenteService.createDialog= value;
    }
    get reglementVenteStatus(): ReglementVenteStatusDto {
        return this.reglementVenteStatusService.item;
    }
    set reglementVenteStatus(value: ReglementVenteStatusDto) {
        this.reglementVenteStatusService.item = value;
    }
    get reglementVenteStatuss(): Array<ReglementVenteStatusDto> {
        return this.reglementVenteStatusService.items;
    }
    set reglementVenteStatuss(value: Array<ReglementVenteStatusDto>) {
        this.reglementVenteStatusService.items = value;
    }
    get createReglementVenteStatusDialog(): boolean {
        return this.reglementVenteStatusService.createDialog;
    }
    set createReglementVenteStatusDialog(value: boolean) {
        this.reglementVenteStatusService.createDialog= value;
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
    get modeReglement(): ModeReglementDto {
        return this.modeReglementService.item;
    }
    set modeReglement(value: ModeReglementDto) {
        this.modeReglementService.item = value;
    }
    get modeReglements(): Array<ModeReglementDto> {
        return this.modeReglementService.items;
    }
    set modeReglements(value: Array<ModeReglementDto>) {
        this.modeReglementService.items = value;
    }
    get createModeReglementDialog(): boolean {
        return this.modeReglementService.createDialog;
    }
    set createModeReglementDialog(value: boolean) {
        this.modeReglementService.createDialog= value;
    }
    get tauxTva(): TauxTvaDto {
        return this.tauxTvaService.item;
    }
    set tauxTva(value: TauxTvaDto) {
        this.tauxTvaService.item = value;
    }
    get tauxTvas(): Array<TauxTvaDto> {
        return this.tauxTvaService.items;
    }
    set tauxTvas(value: Array<TauxTvaDto>) {
        this.tauxTvaService.items = value;
    }
    get createTauxTvaDialog(): boolean {
        return this.tauxTvaService.createDialog;
    }
    set createTauxTvaDialog(value: boolean) {
        this.tauxTvaService.createDialog= value;
    }
    get etatVente(): EtatVenteDto {
        return this.etatVenteService.item;
    }
    set etatVente(value: EtatVenteDto) {
        this.etatVenteService.item = value;
    }
    get etatVentes(): Array<EtatVenteDto> {
        return this.etatVenteService.items;
    }
    set etatVentes(value: Array<EtatVenteDto>) {
        this.etatVenteService.items = value;
    }
    get createEtatVenteDialog(): boolean {
        return this.etatVenteService.createDialog;
    }
    set createEtatVenteDialog(value: boolean) {
        this.etatVenteService.createDialog= value;
    }
    get marque(): MarqueDto {
        return this.marqueService.item;
    }
    set marque(value: MarqueDto) {
        this.marqueService.item = value;
    }
    get marques(): Array<MarqueDto> {
        return this.marqueService.items;
    }
    set marques(value: Array<MarqueDto>) {
        this.marqueService.items = value;
    }
    get createMarqueDialog(): boolean {
        return this.marqueService.createDialog;
    }
    set createMarqueDialog(value: boolean) {
        this.marqueService.createDialog= value;
    }
    get stock(): StockDto {
        return this.stockService.item;
    }
    set stock(value: StockDto) {
        this.stockService.item = value;
    }
    get stocks(): Array<StockDto> {
        return this.stockService.items;
    }
    set stocks(value: Array<StockDto>) {
        this.stockService.items = value;
    }
    get createStockDialog(): boolean {
        return this.stockService.createDialog;
    }
    set createStockDialog(value: boolean) {
        this.stockService.createDialog= value;
    }

    get venteItemsElement(): VenteItemDto {
        if( this._venteItemsElement == null )
            this._venteItemsElement = new VenteItemDto();
         return this._venteItemsElement;
    }

    set venteItemsElement(value: VenteItemDto) {
        this._venteItemsElement = value;
    }
    get reglementVentesElement(): ReglementVenteDto {
        if( this._reglementVentesElement == null )
            this._reglementVentesElement = new ReglementVenteDto();
         return this._reglementVentesElement;
    }

    set reglementVentesElement(value: ReglementVenteDto) {
        this._reglementVentesElement = value;
    }

    get validVenteCode(): boolean {
        return this._validVenteCode;
    }
    set validVenteCode(value: boolean) {
        this._validVenteCode = value;
    }
    get validVenteClient(): boolean {
        return this._validVenteClient;
    }
    set validVenteClient(value: boolean) {
        this._validVenteClient = value;
    }
    get validVenteDateVente(): boolean {
        return this._validVenteDateVente;
    }
    set validVenteDateVente(value: boolean) {
        this._validVenteDateVente = value;
    }
    get validVenteMontantPaye(): boolean {
        return this._validVenteMontantPaye;
    }
    set validVenteMontantPaye(value: boolean) {
        this._validVenteMontantPaye = value;
    }
    get validVenteReste(): boolean {
        return this._validVenteReste;
    }
    set validVenteReste(value: boolean) {
        this._validVenteReste = value;
    }
    get validVenteVenteItems(): boolean {
        return this._validVenteVenteItems;
    }
    set validVenteVenteItems(value: boolean) {
        this._validVenteVenteItems = value;
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
    get validCategorieProduitCode(): boolean {
        return this._validCategorieProduitCode;
    }
    set validCategorieProduitCode(value: boolean) {
        this._validCategorieProduitCode = value;
    }
    get validCategorieProduitLibelle(): boolean {
        return this._validCategorieProduitLibelle;
    }
    set validCategorieProduitLibelle(value: boolean) {
        this._validCategorieProduitLibelle = value;
    }
    get validCategorieProduitStyle(): boolean {
        return this._validCategorieProduitStyle;
    }
    set validCategorieProduitStyle(value: boolean) {
        this._validCategorieProduitStyle = value;
    }
    get validTauxTvaCode(): boolean {
        return this._validTauxTvaCode;
    }
    set validTauxTvaCode(value: boolean) {
        this._validTauxTvaCode = value;
    }
    get validTauxTvaLibelle(): boolean {
        return this._validTauxTvaLibelle;
    }
    set validTauxTvaLibelle(value: boolean) {
        this._validTauxTvaLibelle = value;
    }
    get validTauxTvaStyle(): boolean {
        return this._validTauxTvaStyle;
    }
    set validTauxTvaStyle(value: boolean) {
        this._validTauxTvaStyle = value;
    }
    get validVenteItemsQuantite(): boolean {
        return this._validVenteItemsQuantite;
    }
    set validVenteItemsQuantite(value: boolean) {
        this._validVenteItemsQuantite = value;
    }
    get validVenteItemsVente(): boolean {
        return this._validVenteItemsVente;
    }
    set validVenteItemsVente(value: boolean) {
        this._validVenteItemsVente = value;
    }
    get validReglementVentesDateReglement(): boolean {
        return this._validReglementVentesDateReglement;
    }
    set validReglementVentesDateReglement(value: boolean) {
        this._validReglementVentesDateReglement = value;
    }
    get validReglementVentesModeReglement(): boolean {
        return this._validReglementVentesModeReglement;
    }
    set validReglementVentesModeReglement(value: boolean) {
        this._validReglementVentesModeReglement = value;
    }
    get validReglementVentesVente(): boolean {
        return this._validReglementVentesVente;
    }
    set validReglementVentesVente(value: boolean) {
        this._validReglementVentesVente = value;
    }
    get validPointVenteLibelle(): boolean {
        return this._validPointVenteLibelle;
    }
    set validPointVenteLibelle(value: boolean) {
        this._validPointVenteLibelle = value;
    }
    get validPointVenteCode(): boolean {
        return this._validPointVenteCode;
    }
    set validPointVenteCode(value: boolean) {
        this._validPointVenteCode = value;
    }
    get validPointVenteStyle(): boolean {
        return this._validPointVenteStyle;
    }
    set validPointVenteStyle(value: boolean) {
        this._validPointVenteStyle = value;
    }
    get validEtatVenteCode(): boolean {
        return this._validEtatVenteCode;
    }
    set validEtatVenteCode(value: boolean) {
        this._validEtatVenteCode = value;
    }
    get validEtatVenteLibelle(): boolean {
        return this._validEtatVenteLibelle;
    }
    set validEtatVenteLibelle(value: boolean) {
        this._validEtatVenteLibelle = value;
    }
    get validEtatVenteStyle(): boolean {
        return this._validEtatVenteStyle;
    }
    set validEtatVenteStyle(value: boolean) {
        this._validEtatVenteStyle = value;
    }

	get items(): Array<VenteDto> {
        return this.service.items;
    }

    set items(value: Array<VenteDto>) {
        this.service.items = value;
    }

    get item(): VenteDto {
        return this.service.item;
    }

    set item(value: VenteDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): VenteCriteria {
        return this.service.criteria;
    }

    set criteria(value: VenteCriteria) {
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
