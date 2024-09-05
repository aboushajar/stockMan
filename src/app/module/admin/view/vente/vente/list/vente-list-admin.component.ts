import {Component, OnInit} from '@angular/core';
import {VenteAdminService} from 'src/app/shared/service/admin/vente/VenteAdmin.service';
import {VenteDto} from 'src/app/shared/model/vente/Vente.model';
import {VenteCriteria} from 'src/app/shared/criteria/vente/VenteCriteria.model';


import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';

import {AuthService} from 'src/app/zynerator/security/shared/service/Auth.service';
import {ExportService} from 'src/app/zynerator/util/Export.service';


import {ReglementVenteStatusDto} from 'src/app/shared/model/vente/ReglementVenteStatus.model';
import {ReglementVenteStatusAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteStatusAdmin.service';
import {VenteItemDto} from 'src/app/shared/model/vente/VenteItem.model';
import {VenteItemAdminService} from 'src/app/shared/service/admin/vente/VenteItemAdmin.service';
import {ReglementVenteDto} from 'src/app/shared/model/vente/ReglementVente.model';
import {ReglementVenteAdminService} from 'src/app/shared/service/admin/vente/ReglementVenteAdmin.service';
import {MarqueDto} from 'src/app/shared/model/produit/Marque.model';
import {MarqueAdminService} from 'src/app/shared/service/admin/produit/MarqueAdmin.service';
import {TauxTvaDto} from 'src/app/shared/model/commun/TauxTva.model';
import {TauxTvaAdminService} from 'src/app/shared/service/admin/commun/TauxTvaAdmin.service';
import {CategorieProduitDto} from 'src/app/shared/model/produit/CategorieProduit.model';
import {CategorieProduitAdminService} from 'src/app/shared/service/admin/produit/CategorieProduitAdmin.service';
import {ModeReglementDto} from 'src/app/shared/model/commun/ModeReglement.model';
import {ModeReglementAdminService} from 'src/app/shared/service/admin/commun/ModeReglementAdmin.service';
import {EtatVenteDto} from 'src/app/shared/model/vente/EtatVente.model';
import {EtatVenteAdminService} from 'src/app/shared/service/admin/vente/EtatVenteAdmin.service';
import {PointVenteDto} from 'src/app/shared/model/depot/PointVente.model';
import {PointVenteAdminService} from 'src/app/shared/service/admin/depot/PointVenteAdmin.service';
import {ClientDto} from 'src/app/shared/model/client/Client.model';
import {ClientAdminService} from 'src/app/shared/service/admin/client/ClientAdmin.service';
import {StockDto} from 'src/app/shared/model/depot/Stock.model';
import {StockAdminService} from 'src/app/shared/service/admin/depot/StockAdmin.service';
import {SousMarqueDto} from 'src/app/shared/model/produit/SousMarque.model';
import {SousMarqueAdminService} from 'src/app/shared/service/admin/produit/SousMarqueAdmin.service';


@Component({
  selector: 'app-vente-list-admin',
  templateUrl: './vente-list-admin.component.html'
})
export class VenteListAdminComponent implements OnInit {

    protected fileName = 'Vente';

    protected findByCriteriaShow = false;
    protected cols: any[] = [];
    protected excelPdfButons: MenuItem[];
    protected exportData: any[] = [];
    protected criteriaData: any[] = [];
    protected _totalRecords = 0;
    private _pdfName: string;


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    protected authService: AuthService;
    protected exportService: ExportService;
    protected excelFile: File | undefined;
    protected enableSecurity = false;


    clients: Array<ClientDto>;
    categorieProduits: Array<CategorieProduitDto>;
    tauxTvas: Array<TauxTvaDto>;
    pointVentes: Array<PointVenteDto>;
    etatVentes: Array<EtatVenteDto>;


    constructor( private service: VenteAdminService  , private marqueService: MarqueAdminService, private reglementVenteStatusService: ReglementVenteStatusAdminService, private tauxTvaService: TauxTvaAdminService, private categorieProduitService: CategorieProduitAdminService, private venteItemService: VenteItemAdminService, private modeReglementService: ModeReglementAdminService, private etatVenteService: EtatVenteAdminService, private pointVenteService: PointVenteAdminService, private reglementVenteService: ReglementVenteAdminService, private clientService: ClientAdminService, private stockService: StockAdminService, private sousMarqueService: SousMarqueAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.authService = ServiceLocator.injector.get(AuthService);
        this.exportService = ServiceLocator.injector.get(ExportService);
    }

    ngOnInit(): void {
        this.findPaginatedByCriteria();
        this.initExport();
        this.initCol();
        this.loadClient();
        this.loadCategorieProduit();
        this.loadTauxTva();
        this.loadPointVente();
        this.loadEtatVente();

    }




    public onExcelFileSelected(event: any): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.excelFile = input.files[0];
        }
    }

    public importExcel(): void {
        if (this.excelFile) {
            this.service.importExcel(this.excelFile).subscribe(
                response => {
                    console.log('File uploaded successfully!', response);
                },
                error => {
                    console.error('Error uploading file:', error);
                }
            );
        }
    }

    public findPaginatedByCriteria() {
        this.service.findPaginatedByCriteria(this.criteria).subscribe(paginatedItems => {
            this.items = paginatedItems.list;
            this.totalRecords = paginatedItems.dataSize;
            this.selections = new Array<VenteDto>();
        }, error => console.log(error));
    }

    public onPage(event: any) {
        this.criteria.page = event.page;
        this.criteria.maxResults = event.rows;
        this.findPaginatedByCriteria();
    }

    public async edit(dto: VenteDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            console.log(res);
            this.editDialog = true;
        });

    }

    public async view(dto: VenteDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(res => {
            this.item = res;
            this.viewDialog = true;
        });
    }

    public async openCreate() {
        this.item = new VenteDto();
        this.createDialog = true;
    }

    public async deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteMultiple().subscribe(() => {
                    this.items = this.items.filter(item => !this.selections.includes(item));
                    this.selections = new Array<VenteDto>();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Les éléments sélectionnés ont été supprimés',
                        life: 3000
                    });

                }, error => console.log(error));
            }
        });
    }


    public isSelectionDisabled(): boolean {
        return this.selections == null || this.selections.length == 0;
    }


    public async delete(dto: VenteDto) {

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delete(dto).subscribe(status => {
                    if (status > 0) {
                        const position = this.items.indexOf(dto);
                        position > -1 ? this.items.splice(position, 1) : false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Element Supprimé',
                            life: 3000
                        });
                    }

                }, error => console.log(error));
            }
        });

    }

    public async duplicate(dto: VenteDto) {
        this.service.findByIdWithAssociatedList(dto).subscribe(
            res => {
                this.initDuplicate(res);
                this.item = res;
                this.item.id = null;
                this.createDialog = true;
            });
    }

    // TODO : check if correct
    public initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }

    public exportPdf(dto: VenteDto): void {
        this.service.exportPdf(dto).subscribe((data: ArrayBuffer) => {
            const blob = new Blob([data], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.pdfName;
            link.setAttribute('target', '_blank'); // open link in new tab
            link.click();
            window.URL.revokeObjectURL(url);
        }, (error) => {
            console.error(error); // handle any errors that occur
        });
    }

    public showSearch(): void {
        this.findByCriteriaShow = !this.findByCriteriaShow;
    }


    update() {
        this.service.edit().subscribe(data => {
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = data;
            this.editDialog = false;
            this.item = new VenteDto();
        } , error => {
            console.log(error);
        });
    }

    public save() {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;


                this.item = new VenteDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }
        }, error => {
            console.log(error);
        });
    }

