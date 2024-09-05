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




import {EtatAchatAdminService} from 'src/app/shared/service/admin/achat/EtatAchatAdmin.service';
import {EtatAchatDto} from 'src/app/shared/model/achat/EtatAchat.model';
import {EtatAchatCriteria} from 'src/app/shared/criteria/achat/EtatAchatCriteria.model';



@Component({
  selector: 'app-etat-achat-edit-admin',
  templateUrl: './etat-achat-edit-admin.component.html'
})
export class EtatAchatEditAdminComponent implements OnInit {

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



    private _validEtatAchatCode = true;
    private _validEtatAchatLibelle = true;
    private _validEtatAchatStyle = true;




    constructor(private service: EtatAchatAdminService , @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
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
            this.item = new EtatAchatDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validEtatAchatCode = value;
        this.validEtatAchatLibelle = value;
        this.validEtatAchatStyle = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateEtatAchatCode();
        this.validateEtatAchatLibelle();
        this.validateEtatAchatStyle();
    }

    public validateEtatAchatCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatAchatCode = false;
        } else {
            this.validEtatAchatCode = true;
        }
    }

    public validateEtatAchatLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatAchatLibelle = false;
        } else {
            this.validEtatAchatLibelle = true;
        }
    }

    public validateEtatAchatStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
            this.errorMessages.push('Style non valide');
            this.validEtatAchatStyle = false;
        } else {
            this.validEtatAchatStyle = true;
        }
    }







    get validEtatAchatCode(): boolean {
        return this._validEtatAchatCode;
    }
    set validEtatAchatCode(value: boolean) {
        this._validEtatAchatCode = value;
    }
    get validEtatAchatLibelle(): boolean {
        return this._validEtatAchatLibelle;
    }
    set validEtatAchatLibelle(value: boolean) {
        this._validEtatAchatLibelle = value;
    }
    get validEtatAchatStyle(): boolean {
        return this._validEtatAchatStyle;
    }
    set validEtatAchatStyle(value: boolean) {
        this._validEtatAchatStyle = value;
    }


	get items(): Array<EtatAchatDto> {
        return this.service.items;
    }

    set items(value: Array<EtatAchatDto>) {
        this.service.items = value;
    }

    get item(): EtatAchatDto {
        return this.service.item;
    }

    set item(value: EtatAchatDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): EtatAchatCriteria {
        return this.service.criteria;
    }

    set criteria(value: EtatAchatCriteria) {
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
