package data

import "f1-radio-quiz/models"

var Questions = []models.QuizQuestion{
    {
        Question: "Qual é a capital da França?",
        Options:  []string{"Paris", "Londres", "Berlim", "Madri"},
        Answer:   0,
    },
    {
        Question: "Quanto é 5 + 7?",
        Options:  []string{"10", "12", "15", "13"},
        Answer:   1,
    },
    // Adicione mais perguntas conforme necessário
}
