import {DepotDto} from './Depot.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class PointVenteDto extends BaseDto{

    public libelle: string;

    public code: string;

    public style: string;

   public partage: null | boolean;

     public depots: Array<DepotDto>;


    constructor() {
        super();

        this.libelle = '';
        this.code = '';
        this.style = '';
        this.partage = null;
        this.depots = new Array<DepotDto>();

        }

}
