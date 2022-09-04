package utils

import (
	"fmt"
	"github.com/labstack/echo/v4"
)

const (
	headerClientID string = "x-client-id"
)

// HeaderCheck ...
func HeaderCheck(context interface{}, headerName string, headerValue string) (err error) {
	c := context.(echo.Context)
	currentHeader := c.Request().Header.Get(headerName)
	if currentHeader != headerValue {
		return fmt.Errorf("header check error")
	}
	return
}

// ClientIDCheck ...
func ClientIDCheck(context interface{}) (err error) {
	config := NewAPIConfig()

	c := context.(echo.Context)
	clientID := c.Request().Header.Get(headerClientID)
	if clientID != config.HeaderValue.ClientID {
		return fmt.Errorf("client id check error")
	}
	return
}
