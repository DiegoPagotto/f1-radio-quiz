package models

type Driver struct {
    ID           int       `gorm:"primaryKey" json:"id"`
    DriverNumber int       `json:"driver_number"`
    FullName     string    `json:"full_name"`
    CountryCode  string    `json:"country_code"`
    TeamName     string    `json:"team_name"`
    TeamColour   string    `json:"team_colour"`
    PictureURL   string    `json:"picture_url"`
    Sessions     []Session `gorm:"many2many:driver_sessions;" json:"-"`
}
