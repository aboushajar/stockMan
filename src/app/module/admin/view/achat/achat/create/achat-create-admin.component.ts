import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';


import {AchatAdminService} from 'src/app/shared/service/admin/achat/AchatAdmin.service';
import {AchatDto} from 'src/app/shared/model/achat/Achat.model';
import {AchatCriteria} from 'src/app/shared/criteria/achat/AchatCriteria.model';
import {ReglementAchatStatusDto} from 'src/app/shared/model/achat/ReglementAchatStatus.model';
import {ReglementAchatStatusAdminService} from 'src/app/shared/service/admin/achat/ReglementAchatStatusAdmin.service';
import {AchatItemDto} from 'src/app/shared/model/achat/AchatItem.model';
import {AchatItemAdminService} from 'src/app/shared/service/admin/achat/AchatItemAdmin.service';
import {ReglementAchatDto} from 'src/app/shared/model/achat/ReglementAchat.model';
import {ReglementAchatAdminService} from 'src/app/shared/service/admin/achat/ReglementAchatAdmin.service';
import {MarqueDto} from 'src/app/shared/model/produit/Marque.model';
import {MarqueAdminService} from 'src/app/shared/service/admin/produit/MarqueAdmin.service';
import {TauxTvaDto} from 'src/app/shared/model/commun/TauxTva.model';
import {TauxTvaAdminService} from 'src/app/shared/service/admin/commun/TauxTvaAdmin.service';
import {CategorieProduitDto} from 'src/app/shared/model/produit/CategorieProduit.model';
import {CategorieProduitAdminService} from 'src/app/shared/service/admin/produit/CategorieProduitAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
import {EtatAchatDto} from 'src/app/shared/model/achat/EtatAchat.model';
import {EtatAchatAdminService} from 'src/app/shared/service/admin/achat/EtatAchatAdmin.service';
import {FournisseurDto} from 'src/app/shared/model/fournisseur/Fournisseur.model';
import {FournisseurAdminService} from 'src/app/shared/service/admin/fournisseur/FournisseurAdmin.service';
import {StockDto} from 'src/app/shared/model/depot/Stock.model';
import {StockAdminService} from 'src/app/shared/service/admin/depot/StockAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
import {PointVenteAdminService} from "../../../../../../shared/service/admin/depot/PointVenteAdmin.service";
import {PointVenteDto} from "../../../../../../shared/model/depot/PointVente.model";

@Component({
    selector: 'app-achat-create-admin',
    templateUrl: './achat-create-admin.component.html'
})
export class AchatCreateAdminComponent implements OnInit {

    protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;

    private _achatItemsElement = new AchatItemDto();
    private _reglementAchatsElement = new ReglementAchatDto();


    private _validAchatCode = true;
    private _validAchatFournisseur = true;
    private _validAchatDateAchat = true;
    private _validAchatMontantPaye = true;
    private _validAchatReste = true;
    private _validAchatAchatItems = true;
    private _validFournisseurCategorieFournisseur = true;
    private _validFournisseurReference = true;
    private _validFournisseurNom = true;
    private _validFournisseurTelephone = true;
    private _validCategorieProduitCode = true;
    private _validCategorieProduitLibelle = true;
    private _validCategorieProduitStyle = true;
    private _validTauxTvaCode = true;
    private _validTauxTvaLibelle = true;
    private _validTauxTvaStyle = true;
    private _validAchatItemsQuantite = true;
    private _validAchatItemsAchat = true;
    private _validReglementAchatsDateReglement = true;
    private _validReglementAchatsModeReglement = true;
    private _validReglementAchatsAchat = true;
    private _validPointVenteLibelle = true;
    private _validPointVenteCode = true;
    private _validPointVenteStyle = true;
    private _validEtatAchatCode = true;
    private _validEtatAchatLibelle = true;
    private _validEtatAchatStyle = true;

