import { Card } from 'antd';
import './DriverCard.css';
import { Driver } from '../../types/driver';
import fallbackDriver from '../../assets/fallback_driver.png';
import React from 'react';

interface DriverCardProps {
    driver: Driver;
    onClick: (event: React.MouseEvent<HTMLDivElement>, driver: Driver) => void;
    isEnabled: boolean;
}

const DriverCard: React.FC<DriverCardProps> = ({
    driver,
    onClick,
    isEnabled,
}) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isEnabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        onClick(event, driver);
    };

    return (
        <Card
            bordered={false}
            hoverable
            style={{
                backgroundColor: `#${driver.teamColour}`,
                filter: isEnabled ? 'none' : 'grayscale(100%)',
            }}
            cover={
                <img
                    className="driver-avatar"
                    alt={driver.fullName}
                    src={
                        driver.pictureURL.replace('1col', '5col') ||
                        fallbackDriver
                    }
                />
            }
            onClick={handleClick}
            className="driver-card"
        >
            <div className="driver-card-content">
                <h3>{driver.fullName}</h3>
                <div>
                    <p className="driver-flag">{driver.flagEmoji}</p>
                    <p className="team-name">{driver.teamName}</p>
                </div>
            </div>
        </Card>
    );
};

export default DriverCard;
