package main

import (
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/uma-arai/cloudwatch-code/ecs_go/infrastructure"
	"os"
)

const (
	envTLSCert = "TLS_CERT"
	envTLSKey  = "TLS_KEY"
)

func main() {
	sess := session.Must(session.NewSession())
	router := infrastructure.Router(sess)

	if os.Getenv(envTLSCert) == "" || os.Getenv(envTLSKey) == "" {
		router.Logger.Fatal(router.Start(":80"))
	} else {
		router.Logger.Fatal(router.StartTLS(":443",
			os.Getenv(envTLSCert), os.Getenv(envTLSKey)))
	}
}
