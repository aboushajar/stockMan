import {TransfertItemCriteria} from './TransfertItemCriteria.model';
import {DepotCriteria} from '../depot/DepotCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class TransfertCriteria extends BaseCriteria {

    public id: number;
    public dateTransfert: Date;
    public dateTransfertFrom: Date;
    public dateTransfertTo: Date;
    public remarque: string;
    public remarqueLike: string;
      public transfertItems: Array<TransfertItemCriteria>;

}
