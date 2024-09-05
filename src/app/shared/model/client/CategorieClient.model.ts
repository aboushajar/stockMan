import {SuperCategorieClientDto} from './SuperCategorieClient.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class CategorieClientDto extends BaseDto{

    public libelle: string;

    public code: string;

    public superCategorieClient: SuperCategorieClientDto ;


    constructor() {
        super();

        this.libelle = '';
        this.code = '';
        this.superCategorieClient = new SuperCategorieClientDto() ;

        }

}
