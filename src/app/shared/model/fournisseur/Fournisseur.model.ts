import {CategorieFournisseurDto} from './CategorieFournisseur.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class FournisseurDto extends BaseDto{

    public reference: string;

    public nom: string;

    public adresse: string;

    public telephone: string;

    public creance: null | number;

    public categorieFournisseur: CategorieFournisseurDto ;


    constructor() {
        super();

        this.reference = '';
        this.nom = '';
        this.adresse = '';
        this.telephone = '';
        this.creance = null;
        this.categorieFournisseur = new CategorieFournisseurDto() ;

        }

}
