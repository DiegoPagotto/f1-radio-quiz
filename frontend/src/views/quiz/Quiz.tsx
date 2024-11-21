import React from 'react';
import { Layout } from 'antd';
import './quiz.css';

const { Content } = Layout;

const Quiz: React.FC = () => {
    return (
        <Layout className="quiz-layout">
            <Content className="quiz-content">
                <div className="quiz-container"></div>
            </Content>
        </Layout>
    );
};

export default Quiz;
