package repositories

import (
	"f1-radio-quiz/db"
	"f1-radio-quiz/models"
)
func GetSessionByKey(sessionKey int) (models.Session, error) {
    var session models.Session
    result := db.DB.First(&session, "session_key = ?", sessionKey)
    return session, result.Error
}

func CreateSession(session models.Session) error {
    return db.DB.Create(&session).Error
}

func GetRandomSession() (models.Session, error) {
    var session models.Session
    result := db.DB.Order("RANDOM()").First(&session)
    return session, result.Error
}


func GetDriversBySession(sessionKey int) ([]models.Driver, error) {
    var drivers []models.Driver
    err := db.DB.Joins("JOIN driver_sessions ON driver_sessions.driver_driver_number = drivers.driver_number").
        Where("driver_sessions.session_session_key = ?", sessionKey).
        Find(&drivers).Error
    return drivers, err
}