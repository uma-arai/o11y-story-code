package types

type LogType = string
type LogLevel = string

const (
	AccessLog = LogType("access_log")
	AppLog    = LogType("app_log")

	Debug = LogLevel("debug")
	Info  = LogLevel("info")
	Error = LogLevel("error")
)
