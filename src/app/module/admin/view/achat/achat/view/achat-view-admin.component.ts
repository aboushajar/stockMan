import {Component, OnInit} from '@angular/core';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';
import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';


import {AchatAdminService} from 'src/app/shared/service/admin/achat/AchatAdmin.service';
import {AchatDto} from 'src/app/shared/model/achat/Achat.model';
import {AchatCriteria} from 'src/app/shared/criteria/achat/AchatCriteria.model';

import {AchatItemDto} from 'src/app/shared/model/achat/AchatItem.model';
import {AchatItemAdminService} from 'src/app/shared/service/admin/achat/AchatItemAdmin.service';
import {ReglementAchatDto} from 'src/app/shared/model/achat/ReglementAchat.model';
import {ReglementAchatAdminService} from 'src/app/shared/service/admin/achat/ReglementAchatAdmin.service';
import {FournisseurDto} from 'src/app/shared/model/fournisseur/Fournisseur.model';
import {FournisseurAdminService} from 'src/app/shared/service/admin/fournisseur/FournisseurAdmin.service';
import {ReglementAchatStatusDto} from 'src/app/shared/model/achat/ReglementAchatStatus.model';
import {ReglementAchatStatusAdminService} from 'src/app/shared/service/admin/achat/ReglementAchatStatusAdmin.service';
import {MarqueDto} from 'src/app/shared/model/produit/Marque.model';
import {MarqueAdminService} from 'src/app/shared/service/admin/produit/MarqueAdmin.service';
import {TauxTvaDto} from 'src/app/shared/model/commun/TauxTva.model';
import {TauxTvaAdminService} from 'src/app/shared/service/admin/commun/TauxTvaAdmin.service';
import {CategorieProduitDto} from 'src/app/shared/model/produit/CategorieProduit.model';
import {CategorieProduitAdminService} from 'src/app/shared/service/admin/produit/CategorieProduitAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
import {PointVenteDto} from 'src/app/shared/model/depot/PointVente.model';
import {PointVenteAdminService} from 'src/app/shared/service/admin/depot/PointVenteAdmin.service';
import {StockDto} from 'src/app/shared/model/depot/Stock.model';
import {StockAdminService} from 'src/app/shared/service/admin/depot/StockAdmin.service';
import {EtatAchatDto} from 'src/app/shared/model/achat/EtatAchat.model';
import {EtatAchatAdminService} from 'src/app/shared/service/admin/achat/EtatAchatAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
@Component({
  selector: 'app-achat-view-admin',
  templateUrl: './achat-view-admin.component.html'
})
export class AchatViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    reglementAchats = new ReglementAchatDto();
    reglementAchatss: Array<ReglementAchatDto> = [];
    achatItems = new AchatItemDto();
    achatItemss: Array<AchatItemDto> = [];

    constructor(private service: AchatAdminService, private fournisseurService: FournisseurAdminService, private reglementAchatStatusService: ReglementAchatStatusAdminService, private achatItemService: AchatItemAdminService, private marqueService: MarqueAdminService, private tauxTvaService: TauxTvaAdminService, private categorieProduitService: CategorieProduitAdminService, private modeReglementService: ModeReglementAdminService, private pointVenteService: PointVenteAdminService, private reglementAchatService: ReglementAchatAdminService, private stockService: StockAdminService, private etatAchatService: EtatAchatAdminService, private sousMarqueService: SousMarqueAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): AchatCriteria {
        return this.service.criteria;
    }

    set criteria(value: AchatCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
