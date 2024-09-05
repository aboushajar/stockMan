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




import {FournisseurAdminService} from 'src/app/shared/service/admin/fournisseur/FournisseurAdmin.service';
import {FournisseurDto} from 'src/app/shared/model/fournisseur/Fournisseur.model';
import {FournisseurCriteria} from 'src/app/shared/criteria/fournisseur/FournisseurCriteria.model';


import {CategorieFournisseurDto} from 'src/app/shared/model/fournisseur/CategorieFournisseur.model';
import {CategorieFournisseurAdminService} from 'src/app/shared/service/admin/fournisseur/CategorieFournisseurAdmin.service';

@Component({
  selector: 'app-fournisseur-edit-admin',
  templateUrl: './fournisseur-edit-admin.component.html'
})
export class FournisseurEditAdminComponent implements OnInit {

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



    private _validFournisseurCategorieFournisseur = true;
    private _validFournisseurReference = true;
    private _validFournisseurNom = true;
    private _validFournisseurTelephone = true;

    private _validCategorieFournisseurLibelle = true;
    private _validCategorieFournisseurCode = true;



    constructor(private service: FournisseurAdminService , private categorieFournisseurService: CategorieFournisseurAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.categorieFournisseurService.findAll().subscribe((data) => this.categorieFournisseurs = data);
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
            this.item = new FournisseurDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validFournisseurCategorieFournisseur = value;
        this.validFournisseurReference = value;
        this.validFournisseurNom = value;
        this.validFournisseurTelephone = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateFournisseurCategorieFournisseur();
        this.validateFournisseurReference();
        this.validateFournisseurNom();
        this.validateFournisseurTelephone();
    }

    public validateFournisseurCategorieFournisseur(){
        if (this.stringUtilService.isEmpty(this.item.categorieFournisseur)) {
            this.errorMessages.push('Categorie fournisseur non valide');
            this.validFournisseurCategorieFournisseur = false;
        } else {
            this.validFournisseurCategorieFournisseur = true;
        }
    }

    public validateFournisseurReference(){
        if (this.stringUtilService.isEmpty(this.item.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validFournisseurReference = false;
        } else {
            this.validFournisseurReference = true;
        }
    }

    public validateFournisseurNom(){
        if (this.stringUtilService.isEmpty(this.item.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validFournisseurNom = false;
        } else {
            this.validFournisseurNom = true;
        }
    }

    public validateFournisseurTelephone(){
        if (this.stringUtilService.isEmpty(this.item.telephone)) {
            this.errorMessages.push('Telephone non valide');
            this.validFournisseurTelephone = false;
        } else {
            this.validFournisseurTelephone = true;
        }
    }




   public async openCreateCategorieFournisseur(categorieFournisseur: string) {
        const isPermistted = await this.roleService.isPermitted('CategorieFournisseur', 'edit');
        if (isPermistted) {
             this.categorieFournisseur = new CategorieFournisseurDto();
             this.createCategorieFournisseurDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    get createCategorieFournisseurDialog(): boolean {
        return this.categorieFournisseurService.createDialog;
    }
    set createCategorieFournisseurDialog(value: boolean) {
        this.categorieFournisseurService.createDialog= value;
    }


    get validFournisseurCategorieFournisseur(): boolean {
        return this._validFournisseurCategorieFournisseur;
    }
    set validFournisseurCategorieFournisseur(value: boolean) {
        this._validFournisseurCategorieFournisseur = value;
    }
    get validFournisseurReference(): boolean {
        return this._validFournisseurReference;
    }
    set validFournisseurReference(value: boolean) {
        this._validFournisseurReference = value;
    }
    get validFournisseurNom(): boolean {
        return this._validFournisseurNom;
    }
    set validFournisseurNom(value: boolean) {
        this._validFournisseurNom = value;
    }
    get validFournisseurTelephone(): boolean {
        return this._validFournisseurTelephone;
    }
    set validFournisseurTelephone(value: boolean) {
        this._validFournisseurTelephone = value;
    }

    get validCategorieFournisseurLibelle(): boolean {
        return this._validCategorieFournisseurLibelle;
    }
    set validCategorieFournisseurLibelle(value: boolean) {
        this._validCategorieFournisseurLibelle = value;
    }
    get validCategorieFournisseurCode(): boolean {
        return this._validCategorieFournisseurCode;
    }
    set validCategorieFournisseurCode(value: boolean) {
        this._validCategorieFournisseurCode = value;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): FournisseurCriteria {
        return this.service.criteria;
    }

    set criteria(value: FournisseurCriteria) {
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
