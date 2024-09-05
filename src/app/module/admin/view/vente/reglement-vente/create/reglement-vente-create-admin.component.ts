import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {ReglementVenteAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteAdmin.service';
import {ReglementVenteDto} from 'src/app/shared/model/vente/ReglementVente.model';
import {ReglementVenteCriteria} from 'src/app/shared/criteria/vente/ReglementVenteCriteria.model';
import {ReglementVenteStatusDto} from 'src/app/shared/model/vente/ReglementVenteStatus.model';
import {ReglementVenteStatusAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteStatusAdmin.service';
import {VenteDto} from 'src/app/shared/model/vente/Vente.model';
import {VenteAdminService} from 'src/app/shared/service/admin/vente/VenteAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
@Component({
  selector: 'app-reglement-vente-create-admin',
  templateUrl: './reglement-vente-create-admin.component.html'
})
export class ReglementVenteCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validReglementVenteDateReglement = true;
   private _validReglementVenteModeReglement = true;
   private _validReglementVenteVente = true;
    private _validModeReglementCode = true;
    private _validModeReglementLibelle = true;
    private _validModeReglementStyle = true;
    private _validVenteCode = true;
    private _validVenteClient = true;
    private _validVenteDateVente = true;
    private _validVenteMontantPaye = true;
    private _validVenteReste = true;
    private _validReglementVenteStatusCode = true;
    private _validReglementVenteStatusLibelle = true;
    private _validReglementVenteStatusStyle = true;

	constructor(private service: ReglementVenteAdminService , private reglementVenteStatusService: ReglementVenteStatusAdminService, private venteService: VenteAdminService, private modeReglementService: ModeReglementAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.modeReglementService.findAll().subscribe((data) => this.modeReglements = data);
        this.venteService.findAll().subscribe((data) => this.ventes = data);
        this.reglementVenteStatusService.findAll().subscribe((data) => this.reglementVenteStatuss = data);
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
                this.item = new ReglementVenteDto();
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
        this.validReglementVenteDateReglement = value;
        this.validReglementVenteModeReglement = value;
        this.validReglementVenteVente = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateReglementVenteDateReglement();
        this.validateReglementVenteModeReglement();
        this.validateReglementVenteVente();
    }

    public validateReglementVenteDateReglement(){
        if (this.stringUtilService.isEmpty(this.item.dateReglement)) {
        this.errorMessages.push('Date reglement non valide');
        this.validReglementVenteDateReglement = false;
        } else {
            this.validReglementVenteDateReglement = true;
        }
    }
    public validateReglementVenteModeReglement(){
        if (this.stringUtilService.isEmpty(this.item.modeReglement)) {
        this.errorMessages.push('Mode reglement non valide');
        this.validReglementVenteModeReglement = false;
        } else {
            this.validReglementVenteModeReglement = true;
        }
    }
    public validateReglementVenteVente(){
        if (this.stringUtilService.isEmpty(this.item.vente)) {
        this.errorMessages.push('Vente non valide');
        this.validReglementVenteVente = false;
        } else {
            this.validReglementVenteVente = true;
        }
    }


    public async openCreateReglementVenteStatus(reglementVenteStatus: string) {
    const isPermistted = await this.roleService.isPermitted('ReglementVenteStatus', 'add');
    if(isPermistted) {
         this.reglementVenteStatus = new ReglementVenteStatusDto();
         this.createReglementVenteStatusDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }
    public async openCreateVente(vente: string) {
    const isPermistted = await this.roleService.isPermitted('Vente', 'add');
    if(isPermistted) {
         this.vente = new VenteDto();
         this.createVenteDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get reglementVenteStatus(): ReglementVenteStatusDto {
        return this.reglementVenteStatusService.item;
    }
    set reglementVenteStatus(value: ReglementVenteStatusDto) {
        this.reglementVenteStatusService.item = value;
    }
    get reglementVenteStatuss(): Array<ReglementVenteStatusDto> {
        return this.reglementVenteStatusService.items;
    }
    set reglementVenteStatuss(value: Array<ReglementVenteStatusDto>) {
        this.reglementVenteStatusService.items = value;
    }
    get createReglementVenteStatusDialog(): boolean {
        return this.reglementVenteStatusService.createDialog;
    }
    set createReglementVenteStatusDialog(value: boolean) {
        this.reglementVenteStatusService.createDialog= value;
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
    get vente(): VenteDto {
        return this.venteService.item;
    }
    set vente(value: VenteDto) {
        this.venteService.item = value;
    }
    get ventes(): Array<VenteDto> {
        return this.venteService.items;
    }
    set ventes(value: Array<VenteDto>) {
        this.venteService.items = value;
    }
    get createVenteDialog(): boolean {
        return this.venteService.createDialog;
    }
    set createVenteDialog(value: boolean) {
        this.venteService.createDialog= value;
    }



    get validReglementVenteDateReglement(): boolean {
        return this._validReglementVenteDateReglement;
    }

    set validReglementVenteDateReglement(value: boolean) {
         this._validReglementVenteDateReglement = value;
    }
    get validReglementVenteModeReglement(): boolean {
        return this._validReglementVenteModeReglement;
    }

    set validReglementVenteModeReglement(value: boolean) {
         this._validReglementVenteModeReglement = value;
    }
    get validReglementVenteVente(): boolean {
        return this._validReglementVenteVente;
    }

    set validReglementVenteVente(value: boolean) {
         this._validReglementVenteVente = value;
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
    get validVenteCode(): boolean {
        return this._validVenteCode;
    }
    set validVenteCode(value: boolean) {
        this._validVenteCode = value;
    }
    get validVenteClient(): boolean {
        return this._validVenteClient;
    }
    set validVenteClient(value: boolean) {
        this._validVenteClient = value;
    }
    get validVenteDateVente(): boolean {
        return this._validVenteDateVente;
    }
    set validVenteDateVente(value: boolean) {
        this._validVenteDateVente = value;
    }
    get validVenteMontantPaye(): boolean {
        return this._validVenteMontantPaye;
    }
    set validVenteMontantPaye(value: boolean) {
        this._validVenteMontantPaye = value;
    }
    get validVenteReste(): boolean {
        return this._validVenteReste;
    }
    set validVenteReste(value: boolean) {
        this._validVenteReste = value;
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


    get items(): Array<ReglementVenteDto> {
        return this.service.items;
    }

    set items(value: Array<ReglementVenteDto>) {
        this.service.items = value;
    }

    get item(): ReglementVenteDto {
        return this.service.item;
    }

    set item(value: ReglementVenteDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ReglementVenteCriteria {
        return this.service.criteria;
    }

    set criteria(value: ReglementVenteCriteria) {
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
