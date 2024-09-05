
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class UniteMesureDto extends BaseDto{

    public libelle: string;

    public code: string;

    public style: string;



    constructor() {
        super();

        this.libelle = '';
        this.code = '';
        this.style = '';

        }

}
