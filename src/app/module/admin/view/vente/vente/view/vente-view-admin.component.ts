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
  selector: 'app-vente-view-admin',
  templateUrl: './vente-view-admin.component.html'
})
export class VenteViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    venteItems = new VenteItemDto();
    venteItemss: Array<VenteItemDto> = [];
    reglementVentes = new ReglementVenteDto();
    reglementVentess: Array<ReglementVenteDto> = [];

    constructor(private service: VenteAdminService, private marqueService: MarqueAdminService, private reglementVenteStatusService: ReglementVenteStatusAdminService, private tauxTvaService: TauxTvaAdminService, private categorieProduitService: CategorieProduitAdminService, private venteItemService: VenteItemAdminService, private modeReglementService: ModeReglementAdminService, private etatVenteService: EtatVenteAdminService, private pointVenteService: PointVenteAdminService, private reglementVenteService: ReglementVenteAdminService, private clientService: ClientAdminService, private stockService: StockAdminService, private sousMarqueService: SousMarqueAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): VenteCriteria {
        return this.service.criteria;
    }

    set criteria(value: VenteCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
