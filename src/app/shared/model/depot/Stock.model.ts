import {DepotDto} from './Depot.model';
import {SousMarqueDto} from '../produit/SousMarque.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class StockDto extends BaseDto{

    public description: string;

    public quantiteEligibleVente: null | number;

    public quantiteNonEligibleVente: null | number;

    public sousMarque: SousMarqueDto ;
    public depot: DepotDto ;


    constructor() {
        super();

        this.description = '';
        this.quantiteEligibleVente = null;
        this.quantiteNonEligibleVente = null;
        this.depot = new DepotDto() ;

        }

}
