import {ReglementAchatStatusCriteria} from './ReglementAchatStatusCriteria.model';
import {ModeReglementCriteria} from '../commun/ModeReglementCriteria.model';
import {AchatCriteria} from './AchatCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ReglementAchatCriteria extends BaseCriteria {

    public id: number;
    public dateReglement: Date;
    public dateReglementFrom: Date;
    public dateReglementTo: Date;
     public montant: number;
     public montantMin: number;
     public montantMax: number;
    public remarque: string;
    public remarqueLike: string;
  public modeReglement: ModeReglementCriteria ;
  public modeReglements: Array<ModeReglementCriteria> ;

}
