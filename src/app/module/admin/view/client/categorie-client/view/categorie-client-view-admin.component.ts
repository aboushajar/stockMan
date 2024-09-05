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


import {CategorieClientAdminService} from 'src/app/shared/service/admin/client/CategorieClientAdmin.service';
import {CategorieClientDto} from 'src/app/shared/model/client/CategorieClient.model';
import {CategorieClientCriteria} from 'src/app/shared/criteria/client/CategorieClientCriteria.model';

import {SuperCategorieClientDto} from 'src/app/shared/model/client/SuperCategorieClient.model';
import {SuperCategorieClientAdminService} from 'src/app/shared/service/admin/client/SuperCategorieClientAdmin.service';
@Component({
  selector: 'app-categorie-client-view-admin',
  templateUrl: './categorie-client-view-admin.component.html'
})
export class CategorieClientViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: CategorieClientAdminService, private superCategorieClientService: SuperCategorieClientAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get superCategorieClient(): SuperCategorieClientDto {
        return this.superCategorieClientService.item;
    }
    set superCategorieClient(value: SuperCategorieClientDto) {
        this.superCategorieClientService.item = value;
    }
    get superCategorieClients(): Array<SuperCategorieClientDto> {
        return this.superCategorieClientService.items;
    }
    set superCategorieClients(value: Array<SuperCategorieClientDto>) {
        this.superCategorieClientService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<CategorieClientDto> {
        return this.service.items;
    }

    set items(value: Array<CategorieClientDto>) {
        this.service.items = value;
    }

    get item(): CategorieClientDto {
        return this.service.item;
    }

    set item(value: CategorieClientDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): CategorieClientCriteria {
        return this.service.criteria;
    }

    set criteria(value: CategorieClientCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
