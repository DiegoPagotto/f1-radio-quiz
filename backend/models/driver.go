package models

type Driver struct {
	DriverNumber int `gorm:"primaryKey;autoIncrement:false"`
	FullName     string
	CountryCode  string
	TeamName     string
	TeamColour   string
	PictureURL   string
	Sessions  []Session `gorm:"many2many:driver_sessions;"`
}
