import {CategorieClientDto} from './CategorieClient.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ClientDto extends BaseDto{

    public reference: string;

    public nom: string;

    public adresse: string;

    public telephone: string;

    public creance: null | number;

    public categorieClient: CategorieClientDto ;


    constructor() {
        super();

        this.reference = '';
        this.nom = '';
        this.adresse = '';
        this.telephone = '';
        this.creance = null;

        }

}
