package services

import (
	"encoding/json"
	"f1-radio-quiz/config"
	"f1-radio-quiz/db"
	"f1-radio-quiz/models"
	"f1-radio-quiz/repositories"
	"fmt"
	"net/http"
)

func LoadSessions() error {
    url := config.API_URL + "/sessions"
    resp, err := http.Get(url)
    if err != nil {
        return fmt.Errorf("failed to fetch sessions: %w", err)
    }
    defer resp.Body.Close()

    var apiSessions []struct {
        SessionKey   int    `json:"session_key"`
        Year         int    `json:"year"`
        Location     string `json:"location"`
        SessionTitle string `json:"session_name"`
    }

    if err := json.NewDecoder(resp.Body).Decode(&apiSessions); err != nil {
        return fmt.Errorf("failed to decode sessions response: %w", err)
    }

    for _, apiSession := range apiSessions {
        var existingSession models.Session
        result := db.DB.First(&existingSession, "session_key = ?", apiSession.SessionKey)
        if result.RowsAffected == 0 {
            driverNumbers, err := LoadDriversBySessionKey(apiSession.SessionKey)
            if err != nil {
                return err
            }

            var drivers []models.Driver
            for _, driverNumber := range driverNumbers {
                driver, err := repositories.GetDriverByNumber(driverNumber)
                if err != nil {
                    return err
                }
                drivers = append(drivers, driver)
            }

            session := models.Session{
                SessionKey:   apiSession.SessionKey,
                Year:         apiSession.Year,
                Location:     apiSession.Location,
                SessionTitle: apiSession.SessionTitle,
                Drivers:      drivers,
            }
            db.DB.Create(&session)
        }
    }
    return nil
}

func GetRandomSessionWithDrivers() (models.Session, error) {
    session, err := repositories.GetRandomSession()
    if err != nil {
        return models.Session{}, err
    }

    drivers, err := repositories.GetDriversBySession(session.SessionKey)
    if err != nil {
        return models.Session{}, err
    }

    session.Drivers = drivers
    return session, nil
}