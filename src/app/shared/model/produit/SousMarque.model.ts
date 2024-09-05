import {MarqueDto} from './Marque.model';
import {StatutSousMarqueDto} from './StatutSousMarque.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class SousMarqueDto extends BaseDto{

    public libelle: string;

    public code: string;

    public prixVente: null | number;

    public prixAchat: null | number;

    public remarque: string;

    public marque: MarqueDto ;
    public statutSousMarque: StatutSousMarqueDto ;


    constructor() {
        super();

        this.libelle = '';
        this.code = '';
        this.prixVente = null;
        this.prixAchat = null;
        this.remarque = '';
        this.marque = new MarqueDto() ;
        this.statutSousMarque = new StatutSousMarqueDto() ;

        }

}
