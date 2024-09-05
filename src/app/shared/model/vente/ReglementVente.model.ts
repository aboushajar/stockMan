import {ReglementVenteStatusDto} from './ReglementVenteStatus.model';
import {VenteDto} from './Vente.model';
import {ModeReglementDto} from '../commun/ModeReglement.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ReglementVenteDto extends BaseDto{

   public dateReglement: Date;

    public montant: null | number;

    public remarque: string;

    public modeReglement: ModeReglementDto ;
    public vente: VenteDto ;
    public reglementVenteStatus: ReglementVenteStatusDto ;


    constructor() {
        super();

        this.dateReglement = null;
        this.montant = null;
        this.remarque = '';

        }

}
