import {TauxTvaDto} from '../commun/TauxTva.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class CategorieProduitDto extends BaseDto{

    public code: string;

    public libelle: string;

    public style: string;

    public tauxTva: TauxTvaDto ;


    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.style = '';
        this.tauxTva = new TauxTvaDto() ;

        }

}
