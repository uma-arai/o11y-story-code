## 前提

- 00_preparationを終えていること

### memo

```bash
$ cd ~/environment/cloudwatch-code/ecs_go/

$ copilot init
Note: It's best to run this command in the root of your Git repository.
Welcome to the Copilot CLI! We're going to walk you through some questions
to help you get set up with a containerized application on AWS. An application is a collection of
containerized services that operate together.


  What would you like to name your application? [? for help] cnos   # cnosと入力
  
:

Application name: cnos

  Which workload type best represents your architecture?  [Use arrows to move, type to filter, ? for more help]
    Request-Driven Web Service  (App Runner)
  > Load Balanced Web Service   (Internet to ECS on Fargate)  # Load Balanced Web Serviceを選択
    Backend Service             (ECS on Fargate)
    Worker Service              (Events to SQS to ECS on Fargate)
    Scheduled Job               (Scheduled event to State Machine to Fargate)
    
:

Workload type: Load Balanced Web Service

  What do you want to name this service? [? for help] mini-handson  # mini-handsonと入力

:

Service name: mini-handson
Manifest file for service mini-handson already exists. Skipping configuration.
Ok great, we'll set up a Load Balanced Web Service named mini-handson in application cnos.

✔ Created the infrastructure to manage services and jobs under application cnos.

✔ The directory copilot will hold service manifests for application cnos.

✔ Manifest file for service mini-handson already exists at copilot/mini-handson/manifest.yml, skipping writing it.
Your manifest contains configurations like your container size and port.

✔ Created ECR repositories for service mini-handson.

All right, you're all set for local development.

Would you like to deploy a test environment? [? for help] (y/N) y

:

Deploy: Yes

✔ Linked account 123456789012 and region ap-northeast-1 to application cnos.

✔ Proposing infrastructure changes for the cnos-test environment.
- Creating the infrastructure for the cnos-test environment.             [create complete]  [75.7s]
  - An IAM Role for AWS CloudFormation to manage resources               [create complete]  [16.6s]
  - An ECS cluster to group your services                                [create complete]  [10.7s]
  - An IAM Role to describe resources in your environment                [create complete]  [17.1s]
  - A security group to allow your containers to talk to each other      [create complete]  [5.9s]
  - An Internet Gateway to connect to the public internet                [create complete]  [16.8s]
  - Private subnet 1 for resources with no internet access               [create complete]  [5.9s]
  - Private subnet 2 for resources with no internet access               [create complete]  [5.9s]
  - Public subnet 1 for resources that can access the internet           [create complete]  [5.9s]
  - Public subnet 2 for resources that can access the internet           [create complete]  [5.9s]
  - A Virtual Private Cloud to control networking of your AWS resources  [create complete]  [17.8s]
✔ Created environment test in region ap-northeast-1 under application cnos.

Environment test is already on the latest version v1.8.0, skip upgrade.

:

✔ Proposing infrastructure changes for stack cnos-test-mini-handson

✔ Deployed service mini-handson.
Recommended follow-up action:
  - You can access your service at http://cnos-Publi-XXXX.ap-northeast-1.elb.amazonaws.com over the internet.

```

最後に表示されるURLにアクセスする

「cnos-Publi-XXXX.ap-northeast-1.elb.amazonaws.com」への接続は安全ではありません　と表示された場合、サイトへ移動
