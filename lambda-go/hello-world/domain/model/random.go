package model

import "time"

// Sleep ...
type Sleep struct {
	Second time.Duration	`json:"sleep_second"`
}

// Response ...
type Response struct {
	StatusCode int `json:"status_code"`
}