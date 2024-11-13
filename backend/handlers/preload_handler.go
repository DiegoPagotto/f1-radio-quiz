package handlers

import (
	"f1-radio-quiz/services"
	"net/http"
)

func PreloadF1DataHandler(w http.ResponseWriter, r *http.Request) {
    err := services.LoadSessions()
    if err != nil {
        http.Error(w, "Failed to load sessions: "+err.Error(), http.StatusInternalServerError)
        return
    }

    err = services.LoadDrivers()
    if err != nil {
        http.Error(w, "Failed to load drivers: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Database preloaded successfully"))
}
