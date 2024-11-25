import { Driver, DriverResponse } from './driver';
import { Session, SessionResponse } from './session';

export interface Quiz {
    session: Session;
    radioURL: string;
    options: Driver[];
    answerDriverNumber: number;
}

export interface QuizResponse {
    session: SessionResponse;
    radio_url: string;
    options: DriverResponse[];
    answer_driver_number: number;
}
