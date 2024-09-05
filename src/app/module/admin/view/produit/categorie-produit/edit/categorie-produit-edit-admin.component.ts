import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {CategorieProduitAdminService} from 'src/app/shared/service/admin/produit/CategorieProduitAdmin.service';
import {CategorieProduitDto} from 'src/app/shared/model/produit/CategorieProduit.model';
import {CategorieProduitCriteria} from 'src/app/shared/criteria/produit/CategorieProduitCriteria.model';


import {TauxTvaDto} from 'src/app/shared/model/commun/TauxTva.model';
import {TauxTvaAdminService} from 'src/app/shared/service/admin/commun/TauxTvaAdmin.service';

@Component({
  selector: 'app-categorie-produit-edit-admin',
  templateUrl: './categorie-produit-edit-admin.component.html'
})
export class CategorieProduitEditAdminComponent implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    private _file: any;
    private _files: any;



    private _validCategorieProduitCode = true;
    private _validCategorieProduitLibelle = true;
    private _validCategorieProduitStyle = true;

    private _validTauxTvaCode = true;
    private _validTauxTvaLibelle = true;
    private _validTauxTvaStyle = true;



    constructor(private service: CategorieProduitAdminService , private tauxTvaService: TauxTvaAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.tauxTvaService.findAll().subscribe((data) => this.tauxTvas = data);
    }

    public prepareEdit() {
    }



 public edit(): void {
        this.submitted = true;
        this.prepareEdit();
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.service.edit().subscribe(religion=>{
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = religion;
            this.editDialog = false;
            this.submitted = false;
            this.item = new CategorieProduitDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validCategorieProduitCode = value;
        this.validCategorieProduitLibelle = value;
        this.validCategorieProduitStyle = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateCategorieProduitCode();
        this.validateCategorieProduitLibelle();
        this.validateCategorieProduitStyle();
    }

    public validateCategorieProduitCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validCategorieProduitCode = false;
        } else {
            this.validCategorieProduitCode = true;
        }
    }

    public validateCategorieProduitLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCategorieProduitLibelle = false;
        } else {
            this.validCategorieProduitLibelle = true;
        }
    }

    public validateCategorieProduitStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
            this.errorMessages.push('Style non valide');
            this.validCategorieProduitStyle = false;
        } else {
            this.validCategorieProduitStyle = true;
        }
    }





    get tauxTva(): TauxTvaDto {
        return this.tauxTvaService.item;
    }
    set tauxTva(value: TauxTvaDto) {
        this.tauxTvaService.item = value;
    }
    get tauxTvas(): Array<TauxTvaDto> {
        return this.tauxTvaService.items;
    }
    set tauxTvas(value: Array<TauxTvaDto>) {
        this.tauxTvaService.items = value;
    }
    get createTauxTvaDialog(): boolean {
        return this.tauxTvaService.createDialog;
    }
    set createTauxTvaDialog(value: boolean) {
        this.tauxTvaService.createDialog= value;
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

	get items(): Array<CategorieProduitDto> {
        return this.service.items;
    }

    set items(value: Array<CategorieProduitDto>) {
        this.service.items = value;
    }

    get item(): CategorieProduitDto {
        return this.service.item;
    }

    set item(value: CategorieProduitDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): CategorieProduitCriteria {
        return this.service.criteria;
    }

    set criteria(value: CategorieProduitCriteria) {
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
