package handlers

import (
	"encoding/json"
	"f1-radio-quiz/models"
	"f1-radio-quiz/services"
	"net/http"
)

func GetQuiz(w http.ResponseWriter, r *http.Request) {
    var question models.QuizQuestion
    for {
        question = services.GetRandomQuestion()
        if question.RadioURL != "" {
            break
        }
    }
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