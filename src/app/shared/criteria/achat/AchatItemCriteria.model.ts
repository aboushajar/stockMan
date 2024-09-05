import {MarqueCriteria} from '../produit/MarqueCriteria.model';
import {AchatCriteria} from './AchatCriteria.model';
import {StockCriteria} from '../depot/StockCriteria.model';
import {SousMarqueCriteria} from '../produit/SousMarqueCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class AchatItemCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
     public quantite: number;
     public quantiteMin: number;
     public quantiteMax: number;
     public prix: number;
     public prixMin: number;
     public prixMax: number;
    public remarque: string;
    public remarqueLike: string;
  public marque: MarqueCriteria ;
  public marques: Array<MarqueCriteria> ;
  public stock: StockCriteria ;
  public stocks: Array<StockCriteria> ;
  public achat: AchatCriteria ;
  public achats: Array<AchatCriteria> ;

}
