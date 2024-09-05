import {SuperCategorieClientCriteria} from './SuperCategorieClientCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class CategorieClientCriteria extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public code: string;
    public codeLike: string;
  public superCategorieClient: SuperCategorieClientCriteria ;
  public superCategorieClients: Array<SuperCategorieClientCriteria> ;

}
