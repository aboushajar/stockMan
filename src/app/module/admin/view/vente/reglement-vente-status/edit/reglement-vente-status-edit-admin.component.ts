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




import {ReglementVenteStatusAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteStatusAdmin.service';
import {ReglementVenteStatusDto} from 'src/app/shared/model/vente/ReglementVenteStatus.model';
import {ReglementVenteStatusCriteria} from 'src/app/shared/criteria/vente/ReglementVenteStatusCriteria.model';



@Component({
  selector: 'app-reglement-vente-status-edit-admin',
  templateUrl: './reglement-vente-status-edit-admin.component.html'
})
export class ReglementVenteStatusEditAdminComponent implements OnInit {

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



    private _validReglementVenteStatusCode = true;
    private _validReglementVenteStatusLibelle = true;
    private _validReglementVenteStatusStyle = true;




    constructor(private service: ReglementVenteStatusAdminService , @Inject(PLATFORM_ID) private platformId?) {
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
            this.item = new ReglementVenteStatusDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validReglementVenteStatusCode = value;
        this.validReglementVenteStatusLibelle = value;
        this.validReglementVenteStatusStyle = value;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateReglementVenteStatusCode();
        this.validateReglementVenteStatusLibelle();
        this.validateReglementVenteStatusStyle();
    }

    public validateReglementVenteStatusCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validReglementVenteStatusCode = false;
        } else {
            this.validReglementVenteStatusCode = true;
        }
    }

    public validateReglementVenteStatusLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validReglementVenteStatusLibelle = false;
        } else {
            this.validReglementVenteStatusLibelle = true;
        }
    }

    public validateReglementVenteStatusStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
            this.errorMessages.push('Style non valide');
            this.validReglementVenteStatusStyle = false;
        } else {
            this.validReglementVenteStatusStyle = true;
        }
    }







    get validReglementVenteStatusCode(): boolean {
        return this._validReglementVenteStatusCode;
    }
    set validReglementVenteStatusCode(value: boolean) {
        this._validReglementVenteStatusCode = value;
    }
    get validReglementVenteStatusLibelle(): boolean {
        return this._validReglementVenteStatusLibelle;
    }
    set validReglementVenteStatusLibelle(value: boolean) {
        this._validReglementVenteStatusLibelle = value;
    }
    get validReglementVenteStatusStyle(): boolean {
        return this._validReglementVenteStatusStyle;
    }
    set validReglementVenteStatusStyle(value: boolean) {
        this._validReglementVenteStatusStyle = value;
    }


	get items(): Array<ReglementVenteStatusDto> {
        return this.service.items;
    }

    set items(value: Array<ReglementVenteStatusDto>) {
        this.service.items = value;
    }

    get item(): ReglementVenteStatusDto {
        return this.service.item;
    }

    set item(value: ReglementVenteStatusDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): ReglementVenteStatusCriteria {
        return this.service.criteria;
    }

    set criteria(value: ReglementVenteStatusCriteria) {
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
