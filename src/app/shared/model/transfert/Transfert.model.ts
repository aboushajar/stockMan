import {TransfertItemDto} from './TransfertItem.model';
import {DepotDto} from '../depot/Depot.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class TransfertDto extends BaseDto{

   public dateTransfert: Date;

    public remarque: string;

    public depotOrigin: DepotDto ;
    public depotDestination: DepotDto ;
     public transfertItems: Array<TransfertItemDto>;


    constructor() {
        super();

        this.dateTransfert = null;
        this.remarque = '';
        this.transfertItems = new Array<TransfertItemDto>();

        }

}
