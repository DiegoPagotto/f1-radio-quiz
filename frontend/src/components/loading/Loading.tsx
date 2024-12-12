import { Spin } from 'antd';
import { useState, useEffect } from 'react';
import './loading.css';
import { loadingPhrases } from '../../assets/text/loadingPhrases';

const Loading = () => {
    const getRandomPhrase = (exclude: string) => {
        let newPhrase;
        do {
            newPhrase =
                loadingPhrases[
                    Math.floor(Math.random() * loadingPhrases.length)
                ];
        } while (newPhrase === exclude);
        return newPhrase;
    };

    const [currentPhrase, setCurrentPhrase] = useState<string>(
        getRandomPhrase('')
    );
    const [isFading, setIsFading] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentPhrase((prevPhrase) => getRandomPhrase(prevPhrase));
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
