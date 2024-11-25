export interface Driver {
    driverNumber: number;
    fullName: string;
    countryCode: string;
    teamName: string;
    teamColour: string;
    pictureURL: string;
}

export interface DriverResponse {
    id: number;
    driver_number: number;
    full_name: string;
    country_code: string;
    team_name: string;
    team_colour: string;
    picture_url: string;
}
