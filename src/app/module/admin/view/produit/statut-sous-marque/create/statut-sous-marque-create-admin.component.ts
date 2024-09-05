import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {StatutSousMarqueAdminService} from 'src/app/shared/service/admin/produit/StatutSousMarqueAdmin.service';
import {StatutSousMarqueDto} from 'src/app/shared/model/produit/StatutSousMarque.model';
import {StatutSousMarqueCriteria} from 'src/app/shared/criteria/produit/StatutSousMarqueCriteria.model';
@Component({
  selector: 'app-statut-sous-marque-create-admin',
  templateUrl: './statut-sous-marque-create-admin.component.html'
})
export class StatutSousMarqueCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validStatutSousMarqueLibelle = true;
   private _validStatutSousMarqueCode = true;

	constructor(private service: StatutSousMarqueAdminService , @Inject(PLATFORM_ID) private platformId? ) {
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
                this.item = new StatutSousMarqueDto();
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
        this.validStatutSousMarqueLibelle = value;
        this.validStatutSousMarqueCode = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateStatutSousMarqueLibelle();
        this.validateStatutSousMarqueCode();
    }

    public validateStatutSousMarqueLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validStatutSousMarqueLibelle = false;
        } else {
            this.validStatutSousMarqueLibelle = true;
        }
    }
    public validateStatutSousMarqueCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validStatutSousMarqueCode = false;
        } else {
            this.validStatutSousMarqueCode = true;
        }
    }






    get validStatutSousMarqueLibelle(): boolean {
        return this._validStatutSousMarqueLibelle;
    }

    set validStatutSousMarqueLibelle(value: boolean) {
         this._validStatutSousMarqueLibelle = value;
    }
    get validStatutSousMarqueCode(): boolean {
        return this._validStatutSousMarqueCode;
    }

    set validStatutSousMarqueCode(value: boolean) {
         this._validStatutSousMarqueCode = value;
    }



    get items(): Array<StatutSousMarqueDto> {
        return this.service.items;
    }

    set items(value: Array<StatutSousMarqueDto>) {
        this.service.items = value;
    }

    get item(): StatutSousMarqueDto {
        return this.service.item;
    }

    set item(value: StatutSousMarqueDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): StatutSousMarqueCriteria {
        return this.service.criteria;
    }

    set criteria(value: StatutSousMarqueCriteria) {
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
