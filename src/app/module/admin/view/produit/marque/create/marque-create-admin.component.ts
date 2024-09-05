import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {MarqueAdminService} from 'src/app/shared/service/admin/produit/MarqueAdmin.service';
import {MarqueDto} from 'src/app/shared/model/produit/Marque.model';
import {MarqueCriteria} from 'src/app/shared/criteria/produit/MarqueCriteria.model';
import {CategorieProduitDto} from 'src/app/shared/model/produit/CategorieProduit.model';
import {CategorieProduitAdminService} from 'src/app/shared/service/admin/produit/CategorieProduitAdmin.service';
@Component({
  selector: 'app-marque-create-admin',
  templateUrl: './marque-create-admin.component.html'
})
export class MarqueCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validMarqueLibelle = true;
   private _validMarqueCode = true;
    private _validCategorieProduitCode = true;
    private _validCategorieProduitLibelle = true;
    private _validCategorieProduitStyle = true;

	constructor(private service: MarqueAdminService , private categorieProduitService: CategorieProduitAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.categorieProduitService.findAll().subscribe((data) => this.categorieProduits = data);
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
                this.item = new MarqueDto();
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
        this.validMarqueLibelle = value;
        this.validMarqueCode = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateMarqueLibelle();
        this.validateMarqueCode();
    }

    public validateMarqueLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validMarqueLibelle = false;
        } else {
            this.validMarqueLibelle = true;
        }
    }
    public validateMarqueCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validMarqueCode = false;
        } else {
            this.validMarqueCode = true;
        }
    }


    public async openCreateCategorieProduit(categorieProduit: string) {
    const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'add');
    if(isPermistted) {
         this.categorieProduit = new CategorieProduitDto();
         this.createCategorieProduitDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get categorieProduit(): CategorieProduitDto {
        return this.categorieProduitService.item;
    }
    set categorieProduit(value: CategorieProduitDto) {
        this.categorieProduitService.item = value;
    }
    get categorieProduits(): Array<CategorieProduitDto> {
        return this.categorieProduitService.items;
    }
    set categorieProduits(value: Array<CategorieProduitDto>) {
        this.categorieProduitService.items = value;
    }
    get createCategorieProduitDialog(): boolean {
        return this.categorieProduitService.createDialog;
    }
    set createCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.createDialog= value;
    }



    get validMarqueLibelle(): boolean {
        return this._validMarqueLibelle;
    }

    set validMarqueLibelle(value: boolean) {
         this._validMarqueLibelle = value;
    }
    get validMarqueCode(): boolean {
        return this._validMarqueCode;
    }

    set validMarqueCode(value: boolean) {
         this._validMarqueCode = value;
    }

    get validCategorieProduitCode(): boolean {
        return this._validCategorieProduitCode;
    }
    set validCategorieProduitCode(value: boolean) {
        this._validCategorieProduitCode = value;
    }
    get validCategorieProduitLibelle(): boolean {
        return this._validCategorieProduitLibelle;
    }
    set validCategorieProduitLibelle(value: boolean) {
        this._validCategorieProduitLibelle = value;
    }
    get validCategorieProduitStyle(): boolean {
        return this._validCategorieProduitStyle;
    }
    set validCategorieProduitStyle(value: boolean) {
        this._validCategorieProduitStyle = value;
    }


    get items(): Array<MarqueDto> {
        return this.service.items;
    }

    set items(value: Array<MarqueDto>) {
        this.service.items = value;
    }

    get item(): MarqueDto {
        return this.service.item;
    }

    set item(value: MarqueDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): MarqueCriteria {
        return this.service.criteria;
    }

    set criteria(value: MarqueCriteria) {
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
