package web

import (
	"LocationLunatics/internal/controller"
	"LocationLunatics/internal/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type LocationsRouter struct {
}

func (lr *LocationsRouter) Bootstrap() {
	router := lr.RouterBootstrap()
	routerChan := make(chan string)
	go func() {
		err := router.Run()
		if err != nil {
			routerChan <- err.Error()
		}
	}()

	select {
	case routerError := <-routerChan:
		fmt.Println("ROUTER FAILED: " + routerError)
		os.Exit(1)
	}
}

func (lr *LocationsRouter) RouterBootstrap() *gin.Engine {
	os.Setenv("PORT", "8080")
	router := gin.New()

	v1 := router.Group("/v1")
	{
		v1.GET("/locations/pings", GetPing)
		v1.GET("/locations", lr.GetLocations)

	}
	return router
}

func (lr *LocationsRouter) GetLocations(c *gin.Context) {
	lat1 := c.Query("lat1")
	lng1 := c.Query("lng1")
	lat2 := c.Query("lat2")
	lng2 := c.Query("lng2")
	groupId := c.Query("groupId")

	lc := controller.NewLocationController()
	isGroupId := false
	if groupId != "" {
		isGroupId = true
	}
	bb, _ := models.NewBoundingBox(lat1, lng1, lat2, lng2)

	zones, err := lc.GetLocations(bb, groupId, isGroupId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"locations": zones,
	})
}
func GetPing(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "alive",
	})
}
