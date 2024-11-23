import React from 'react';
import { Layout } from 'antd';
import './quiz.css';
import RadioPlayer from '../../components/radio-player/RadioPlayer';
import CircuitInfo from '../../components/circuit-info/CircuitInfo';
import DriverCard from '../../components/driver-card/DriverCard';

const { Content } = Layout;

const Quiz: React.FC = () => {
    return (
        <Layout className="quiz-layout">
            <Content className="quiz-content">
                <div className="quiz-container">
                    <div className="quiz-header">
                        <RadioPlayer />
                        <CircuitInfo />
                    </div>
                    <div className="quiz-options">
                        <DriverCard />
                        <DriverCard />
                        <DriverCard />
                        <DriverCard />
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Quiz;
