package models

import "fmt"

type WebLocation struct {
	Type       string             `json:"type" binding:"omitempty"`
	Properties LocationProperties `json:"properties" binding:"omitempty"`
	Geometry   LocationGeometry   `json:"geometry" binding:"omitempty"`
}

type LocationProperties struct {
	Place                string `json:"place" binding:"omitempty"` //name
	Login                string `json:"login" binding:"omitempty"` //rate name
	PmZoneCode           string `json:"pm_zone_code" binding:"omitempty"`
	Lat                  string `json:"lat" binding:"omitempty"`
	Lon                  string `json:"lon" binding:"omitempty"`
	MainStreet           string `json:"main_street" binding:"omitempty"`
	CrossStreet          string `json:"cross_street" binding:"omitempty"`
	CrossStreetTwo       string `json:"cross_street_two" binding:"omitempty"`
	SpaceCount           string `json:"space_count" binding:"omitempty"`
	MeterType            string `json:"meter_type" binding:"omitempty"`
	EnforcementType      string `json:"enforcement_type" binding:"omitempty"`
	HourlyRate           string `json:"hourly_rate" binding:"omitempty"`
	MaxDurationInMinutes string `json:"max_duration_in_minutes" binding:"omitempty"`
	MinimumAmount        string `json:"minimum_amount" binding:"omitempty"`
	IncrementsInMinutes  string `json:"increments_in_minutes" binding:"omitempty"`
	ZoneGroupID          int    `json:"zone_group_id" binding:"omitempty"`
}

type LocationGeometry struct {
	Type        string    `json:"type" binding:"omitempty"`
	Coordinates []float64 `json:"coordinates" binding:"omitempty"`
}

func ConvertLocationToWeb(location Location) (webLoc WebLocation) {
	webLocGeo := LocationGeometry{
		Type:        "Point",
		Coordinates: []float64{location.Lat, location.Long},
	}
	webLocProperties := LocationProperties{
		Place:                location.Name,
		Login:                location.RateName,
		PmZoneCode:           location.PMZoneCode,
		Lat:                  fmt.Sprintf("%f", location.Lat),
		Lon:                  fmt.Sprintf("%f", location.Long),
		MainStreet:           location.MainStreet,
		CrossStreet:          location.CrossStreet,
		CrossStreetTwo:       location.CrossStreetTwo,
		SpaceCount:           location.SpaceCount,
		MeterType:            location.MeterType,
		EnforcementType:      location.EnforcementType,
		HourlyRate:           location.HourlyRate,
		MaxDurationInMinutes: location.MaxDurationInMinutes,
		MinimumAmount:        location.MinimumAmount,
		IncrementsInMinutes:  location.IncrementsInMinutes,
		ZoneGroupID:          location.ZoneGroupID,
	}
	webLoc.Type = "Feature"
	webLoc.Geometry = webLocGeo
	webLoc.Properties = webLocProperties

	return webLoc
}
