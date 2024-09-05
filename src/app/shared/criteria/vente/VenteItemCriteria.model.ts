import {MarqueCriteria} from '../produit/MarqueCriteria.model';
import {VenteCriteria} from './VenteCriteria.model';
import {StockCriteria} from '../depot/StockCriteria.model';
import {SousMarqueCriteria} from '../produit/SousMarqueCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class VenteItemCriteria extends BaseCriteria {

    public id: number;
     public quantite: number;
     public quantiteMin: number;
     public quantiteMax: number;
     public prix: number;
     public prixMin: number;
     public prixMax: number;
    public remarque: string;
    public remarqueLike: string;
  public stock: StockCriteria ;
  public stocks: Array<StockCriteria> ;
  public marque: MarqueCriteria ;
  public marques: Array<MarqueCriteria> ;
  public sousMarque: SousMarqueCriteria ;
  public sousMarques: Array<SousMarqueCriteria> ;
  public vente: VenteCriteria ;
  public ventes: Array<VenteCriteria> ;

}
