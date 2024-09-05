import {TauxTvaDto} from '../commun/TauxTva.model';
import {CategorieProduitDto} from '../produit/CategorieProduit.model';
import {VenteItemDto} from './VenteItem.model';
import {EtatVenteDto} from './EtatVente.model';
import {PointVenteDto} from '../depot/PointVente.model';
import {ReglementVenteDto} from './ReglementVente.model';
import {ClientDto} from '../client/Client.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class VenteDto extends BaseDto{

    public code: string;

   public dateVente: Date;

    public montantTotalHt: null | number;

    public montantTotalTva: null | number;

    public montantTotalTtc: null | number;

    public remise: null | number;

    public montantTotalApresRemise: null | number;

    public montantPaye: null | number;

    public reste: null | number;

    public remarque: string;

    public client: ClientDto ;
    public categorieProduit: CategorieProduitDto ;
    public tauxTva: TauxTvaDto ;
    public pointVente: PointVenteDto ;
    public etatVente: EtatVenteDto ;
     public venteItems: Array<VenteItemDto>;
     public reglementVentes: Array<ReglementVenteDto>;


    constructor() {
        super();

        this.code = '';
        this.dateVente = null;
        this.montantTotalHt = null;
        this.montantTotalTva = null;
        this.montantTotalTtc = null;
        this.remise = null;
        this.montantTotalApresRemise = null;
        this.montantPaye = null;
        this.reste = null;
        this.remarque = '';
        this.client = new ClientDto() ;
        this.categorieProduit = new CategorieProduitDto() ;
        this.tauxTva = new TauxTvaDto() ;
        this.etatVente = new EtatVenteDto() ;
        this.venteItems = new Array<VenteItemDto>();
        this.reglementVentes = new Array<ReglementVenteDto>();

        }

}
