package repositories

import (
	"f1-radio-quiz/db"
	"f1-radio-quiz/models"
)


func GetDriverByNumber(driverNumber int) (models.Driver, error) {
    var driver models.Driver
    result := db.DB.First(&driver, "driver_number = ?", driverNumber)
    return driver, result.Error
}

func CreateDriver(driver models.Driver) error {
    return db.DB.Create(&driver).Error
}