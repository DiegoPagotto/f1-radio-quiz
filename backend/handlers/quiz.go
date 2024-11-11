package handlers

import (
	"encoding/json"
	"f1-radio-quiz/models"
	"f1-radio-quiz/services"
	"net/http"
)

func GetQuiz(w http.ResponseWriter, r *http.Request) {
    question := services.GetRandomQuestion()
    json.NewEncoder(w).Encode(question)
}

func CheckAnswer(w http.ResponseWriter, r *http.Request) {
    var answer models.AnswerRequest
    json.NewDecoder(r.Body).Decode(&answer)

    correct := services.CheckAnswer(answer)
    json.NewEncoder(w).Encode(models.AnswerResponse{Correct: correct})
}
