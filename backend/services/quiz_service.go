package services

import (
	"f1-radio-quiz/config"
	"f1-radio-quiz/models"
	"math/rand"
	"time"
)

func GetRandomQuestion() models.QuizQuestion {
    question := models.QuizQuestion{}
    session, _ := GetRandomSessionWithDrivers()

    drivers := session.Drivers

    rnd := rand.New(rand.NewSource(time.Now().UnixNano()))

    randomDriverIndex := rnd.Intn(len(drivers))
    randomDriver := drivers[randomDriverIndex]

    question.Session = session
    question.Options = GetRandomDriversOfSession(config.NUMBER_OF_OPTIONS, session)
    question.AnswerDriverNumber = randomDriver.DriverNumber
    question.RadioURL = GetRadioURL()

    return question
}
