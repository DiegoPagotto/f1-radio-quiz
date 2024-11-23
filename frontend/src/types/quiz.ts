import { Driver } from './driver';
import { Session } from './session';

export interface Quiz {
    session: Session;
    radioURL: string;
    options: Driver[];
    answerDriverNumber: number;
}
