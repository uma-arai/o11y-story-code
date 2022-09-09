.PHONY: all build validate package deploy clean

APP_DIR = hello-world
ID = cnos-mini-handson-lambda
TEMPLATE_FILE = template.yaml
BUCKET_NAME = cnos-s3-lambda-$(AWS_ACCOUNT_ID)
STACK_NAME = cnos-cfn-lambda

all:
	make clean
	make build
	make package
	make deploy

build:
	cd $(APP_DIR) && GOARCH=amd64 GOOS=linux go build -o $(APP_DIR) && cd ..

validate:
	sam validate

package:
	sam package --resolve-s3 --output-template-file _$(TEMPLATE_FILE) --force-upload

deploy:
	sam deploy --template-file _$(TEMPLATE_FILE) --stack-name $(STACK_NAME) --resolve-s3 --capabilities CAPABILITY_IAM

clean:
	rm -rf .aws-sam _$(TEMPLATE_FILE)	
