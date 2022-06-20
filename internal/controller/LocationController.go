package controller

import (
	"LocationLunatics/internal/models"
	"LocationLunatics/internal/repository"
	"fmt"
	"strconv"
)

type LocationController struct {
}

func NewLocationController() (lc *LocationController) {
	return &LocationController{}
}
func (lc *LocationController) GetLocations(bb models.BoundingBox) (locations []models.Location, err error) {
	return repository.GetAllLocationData(), nil
}

func (lc *LocationController) GetGroupLocations(groupId string) (locations []models.Location, err error) {
	groupIdInt, err := strconv.Atoi(groupId)
	if err != nil {
		return locations, err
	}
	allLocations := repository.GetAllLocationData()

	finalLocations := []models.Location{}
	for _, loc := range allLocations {
		if loc.ZoneGroupID == groupIdInt {
			finalLocations = append(finalLocations, loc)
			fmt.Println("Succeed: " + loc.PMZoneCode)
		} else {
			fmt.Println("FAIL: " + loc.PMZoneCode)
		}
	}

	return finalLocations, nil
}
