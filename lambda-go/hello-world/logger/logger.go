package logger

import (
	"github.com/uma-arai/cloudwatch-code/lambda-go/hello-world/types"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var log *zap.Logger

// Init initialize log settings of zap.
func Init() {
	var err error

	config := zap.Config{
		// If you want to print logs with debug level, uncomment and replace following code.
		// Level: zap.NewAtomicLevelAt(zap.DebugLevel),
		Level:            zap.NewAtomicLevel(),
		Encoding:         "json",
		DisableCaller:    true,
		OutputPaths:      []string{"stdout"},
		ErrorOutputPaths: []string{"stdout"},
		EncoderConfig: zapcore.EncoderConfig{
			LevelKey:       "level",
			TimeKey:        "timestamp",
			MessageKey:     "message",
			CallerKey:      "caller",
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeLevel:    zapcore.LowercaseLevelEncoder,
			EncodeDuration: zapcore.StringDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},
	}

	log, err = config.Build()
	if err != nil {
		panic(any(err))
	}
}

// Output write log contents according to given log level.
func Output(level types.LogLevel, msg string, fields ...zap.Field) {
	switch level {
	case types.Debug:
		Debug(msg, fields...)
	case types.Info:
		Info(msg, fields...)
	case types.Error:
		Error(msg, fields...)
	}
}

// Debug writes logs with debug level.
func Debug(msg string, fields ...zap.Field) {
	defer log.Sync()
	log.Debug(msg, fields...)
}

// Info writes logs with info level.
func Info(msg string, fields ...zap.Field) {
	defer log.Sync()
	log.Info(msg, fields...)
}

// Error writes log with error level.
func Error(msg string, fields ...zap.Field) {
	defer log.Sync()
	log.Error(msg, fields...)
}
