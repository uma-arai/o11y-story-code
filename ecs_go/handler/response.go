package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/uma-arai/cloudwatch-code/ecs_go/domain/model"
	"github.com/uma-arai/cloudwatch-code/ecs_go/logger"
	"math/rand"
	"time"
)

// ResponseHandler ...
type ResponseHandler struct {
}

// NewResponseHandler ...
func NewResponseHandler() *ResponseHandler {
	return &ResponseHandler{}
}

// ReturnOK ...
func (handler *ResponseHandler) ReturnOK() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		logger.AppDebug("Request was successful.")
		return c.JSON(200, "200 OK")
	}
}

// ReturnErrorServiceUnavailable ...
func (handler *ResponseHandler) ReturnErrorServiceUnavailable() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		logger.AppDebug("Service Unavailable.")
		return c.JSON(503, "Service Unavailable")
	}
}

// ReturnErrorRandom ...
func (handler *ResponseHandler) ReturnErrorRandom() echo.HandlerFunc {
	return func(c echo.Context) error {
		rand.Seed(time.Now().UnixNano())
		var stsCode int
		var em *model.ErrorMessages

		code := rand.Intn(100)
		if code >= 0 && code < 50 {
			stsCode = 500
			em = &model.ErrorMessages{
				Code:    "500",
				Message: "Internal Server Error",
			}
		} else if code >= 50 && code < 70 {
			stsCode = 503
			em = &model.ErrorMessages{
				Code:    "503",
				Message: "Service Unavailable",
			}
		} else if code >= 70 && code < 80 {
			stsCode = 502
			em = &model.ErrorMessages{
				Code:    "502",
				Message: "Bad Gateway",
			}
		} else if code >= 80 && code < 90 {
			stsCode = 504
			em = &model.ErrorMessages{
				Code:    "504",
				Message: "Gateway Timeout",
			}
		} else if code >= 90 && code < 95 {
			stsCode = 505
			em = &model.ErrorMessages{
				Code:    "505",
				Message: "HTTP Version Not Supported",
			}
		} else if code >= 95 && code < 98 {
			stsCode = 506
			em = &model.ErrorMessages{
				Code:    "506",
				Message: "Variant Also Negotiates",
			}
		} else if code >= 98 && code < 99 {
			stsCode = 507
			em = &model.ErrorMessages{
				Code:    "507",
				Message: "Insufficient Storage",
			}
		} else {
			stsCode = 508
			em = &model.ErrorMessages{
				Code:    "508",
				Message: "Loop Detected",
			}
		}

		return c.JSON(stsCode, em)
	}
}
