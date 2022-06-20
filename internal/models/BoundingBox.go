package models

import "strconv"

type BoundingBox struct {
	minLat float64
	minLng float64
	maxLat float64
	maxLng float64
}

func NewBoundingBox(lat1, lng1, lat2, lng2 string) (bb BoundingBox, err error) {
	floatLat1, err := strconv.ParseFloat(lat1, 64)
	if err != nil {
		return bb, err
	}
	floatLng1, err := strconv.ParseFloat(lng1, 64)
	if err != nil {
		return bb, err
	}
	floatLat2, err := strconv.ParseFloat(lat2, 64)
	if err != nil {
		return bb, err
	}
	floatLng2, err := strconv.ParseFloat(lng2, 64)
	if err != nil {
		return bb, err
	}
	//todo: sort inputs
	return BoundingBox{
		minLat: floatLat1,
		minLng: floatLng1,
		maxLat: floatLat2,
		maxLng: floatLng2,
	}, nil
}
