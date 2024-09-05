import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {TauxTvaAdminService} from 'src/app/shared/service/admin/commun/TauxTvaAdmin.service';
import {TauxTvaDto} from 'src/app/shared/model/commun/TauxTva.model';
import {TauxTvaCriteria} from 'src/app/shared/criteria/commun/TauxTvaCriteria.model';
@Component({
  selector: 'app-taux-tva-create-admin',
  templateUrl: './taux-tva-create-admin.component.html'
})
export class TauxTvaCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validTauxTvaCode = true;
   private _validTauxTvaLibelle = true;
   private _validTauxTvaStyle = true;

	constructor(private service: TauxTvaAdminService , @Inject(PLATFORM_ID) private platformId? ) {
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
                this.item = new TauxTvaDto();
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
        this.validTauxTvaCode = value;
        this.validTauxTvaLibelle = value;
        this.validTauxTvaStyle = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateTauxTvaCode();
        this.validateTauxTvaLibelle();
        this.validateTauxTvaStyle();
    }

    public validateTauxTvaCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validTauxTvaCode = false;
        } else {
            this.validTauxTvaCode = true;
        }
    }
    public validateTauxTvaLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validTauxTvaLibelle = false;
        } else {
            this.validTauxTvaLibelle = true;
        }
    }
    public validateTauxTvaStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
        this.errorMessages.push('Style non valide');
        this.validTauxTvaStyle = false;
        } else {
            this.validTauxTvaStyle = true;
        }
    }






    get validTauxTvaCode(): boolean {
        return this._validTauxTvaCode;
    }

    set validTauxTvaCode(value: boolean) {
         this._validTauxTvaCode = value;
    }
    get validTauxTvaLibelle(): boolean {
        return this._validTauxTvaLibelle;
    }

    set validTauxTvaLibelle(value: boolean) {
         this._validTauxTvaLibelle = value;
    }
    get validTauxTvaStyle(): boolean {
        return this._validTauxTvaStyle;
    }

    set validTauxTvaStyle(value: boolean) {
         this._validTauxTvaStyle = value;
    }



    get items(): Array<TauxTvaDto> {
        return this.service.items;
    }

    set items(value: Array<TauxTvaDto>) {
        this.service.items = value;
    }

    get item(): TauxTvaDto {
        return this.service.item;
    }

    set item(value: TauxTvaDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): TauxTvaCriteria {
        return this.service.criteria;
    }

    set criteria(value: TauxTvaCriteria) {
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
