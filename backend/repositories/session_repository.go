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