package models

type Session struct {
	SessionKey   int `gorm:"primaryKey;autoIncrement:false"`
	Year         int
	Location     string
	SessionTitle string
}
