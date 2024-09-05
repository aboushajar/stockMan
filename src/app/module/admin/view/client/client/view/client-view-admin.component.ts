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


import {ClientAdminService} from 'src/app/shared/service/admin/client/ClientAdmin.service';
import {ClientDto} from 'src/app/shared/model/client/Client.model';
import {ClientCriteria} from 'src/app/shared/criteria/client/ClientCriteria.model';

import {CategorieClientDto} from 'src/app/shared/model/client/CategorieClient.model';
import {CategorieClientAdminService} from 'src/app/shared/service/admin/client/CategorieClientAdmin.service';
@Component({
  selector: 'app-client-view-admin',
  templateUrl: './client-view-admin.component.html'
})
export class ClientViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: ClientAdminService, private categorieClientService: CategorieClientAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get categorieClient(): CategorieClientDto {
        return this.categorieClientService.item;
    }
    set categorieClient(value: CategorieClientDto) {
        this.categorieClientService.item = value;
    }
    get categorieClients(): Array<CategorieClientDto> {
        return this.categorieClientService.items;
    }
    set categorieClients(value: Array<CategorieClientDto>) {
        this.categorieClientService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<ClientDto> {
        return this.service.items;
    }

    set items(value: Array<ClientDto>) {
        this.service.items = value;
    }

    get item(): ClientDto {
        return this.service.item;
    }

    set item(value: ClientDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ClientCriteria {
        return this.service.criteria;
    }

    set criteria(value: ClientCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
