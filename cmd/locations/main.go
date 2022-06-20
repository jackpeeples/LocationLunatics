package main

import "LocationLunatics/internal/web"

func main() {
	listenerRouter := web.LocationsRouter{}

	listenerRouter.Bootstrap()
}
