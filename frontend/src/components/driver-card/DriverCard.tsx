import { Card } from 'antd';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import emojiFlags, { CountryData } from 'emoji-flags';
import './DriverCard.css';
import { Driver } from '../../types/driver';
import fallbackDriver from '../../assets/fallback_driver.png';

countries.registerLocale(enLocale);

const getFlagByCountryCode = (alpha3: string) => {
    const isoCode = countries.alpha3ToAlpha2(alpha3) as
        | keyof typeof emojiFlags
        | undefined;
    if (!isoCode || !(isoCode in emojiFlags)) return '🏳️';

    const countryData = emojiFlags[isoCode] as CountryData;
    return countryData.emoji || '🏳️';
};

interface DriverCardProps {
    driver: Driver;
}

const DriverCard = ({ driver }: DriverCardProps) => {
    const flagEmoji = getFlagByCountryCode(driver.countryCode);

    return (
        <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: `#${driver.teamColour}` }}
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
            className="driver-card"
        >
            <div className="driver-card-content">
                <h3>{driver.fullName}</h3>
                <div>
                    <p className="driver-flag">{flagEmoji}</p>
                    <p className="team-name">{driver.teamName}</p>
                </div>
            </div>
        </Card>
    );
};

export default DriverCard;
