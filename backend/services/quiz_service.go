package services

import (
	"f1-radio-quiz/config"
	"f1-radio-quiz/mappers"
	"f1-radio-quiz/models"
	"math/rand"
	"time"
)

func GetRandomQuestion() models.QuizQuestion {
    question := models.QuizQuestion{}
    session, _ := GetRandomSessionWithDrivers()
    rnd := rand.New(rand.NewSource(time.Now().UnixNano()))

    question.Session = mappers.ToSessionResponse(session)
    question.Options = GetRandomDriversOfSession(config.NUMBER_OF_OPTIONS, session)

    randomDriverIndex := rnd.Intn(len(question.Options))
    randomDriver := question.Options[randomDriverIndex]

    question.AnswerDriverNumber = randomDriver.DriverNumber
    question.RadioURL, _ = GetRandomRadioBySessionAndDriver(question.Session.SessionKey, randomDriver.DriverNumber)

    return question
}
