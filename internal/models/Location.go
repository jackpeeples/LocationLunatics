package models

type Location struct {
	PMZoneCode           string  `json:"pm_zone_code" binding:"omitempty"`
	MainStreet           string  `json:"main_street" binding:"omitempty"`
	CrossStreet          string  `json:"cross_street" binding:"omitempty"`
	CrossStreetTwo       string  `json:"cross_street_two" binding:"omitempty"`
	Lat                  float64 `json:"lat" binding:"omitempty"`
	Long                 float64 `json:"long" binding:"omitempty"`
	SpaceCount           string  `json:"space_count" binding:"omitempty"`
	MeterType            string  `json:"meter_type" binding:"omitempty"`
	RateName             string  `json:"rate_name" binding:"omitempty"`
	EnforcementType      string  `json:"enforcement_type" binding:"omitempty"`
	HourlyRate           string  `json:"hourly_rate" binding:"omitempty"`
	MaxDurationInMinutes string  `json:"max_duration_in_minutes" binding:"omitempty"`
	MinimumAmount        string  `json:"minimum_amount" binding:"omitempty"`
	IncrementsInMinutes  string  `json:"increments_in_minutes" binding:"omitempty"`
	ZoneGroupID          int32   `json:"zone_group_id" binding:"omitempty"`
}
