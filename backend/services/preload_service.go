package services

import (
	"encoding/json"
	"f1-radio-quiz/db"
	"f1-radio-quiz/models"
	"fmt"
	"net/http"
)

const apiURL = "https://api.openf1.org/v1"

func LoadSessions() error {
    url := apiURL + "/sessions"
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
                var driver models.Driver
                db.DB.First(&driver, "driver_number = ?", driverNumber)
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

func LoadDriversBySessionKey(sessionKey int) ([]int, error) {
    url := fmt.Sprintf("%s/drivers?session_key=%d", apiURL, sessionKey)
    resp, err := http.Get(url)
    if err != nil {
        return nil, fmt.Errorf("failed to fetch drivers for session %d: %w", sessionKey, err)
    }
    defer resp.Body.Close()

    var apiDrivers []struct {
        DriverNumber int `json:"driver_number"`
    }
    if err := json.NewDecoder(resp.Body).Decode(&apiDrivers); err != nil {
        return nil, fmt.Errorf("failed to decode drivers response on session (%d): %w", sessionKey, err)
    }

    var driverNumbers []int
    for _, apiDriver := range apiDrivers {
        driverNumbers = append(driverNumbers, apiDriver.DriverNumber)
    }
    return driverNumbers, nil
}

func LoadDrivers() error {
    url := apiURL + "/drivers"
    resp, err := http.Get(url)
    if err != nil {
        return fmt.Errorf("failed to fetch drivers: %w", err)
    }
    defer resp.Body.Close()

    var apiDrivers []struct {
        DriverNumber int    `json:"driver_number"`
        FullName     string `json:"full_name"`
        CountryCode  string `json:"country_code"`
        TeamName     string `json:"team_name"`
        TeamColour   string `json:"team_colour"`
        PictureURL   string `json:"headshot_url"`
    }

    if err := json.NewDecoder(resp.Body).Decode(&apiDrivers); err != nil {
        return fmt.Errorf("failed to decode drivers response: %w", err)
    }

    for _, apiDriver := range apiDrivers {
        var existingDriver models.Driver
        result := db.DB.First(&existingDriver, "driver_number = ?", apiDriver.DriverNumber)
        if result.RowsAffected == 0 {
            driver := models.Driver{
                DriverNumber: apiDriver.DriverNumber,
                FullName:     apiDriver.FullName,
                CountryCode:  apiDriver.CountryCode,
                TeamName:     apiDriver.TeamName,
                TeamColour:   apiDriver.TeamColour,
                PictureURL:   apiDriver.PictureURL,
            }
            db.DB.Create(&driver)
        }
    }
    return nil
}