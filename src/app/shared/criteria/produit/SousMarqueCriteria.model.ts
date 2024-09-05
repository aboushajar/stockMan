import {MarqueCriteria} from './MarqueCriteria.model';
import {StatutSousMarqueCriteria} from './StatutSousMarqueCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class SousMarqueCriteria extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public code: string;
    public codeLike: string;
     public prixVente: number;
     public prixVenteMin: number;
     public prixVenteMax: number;
     public prixAchat: number;
     public prixAchatMin: number;
     public prixAchatMax: number;
    public remarque: string;
    public remarqueLike: string;
  public marque: MarqueCriteria ;
  public marques: Array<MarqueCriteria> ;
  public statutSousMarque: StatutSousMarqueCriteria ;
  public statutSousMarques: Array<StatutSousMarqueCriteria> ;

}
