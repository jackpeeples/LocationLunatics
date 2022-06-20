package web

import (
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

	}
	return router
}

func GetPing(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "alive",
	})
}
