import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementCriteria} from 'src/app/shared/criteria/commun/ModeReglementCriteria.model';
@Component({
  selector: 'app-mode-reglement-create-admin',
  templateUrl: './mode-reglement-create-admin.component.html'
})
export class ModeReglementCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validModeReglementCode = true;
   private _validModeReglementLibelle = true;
   private _validModeReglementStyle = true;

	constructor(private service: ModeReglementAdminService , @Inject(PLATFORM_ID) private platformId? ) {
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
                this.item = new ModeReglementDto();
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
        this.validModeReglementCode = value;
        this.validModeReglementLibelle = value;
        this.validModeReglementStyle = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateModeReglementCode();
        this.validateModeReglementLibelle();
        this.validateModeReglementStyle();
    }

    public validateModeReglementCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validModeReglementCode = false;
        } else {
            this.validModeReglementCode = true;
        }
    }
    public validateModeReglementLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validModeReglementLibelle = false;
        } else {
            this.validModeReglementLibelle = true;
        }
    }
    public validateModeReglementStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
        this.errorMessages.push('Style non valide');
        this.validModeReglementStyle = false;
        } else {
            this.validModeReglementStyle = true;
        }
    }






    get validModeReglementCode(): boolean {
        return this._validModeReglementCode;
    }

    set validModeReglementCode(value: boolean) {
         this._validModeReglementCode = value;
    }
    get validModeReglementLibelle(): boolean {
        return this._validModeReglementLibelle;
    }

    set validModeReglementLibelle(value: boolean) {
         this._validModeReglementLibelle = value;
    }
    get validModeReglementStyle(): boolean {
        return this._validModeReglementStyle;
    }

    set validModeReglementStyle(value: boolean) {
         this._validModeReglementStyle = value;
    }



    get items(): Array<ModeReglementDto> {
        return this.service.items;
    }

    set items(value: Array<ModeReglementDto>) {
        this.service.items = value;
    }

    get item(): ModeReglementDto {
        return this.service.item;
    }

    set item(value: ModeReglementDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ModeReglementCriteria {
        return this.service.criteria;
    }

    set criteria(value: ModeReglementCriteria) {
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
