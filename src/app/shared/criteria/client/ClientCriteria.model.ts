import {CategorieClientCriteria} from './CategorieClientCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ClientCriteria extends BaseCriteria {

    public id: number;
    public reference: string;
    public referenceLike: string;
    public nom: string;
    public nomLike: string;
    public adresse: string;
    public adresseLike: string;
    public telephone: string;
    public telephoneLike: string;
     public creance: number;
     public creanceMin: number;
     public creanceMax: number;

}