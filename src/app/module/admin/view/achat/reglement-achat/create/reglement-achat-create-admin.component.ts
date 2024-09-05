import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {ReglementAchatAdminService} from 'src/app/shared/service/admin/achat/ReglementAchatAdmin.service';
import {ReglementAchatDto} from 'src/app/shared/model/achat/ReglementAchat.model';
import {ReglementAchatCriteria} from 'src/app/shared/criteria/achat/ReglementAchatCriteria.model';
import {ReglementAchatStatusDto} from 'src/app/shared/model/achat/ReglementAchatStatus.model';
import {ReglementAchatStatusAdminService} from 'src/app/shared/service/admin/achat/ReglementAchatStatusAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
import {AchatDto} from 'src/app/shared/model/achat/Achat.model';
import {AchatAdminService} from 'src/app/shared/service/admin/achat/AchatAdmin.service';
@Component({
  selector: 'app-reglement-achat-create-admin',
  templateUrl: './reglement-achat-create-admin.component.html'
})
export class ReglementAchatCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validReglementAchatDateReglement = true;
   private _validReglementAchatModeReglement = true;
   private _validReglementAchatAchat = true;
    private _validModeReglementCode = true;
    private _validModeReglementLibelle = true;
    private _validModeReglementStyle = true;
    private _validAchatCode = true;
    private _validAchatLibelle = true;
    private _validAchatFournisseur = true;
    private _validAchatDateAchat = true;
    private _validAchatMontantPaye = true;
    private _validAchatReste = true;
    private _validReglementAchatStatusCode = true;
    private _validReglementAchatStatusLibelle = true;
    private _validReglementAchatStatusStyle = true;

	constructor(private service: ReglementAchatAdminService , private reglementAchatStatusService: ReglementAchatStatusAdminService, private modeReglementService: ModeReglementAdminService, private achatService: AchatAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.modeReglementService.findAll().subscribe((data) => this.modeReglements = data);
        this.achatService.findAll().subscribe((data) => this.achats = data);
        this.reglementAchatStatusService.findAll().subscribe((data) => this.reglementAchatStatuss = data);
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
                this.item = new ReglementAchatDto();
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
        this.validReglementAchatDateReglement = value;
        this.validReglementAchatModeReglement = value;
        this.validReglementAchatAchat = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateReglementAchatDateReglement();
        this.validateReglementAchatModeReglement();
        this.validateReglementAchatAchat();
    }

    public validateReglementAchatDateReglement(){
        if (this.stringUtilService.isEmpty(this.item.dateReglement)) {
        this.errorMessages.push('Date reglement non valide');
        this.validReglementAchatDateReglement = false;
        } else {
            this.validReglementAchatDateReglement = true;
        }
    }
    public validateReglementAchatModeReglement(){
        if (this.stringUtilService.isEmpty(this.item.modeReglement)) {
        this.errorMessages.push('Mode reglement non valide');
        this.validReglementAchatModeReglement = false;
        } else {
            this.validReglementAchatModeReglement = true;
        }
    }
    public validateReglementAchatAchat(){
        if (this.stringUtilService.isEmpty(this.item.achat)) {
        this.errorMessages.push('Achat non valide');
        this.validReglementAchatAchat = false;
        } else {
            this.validReglementAchatAchat = true;
        }
    }


    public async openCreateReglementAchatStatus(reglementAchatStatus: string) {
    const isPermistted = await this.roleService.isPermitted('ReglementAchatStatus', 'add');
    if(isPermistted) {
         this.reglementAchatStatus = new ReglementAchatStatusDto();
         this.createReglementAchatStatusDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }
    public async openCreateAchat(achat: string) {
    const isPermistted = await this.roleService.isPermitted('Achat', 'add');
    if(isPermistted) {
         this.achat = new AchatDto();
         this.createAchatDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get reglementAchatStatus(): ReglementAchatStatusDto {
        return this.reglementAchatStatusService.item;
    }
    set reglementAchatStatus(value: ReglementAchatStatusDto) {
        this.reglementAchatStatusService.item = value;
    }
    get reglementAchatStatuss(): Array<ReglementAchatStatusDto> {
        return this.reglementAchatStatusService.items;
    }
    set reglementAchatStatuss(value: Array<ReglementAchatStatusDto>) {
        this.reglementAchatStatusService.items = value;
    }
    get createReglementAchatStatusDialog(): boolean {
        return this.reglementAchatStatusService.createDialog;
    }
    set createReglementAchatStatusDialog(value: boolean) {
        this.reglementAchatStatusService.createDialog= value;
    }
    get modeReglement(): ModeReglementDto {
        return this.modeReglementService.item;
    }
    set modeReglement(value: ModeReglementDto) {
        this.modeReglementService.item = value;
    }
    get modeReglements(): Array<ModeReglementDto> {
        return this.modeReglementService.items;
    }
    set modeReglements(value: Array<ModeReglementDto>) {
        this.modeReglementService.items = value;
    }
    get createModeReglementDialog(): boolean {
        return this.modeReglementService.createDialog;
    }
    set createModeReglementDialog(value: boolean) {
        this.modeReglementService.createDialog= value;
    }
    get achat(): AchatDto {
        return this.achatService.item;
    }
    set achat(value: AchatDto) {
        this.achatService.item = value;
    }
    get achats(): Array<AchatDto> {
        return this.achatService.items;
    }
    set achats(value: Array<AchatDto>) {
        this.achatService.items = value;
    }
    get createAchatDialog(): boolean {
        return this.achatService.createDialog;
    }
    set createAchatDialog(value: boolean) {
        this.achatService.createDialog= value;
    }



    get validReglementAchatDateReglement(): boolean {
        return this._validReglementAchatDateReglement;
    }

    set validReglementAchatDateReglement(value: boolean) {
         this._validReglementAchatDateReglement = value;
    }
    get validReglementAchatModeReglement(): boolean {
        return this._validReglementAchatModeReglement;
    }

    set validReglementAchatModeReglement(value: boolean) {
         this._validReglementAchatModeReglement = value;
    }
    get validReglementAchatAchat(): boolean {
        return this._validReglementAchatAchat;
    }

    set validReglementAchatAchat(value: boolean) {
         this._validReglementAchatAchat = value;
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
    get validAchatCode(): boolean {
        return this._validAchatCode;
    }
    set validAchatCode(value: boolean) {
        this._validAchatCode = value;
    }
    get validAchatLibelle(): boolean {
        return this._validAchatLibelle;
    }
    set validAchatLibelle(value: boolean) {
        this._validAchatLibelle = value;
    }
    get validAchatFournisseur(): boolean {
        return this._validAchatFournisseur;
    }
    set validAchatFournisseur(value: boolean) {
        this._validAchatFournisseur = value;
    }
    get validAchatDateAchat(): boolean {
        return this._validAchatDateAchat;
    }
    set validAchatDateAchat(value: boolean) {
        this._validAchatDateAchat = value;
    }
    get validAchatMontantPaye(): boolean {
        return this._validAchatMontantPaye;
    }
    set validAchatMontantPaye(value: boolean) {
        this._validAchatMontantPaye = value;
    }
    get validAchatReste(): boolean {
        return this._validAchatReste;
    }
    set validAchatReste(value: boolean) {
        this._validAchatReste = value;
    }
    get validReglementAchatStatusCode(): boolean {
        return this._validReglementAchatStatusCode;
    }
    set validReglementAchatStatusCode(value: boolean) {
        this._validReglementAchatStatusCode = value;
    }
    get validReglementAchatStatusLibelle(): boolean {
        return this._validReglementAchatStatusLibelle;
    }
    set validReglementAchatStatusLibelle(value: boolean) {
        this._validReglementAchatStatusLibelle = value;
    }
    get validReglementAchatStatusStyle(): boolean {
        return this._validReglementAchatStatusStyle;
    }
    set validReglementAchatStatusStyle(value: boolean) {
        this._validReglementAchatStatusStyle = value;
    }


    get items(): Array<ReglementAchatDto> {
        return this.service.items;
    }

    set items(value: Array<ReglementAchatDto>) {
        this.service.items = value;
    }

    get item(): ReglementAchatDto {
        return this.service.item;
    }

    set item(value: ReglementAchatDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ReglementAchatCriteria {
        return this.service.criteria;
    }

    set criteria(value: ReglementAchatCriteria) {
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