// add


    public initCol() {
        this.cols = [
            {field: 'code', header: 'Code'},
            {field: 'client?.nom', header: 'Client'},
            {field: 'dateVente', header: 'Date vente'},
            {field: 'categorieProduit?.libelle', header: 'Categorie produit'},
            {field: 'montantTotalHt', header: 'Montant total ht'},
            {field: 'tauxTva?.libelle', header: 'Taux tva'},
            {field: 'montantTotalTva', header: 'Montant total tva'},
            {field: 'montantTotalTtc', header: 'Montant total ttc'},
            {field: 'remise', header: 'Remise'},
            {field: 'montantTotalApresRemise', header: 'Montant total apres remise'},
            {field: 'montantPaye', header: 'Montant paye'},
            {field: 'reste', header: 'Reste'},
            {field: 'pointVente?.libelle', header: 'Point vente'},
            {field: 'etatVente?.libelle', header: 'Etat vente'},
        ];
    }


    public async loadClient(){
        this.clientService.findAllOptimized().subscribe(clients => this.clients = clients, error => console.log(error))
    }
    public async loadCategorieProduit(){
        this.categorieProduitService.findAllOptimized().subscribe(categorieProduits => this.categorieProduits = categorieProduits, error => console.log(error))
    }
    public async loadTauxTva(){
        this.tauxTvaService.findAllOptimized().subscribe(tauxTvas => this.tauxTvas = tauxTvas, error => console.log(error))
    }
    public async loadPointVente(){
        this.pointVenteService.findAllOptimized().subscribe(pointVentes => this.pointVentes = pointVentes, error => console.log(error))
    }
    public async loadEtatVente(){
        this.etatVenteService.findAllOptimized().subscribe(etatVentes => this.etatVentes = etatVentes, error => console.log(error))
    }


	public initDuplicate(res: VenteDto) {
        if (res.venteItems != null) {
             res.venteItems.forEach(d => { d.vente = null; d.id = null; });
        }
        if (res.reglementVentes != null) {
             res.reglementVentes.forEach(d => { d.vente = null; d.id = null; });
        }
	}



   public prepareColumnExport(): void {
        this.exportData = this.items.map(e => {
            return {
                 'Code': e.code ,
                'Client': e.client?.nom ,
                'Date vente': this.datePipe.transform(e.dateVente , 'dd/MM/yyyy hh:mm'),
                'Categorie produit': e.categorieProduit?.libelle ,
                 'Montant total ht': e.montantTotalHt ,
                'Taux tva': e.tauxTva?.libelle ,
                 'Montant total tva': e.montantTotalTva ,
                 'Montant total ttc': e.montantTotalTtc ,
                 'Remise': e.remise ,
                 'Montant total apres remise': e.montantTotalApresRemise ,
                 'Montant paye': e.montantPaye ,
                 'Reste': e.reste ,
                'Point vente': e.pointVente?.libelle ,
                'Etat vente': e.etatVente?.libelle ,
                 'Remarque': e.remarque ,
            }
        });

        this.criteriaData = [{
            'Code': this.criteria.code ? this.criteria.code : environment.emptyForExport ,
        //'Client': this.criteria.client?.nom ? this.criteria.client?.nom : environment.emptyForExport ,
            'Date vente Min': this.criteria.dateVenteFrom ? this.datePipe.transform(this.criteria.dateVenteFrom , this.dateFormat) : environment.emptyForExport ,
            'Date vente Max': this.criteria.dateVenteTo ? this.datePipe.transform(this.criteria.dateVenteTo , this.dateFormat) : environment.emptyForExport ,
        //'Categorie produit': this.criteria.categorieProduit?.libelle ? this.criteria.categorieProduit?.libelle : environment.emptyForExport ,
            'Montant total ht Min': this.criteria.montantTotalHtMin ? this.criteria.montantTotalHtMin : environment.emptyForExport ,
            'Montant total ht Max': this.criteria.montantTotalHtMax ? this.criteria.montantTotalHtMax : environment.emptyForExport ,
        //'Taux tva': this.criteria.tauxTva?.libelle ? this.criteria.tauxTva?.libelle : environment.emptyForExport ,
            'Montant total tva Min': this.criteria.montantTotalTvaMin ? this.criteria.montantTotalTvaMin : environment.emptyForExport ,
            'Montant total tva Max': this.criteria.montantTotalTvaMax ? this.criteria.montantTotalTvaMax : environment.emptyForExport ,
            'Montant total ttc Min': this.criteria.montantTotalTtcMin ? this.criteria.montantTotalTtcMin : environment.emptyForExport ,
            'Montant total ttc Max': this.criteria.montantTotalTtcMax ? this.criteria.montantTotalTtcMax : environment.emptyForExport ,
            'Remise Min': this.criteria.remiseMin ? this.criteria.remiseMin : environment.emptyForExport ,
            'Remise Max': this.criteria.remiseMax ? this.criteria.remiseMax : environment.emptyForExport ,
            'Montant total apres remise Min': this.criteria.montantTotalApresRemiseMin ? this.criteria.montantTotalApresRemiseMin : environment.emptyForExport ,
            'Montant total apres remise Max': this.criteria.montantTotalApresRemiseMax ? this.criteria.montantTotalApresRemiseMax : environment.emptyForExport ,
            'Montant paye Min': this.criteria.montantPayeMin ? this.criteria.montantPayeMin : environment.emptyForExport ,
            'Montant paye Max': this.criteria.montantPayeMax ? this.criteria.montantPayeMax : environment.emptyForExport ,
            'Reste Min': this.criteria.resteMin ? this.criteria.resteMin : environment.emptyForExport ,
            'Reste Max': this.criteria.resteMax ? this.criteria.resteMax : environment.emptyForExport ,
        //'Point vente': this.criteria.pointVente?.libelle ? this.criteria.pointVente?.libelle : environment.emptyForExport ,
        //'Etat vente': this.criteria.etatVente?.libelle ? this.criteria.etatVente?.libelle : environment.emptyForExport ,
            'Remarque': this.criteria.remarque ? this.criteria.remarque : environment.emptyForExport ,
        }];
      }



    get items(): Array<VenteDto> {
        return this.service.items;
    }

    set items(value: Array<VenteDto>) {
        this.service.items = value;
    }

    get selections(): Array<VenteDto> {
        return this.service.selections;
    }

    set selections(value: Array<VenteDto>) {
        this.service.selections = value;
    }

    get item(): VenteDto {
        return this.service.item;
    }

    set item(value: VenteDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): VenteCriteria {
        return this.service.criteria;
    }

    set criteria(value: VenteCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


    get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(value: number) {
        this._totalRecords = value;
    }

    get pdfName(): string {
        return this._pdfName;
    }

    set pdfName(value: string) {
        this._pdfName = value;
    }

    get createActionIsValid(): boolean {
        return this.service.createActionIsValid;
    }

    set createActionIsValid(value: boolean) {
        this.service.createActionIsValid = value;
    }


    get editActionIsValid(): boolean {
        return this.service.editActionIsValid;
    }

    set editActionIsValid(value: boolean) {
        this.service.editActionIsValid = value;
    }

    get listActionIsValid(): boolean {
        return this.service.listActionIsValid;
    }

    set listActionIsValid(value: boolean) {
        this.service.listActionIsValid = value;
    }

    get deleteActionIsValid(): boolean {
        return this.service.deleteActionIsValid;
    }

    set deleteActionIsValid(value: boolean) {
        this.service.deleteActionIsValid = value;
    }


    get viewActionIsValid(): boolean {
        return this.service.viewActionIsValid;
    }

    set viewActionIsValid(value: boolean) {
        this.service.viewActionIsValid = value;
    }

    get duplicateActionIsValid(): boolean {
        return this.service.duplicateActionIsValid;
    }

    set duplicateActionIsValid(value: boolean) {
        this.service.duplicateActionIsValid = value;
    }

    get createAction(): string {
        return this.service.createAction;
    }

    set createAction(value: string) {
        this.service.createAction = value;
    }

    get listAction(): string {
        return this.service.listAction;
    }

    set listAction(value: string) {
        this.service.listAction = value;
    }

    get editAction(): string {
        return this.service.editAction;
    }

    set editAction(value: string) {
        this.service.editAction = value;
    }

    get deleteAction(): string {
        return this.service.deleteAction;
    }

    set deleteAction(value: string) {
        this.service.deleteAction = value;
    }

    get viewAction(): string {
        return this.service.viewAction;
    }

    set viewAction(value: string) {
        this.service.viewAction = value;
    }

    get duplicateAction(): string {
        return this.service.duplicateAction;
    }

    set duplicateAction(value: string) {
        this.service.duplicateAction = value;
    }

    get entityName(): string {
        return this.service.entityName;
    }

    set entityName(value: string) {
        this.service.entityName = value;
    }
}
