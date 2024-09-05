import {ReglementVenteStatusCriteria} from './ReglementVenteStatusCriteria.model';
import {VenteCriteria} from './VenteCriteria.model';
import {ModeReglementCriteria} from '../commun/ModeReglementCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ReglementVenteCriteria extends BaseCriteria {

    public id: number;
    public dateReglement: Date;
    public dateReglementFrom: Date;
    public dateReglementTo: Date;
     public montant: number;
     public montantMin: number;
     public montantMax: number;
    public remarque: string;
    public remarqueLike: string;

}
