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


import {InventaireItemAdminService} from 'src/app/shared/service/admin/inventaire/InventaireItemAdmin.service';
import {InventaireItemDto} from 'src/app/shared/model/inventaire/InventaireItem.model';
import {InventaireItemCriteria} from 'src/app/shared/criteria/inventaire/InventaireItemCriteria.model';

import {InventaireDto} from 'src/app/shared/model/inventaire/Inventaire.model';
import {InventaireAdminService} from 'src/app/shared/service/admin/inventaire/InventaireAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
@Component({
  selector: 'app-inventaire-item-view-admin',
  templateUrl: './inventaire-item-view-admin.component.html'
})
export class InventaireItemViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: InventaireItemAdminService, private inventaireService: InventaireAdminService, private sousMarqueService: SousMarqueAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get inventaire(): InventaireDto {
        return this.inventaireService.item;
    }
    set inventaire(value: InventaireDto) {
        this.inventaireService.item = value;
    }
    get inventaires(): Array<InventaireDto> {
        return this.inventaireService.items;
    }
    set inventaires(value: Array<InventaireDto>) {
        this.inventaireService.items = value;
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

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<InventaireItemDto> {
        return this.service.items;
    }

    set items(value: Array<InventaireItemDto>) {
        this.service.items = value;
    }

    get item(): InventaireItemDto {
        return this.service.item;
    }

    set item(value: InventaireItemDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): InventaireItemCriteria {
        return this.service.criteria;
    }

    set criteria(value: InventaireItemCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
