package models

type QuizQuestion struct {
	Question string   `json:"question"`
	Options  []string `json:"options"`
	Answer   int      `json:"-"`
}

type AnswerRequest struct {
	Question string `json:"question"`
	Option   int    `json:"option"`
}

type AnswerResponse struct {
	Correct bool `json:"correct"`
}
