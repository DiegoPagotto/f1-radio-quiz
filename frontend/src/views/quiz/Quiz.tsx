import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import './quiz.css';
import RadioPlayer from '../../components/radio-player/RadioPlayer';
import CircuitInfo from '../../components/circuit-info/CircuitInfo';
import DriverCard from '../../components/driver-card/DriverCard';
import { getQuizQuestion } from '../../api/quiz';
import type { Quiz } from '../../types/quiz';
import { showAlertWithTimer } from '../../utils/alert';
import { AlertType } from '../../types/alert';
import { throwErrorConfetti, throwSuccessConfetti } from '../../utils/confetti';
import { getFlagByCountryCode } from '../../utils/flags';
import { Driver } from '../../types/driver';

const { Content } = Layout;

const Quiz: React.FC = () => {
    const [currentQuiz, setCurrentQuiz] = useState<Quiz>();

    const updateCurrentQuiz = async () => {
        getQuizQuestion().then((quiz) => {
            const optionsWithFlags = quiz.options.map((driver) => ({
                ...driver,
                flagEmoji: getFlagByCountryCode(driver.countryCode),
            }));
            setCurrentQuiz({ ...quiz, options: optionsWithFlags });
        });
    };

    useEffect(() => {
        updateCurrentQuiz();
    }, []);

    const checkAnswer = (
        event: React.MouseEvent<HTMLDivElement>,
        driver: Driver
    ) => {
        if (currentQuiz) {
            const correct =
                currentQuiz.answerDriverNumber === driver.driverNumber;
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;

            if (correct) throwSuccessConfetti(driver.flagEmoji, x, y);
            else throwErrorConfetti(x, y);

            showAlertWithTimer(
                correct ? AlertType.Success : AlertType.Error
            ).then(() => updateCurrentQuiz());
        }
    };

    return currentQuiz ? (
        <Layout className="quiz-layout">
            <Content className="quiz-content">
                <div className="quiz-container">
                    <div className="quiz-header">
                        <RadioPlayer radioURL={currentQuiz.radioURL} />
                        <CircuitInfo session={currentQuiz.session} />
                    </div>
                    <div className="quiz-options">
                        {currentQuiz.options.map((driver) => (
                            <DriverCard
                                key={driver.driverNumber}
                                driver={driver}
                                onClick={checkAnswer}
                            />
                        ))}
                    </div>
                </div>
            </Content>
        </Layout>
    ) : (
        <Spin />
    );
};

export default Quiz;
