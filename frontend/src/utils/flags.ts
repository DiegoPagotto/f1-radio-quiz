import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import emojiFlags, { CountryData } from 'emoji-flags';

countries.registerLocale(enLocale);

export const getFlagByCountryCode = (alpha3: string): string => {
    const isoCode = countries.alpha3ToAlpha2(alpha3) as
        | keyof typeof emojiFlags
        | undefined;
    if (!isoCode || !(isoCode in emojiFlags)) return '🏳️';

    const countryData = emojiFlags[isoCode] as CountryData;
    return countryData.emoji || '🏳️';
};
