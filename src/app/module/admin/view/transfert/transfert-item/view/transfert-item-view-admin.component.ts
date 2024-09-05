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


import {TransfertItemAdminService} from 'src/app/shared/service/admin/transfert/TransfertItemAdmin.service';
import {TransfertItemDto} from 'src/app/shared/model/transfert/TransfertItem.model';
import {TransfertItemCriteria} from 'src/app/shared/criteria/transfert/TransfertItemCriteria.model';

import {TransfertDto} from 'src/app/shared/model/transfert/Transfert.model';
import {TransfertAdminService} from 'src/app/shared/service/admin/transfert/TransfertAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
@Component({
  selector: 'app-transfert-item-view-admin',
  templateUrl: './transfert-item-view-admin.component.html'
})
export class TransfertItemViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: TransfertItemAdminService, private transfertService: TransfertAdminService, private sousMarqueService: SousMarqueAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): TransfertItemCriteria {
        return this.service.criteria;
    }

    set criteria(value: TransfertItemCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
