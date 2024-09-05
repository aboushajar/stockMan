import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {EtatVenteAdminService} from 'src/app/shared/service/admin/vente/EtatVenteAdmin.service';
import {EtatVenteDto} from 'src/app/shared/model/vente/EtatVente.model';
import {EtatVenteCriteria} from 'src/app/shared/criteria/vente/EtatVenteCriteria.model';
@Component({
  selector: 'app-etat-vente-create-admin',
  templateUrl: './etat-vente-create-admin.component.html'
})
export class EtatVenteCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validEtatVenteCode = true;
   private _validEtatVenteLibelle = true;
   private _validEtatVenteStyle = true;

	constructor(private service: EtatVenteAdminService , @Inject(PLATFORM_ID) private platformId? ) {
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
                this.item = new EtatVenteDto();
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
        this.validEtatVenteCode = value;
        this.validEtatVenteLibelle = value;
        this.validEtatVenteStyle = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateEtatVenteCode();
        this.validateEtatVenteLibelle();
        this.validateEtatVenteStyle();
    }

    public validateEtatVenteCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validEtatVenteCode = false;
        } else {
            this.validEtatVenteCode = true;
        }
    }
    public validateEtatVenteLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validEtatVenteLibelle = false;
        } else {
            this.validEtatVenteLibelle = true;
        }
    }
    public validateEtatVenteStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
        this.errorMessages.push('Style non valide');
        this.validEtatVenteStyle = false;
        } else {
            this.validEtatVenteStyle = true;
        }
    }






    get validEtatVenteCode(): boolean {
        return this._validEtatVenteCode;
    }

    set validEtatVenteCode(value: boolean) {
         this._validEtatVenteCode = value;
    }
    get validEtatVenteLibelle(): boolean {
        return this._validEtatVenteLibelle;
    }

    set validEtatVenteLibelle(value: boolean) {
         this._validEtatVenteLibelle = value;
    }
    get validEtatVenteStyle(): boolean {
        return this._validEtatVenteStyle;
    }

    set validEtatVenteStyle(value: boolean) {
         this._validEtatVenteStyle = value;
    }



    get items(): Array<EtatVenteDto> {
        return this.service.items;
    }

    set items(value: Array<EtatVenteDto>) {
        this.service.items = value;
    }

    get item(): EtatVenteDto {
        return this.service.item;
    }

    set item(value: EtatVenteDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): EtatVenteCriteria {
        return this.service.criteria;
    }

    set criteria(value: EtatVenteCriteria) {
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
