package services

import (
	"encoding/json"
	"f1-radio-quiz/config"
	"f1-radio-quiz/db"
	"f1-radio-quiz/models"
	"f1-radio-quiz/utils"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

func LoadDrivers() error {
    url := config.API_URL + "/drivers"
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
                CountryCode:  utils.SanitizeCountryCode(apiDriver.CountryCode),
                TeamName:     apiDriver.TeamName,
                TeamColour:   apiDriver.TeamColour,
                PictureURL:   apiDriver.PictureURL,
            }
            db.DB.Create(&driver)
        }
    }
    return nil
}

func LoadDriversBySessionKey(sessionKey int) ([]int, error) {
    url := fmt.Sprintf("%s/drivers?session_key=%d", config.API_URL, sessionKey)
    resp, err := http.Get(url)
    if err != nil {
        return nil, fmt.Errorf("failed to fetch drivers for session %d: %w", sessionKey, err)
    }
    defer resp.Body.Close()

    var apiDrivers []struct {
        DriverNumber int `json:"driver_number"`
    }
    if err := json.NewDecoder(resp.Body).Decode(&apiDrivers); err != nil {
        return nil, fmt.Errorf("failed to decode drivers response: %w", err)
    }

    var driverNumbers []int
    for _, apiDriver := range apiDrivers {
        driverNumbers = append(driverNumbers, apiDriver.DriverNumber)
    }
    return driverNumbers, nil
}

func GetRandomDriversOfSession(optionsCount int, session models.Session) []models.Driver {
    drivers := session.Drivers
    rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
    rnd.Shuffle(len(drivers), func(i, j int) { drivers[i], drivers[j] = drivers[j], drivers[i] })

    if optionsCount > len(drivers) {
        optionsCount = len(drivers)
    }

    return drivers[:optionsCount]
}
