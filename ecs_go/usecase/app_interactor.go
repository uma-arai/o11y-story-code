package usecase

import (
	"fmt"
	"github.com/uma-arai/cloudwatch-code/ecs_go/domain/model"
	"github.com/uma-arai/cloudwatch-code/ecs_go/domain/repository"
)

// AppInteractor ...
type AppInteractor struct {
	AppRepository repository.AppRepositoryInterface
}

// GetAppInfo ...
func (interactor *AppInteractor) GetAppInfo(id string) (app model.App, err error) {

	app, err = interactor.AppRepository.Where(id)
	if err != nil {
		err = fmt.Errorf("GetAppInfo error")
		return
	}

	return
}
