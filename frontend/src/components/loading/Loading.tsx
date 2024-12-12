import { Spin } from 'antd';
import { useState, useEffect } from 'react';
import './loading.css';
import { loadingPhrases } from '../../assets/text/loadingPhrases';

const Loading = () => {
    const [currentPhrase, setCurrentPhrase] = useState<string>(
        loadingPhrases[0]
    );
    const [isFading, setIsFading] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                const randomIndex = Math.floor(
                    Math.random() * loadingPhrases.length
                );
                setCurrentPhrase(loadingPhrases[randomIndex]);
                setIsFading(false);
            }, 500);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-container">
            <Spin size="large" />
            <h2 className={`loading-text ${isFading ? 'fade-up' : ''}`}>
                {currentPhrase}
            </h2>
        </div>
    );
};

export default Loading;
