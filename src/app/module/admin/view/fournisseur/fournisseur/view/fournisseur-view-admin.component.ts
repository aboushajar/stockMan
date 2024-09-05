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


import {FournisseurAdminService} from 'src/app/shared/service/admin/fournisseur/FournisseurAdmin.service';
import {FournisseurDto} from 'src/app/shared/model/fournisseur/Fournisseur.model';
import {FournisseurCriteria} from 'src/app/shared/criteria/fournisseur/FournisseurCriteria.model';

import {CategorieFournisseurDto} from 'src/app/shared/model/fournisseur/CategorieFournisseur.model';
import {CategorieFournisseurAdminService} from 'src/app/shared/service/admin/fournisseur/CategorieFournisseurAdmin.service';
@Component({
  selector: 'app-fournisseur-view-admin',
  templateUrl: './fournisseur-view-admin.component.html'
})
export class FournisseurViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: FournisseurAdminService, private categorieFournisseurService: CategorieFournisseurAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }


    get categorieFournisseur(): CategorieFournisseurDto {
        return this.categorieFournisseurService.item;
    }
    set categorieFournisseur(value: CategorieFournisseurDto) {
        this.categorieFournisseurService.item = value;
    }
    get categorieFournisseurs(): Array<CategorieFournisseurDto> {
        return this.categorieFournisseurService.items;
    }
    set categorieFournisseurs(value: Array<CategorieFournisseurDto>) {
        this.categorieFournisseurService.items = value;
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<FournisseurDto> {
        return this.service.items;
    }

    set items(value: Array<FournisseurDto>) {
        this.service.items = value;
    }

    get item(): FournisseurDto {
        return this.service.item;
    }

    set item(value: FournisseurDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): FournisseurCriteria {
        return this.service.criteria;
    }

    set criteria(value: FournisseurCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
