import React, { useRef, useState } from 'react';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './radioPlayer.css';

interface RadioPlayerProps {
    radioURL: string;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ radioURL }) => {
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
                <source src={radioURL} type="audio/mpeg" />
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
