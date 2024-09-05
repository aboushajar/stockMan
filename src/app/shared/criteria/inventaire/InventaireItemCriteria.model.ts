import {InventaireCriteria} from './InventaireCriteria.model';
import {SousMarqueCriteria} from '../produit/SousMarqueCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class InventaireItemCriteria extends BaseCriteria {

    public id: number;
     public quantiteAnticipe: number;
     public quantiteAnticipeMin: number;
     public quantiteAnticipeMax: number;
     public quantiteReelle: number;
     public quantiteReelleMin: number;
     public quantiteReelleMax: number;
     public decalage: number;
     public decalageMin: number;
     public decalageMax: number;
    public remarque: string;
    public remarqueLike: string;

}
