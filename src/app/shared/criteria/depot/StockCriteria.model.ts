import {DepotCriteria} from './DepotCriteria.model';
import {SousMarqueCriteria} from '../produit/SousMarqueCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class StockCriteria extends BaseCriteria {

    public id: number;
    public description: string;
    public descriptionLike: string;
     public quantiteEligibleVente: number;
     public quantiteEligibleVenteMin: number;
     public quantiteEligibleVenteMax: number;
     public quantiteNonEligibleVente: number;
     public quantiteNonEligibleVenteMin: number;
     public quantiteNonEligibleVenteMax: number;
  public depot: DepotCriteria ;
  public depots: Array<DepotCriteria> ;

}
