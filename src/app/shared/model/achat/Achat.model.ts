import {FournisseurDto} from '../fournisseur/Fournisseur.model';
import {AchatItemDto} from './AchatItem.model';
import {TauxTvaDto} from '../commun/TauxTva.model';
import {CategorieProduitDto} from '../produit/CategorieProduit.model';
import {PointVenteDto} from '../depot/PointVente.model';
import {ReglementAchatDto} from './ReglementAchat.model';
import {EtatAchatDto} from './EtatAchat.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class AchatDto extends BaseDto{

    public code: string;

    public libelle: string;

   public entreeStock: null | boolean;

   public dateAchat: Date;

    public montantHt: null | number;

    public montantTva: null | number;

    public montantTtc: null | number;

    public remise: null | number;

    public montantTtcApresRemise: null | number;

    public remarque: string;

    public montantPaye: null | number;

    public reste: null | number;

    public fournisseur: FournisseurDto ;
    public categorieProduit: CategorieProduitDto ;
    public tauxTva: TauxTvaDto ;
    public pointVente: PointVenteDto ;
    public etatAchat: EtatAchatDto ;
     public reglementAchats: Array<ReglementAchatDto>;
     public achatItems: Array<AchatItemDto>;


    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.entreeStock = null;
        this.dateAchat = null;
        this.montantHt = null;
        this.montantTva = null;
        this.montantTtc = null;
        this.remise = null;
        this.montantTtcApresRemise = null;
        this.remarque = '';
        this.montantPaye = null;
        this.reste = null;
        this.fournisseur = new FournisseurDto() ;
        this.categorieProduit = new CategorieProduitDto() ;
        this.tauxTva = new TauxTvaDto() ;
        this.etatAchat = new EtatAchatDto() ;
        this.reglementAchats = new Array<ReglementAchatDto>();
        this.achatItems = new Array<AchatItemDto>();

        }

}
