package infrastructure

import (
	"github.com/labstack/echo/v4"
	"github.com/uma-arai/cloudwatch-code/lambda-go/hello-world/logger"
	"github.com/uma-arai/cloudwatch-code/lambda-go/hello-world/types"
	"go.uber.org/zap"
	"regexp"
	"strconv"
)

const (
	requestId = "X-Request-Id"
)

// customLogMiddleware returns middleware for embedding Echo framework
// to accomplish changing the log level to status code.
func customLogMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	isInfo := regexp.MustCompile(`^1[0-9][0-9]`)
	isSuccess := regexp.MustCompile(`^2[0-9][0-9]`)
	isRedirect := regexp.MustCompile(`^3[0-9][0-9]`)
	isClientError := regexp.MustCompile(`^4[0-9][0-9]`)
	isServerError := regexp.MustCompile(`^5[0-9][0-9]`)

	return func(c echo.Context) error {
		err := next(c)
		statusCode := strconv.Itoa(c.Response().Status)
		if isInfo.MatchString(statusCode) || isSuccess.MatchString(statusCode) || isRedirect.MatchString(statusCode) {
			loggerInfo(c)
		} else if isClientError.MatchString(statusCode) || isServerError.MatchString(statusCode) {
			loggerError(c)
		}
		return err
	}
}

// loggerInfo writes logs with info level.
func loggerInfo(c echo.Context) {
	logger.Output(types.Info, "request", getZapLoggerList(c)...)
}

// loggerError writes logs with error level.
func loggerError(c echo.Context) {
	logger.Output(types.Error, "request", getZapLoggerList(c)...)
}

// getZapLoggerList returns config list for initializing zap settings.
func getZapLoggerList(c echo.Context) []zap.Field {
	return []zap.Field{
		zap.String("log_type", types.AccessLog),
		zap.String("remote_ip", c.Request().RemoteAddr),
		zap.String("host", c.Request().Host),
		zap.String("method", c.Request().Method),
		zap.String("uri", c.Request().RequestURI),
		zap.String("user_agent", c.Request().UserAgent()),
		zap.String("request_id", c.Request().Header.Get(requestId)),
		zap.Int("status", c.Response().Status),
		zap.Int64("response_size", c.Response().Size),
	}
}
