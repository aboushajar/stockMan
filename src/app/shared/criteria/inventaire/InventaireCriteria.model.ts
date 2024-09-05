import {InventaireItemCriteria} from './InventaireItemCriteria.model';
import {DepotCriteria} from '../depot/DepotCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class InventaireCriteria extends BaseCriteria {

    public id: number;
    public dateInventaite: Date;
    public dateInventaiteFrom: Date;
    public dateInventaiteTo: Date;
    public remarque: string;
    public remarqueLike: string;
  public depot: DepotCriteria ;
  public depots: Array<DepotCriteria> ;
      public inventaireItems: Array<InventaireItemCriteria>;

}
