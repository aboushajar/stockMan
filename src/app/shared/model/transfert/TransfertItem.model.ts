import {TransfertDto} from './Transfert.model';
import {SousMarqueDto} from '../produit/SousMarque.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class TransfertItemDto extends BaseDto{

    public quantite: null | number;

    public remarque: string;

    public sousMarque: SousMarqueDto ;
    public transfert: TransfertDto ;


    constructor() {
        super();

        this.quantite = null;
        this.remarque = '';

        }

}
