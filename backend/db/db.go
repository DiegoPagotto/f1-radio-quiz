package db

import (
	"f1-radio-quiz/models"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SetupDatabase() {
    var err error
    dsn := "host=localhost user=admin password=postgres dbname=f1_radio_quiz_db port=5432 sslmode=disable TimeZone=UTC"
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to database!")
    }

    DB.AutoMigrate(&models.Driver{}, &models.Session{})

    fmt.Println("Database connected and models migrated")
}
