import { Card } from 'antd';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import emojiFlags, { CountryData } from 'emoji-flags';
import './DriverCard.css';

countries.registerLocale(enLocale);

const getFlagByCountryCode = (alpha3: string) => {
    const isoCode = countries.alpha3ToAlpha2(alpha3) as
        | keyof typeof emojiFlags
        | undefined;
    if (!isoCode || !(isoCode in emojiFlags)) return '🏳️';

    const countryData = emojiFlags[isoCode] as CountryData;
    return countryData.emoji || '🏳️';
};

const DriverCard = () => {
    const country = 'NLD';
    const flagEmoji = getFlagByCountryCode(country);

    return (
        <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#3671C6' }}
            cover={
                <img
                    className="driver-avatar"
                    alt="Max Verstappen"
                    src="https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/5col/image.png"
                />
            }
            className="driver-card"
        >
            <div className="driver-card-content">
                <h3>Max Verstappen</h3>
                <div>
                    <p className="driver-flag">{flagEmoji}</p>
                    <p className="team-name">Red Bull Racing</p>
                </div>
            </div>
        </Card>
    );
};

export default DriverCard;
