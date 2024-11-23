package utils

var countryCodeMap = map[string]string{
    "NED": "NLD", // Netherlands
    "MON": "MCO", // Monaco
    "GER": "DEU", // Germany
    "DEN": "DNK", // Denmark
}

func SanitizeCountryCode(countryCode string) string {
    if isoCode, exists := countryCodeMap[countryCode]; exists {
        return isoCode
    }
    return countryCode
}