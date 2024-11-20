package services

import (
	"encoding/json"
	"f1-radio-quiz/config"
	"f1-radio-quiz/models"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

func GetRandomRadioBySessionAndDriver(session_key int, driver_number int) (string, error) {
    url := fmt.Sprintf("%s/team_radio?session_key=%d&driver_number=%d", config.API_URL, session_key, driver_number)
    resp, err := http.Get(url)
    if err != nil {
        return "", fmt.Errorf("failed to fetch radio: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
    }

    var radioResponses []models.RadioResponse
    if err := json.NewDecoder(resp.Body).Decode(&radioResponses); err != nil {
        return "", fmt.Errorf("failed to decode radio response: %w", err)
    }

    if len(radioResponses) == 0 {
        return "", fmt.Errorf("no radio responses found")
    }

    randSource := rand.NewSource(time.Now().UnixNano())
    randGenerator := rand.New(randSource)
    randomIndex := randGenerator.Intn(len(radioResponses))

    return radioResponses[randomIndex].RecordingURL, nil
}