import {TauxTvaCriteria} from '../commun/TauxTvaCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class CategorieProduitCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public style: string;
    public styleLike: string;
  public tauxTva: TauxTvaCriteria ;
  public tauxTvas: Array<TauxTvaCriteria> ;

}
