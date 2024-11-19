package handlers

import (
	"encoding/json"
	"f1-radio-quiz/services"
	"net/http"
)

func GetQuiz(w http.ResponseWriter, r *http.Request) {
    question := services.GetRandomQuestion()
    json.NewEncoder(w).Encode(question)
}


func GetRandomSessionWithDrivers(w http.ResponseWriter, r *http.Request) {
    session, err := services.GetRandomSessionWithDrivers()
    if err != nil {
        http.Error(w, "Failed to get random session: "+err.Error(), http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(session)
}