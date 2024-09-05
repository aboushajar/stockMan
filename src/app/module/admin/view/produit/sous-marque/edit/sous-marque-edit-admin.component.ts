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




import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueCriteria} from 'src/app/shared/criteria/produit/SousMarqueCriteria.model';


import {MarqueDto} from 'src/app/shared/model/produit/Marque.model';
import {MarqueAdminService} from 'src/app/shared/service/admin/produit/MarqueAdmin.service';
import {StatutSousMarqueDto} from 'src/app/shared/model/produit/StatutSousMarque.model';
import {StatutSousMarqueAdminService} from 'src/app/shared/service/admin/produit/StatutSousMarqueAdmin.service';

@Component({
  selector: 'app-sous-marque-edit-admin',
  templateUrl: './sous-marque-edit-admin.component.html'
})
export class SousMarqueEditAdminComponent implements OnInit {

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



    private _validSousMarqueLibelle = true;
    private _validSousMarqueCode = true;
    private _validSousMarqueStatutSousMarque = true;

    private _validMarqueLibelle = true;
    private _validMarqueCode = true;
    private _validStatutSousMarqueLibelle = true;
    private _validStatutSousMarqueCode = true;



    constructor(private service: SousMarqueAdminService , private marqueService: MarqueAdminService, private statutSousMarqueService: StatutSousMarqueAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.marqueService.findAll().subscribe((data) => this.marques = data);
        this.statutSousMarqueService.findAll().subscribe((data) => this.statutSousMarques = data);
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
            this.item = new SousMarqueDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validSousMarqueLibelle = value;
        this.validSousMarqueCode = value;
        this.validSousMarqueStatutSousMarque = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateSousMarqueLibelle();
        this.validateSousMarqueCode();
        this.validateSousMarqueStatutSousMarque();
    }

    public validateSousMarqueLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSousMarqueLibelle = false;
        } else {
            this.validSousMarqueLibelle = true;
        }
    }

    public validateSousMarqueCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validSousMarqueCode = false;
        } else {
            this.validSousMarqueCode = true;
        }
    }

    public validateSousMarqueStatutSousMarque(){
        if (this.stringUtilService.isEmpty(this.item.statutSousMarque)) {
            this.errorMessages.push('Statut sous marque non valide');
            this.validSousMarqueStatutSousMarque = false;
        } else {
            this.validSousMarqueStatutSousMarque = true;
        }
    }




   public async openCreateMarque(marque: string) {
        const isPermistted = await this.roleService.isPermitted('Marque', 'edit');
        if (isPermistted) {
             this.marque = new MarqueDto();
             this.createMarqueDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
   public async openCreateStatutSousMarque(statutSousMarque: string) {
        const isPermistted = await this.roleService.isPermitted('StatutSousMarque', 'edit');
        if (isPermistted) {
             this.statutSousMarque = new StatutSousMarqueDto();
             this.createStatutSousMarqueDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    get marque(): MarqueDto {
        return this.marqueService.item;
    }
    set marque(value: MarqueDto) {
        this.marqueService.item = value;
    }
    get marques(): Array<MarqueDto> {
        return this.marqueService.items;
    }
    set marques(value: Array<MarqueDto>) {
        this.marqueService.items = value;
    }
    get createMarqueDialog(): boolean {
        return this.marqueService.createDialog;
    }
    set createMarqueDialog(value: boolean) {
        this.marqueService.createDialog= value;
    }
    get statutSousMarque(): StatutSousMarqueDto {
        return this.statutSousMarqueService.item;
    }
    set statutSousMarque(value: StatutSousMarqueDto) {
        this.statutSousMarqueService.item = value;
    }
    get statutSousMarques(): Array<StatutSousMarqueDto> {
        return this.statutSousMarqueService.items;
    }
    set statutSousMarques(value: Array<StatutSousMarqueDto>) {
        this.statutSousMarqueService.items = value;
    }
    get createStatutSousMarqueDialog(): boolean {
        return this.statutSousMarqueService.createDialog;
    }
    set createStatutSousMarqueDialog(value: boolean) {
        this.statutSousMarqueService.createDialog= value;
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

	get items(): Array<SousMarqueDto> {
        return this.service.items;
    }

    set items(value: Array<SousMarqueDto>) {
        this.service.items = value;
    }

    get item(): SousMarqueDto {
        return this.service.item;
    }

    set item(value: SousMarqueDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): SousMarqueCriteria {
        return this.service.criteria;
    }

    set criteria(value: SousMarqueCriteria) {
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
