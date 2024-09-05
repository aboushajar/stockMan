import {InventaireItemDto} from './InventaireItem.model';
import {DepotDto} from '../depot/Depot.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class InventaireDto extends BaseDto{

   public dateInventaite: Date;

    public remarque: string;

    public depot: DepotDto ;
     public inventaireItems: Array<InventaireItemDto>;


    constructor() {
        super();

        this.dateInventaite = null;
        this.remarque = '';
        this.depot = new DepotDto() ;
        this.inventaireItems = new Array<InventaireItemDto>();

        }

}
