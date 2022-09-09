package logger

import (
	"github.com/uma-arai/cloudwatch-code/ecs_go/types"
	"go.uber.org/zap"
	"runtime"
	"strconv"
)

// AppDebug writes log with debug level.
func AppDebug(msg string) {
	Output(types.Debug, msg, getZapAppLoggerList()...)
}

// AppInfo writes log with info level.
func AppInfo(msg string) {
	Output(types.Info, msg, getZapAppLoggerList()...)
}

// AppError writes log with error level.
func AppError(msg string) {
	Output(types.Error, msg, getZapAppLoggerList()...)
}

// getZapAppLoggerList returns config list for initializing zap settings.
func getZapAppLoggerList() []zap.Field {
	_, caller, line, _ := runtime.Caller(2)
	return []zap.Field{
		zap.String("log_type", types.AppLog),
		zap.String("original_caller", caller+":"+strconv.Itoa(line)),
	}
}
