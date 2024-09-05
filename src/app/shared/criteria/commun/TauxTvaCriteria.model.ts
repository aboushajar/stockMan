
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class TauxTvaCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public style: string;
    public styleLike: string;
     public valeur: number;
     public valeurMin: number;
     public valeurMax: number;

}
