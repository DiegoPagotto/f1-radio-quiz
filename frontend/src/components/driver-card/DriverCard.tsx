import { Card } from 'antd';
import './DriverCard.css';
import { Driver } from '../../types/driver';
import fallbackDriver from '../../assets/images/fallback_driver.png';
import React from 'react';

interface DriverCardProps {
    driver: Driver;
    onClick: (event: React.MouseEvent<HTMLDivElement>, driver: Driver) => void;
    isEnabled: boolean;
    isScaled: boolean;
}

const DriverCard: React.FC<DriverCardProps> = ({
    driver,
    onClick,
    isEnabled,
    isScaled,
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
            className={`driver-card ${isScaled ? 'driver-card-scaled' : ''} ${
                isEnabled ? '' : 'driver-card-disabled'
            }`}
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
