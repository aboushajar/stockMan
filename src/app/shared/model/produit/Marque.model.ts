import {CategorieProduitDto} from './CategorieProduit.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class MarqueDto extends BaseDto{

    public libelle: string;

    public code: string;

    public categorieProduit: CategorieProduitDto ;


    constructor() {
        super();

        this.libelle = '';
        this.code = '';

        }

}