    constructor(private service: AchatAdminService, private marqueService: MarqueAdminService, private reglementAchatStatusService: ReglementAchatStatusAdminService, private tauxTvaService: TauxTvaAdminService, private categorieProduitService: CategorieProduitAdminService, private achatItemService: AchatItemAdminService, private modeReglementService: ModeReglementAdminService, private etatAchatService: EtatAchatAdminService, private pointVenteService: PointVenteAdminService, private reglementAchatService: ReglementAchatAdminService, private fournisseurService: FournisseurAdminService, private stockService: StockAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.item.dateAchat = new Date()
        this.achatItemsElement.stock = new StockDto();
        this.stockService.findAll().subscribe((data) => this.stocks = data);
        this.achatItemsElement.marque = new MarqueDto();
        this.marqueService.findAll().subscribe((data) => this.marques = data);
        this.achatItemsElement.sousMarque = new SousMarqueDto();
        this.sousMarqueService.findAll().subscribe((data) => this.sousMarques = data);
        this.reglementAchatsElement.modeReglement = new ModeReglementDto();
        this.modeReglementService.findAll().subscribe((data) => this.modeReglements = data);
        this.reglementAchatsElement.reglementAchatStatus = new ReglementAchatStatusDto();
        this.reglementAchatStatusService.findAll().subscribe((data) => this.reglementAchatStatuss = data);
        this.fournisseurService.findAll().subscribe((data) => this.fournisseurs = data);
        this.categorieProduitService.findAll().subscribe((data) => this.categorieProduits = data);
        this.tauxTvaService.findAll().subscribe((data) => {
            this.tauxTvas = data
            var index = this.tauxTvas.findIndex(e => e.libelle === "0%");
            if (index >= 0) {
                this.item.tauxTva = this.tauxTvas[index]
            }
        });
        this.pointVenteService.findAll().subscribe((data) => this.pointVentes = data);
        this.etatAchatService.findAll().subscribe((data) => this.etatAchats = data);
    }


    findStockBySousMarque() {
        this.stockService.findBySousMarque(this.achatItemsElement.sousMarque).subscribe(res => {
            this.stocks = res
            this.stocks.forEach(e => e.description = e.depot.libelle + " (" + e.quantiteEligibleVente + ":" + e.sousMarque.prixAchat + " DH)")
        })
    }

    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public saveWithShowOption(showList: boolean) {
        if (!this.item.pointVente) {
            this.item.pointVente = this.pointVentes[0];
        }
        if (!this.item.etatAchat && this.item.montantPaye == this.item.montantTtcApresRemise) {
            this.item.etatAchat = this.etatAchats.find(e => e.code === "Confirme");
        } else if (!this.item.etatAchat && this.item.montantPaye == this.item.montantTtcApresRemise) {
            this.item.etatAchat = this.etatAchats.find(e => e.code === "Pending");
        }
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new AchatDto();
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


    validateAchatItems() {
        this.errorMessages = new Array();
        this.validateAchatItemsQuantite();
        this.validateAchatItemsAchat();
    }

    validateReglementAchats() {
        this.errorMessages = new Array();
        this.validateReglementAchatsDateReglement();
        this.validateReglementAchatsModeReglement();
        this.validateReglementAchatsAchat();
    }


    public setValidation(value: boolean) {
        this.validAchatCode = value;
        this.validAchatFournisseur = value;
        this.validAchatDateAchat = value;
        this.validAchatMontantPaye = value;
        this.validAchatReste = value;
        this.validAchatAchatItems = value;
        this.validAchatItemsQuantite = value;
        this.validAchatItemsAchat = value;
        this.validReglementAchatsDateReglement = value;
        this.validReglementAchatsModeReglement = value;
        this.validReglementAchatsAchat = value;
    }

    public addAchatItems() {
        if (this.item.achatItems == null)
            this.item.achatItems = new Array<AchatItemDto>();
        this.validateAchatItems();
        if (this.errorMessages.length === 0) {
            this.caluclateTotal()
            this.item.achatItems.push({...this.achatItemsElement});
            this.achatItemsElement = new AchatItemDto();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }


    private caluclateTotal() {
        if (!this.item.tauxTva) {
            this.item.tauxTva = this.tauxTvas.find(e => e.valeur === 20)
        }
        if (!this.item.pointVente) {
            this.item.pointVente = this.pointVentes[0]
        }
        if (this.item.tauxTva) {
            this.item.montantHt += this.achatItemsElement.prix * this.achatItemsElement.quantite
            this.item.montantTva += (this.item.montantHt * this.item.tauxTva.valeur) / 100
            this.item.montantTtc += this.item.montantHt + this.item.montantTva
            this.updateMontantApresRemise()
            this.updateMontantPaye()
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de selectionner Taux TVA : '
            });
        }
    }

