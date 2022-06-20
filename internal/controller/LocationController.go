package controller

import (
	"LocationLunatics/internal/models"
	"LocationLunatics/internal/repository"
)

type LocationController struct {
}

func NewLocationController() (lc *LocationController) {
	return &LocationController{}
}
func (lc *LocationController) GetLocations(bb models.BoundingBox) (locations []models.Location, err error) {
	return repository.GetAllLocationData(), nil
}
