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




import {InventaireItemAdminService} from 'src/app/shared/service/admin/inventaire/InventaireItemAdmin.service';
import {InventaireItemDto} from 'src/app/shared/model/inventaire/InventaireItem.model';
import {InventaireItemCriteria} from 'src/app/shared/criteria/inventaire/InventaireItemCriteria.model';


import {InventaireDto} from 'src/app/shared/model/inventaire/Inventaire.model';
import {InventaireAdminService} from 'src/app/shared/service/admin/inventaire/InventaireAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';

@Component({
  selector: 'app-inventaire-item-edit-admin',
  templateUrl: './inventaire-item-edit-admin.component.html'
})
export class InventaireItemEditAdminComponent implements OnInit {

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



    private _validInventaireItemSousMarque = true;
    private _validInventaireItemQuantiteAnticipe = true;
    private _validInventaireItemQuantiteReelle = true;
    private _validInventaireItemDecalage = true;
    private _validInventaireItemInventaire = true;

    private _validSousMarqueLibelle = true;
    private _validSousMarqueCode = true;
    private _validSousMarqueStatutSousMarque = true;
    private _validInventaireDateInventaite = true;
    private _validInventaireDepot = true;



    constructor(private service: InventaireItemAdminService , private inventaireService: InventaireAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.sousMarqueService.findAll().subscribe((data) => this.sousMarques = data);
        this.inventaireService.findAll().subscribe((data) => this.inventaires = data);
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
            this.item = new InventaireItemDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validInventaireItemSousMarque = value;
        this.validInventaireItemQuantiteAnticipe = value;
        this.validInventaireItemQuantiteReelle = value;
        this.validInventaireItemDecalage = value;
        this.validInventaireItemInventaire = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateInventaireItemSousMarque();
        this.validateInventaireItemQuantiteAnticipe();
        this.validateInventaireItemQuantiteReelle();
        this.validateInventaireItemDecalage();
        this.validateInventaireItemInventaire();
    }

    public validateInventaireItemSousMarque(){
        if (this.stringUtilService.isEmpty(this.item.sousMarque)) {
            this.errorMessages.push('Sous marque non valide');
            this.validInventaireItemSousMarque = false;
        } else {
            this.validInventaireItemSousMarque = true;
        }
    }

    public validateInventaireItemQuantiteAnticipe(){
        if (this.stringUtilService.isEmpty(this.item.quantiteAnticipe)) {
            this.errorMessages.push('Quantite anticipe non valide');
            this.validInventaireItemQuantiteAnticipe = false;
        } else {
            this.validInventaireItemQuantiteAnticipe = true;
        }
    }

    public validateInventaireItemQuantiteReelle(){
        if (this.stringUtilService.isEmpty(this.item.quantiteReelle)) {
            this.errorMessages.push('Quantite reelle non valide');
            this.validInventaireItemQuantiteReelle = false;
        } else {
            this.validInventaireItemQuantiteReelle = true;
        }
    }

    public validateInventaireItemDecalage(){
        if (this.stringUtilService.isEmpty(this.item.decalage)) {
            this.errorMessages.push('Decalage non valide');
            this.validInventaireItemDecalage = false;
        } else {
            this.validInventaireItemDecalage = true;
        }
    }

    public validateInventaireItemInventaire(){
        if (this.stringUtilService.isEmpty(this.item.inventaire)) {
            this.errorMessages.push('Inventaire non valide');
            this.validInventaireItemInventaire = false;
        } else {
            this.validInventaireItemInventaire = true;
        }
    }




   public async openCreateInventaire(inventaire: string) {
        const isPermistted = await this.roleService.isPermitted('Inventaire', 'edit');
        if (isPermistted) {
             this.inventaire = new InventaireDto();
             this.createInventaireDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    get inventaire(): InventaireDto {
        return this.inventaireService.item;
    }
    set inventaire(value: InventaireDto) {
        this.inventaireService.item = value;
    }
    get inventaires(): Array<InventaireDto> {
        return this.inventaireService.items;
    }
    set inventaires(value: Array<InventaireDto>) {
        this.inventaireService.items = value;
    }
    get createInventaireDialog(): boolean {
        return this.inventaireService.createDialog;
    }
    set createInventaireDialog(value: boolean) {
        this.inventaireService.createDialog= value;
    }
    get sousMarque(): SousMarqueDto {
        return this.sousMarqueService.item;
    }
    set sousMarque(value: SousMarqueDto) {
        this.sousMarqueService.item = value;
    }
    get sousMarques(): Array<SousMarqueDto> {
        return this.sousMarqueService.items;
    }
    set sousMarques(value: Array<SousMarqueDto>) {
        this.sousMarqueService.items = value;
    }
    get createSousMarqueDialog(): boolean {
        return this.sousMarqueService.createDialog;
    }
    set createSousMarqueDialog(value: boolean) {
        this.sousMarqueService.createDialog= value;
    }


    get validInventaireItemSousMarque(): boolean {
        return this._validInventaireItemSousMarque;
    }
    set validInventaireItemSousMarque(value: boolean) {
        this._validInventaireItemSousMarque = value;
    }
    get validInventaireItemQuantiteAnticipe(): boolean {
        return this._validInventaireItemQuantiteAnticipe;
    }
    set validInventaireItemQuantiteAnticipe(value: boolean) {
        this._validInventaireItemQuantiteAnticipe = value;
    }
    get validInventaireItemQuantiteReelle(): boolean {
        return this._validInventaireItemQuantiteReelle;
    }
    set validInventaireItemQuantiteReelle(value: boolean) {
        this._validInventaireItemQuantiteReelle = value;
    }
    get validInventaireItemDecalage(): boolean {
        return this._validInventaireItemDecalage;
    }
    set validInventaireItemDecalage(value: boolean) {
        this._validInventaireItemDecalage = value;
    }
    get validInventaireItemInventaire(): boolean {
        return this._validInventaireItemInventaire;
    }
    set validInventaireItemInventaire(value: boolean) {
        this._validInventaireItemInventaire = value;
    }

    get validSousMarqueLibelle(): boolean {
        return this._validSousMarqueLibelle;
    }
    set validSousMarqueLibelle(value: boolean) {
        this._validSousMarqueLibelle = value;
    }
    get validSousMarqueCode(): boolean {
        return this._validSousMarqueCode;
    }
    set validSousMarqueCode(value: boolean) {
        this._validSousMarqueCode = value;
    }
    get validSousMarqueStatutSousMarque(): boolean {
        return this._validSousMarqueStatutSousMarque;
    }
    set validSousMarqueStatutSousMarque(value: boolean) {
        this._validSousMarqueStatutSousMarque = value;
    }
    get validInventaireDateInventaite(): boolean {
        return this._validInventaireDateInventaite;
    }
    set validInventaireDateInventaite(value: boolean) {
        this._validInventaireDateInventaite = value;
    }
    get validInventaireDepot(): boolean {
        return this._validInventaireDepot;
    }
    set validInventaireDepot(value: boolean) {
        this._validInventaireDepot = value;
    }

	get items(): Array<InventaireItemDto> {
        return this.service.items;
    }

    set items(value: Array<InventaireItemDto>) {
        this.service.items = value;
    }

    get item(): InventaireItemDto {
        return this.service.item;
    }

    set item(value: InventaireItemDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): InventaireItemCriteria {
        return this.service.criteria;
    }

    set criteria(value: InventaireItemCriteria) {
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
