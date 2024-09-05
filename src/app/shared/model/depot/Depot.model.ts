import {PointVenteDto} from './PointVente.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class DepotDto extends BaseDto{

    public code: string;

    public libelle: string;

    public style: string;

    public adresse: string;

    public pointVente: PointVenteDto ;


    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.style = '';
        this.adresse = '';

        }

}
