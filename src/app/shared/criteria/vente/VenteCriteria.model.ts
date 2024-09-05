import {TauxTvaCriteria} from '../commun/TauxTvaCriteria.model';
import {CategorieProduitCriteria} from '../produit/CategorieProduitCriteria.model';
import {VenteItemCriteria} from './VenteItemCriteria.model';
import {EtatVenteCriteria} from './EtatVenteCriteria.model';
import {PointVenteCriteria} from '../depot/PointVenteCriteria.model';
import {ReglementVenteCriteria} from './ReglementVenteCriteria.model';
import {ClientCriteria} from '../client/ClientCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class VenteCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public dateVente: Date;
    public dateVenteFrom: Date;
    public dateVenteTo: Date;
     public montantTotalHt: number;
     public montantTotalHtMin: number;
     public montantTotalHtMax: number;
     public montantTotalTva: number;
     public montantTotalTvaMin: number;
     public montantTotalTvaMax: number;
     public montantTotalTtc: number;
     public montantTotalTtcMin: number;
     public montantTotalTtcMax: number;
     public remise: number;
     public remiseMin: number;
     public remiseMax: number;
     public montantTotalApresRemise: number;
     public montantTotalApresRemiseMin: number;
     public montantTotalApresRemiseMax: number;
     public montantPaye: number;
     public montantPayeMin: number;
     public montantPayeMax: number;
     public reste: number;
     public resteMin: number;
     public resteMax: number;
    public remarque: string;
    public remarqueLike: string;
  public client: ClientCriteria ;
  public clients: Array<ClientCriteria> ;
  public categorieProduit: CategorieProduitCriteria ;
  public categorieProduits: Array<CategorieProduitCriteria> ;
  public tauxTva: TauxTvaCriteria ;
  public tauxTvas: Array<TauxTvaCriteria> ;
  public etatVente: EtatVenteCriteria ;
  public etatVentes: Array<EtatVenteCriteria> ;
      public venteItems: Array<VenteItemCriteria>;
      public reglementVentes: Array<ReglementVenteCriteria>;

}
