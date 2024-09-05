import {MarqueDto} from '../produit/Marque.model';
import {AchatDto} from './Achat.model';
import {StockDto} from '../depot/Stock.model';
import {SousMarqueDto} from '../produit/SousMarque.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class AchatItemDto extends BaseDto{

    public code: string;

    public quantite: null | number;

    public prix: null | number;

    public remarque: string;

    public sousMarque: SousMarqueDto ;
    public marque: MarqueDto ;
    public stock: StockDto ;
    public achat: AchatDto ;


    constructor() {
        super();

        this.code = '';
        this.quantite = null;
        this.prix = null;
        this.remarque = '';
        this.marque = new MarqueDto() ;
        this.stock = new StockDto() ;
        this.achat = new AchatDto() ;

        }

}
