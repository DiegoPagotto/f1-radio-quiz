package models

type Session struct {
	SessionKey   int `gorm:"primaryKey;autoIncrement:false"`
	Year         int
	Location     string
	SessionTitle string
	Drivers      []Driver  `gorm:"many2many:driver_sessions;"`
}

type SessionResponse struct {
	SessionKey   int `json:"session_key"`
	Year         int `json:"year"`
	Location     string `json:"location"`
	SessionTitle string `json:"session_title"`
}