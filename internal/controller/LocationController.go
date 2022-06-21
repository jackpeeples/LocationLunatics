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

func (lc *LocationController) GetLocations(bb models.BoundingBox, groupId string, isGrouped bool) (webLocations []models.WebLocation, err error) {
	locations := []models.Location{}
	if isGrouped {
		locations, _ = lc.GetGroupLocations(groupId)
	} else {
		locations = repository.GetAllLocationData()
	}

	for _, loc := range locations {
		webLoc := models.ConvertLocationToWeb(loc)
		webLocations = append(webLocations, webLoc)
	}
	return webLocations, nil
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
