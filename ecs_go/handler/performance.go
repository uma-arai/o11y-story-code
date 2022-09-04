package handlers

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/labstack/echo/v4"
	"github.com/uma-arai/cloudwatch-code/ecs_go/domain/model"
	"github.com/uma-arai/cloudwatch-code/ecs_go/utils"
	"math/rand"
	"time"
)

// PerformanceHandler ...
type PerformanceHandler struct {
}

// NewPerformanceHandler ...
func NewPerformanceHandler() *PerformanceHandler {
	return &PerformanceHandler{}
}

// InduceCpuBound ...
func (handler *PerformanceHandler) InduceCpuBound() echo.HandlerFunc {
	return func(c echo.Context) error {
		t := time.NewTimer(20 * time.Second)

		go func() {
			for {
			}
		}()
		<-t.C
		t.Stop()

		return c.JSON(200, nil)
	}
}

// InduceLatency ...
func (handler *PerformanceHandler) InduceLatency(sess *session.Session, cfg *utils.APIConfig) echo.HandlerFunc {
	return func(c echo.Context) error {
		start := time.Now()

		if cfg.LatencyFlag {
			rand.Seed(time.Now().UnixNano())
			second := rand.Intn(500) + 500
			time.Sleep(time.Duration(second) * time.Millisecond)
		}
		stop := time.Now()
		l := stop.Sub(start)

		if _, err := utils.SendCloudWatchMetricsLatency(sess, l.Seconds(), cfg); err != nil {
			fmt.Println(err)
			return c.JSON(500, err.Error())
		}

		return c.JSON(200, &model.PerformanceResponse{
			Latency: l.Seconds(),
		})
	}
}
