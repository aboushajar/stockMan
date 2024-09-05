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


import {ReglementVenteAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteAdmin.service';
import {ReglementVenteDto} from 'src/app/shared/model/vente/ReglementVente.model';
import {ReglementVenteCriteria} from 'src/app/shared/criteria/vente/ReglementVenteCriteria.model';

import {ReglementVenteStatusDto} from 'src/app/shared/model/vente/ReglementVenteStatus.model';
import {ReglementVenteStatusAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteStatusAdmin.service';
import {VenteDto} from 'src/app/shared/model/vente/Vente.model';
import {VenteAdminService} from 'src/app/shared/service/admin/vente/VenteAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
@Component({
  selector: 'app-reglement-vente-view-admin',
  templateUrl: './reglement-vente-view-admin.component.html'
})
export class ReglementVenteViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: ReglementVenteAdminService, private reglementVenteStatusService: ReglementVenteStatusAdminService, private venteService: VenteAdminService, private modeReglementService: ModeReglementAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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
    get vente(): VenteDto {
        return this.venteService.item;
    }
    set vente(value: VenteDto) {
        this.venteService.item = value;
    }
    get ventes(): Array<VenteDto> {
        return this.venteService.items;
    }
    set ventes(value: Array<VenteDto>) {
        this.venteService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<ReglementVenteDto> {
        return this.service.items;
    }

    set items(value: Array<ReglementVenteDto>) {
        this.service.items = value;
    }

    get item(): ReglementVenteDto {
        return this.service.item;
    }

    set item(value: ReglementVenteDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ReglementVenteCriteria {
        return this.service.criteria;
    }

    set criteria(value: ReglementVenteCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
