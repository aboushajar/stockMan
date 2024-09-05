import {DepotCriteria} from './DepotCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class PointVenteCriteria extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public code: string;
    public codeLike: string;
    public style: string;
    public styleLike: string;
    public partage: null | boolean;
      public depots: Array<DepotCriteria>;

}
