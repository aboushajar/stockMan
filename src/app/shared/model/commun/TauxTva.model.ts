
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class TauxTvaDto extends BaseDto{

    public code: string;

    public libelle: string;

    public style: string;

    public valeur: null | number;



    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.style = '';
        this.valeur = null;

        }

}
