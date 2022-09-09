package repository

import (
	"github.com/uma-arai/cloudwatch-code/ecs_go/domain/model"
	"github.com/uma-arai/cloudwatch-code/ecs_go/interface/database"
)

// AppRepositoryInterface ...
type AppRepositoryInterface interface {
	Where(id string) (account model.App, err error)
}

// AppRepository ...
type AppRepository struct {
	database.SQLHandler
}

// Where ...
func (repo *AppRepository) Where(id string) (app model.App, err error) {
	repo.SQLHandler.Where(&app, "id = ?", id)
	return
}
