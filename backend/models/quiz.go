package models

type QuizQuestion struct {
	Session Session `json:"session"`
	RadioURL string `json:"radio_url"`
	Options []Driver `json:"options"`
	AnswerDriverNumber int `json:"answer_driver_number"`
}