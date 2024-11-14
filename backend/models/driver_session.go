package models

type DriverSession struct {
    DriverID  int `gorm:"primaryKey"`
    SessionKey int `gorm:"primaryKey"`
}