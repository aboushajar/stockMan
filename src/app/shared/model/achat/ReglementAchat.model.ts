import {ReglementAchatStatusDto} from './ReglementAchatStatus.model';
import {ModeReglementDto} from '../commun/ModeReglement.model';
import {AchatDto} from './Achat.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ReglementAchatDto extends BaseDto{

   public dateReglement: Date;

    public montant: null | number;

    public remarque: string;

    public modeReglement: ModeReglementDto ;
    public achat: AchatDto ;
    public reglementAchatStatus: ReglementAchatStatusDto ;


    constructor() {
        super();

        this.dateReglement = null;
        this.montant = null;
        this.remarque = '';
        this.modeReglement = new ModeReglementDto() ;

        }

}
