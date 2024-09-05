import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {DepotAdminService} from 'src/app/shared/service/admin/depot/DepotAdmin.service';
import {DepotDto} from 'src/app/shared/model/depot/Depot.model';
import {DepotCriteria} from 'src/app/shared/criteria/depot/DepotCriteria.model';
import {PointVenteDto} from 'src/app/shared/model/depot/PointVente.model';
import {PointVenteAdminService} from 'src/app/shared/service/admin/depot/PointVenteAdmin.service';
@Component({
  selector: 'app-depot-create-admin',
  templateUrl: './depot-create-admin.component.html'
})
export class DepotCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validDepotCode = true;
   private _validDepotLibelle = true;
   private _validDepotStyle = true;
    private _validPointVenteLibelle = true;
    private _validPointVenteCode = true;
    private _validPointVenteStyle = true;

	constructor(private service: DepotAdminService , private pointVenteService: PointVenteAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.pointVenteService.findAll().subscribe((data) => this.pointVentes = data);
    }



    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new DepotDto();
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





    public  setValidation(value: boolean){
        this.validDepotCode = value;
        this.validDepotLibelle = value;
        this.validDepotStyle = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateDepotCode();
        this.validateDepotLibelle();
        this.validateDepotStyle();
    }

    public validateDepotCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validDepotCode = false;
        } else {
            this.validDepotCode = true;
        }
    }
    public validateDepotLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validDepotLibelle = false;
        } else {
            this.validDepotLibelle = true;
        }
    }
    public validateDepotStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
        this.errorMessages.push('Style non valide');
        this.validDepotStyle = false;
        } else {
            this.validDepotStyle = true;
        }
    }


    public async openCreatePointVente(pointVente: string) {
    const isPermistted = await this.roleService.isPermitted('PointVente', 'add');
    if(isPermistted) {
         this.pointVente = new PointVenteDto();
         this.createPointVenteDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
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



    get validDepotCode(): boolean {
        return this._validDepotCode;
    }

    set validDepotCode(value: boolean) {
         this._validDepotCode = value;
    }
    get validDepotLibelle(): boolean {
        return this._validDepotLibelle;
    }

    set validDepotLibelle(value: boolean) {
         this._validDepotLibelle = value;
    }
    get validDepotStyle(): boolean {
        return this._validDepotStyle;
    }

    set validDepotStyle(value: boolean) {
         this._validDepotStyle = value;
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


    get items(): Array<DepotDto> {
        return this.service.items;
    }

    set items(value: Array<DepotDto>) {
        this.service.items = value;
    }

    get item(): DepotDto {
        return this.service.item;
    }

    set item(value: DepotDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): DepotCriteria {
        return this.service.criteria;
    }

    set criteria(value: DepotCriteria) {
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
