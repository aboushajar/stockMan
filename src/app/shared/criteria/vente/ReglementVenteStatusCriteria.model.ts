
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ReglementVenteStatusCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public style: string;
    public styleLike: string;

}
