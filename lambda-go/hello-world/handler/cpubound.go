package handler

import (
	"github.com/labstack/echo/v4"
	"time"
)

// CpuBoundHandler ...
type CpuBoundHandler struct {
}

// NewCpuBoundHandler ...
func NewCpuBoundHandler() *CpuBoundHandler {
	return &CpuBoundHandler{}
}

// CpuBound ...
func (handler *CpuBoundHandler) CpuBound() echo.HandlerFunc {
	return func(c echo.Context) error {
		t := time.NewTimer(20 * time.Second)

		go func() {
			for {}
		}()
		<-t.C
		t.Stop()

		return c.JSON(200, nil)
	}
}
