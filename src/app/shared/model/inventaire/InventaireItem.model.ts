import {InventaireDto} from './Inventaire.model';
import {SousMarqueDto} from '../produit/SousMarque.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class InventaireItemDto extends BaseDto{

    public quantiteAnticipe: null | number;

    public quantiteReelle: null | number;

    public decalage: null | number;

    public remarque: string;

    public sousMarque: SousMarqueDto ;
    public inventaire: InventaireDto ;


    constructor() {
        super();

        this.quantiteAnticipe = null;
        this.quantiteReelle = null;
        this.decalage = null;
        this.remarque = '';

        }

}
