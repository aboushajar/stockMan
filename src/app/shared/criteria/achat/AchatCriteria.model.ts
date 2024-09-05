import {FournisseurCriteria} from '../fournisseur/FournisseurCriteria.model';
import {AchatItemCriteria} from './AchatItemCriteria.model';
import {TauxTvaCriteria} from '../commun/TauxTvaCriteria.model';
import {CategorieProduitCriteria} from '../produit/CategorieProduitCriteria.model';
import {PointVenteCriteria} from '../depot/PointVenteCriteria.model';
import {ReglementAchatCriteria} from './ReglementAchatCriteria.model';
import {EtatAchatCriteria} from './EtatAchatCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class AchatCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public entreeStock: null | boolean;
    public dateAchat: Date;
    public dateAchatFrom: Date;
    public dateAchatTo: Date;
     public montantHt: number;
     public montantHtMin: number;
     public montantHtMax: number;
     public montantTva: number;
     public montantTvaMin: number;
     public montantTvaMax: number;
     public montantTtc: number;
     public montantTtcMin: number;
     public montantTtcMax: number;
     public remise: number;
     public remiseMin: number;
     public remiseMax: number;
     public montantTtcApresRemise: number;
     public montantTtcApresRemiseMin: number;
     public montantTtcApresRemiseMax: number;
    public remarque: string;
    public remarqueLike: string;
     public montantPaye: number;
     public montantPayeMin: number;
     public montantPayeMax: number;
     public reste: number;
     public resteMin: number;
     public resteMax: number;
  public fournisseur: FournisseurCriteria ;
  public fournisseurs: Array<FournisseurCriteria> ;
  public categorieProduit: CategorieProduitCriteria ;
  public categorieProduits: Array<CategorieProduitCriteria> ;
  public tauxTva: TauxTvaCriteria ;
  public tauxTvas: Array<TauxTvaCriteria> ;
  public etatAchat: EtatAchatCriteria ;
  public etatAchats: Array<EtatAchatCriteria> ;
      public reglementAchats: Array<ReglementAchatCriteria>;
      public achatItems: Array<AchatItemCriteria>;

}
