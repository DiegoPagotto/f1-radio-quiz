package models

type RadioResponse struct {
    Date          string `json:"date"`
    DriverNumber  int    `json:"driver_number"`
    MeetingKey    int 	 `json:"meeting_key"`
    RecordingURL  string `json:"recording_url"`
    SessionKey    int    `json:"session_key"`
}