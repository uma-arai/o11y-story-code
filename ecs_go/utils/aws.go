package utils

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cloudwatch"
	"github.com/uma-arai/cloudwatch-code/ecs_go/types"
	"time"
)

// SendCloudWatchMetricsLatency ...
func SendCloudWatchMetricsLatency(sess *session.Session, latency float64, cfg *APIConfig) (*cloudwatch.PutMetricDataOutput, error) {
	svc := cloudwatch.New(sess, aws.NewConfig().WithRegion(types.AwsRegion))
	if cfg.ApplicationID == "" {
		cfg.ApplicationID = "cnosapp"
	}

	return svc.PutMetricData(&cloudwatch.PutMetricDataInput{
		MetricData: []*cloudwatch.MetricDatum{
			&cloudwatch.MetricDatum{
				Dimensions: []*cloudwatch.Dimension{
					&cloudwatch.Dimension{
						Name:  aws.String("application_id"),
						Value: aws.String(cfg.ApplicationID),
					},
				},
				MetricName:        aws.String("latency"),
				StorageResolution: aws.Int64(1),
				Timestamp:         aws.Time(time.Now()),
				Value:             aws.Float64(latency),
			},
		},
		Namespace: aws.String("Custom/CNOS"),
	})
}