    calculatePrix() {
        if (!this.achatItemsElement.quantite) {
            this.achatItemsElement.quantite = 1
        }
        if (this.achatItemsElement.stock && this.achatItemsElement.stock.sousMarque) {
            this.achatItemsElement.prix = this.achatItemsElement.stock.sousMarque.prixAchat
        }

    }

    updateMontantApresRemise() {
        if (!this.item.remise) {
            this.item.remise = 0
        }
        this.item.montantTtcApresRemise = this.item.montantTtc - this.item.remise
    }

    updateMontantPaye() {
        this.item.montantPaye = this.item.montantTtcApresRemise
        this.item.reste = this.item.montantTtcApresRemise - this.item.montantPaye
    }

    public deleteachatItems(p: AchatItemDto) {
        this.item.achatItems.forEach((element, index) => {
            if (element === p) {
                this.item.achatItems.splice(index, 1);
            }
        });
    }

    public editachatItems(p: AchatItemDto) {
        this.achatItemsElement = {...p};
        this.activeTab = 0;
    }

    public addReglementAchats() {
        if (this.item.reglementAchats == null)
            this.item.reglementAchats = new Array<ReglementAchatDto>();
        this.validateReglementAchats();
        if (this.errorMessages.length === 0) {
            this.item.reglementAchats.push({...this.reglementAchatsElement});
            this.reglementAchatsElement = new ReglementAchatDto();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }


    public deletereglementAchats(p: ReglementAchatDto) {
        this.item.reglementAchats.forEach((element, index) => {
            if (element === p) {
                this.item.reglementAchats.splice(index, 1);
            }
        });
    }

    public editreglementAchats(p: ReglementAchatDto) {
        this.reglementAchatsElement = {...p};
        this.activeTab = 0;
    }


    public validateForm(): void {
        this.errorMessages = new Array<string>();
        //this.validateAchatCode();
        // this.validateAchatFournisseur();
        this.validateAchatDateAchat();
        this.validateAchatMontantPaye();
        this.validateAchatReste();
        this.validateAchatAchatItems();
    }

    public validateAchatCode() {
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validAchatCode = false;
        } else {
            this.validAchatCode = true;
        }
    }

    public validateAchatFournisseur() {
        if (this.stringUtilService.isEmpty(this.item.fournisseur)) {
            this.errorMessages.push('Fournisseur non valide');
            this.validAchatFournisseur = false;
        } else {
            this.validAchatFournisseur = true;
        }
    }

    public validateAchatDateAchat() {
        if (this.stringUtilService.isEmpty(this.item.dateAchat)) {
            this.errorMessages.push('Date achat non valide');
            this.validAchatDateAchat = false;
        } else {
            this.validAchatDateAchat = true;
        }
    }

    public validateAchatMontantPaye() {
        if (this.stringUtilService.isEmpty(this.item.montantPaye)) {
            this.errorMessages.push('Montant paye non valide');
            this.validAchatMontantPaye = false;
        } else {
            this.validAchatMontantPaye = true;
        }
    }

    public validateAchatReste() {
        if (this.stringUtilService.isEmpty(this.item.reste)) {
            this.errorMessages.push('Reste non valide');
            this.validAchatReste = false;
        } else {
            this.validAchatReste = true;
        }
    }

    public validateAchatAchatItems() {
        if (this.stringUtilService.isEmpty(this.item.achatItems)) {
            this.errorMessages.push('Achat items non valide');
            this.validAchatAchatItems = false;
        } else {
            this.validAchatAchatItems = true;
        }
    }

    public validateAchatItemsQuantite() {
        if (this.achatItemsElement.quantite == null) {
            this.errorMessages.push('Quantite de la achatItem est  invalide');
            this.validAchatItemsQuantite = false;
        } else {
            this.validAchatItemsQuantite = true;
        }
    }

    public validateAchatItemsAchat() {
        if (this.achatItemsElement.achat == null) {
            this.errorMessages.push('Achat de la achatItem est  invalide');
            this.validAchatItemsAchat = false;
        } else {
            this.validAchatItemsAchat = true;
        }
    }

