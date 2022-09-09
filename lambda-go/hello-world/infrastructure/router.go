package infrastructure

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/uma-arai/cloudwatch-code/lambda-go/hello-world/handler"
	"github.com/uma-arai/cloudwatch-code/lambda-go/hello-world/logger"
)

// Router ...
func Router() *echo.Echo {
	e := echo.New()

	logger.Init()
	logger.Info("Starting web application...")

	// The Echo documentation tells you how to add zap as middleware by using RequestLoggerWithConfig.
	// Ref. https://echo.labstack.com/middleware/logger/
	//
	// On the other hand, when I try it this way, you can't change the log level based on the status code results.
	// Therefore, we create custom middleware and incorporate it into Echo.
	e.Use(customLogMiddleware)
	e.Use(middleware.Recover())

	basePath := "cnosapp"
	healthCheckHandler := handler.NewHealthCheckHandler()
	cpuBoundHandler := handler.NewCpuBoundHandler()
	responseHandler := handler.NewResponseHandler()

	e.GET("/", healthCheckHandler.HealthCheck())
	e.GET(basePath + "/v1/cpubound", cpuBoundHandler.CpuBound())
	e.GET(basePath + "/v1/response/ok", responseHandler.ReturnOK())
	e.GET(basePath + "/v1/response/error/service_unavailable", responseHandler.ReturnErrorServiceUnavailable())
	e.GET(basePath + "/v1/response/error/random", responseHandler.ReturnErrorRandom())
	e.GET(basePath + "/v1/response/random", responseHandler.ReturnRandomResponse())
	e.GET(basePath + "/v1/response/ok/sleep", responseHandler.RandomOkWithSleep())
	return e
}
