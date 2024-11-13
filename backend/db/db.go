package db

import (
	"f1-radio-quiz/models"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SetupDatabase() {
    var err error
    DB, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to database!")
    }

    DB.AutoMigrate(&models.Driver{}, &models.Session{})

    fmt.Println("Database connected and models migrated")
}
