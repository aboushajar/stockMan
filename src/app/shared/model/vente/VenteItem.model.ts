import {MarqueDto} from '../produit/Marque.model';
import {VenteDto} from './Vente.model';
import {StockDto} from '../depot/Stock.model';
import {SousMarqueDto} from '../produit/SousMarque.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class VenteItemDto extends BaseDto{

    public quantite: null | number;

    public prix: null | number;

    public remarque: string;

    public stock: StockDto ;
    public marque: MarqueDto ;
    public sousMarque: SousMarqueDto ;
    public vente: VenteDto ;


    constructor() {
        super();

        this.quantite = null;
        this.prix = null;
        this.remarque = '';
        this.stock = new StockDto() ;
        this.marque = new MarqueDto() ;
        this.sousMarque = new SousMarqueDto() ;
        this.vente = new VenteDto() ;

        }

}
