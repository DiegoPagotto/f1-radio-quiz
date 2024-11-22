package utils

var countryCodeMap = map[string]string{
    "NED": "NLD", // Netherlands
}

func SanitizeCountryCode(countryCode string) string {
    if isoCode, exists := countryCodeMap[countryCode]; exists {
        return isoCode
    }
    return countryCode
}