import React, { useRef, useState } from 'react';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './radioPlayer.css';

const RadioPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setPlaying] = useState(false);

    const handlePlay = () => {
        if (audioRef.current) {
            setPlaying(true);
            audioRef.current.play();
        }
    };

    const handleEnded = () => {
        setPlaying(false);
    };

    const stopPlaying = () => {
        if (audioRef.current) {
            setPlaying(false);
            audioRef.current.pause();
        }
    };

    return (
        <>
            <audio ref={audioRef} onEnded={handleEnded}>
                <source
                    src="https://livetiming.formula1.com/static/2024/2024-05-05_Miami_Grand_Prix/2024-05-03_Sprint_Qualifying/TeamRadio/MAXVER01_1_20240503_221605.mp3"
                    type="audio/mpeg"
                />
            </audio>
            <div className="radio-player">
                <Button
                    type="primary"
                    shape="circle"
                    icon={
                        isPlaying ? (
                            <PauseOutlined className="radio-player__button__icon" />
                        ) : (
                            <CaretRightOutlined className="radio-player__button__icon" />
                        )
                    }
                    className="radio-player__button"
                    onClick={isPlaying ? stopPlaying : handlePlay}
                />
            </div>
        </>
    );
};

export default RadioPlayer;
