
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ModeReglementDto extends BaseDto{

    public code: string;

    public libelle: string;

    public style: string;



    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.style = '';

        }

}