    public validateReglementAchatsDateReglement() {
        if (this.reglementAchatsElement.dateReglement == null) {
            this.errorMessages.push('DateReglement de la reglementAchat est  invalide');
            this.validReglementAchatsDateReglement = false;
        } else {
            this.validReglementAchatsDateReglement = true;
        }
    }

    public validateReglementAchatsModeReglement() {
        if (this.reglementAchatsElement.modeReglement == null) {
            this.errorMessages.push('ModeReglement de la reglementAchat est  invalide');
            this.validReglementAchatsModeReglement = false;
        } else {
            this.validReglementAchatsModeReglement = true;
        }
    }

    public validateReglementAchatsAchat() {
        if (this.reglementAchatsElement.achat == null) {
            this.errorMessages.push('Achat de la reglementAchat est  invalide');
            this.validReglementAchatsAchat = false;
        } else {
            this.validReglementAchatsAchat = true;
        }
    }

    public async openCreateReglementAchatStatus(reglementAchatStatus: string) {
        const isPermistted = await this.roleService.isPermitted('ReglementAchatStatus', 'add');
        if (isPermistted) {
            this.reglementAchatStatus = new ReglementAchatStatusDto();
            this.createReglementAchatStatusDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateEtatAchat(etatAchat: string) {
        const isPermistted = await this.roleService.isPermitted('EtatAchat', 'add');
        if (isPermistted) {
            this.etatAchat = new EtatAchatDto();
            this.createEtatAchatDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }


    findMarqueByCategorieProduit() {
        this.marqueService.findMarqueByCategorieProduit(this.item.categorieProduit).subscribe(res => this.marques = res);
    }

    findSousMarqueByMarque() {
        this.sousMarqueService.findByMarque(this.achatItemsElement.marque).subscribe(res => this.sousMarques = res);
    }


    get fournisseur(): FournisseurDto {
        return this.fournisseurService.item;
    }

    set fournisseur(value: FournisseurDto) {
        this.fournisseurService.item = value;
    }

    get fournisseurs(): Array<FournisseurDto> {
        return this.fournisseurService.items;
    }

    set fournisseurs(value: Array<FournisseurDto>) {
        this.fournisseurService.items = value;
    }

    get createFournisseurDialog(): boolean {
        return this.fournisseurService.createDialog;
    }

    set createFournisseurDialog(value: boolean) {
        this.fournisseurService.createDialog = value;
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
        this.categorieProduitService.createDialog = value;
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
        this.pointVenteService.createDialog = value;
    }

    get reglementAchatStatus(): ReglementAchatStatusDto {
        return this.reglementAchatStatusService.item;
    }

    set reglementAchatStatus(value: ReglementAchatStatusDto) {
        this.reglementAchatStatusService.item = value;
    }

    get reglementAchatStatuss(): Array<ReglementAchatStatusDto> {
        return this.reglementAchatStatusService.items;
    }

    set reglementAchatStatuss(value: Array<ReglementAchatStatusDto>) {
        this.reglementAchatStatusService.items = value;
    }

    get createReglementAchatStatusDialog(): boolean {
        return this.reglementAchatStatusService.createDialog;
    }

    set createReglementAchatStatusDialog(value: boolean) {
        this.reglementAchatStatusService.createDialog = value;
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
        this.sousMarqueService.createDialog = value;
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
        this.modeReglementService.createDialog = value;
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
        this.tauxTvaService.createDialog = value;
    }

    get etatAchat(): EtatAchatDto {
        return this.etatAchatService.item;
    }

    set etatAchat(value: EtatAchatDto) {
        this.etatAchatService.item = value;
    }

    get etatAchats(): Array<EtatAchatDto> {
        return this.etatAchatService.items;
    }

    set etatAchats(value: Array<EtatAchatDto>) {
        this.etatAchatService.items = value;
    }

    get createEtatAchatDialog(): boolean {
        return this.etatAchatService.createDialog;
    }

    set createEtatAchatDialog(value: boolean) {
        this.etatAchatService.createDialog = value;
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
        this.marqueService.createDialog = value;
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
        this.stockService.createDialog = value;
    }


    get validAchatCode(): boolean {
        return this._validAchatCode;
    }

    set validAchatCode(value: boolean) {
        this._validAchatCode = value;
    }

    get validAchatFournisseur(): boolean {
        return this._validAchatFournisseur;
    }

    set validAchatFournisseur(value: boolean) {
        this._validAchatFournisseur = value;
    }

    get validAchatDateAchat(): boolean {
        return this._validAchatDateAchat;
    }

    set validAchatDateAchat(value: boolean) {
        this._validAchatDateAchat = value;
    }

    get validAchatMontantPaye(): boolean {
        return this._validAchatMontantPaye;
    }

    set validAchatMontantPaye(value: boolean) {
        this._validAchatMontantPaye = value;
    }

    get validAchatReste(): boolean {
        return this._validAchatReste;
    }

    set validAchatReste(value: boolean) {
        this._validAchatReste = value;
    }

    get validAchatAchatItems(): boolean {
        return this._validAchatAchatItems;
    }

    set validAchatAchatItems(value: boolean) {
        this._validAchatAchatItems = value;
    }

    get validFournisseurCategorieFournisseur(): boolean {
        return this._validFournisseurCategorieFournisseur;
    }

    set validFournisseurCategorieFournisseur(value: boolean) {
        this._validFournisseurCategorieFournisseur = value;
    }

    get validFournisseurReference(): boolean {
        return this._validFournisseurReference;
    }

    set validFournisseurReference(value: boolean) {
        this._validFournisseurReference = value;
    }

    get validFournisseurNom(): boolean {
        return this._validFournisseurNom;
    }

    set validFournisseurNom(value: boolean) {
        this._validFournisseurNom = value;
    }

    get validFournisseurTelephone(): boolean {
        return this._validFournisseurTelephone;
    }

    set validFournisseurTelephone(value: boolean) {
        this._validFournisseurTelephone = value;
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

    get validAchatItemsQuantite(): boolean {
        return this._validAchatItemsQuantite;
    }

    set validAchatItemsQuantite(value: boolean) {
        this._validAchatItemsQuantite = value;
    }

    get validAchatItemsAchat(): boolean {
        return this._validAchatItemsAchat;
    }

    set validAchatItemsAchat(value: boolean) {
        this._validAchatItemsAchat = value;
    }

    get validReglementAchatsDateReglement(): boolean {
        return this._validReglementAchatsDateReglement;
    }

    set validReglementAchatsDateReglement(value: boolean) {
        this._validReglementAchatsDateReglement = value;
    }

    get validReglementAchatsModeReglement(): boolean {
        return this._validReglementAchatsModeReglement;
    }

    set validReglementAchatsModeReglement(value: boolean) {
        this._validReglementAchatsModeReglement = value;
    }

    get validReglementAchatsAchat(): boolean {
        return this._validReglementAchatsAchat;
    }

    set validReglementAchatsAchat(value: boolean) {
        this._validReglementAchatsAchat = value;
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

    get validEtatAchatCode(): boolean {
        return this._validEtatAchatCode;
    }

    set validEtatAchatCode(value: boolean) {
        this._validEtatAchatCode = value;
    }

    get validEtatAchatLibelle(): boolean {
        return this._validEtatAchatLibelle;
    }

    set validEtatAchatLibelle(value: boolean) {
        this._validEtatAchatLibelle = value;
    }

    get validEtatAchatStyle(): boolean {
        return this._validEtatAchatStyle;
    }

    set validEtatAchatStyle(value: boolean) {
        this._validEtatAchatStyle = value;
    }

    get achatItemsElement(): AchatItemDto {
        if (this._achatItemsElement == null)
            this._achatItemsElement = new AchatItemDto();
        return this._achatItemsElement;
    }

    set achatItemsElement(value: AchatItemDto) {
        this._achatItemsElement = value;
    }

    get reglementAchatsElement(): ReglementAchatDto {
        if (this._reglementAchatsElement == null)
            this._reglementAchatsElement = new ReglementAchatDto();
        return this._reglementAchatsElement;
    }

    set reglementAchatsElement(value: ReglementAchatDto) {
        this._reglementAchatsElement = value;
    }

    get items(): Array<AchatDto> {
        return this.service.items;
    }

    set items(value: Array<AchatDto>) {
        this.service.items = value;
    }

    get item(): AchatDto {
        return this.service.item;
    }

    set item(value: AchatDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): AchatCriteria {
        return this.service.criteria;
    }

    set criteria(value: AchatCriteria) {
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
