import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {PointVenteAdminService} from 'src/app/shared/service/admin/depot/PointVenteAdmin.service';
import {PointVenteDto} from 'src/app/shared/model/depot/PointVente.model';
import {PointVenteCriteria} from 'src/app/shared/criteria/depot/PointVenteCriteria.model';
import {DepotDto} from 'src/app/shared/model/depot/Depot.model';
import {DepotAdminService} from 'src/app/shared/service/admin/depot/DepotAdmin.service';
@Component({
  selector: 'app-point-vente-create-admin',
  templateUrl: './point-vente-create-admin.component.html'
})
export class PointVenteCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;

    private _depotsElement = new DepotDto();


   private _validPointVenteLibelle = true;
   private _validPointVenteCode = true;
   private _validPointVenteStyle = true;
    private _validDepotsCode = true;
    private _validDepotsLibelle = true;
    private _validDepotsStyle = true;

	constructor(private service: PointVenteAdminService , private depotService: DepotAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
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
                this.item = new PointVenteDto();
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



    validateDepots(){
        this.errorMessages = new Array();
        this.validateDepotsCode();
        this.validateDepotsLibelle();
        this.validateDepotsStyle();
    }


    public  setValidation(value: boolean){
        this.validPointVenteLibelle = value;
        this.validPointVenteCode = value;
        this.validPointVenteStyle = value;
        this.validDepotsCode = value;
        this.validDepotsLibelle = value;
        this.validDepotsStyle = value;
    }

    public addDepots() {
        if( this.item.depots == null )
            this.item.depots = new Array<DepotDto>();
       this.validateDepots();
       if (this.errorMessages.length === 0) {
              this.item.depots.push({... this.depotsElement});
              this.depotsElement = new DepotDto();
       }else{
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }


    public deletedepots(p: DepotDto) {
        this.item.depots.forEach((element, index) => {
            if (element === p) { this.item.depots.splice(index, 1); }
        });
    }

    public editdepots(p: DepotDto) {
        this.depotsElement = {... p};
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validatePointVenteLibelle();
        this.validatePointVenteCode();
        this.validatePointVenteStyle();
    }

    public validatePointVenteLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validPointVenteLibelle = false;
        } else {
            this.validPointVenteLibelle = true;
        }
    }
    public validatePointVenteCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validPointVenteCode = false;
        } else {
            this.validPointVenteCode = true;
        }
    }
    public validatePointVenteStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
        this.errorMessages.push('Style non valide');
        this.validPointVenteStyle = false;
        } else {
            this.validPointVenteStyle = true;
        }
    }

    public validateDepotsCode(){
        if (this.depotsElement.code == null) {
            this.errorMessages.push('Code de la depot est  invalide');
            this.validDepotsCode = false;
        } else {
            this.validDepotsCode = true;
        }
    }
    public validateDepotsLibelle(){
        if (this.depotsElement.libelle == null) {
            this.errorMessages.push('Libelle de la depot est  invalide');
            this.validDepotsLibelle = false;
        } else {
            this.validDepotsLibelle = true;
        }
    }
    public validateDepotsStyle(){
        if (this.depotsElement.style == null) {
            this.errorMessages.push('Style de la depot est  invalide');
            this.validDepotsStyle = false;
        } else {
            this.validDepotsStyle = true;
        }
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

    get validDepotsCode(): boolean {
        return this._validDepotsCode;
    }
    set validDepotsCode(value: boolean) {
        this._validDepotsCode = value;
    }
    get validDepotsLibelle(): boolean {
        return this._validDepotsLibelle;
    }
    set validDepotsLibelle(value: boolean) {
        this._validDepotsLibelle = value;
    }
    get validDepotsStyle(): boolean {
        return this._validDepotsStyle;
    }
    set validDepotsStyle(value: boolean) {
        this._validDepotsStyle = value;
    }

    get depotsElement(): DepotDto {
        if( this._depotsElement == null )
            this._depotsElement = new DepotDto();
        return this._depotsElement;
    }

    set depotsElement(value: DepotDto) {
        this._depotsElement = value;
    }

    get items(): Array<PointVenteDto> {
        return this.service.items;
    }

    set items(value: Array<PointVenteDto>) {
        this.service.items = value;
    }

    get item(): PointVenteDto {
        return this.service.item;
    }

    set item(value: PointVenteDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): PointVenteCriteria {
        return this.service.criteria;
    }

    set criteria(value: PointVenteCriteria) {
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
