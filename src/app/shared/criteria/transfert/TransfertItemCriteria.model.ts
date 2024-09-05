import {TransfertCriteria} from './TransfertCriteria.model';
import {SousMarqueCriteria} from '../produit/SousMarqueCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class TransfertItemCriteria extends BaseCriteria {

    public id: number;
     public quantite: number;
     public quantiteMin: number;
     public quantiteMax: number;
    public remarque: string;
    public remarqueLike: string;

}
