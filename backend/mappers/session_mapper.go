package mappers

import (
	"f1-radio-quiz/models"
)

func ToSessionResponse(session models.Session) models.SessionResponse {
	return models.SessionResponse{
		SessionKey: session.SessionKey,
		Year:       session.Year,
		Location:   session.Location,
		SessionTitle: session.SessionTitle,
	}
}