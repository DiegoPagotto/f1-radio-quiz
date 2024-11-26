import React, { useRef, useState, useEffect } from 'react';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './radioPlayer.css';

interface RadioPlayerProps {
    radioURL: string;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ radioURL }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = radioURL;
        }
    }, [radioURL]);

    const handlePlay = () => {
        if (audioRef.current) {
            setPlaying(true);
            audioRef.current.play();
        }
    };

    const handleEnded = () => {
        setPlaying(false);
        setProgress(0);
    };

    const stopPlaying = () => {
        if (audioRef.current) {
            setPlaying(false);
            audioRef.current.pause();
        }
    };

    useEffect(() => {
        let animationFrame: number;

        const updateProgress = () => {
            if (audioRef.current) {
                const audio = audioRef.current;
                const current = audio.currentTime;
                const duration = audio.duration;

                if (duration) {
                    setProgress((current / duration) * 100 || 0);
                }

                animationFrame = requestAnimationFrame(updateProgress);
            }
        };

        const handlePlay = () => {
            animationFrame = requestAnimationFrame(updateProgress);
        };

        const handlePause = () => {
            cancelAnimationFrame(animationFrame);
        };

        const audio = audioRef.current;

        if (audio) {
            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('ended', handlePause);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('ended', handlePause);
            }
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <>
            <audio ref={audioRef} onEnded={handleEnded}>
                <source src={radioURL} type="audio/mpeg" />
            </audio>
            <div className="radio-player">
                <div
                    className="progress-ring"
                    style={
                        { '--progress': progress + '%' } as React.CSSProperties
                    }
                ></div>
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
