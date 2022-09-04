package infrastructure

import (
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/uma-arai/cloudwatch-code/ecs_go/handler"
	"github.com/uma-arai/cloudwatch-code/ecs_go/logger"
	"github.com/uma-arai/cloudwatch-code/ecs_go/utils"
)

// Router ...
func Router(sess *session.Session) *echo.Echo {
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

	cfg := utils.NewAPIConfig()
	basePath := "cnosapp"
	if cfg.ApplicationID != "" {
		basePath = cfg.ApplicationID
		logger.Info("Change base path of API from [cnosapp] to [" + basePath + "]")
	}

	AppHandler := handlers.NewAppHandler(NewSQLHandler())
	healthCheckHandler := handlers.NewHealthCheckHandler()
	helloWorldHandler := handlers.NewHelloWorldHandler()
	responseHandler := handlers.NewResponseHandler()
	performanceHandler := handlers.NewPerformanceHandler()

	e.GET(basePath+"/v1/healthcheck", healthCheckHandler.HealthCheck())
	e.GET(basePath+"/v1/helloworld", helloWorldHandler.SayHelloWorld())
	e.GET(basePath+"/v1/app", AppHandler.GetAppInfo())
	e.GET(basePath+"/v1/response/ok", responseHandler.ReturnOK())
	e.GET(basePath+"/v1/response/error/service_unavailable", responseHandler.ReturnErrorServiceUnavailable())
	e.GET(basePath+"/v1/response/error/random", responseHandler.ReturnErrorRandom())
	e.GET(basePath+"/v1/performance/cpubound", performanceHandler.InduceCpuBound())
	e.GET(basePath+"/v1/performance/latency", performanceHandler.InduceLatency(sess, cfg))

	return e
}
