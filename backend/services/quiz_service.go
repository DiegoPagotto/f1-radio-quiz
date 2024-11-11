package services

import (
	"f1-radio-quiz/data"
	"f1-radio-quiz/models"
	"math/rand"
)

func GetRandomQuestion() models.QuizQuestion {
    question := data.Questions[rand.Intn(len(data.Questions))]
    return models.QuizQuestion{
        Question: question.Question,
        Options:  question.Options,
    }
}

func CheckAnswer(answer models.AnswerRequest) bool {
    for _, question := range data.Questions {
        if question.Question == answer.Question {
            return answer.Option == question.Answer
        }
    }
    return false
}
