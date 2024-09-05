import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {UniteMesureAdminService} from 'src/app/shared/service/admin/produit/UniteMesureAdmin.service';
import {UniteMesureDto} from 'src/app/shared/model/produit/UniteMesure.model';
import {UniteMesureCriteria} from 'src/app/shared/criteria/produit/UniteMesureCriteria.model';
@Component({
  selector: 'app-unite-mesure-create-admin',
  templateUrl: './unite-mesure-create-admin.component.html'
})
export class UniteMesureCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validUniteMesureLibelle = true;
   private _validUniteMesureCode = true;
   private _validUniteMesureStyle = true;

	constructor(private service: UniteMesureAdminService , @Inject(PLATFORM_ID) private platformId? ) {
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
                this.item = new UniteMesureDto();
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
        this.validUniteMesureLibelle = value;
        this.validUniteMesureCode = value;
        this.validUniteMesureStyle = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateUniteMesureLibelle();
        this.validateUniteMesureCode();
        this.validateUniteMesureStyle();
    }

    public validateUniteMesureLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validUniteMesureLibelle = false;
        } else {
            this.validUniteMesureLibelle = true;
        }
    }
    public validateUniteMesureCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validUniteMesureCode = false;
        } else {
            this.validUniteMesureCode = true;
        }
    }
    public validateUniteMesureStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
        this.errorMessages.push('Style non valide');
        this.validUniteMesureStyle = false;
        } else {
            this.validUniteMesureStyle = true;
        }
    }






    get validUniteMesureLibelle(): boolean {
        return this._validUniteMesureLibelle;
    }

    set validUniteMesureLibelle(value: boolean) {
         this._validUniteMesureLibelle = value;
    }
    get validUniteMesureCode(): boolean {
        return this._validUniteMesureCode;
    }

    set validUniteMesureCode(value: boolean) {
         this._validUniteMesureCode = value;
    }
    get validUniteMesureStyle(): boolean {
        return this._validUniteMesureStyle;
    }

    set validUniteMesureStyle(value: boolean) {
         this._validUniteMesureStyle = value;
    }



    get items(): Array<UniteMesureDto> {
        return this.service.items;
    }

    set items(value: Array<UniteMesureDto>) {
        this.service.items = value;
    }

    get item(): UniteMesureDto {
        return this.service.item;
    }

    set item(value: UniteMesureDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): UniteMesureCriteria {
        return this.service.criteria;
    }

    set criteria(value: UniteMesureCriteria) {
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
