import { DriverResponse } from '../types/driver';
import { Quiz, QuizResponse } from '../types/quiz';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getQuizQuestion = async (): Promise<Quiz> => {
    const response = await fetch(`${BACKEND_BASE_URL}/quiz`);
    if (!response.ok) {
        throw new Error('Failed to fetch quiz question');
    }

    const rawQuiz: QuizResponse = await response.json();

    const quiz: Quiz = {
        session: {
            sessionKey: rawQuiz.session.session_key,
            year: rawQuiz.session.year,
            location: rawQuiz.session.location,
            sessionTitle: rawQuiz.session.session_title,
        },
        radioURL: rawQuiz.radio_url,
        options: rawQuiz.options.map((option: DriverResponse) => ({
            driverNumber: option.driver_number,
            fullName: option.full_name,
            countryCode: option.country_code,
            teamName: option.team_name,
            teamColour: option.team_colour,
            pictureURL: option.picture_url,
        })),
        answerDriverNumber: rawQuiz.answer_driver_number,
    };

    return quiz;
};
