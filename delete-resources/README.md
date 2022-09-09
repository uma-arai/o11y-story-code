# ミニハンズオンのリソース削除手順

ミニハンズオンで作成したリソースはそのまま放置すると料金が発生してしまいます。
終了後は次の手順にしたがって削除しましょう。

1. 各ミニハンズ固有のリソース事前削除
2. Lambda関連のリソース削除
3. Copilot関連のリソース削除
4. Cloud9の削除
5. SNSの削除
6. 各ミニハンズオン固有のリソース事後削除

## 各ミニハンズオン固有のリソース事前削除

実施したミニハンズオンにしたがって、各リソースをまず削除してください。
この手順は、Copilotによる事前準備リソースの削除前に必ず実施してください。

| 章   | 対象リソース                  | 削除手順                                                                 |
| ---- | ----------------------------- | ------------------------------------------------------------------------ |
| 3章  | CloudWatch Metrics            | [削除手順](03_metrics_delete.md)[^delete-metrics]                        |
| 4章  | CloudWatch Logs               | 事後削除にて削除をします。ここではスキップしてください。                 |
| 5章  | CloudWatch Alarm              | [削除手順](05_alarm_delete.md)                                           |
| 6章  | CloudWatch Events/EventBridge | [削除手順](06_event_delete.md)                                           |
| 7章  | Resource Health               | 本章に関する削除対象のリソースはありません。[^delete-resource-health]    |
| 8章  | Synthetics                    | [削除手順](08_synthetics_delete.md)                                      |
| 9章  | Evidently                     | [削除手順](09_evidently_delete.md)                                       |
| 10章 | RUM                           | [削除手順](10_rum_delete.md)                                             |
| 11章 | X-Ray                         | 本章に関する削除対象のリソースはありません。[^delete-xray]               |
| 12章 | ServiceLens                   | 本章に関する削除対象のリソースはありません。[^delete-servicelens]        |
| 13章 | Container Inisghts            | 本章に関する削除対象のリソースはありません。[^delete-container-insights] |
| 14章 | Lambda Insights               | 本章に関する削除対象のリソースはありません。[^delete-lambda-insights]    |
| 15章 | Contributor Insights          | [削除手順](15_contributor_insights_delete.md)                            |
| 16章 | Application Insights          | [削除手順](16_application_insights_delete.md)                            |
| 17章 | Anomaly Detection             | [削除手順](17_anomaly_detection_delete.md)                               |

## Lambda関連のリソース削除

ハンズオン準備に利用したCloud9インスタンスに接続し、以下コマンドを実行してください。

```bash
$ cd ~/environment/o11y-story-code/lambda-go/ && pwd
/home/ec2-user/environment/o11y-story-code/lambda-go

$ sam delete --stack-name cnos-cfn-lambda
        Are you sure you want to delete the stack cnos-cfn-lambda in the region ap-northeast-1 ? [y/N]: y	# [y]と入力
        Do you want to delete the template file 58a30ac7814b7ab7e9ae14882acfb51b.template in S3? [y/N]: y	# [y]と入力
        - Deleting S3 object with key 476e443286f02b5c5eb855f38a7e69b7
        - Deleting S3 object with key 58a30ac7814b7ab7e9ae14882acfb51b.template
        - Deleting Cloudformation stack cnos-cfn-lambda

Deleted successfully
```

## Copilot関連のリソース削除

Copilotにて作成した以下のリソースを順番に削除します。

1. ECSアプリケーション「cnosapp1」の削除
2. ECSアプリケーション「cnosapp2]の削除
3. App Runnerアプリケーション「cnosapp」の削除
4. App Runnerアプリケーション「webapp」の削除
5. copilotのapplicationを削除

もし、Copilotからの操作で削除に失敗してしまった場合、CloudFormationのスタックを確認して原因を取り除いてください。

### ECSアプリケーション「cnosapp1」の削除

- 以下コマンドを実行してください。

```bash
$ cd ~/environment/o11y-story-code/ecs_go/ && pwd
/home/ec2-user/environment/o11y-story-code/ecs_go

$ copilot svc delete --name cnosapp1
Are you sure you want to delete cnosapp1 from application cnos? [? for help] (y/N)	# [y]と入力

✔ Delete stack cnos-test-cnosapp1
✔ Deleted resources of service cnosapp1 from application cnos.

✔ Deleted service cnosapp1 from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists.

# 筆者の環境では、削除までに約4分ほどかかりました。

```


### ECSアプリケーション「cnosapp2」の削除

- 以下コマンドを実行してください。

```bash
$ copilot svc delete --name cnosapp2
Are you sure you want to delete cnosapp2 from application cnos? [? for help] (y/N)	# [y]と入力

✔ Delete stack cnos-test-cnosapp2
✔ Deleted resources of service cnosapp2 from application cnos.

✔ Deleted service cnosapp2 from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists.

# 筆者の環境では、削除までに約4分ほどかかりました。

```

### App Runnerアプリケーション「cnosapp」の削除

- 以下コマンドを実行してください。

```bash
$ copilot svc delete --name cnosapp
Are you sure you want to delete cnosapp from application cnos? [? for help] (y/N)	# [y]と入力

✔ Delete stack cnos-test-cnosapp
✔ Deleted resources of service cnosapp from application cnos.

✔ Deleted service cnosapp from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists

# 筆者の環境では、削除までに約1分ほどかかりました。

```

### App Runnerアプリケーション「webapp」の削除

- 以下コマンドを実行してください。

```bash
$ copilot svc delete --name webapp
Are you sure you want to delete webapp from application cnos? [? for help] (y/N)	# [y]と入力

✔ Deleted resources of service webapp from application cnos.

✔ Deleted service webapp from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists.

# 筆者の環境では、削除までに約1分ほどかかりました。

```

### copilotのapplicationを削除

- 以下コマンドを実行してください。
``` bash
$ copilot app delete --name cnos
  Are you sure you want to delete application cnos? [? for help] (Y/n)	# [Y]と入力
✔ Retained IAM roles for the "test" environment
✔ Delete environment stack cnos-test
✔ Deleted environment "test" from application "cnos".
✔ Cleaned up deployment resources.
✔ Deleted regional resources for application "cnos"
✔ Delete application roles stack cnos-infrastructure-roles
✔ Deleted application configuration.
✔ Deleted local .workspace file.
```

## Cloud9の削除

1. AWSマネジメントコンソール上から、サービスの検索で[cloud9]と入力し、表示されるサービス一覧から[Cloud9]を選択します。
2. 左ペインのメニューから[Your environments]メニューを開き、[cnos-handson-dev]を選択します。
3. [Delete]を押すと、削削除する旨のメッセージボックスが表示されるので、テキストフィールドに[Delete]と入力して、[Delete]ボタンを押してください。
4. 削除完了までに少し時間がかかります(1-2分程度)。Cloud9画面上から[cnos-handson-dev]が表示されなくなったら削除完了です。

## SNSの削除

1. AWSマネジメントコンソール上から、サービスの検索で[sns]と入力し、表示されるサービス一覧から[Simple Notification Service]を選択します。
2. 左ペインのメニューから[トピック]メニューを開き、[cnos-handson-sns]を選択します。
3. [削除]を押すと、削削除する旨のメッセージボックスが表示されるので、テキストフィールドに[これを削除]と入力して、[削除]ボタンを押してください。
4. 削除完了までに少し時間がかかります(1-2分程度)。Cloud9画面上から[cnos-handson-dev]が表示されなくなったら削除完了です。
5. AWSマネジメントコンソール上部に[トピック cnos-sns-cloudwatch-test が正常に削除されました。]とメッセージが表示されればOKです。

## 各ミニハンズオン固有のリソース事後削除

実施したミニハンズオンにしたがって、各リソースを削除してください。

| 章  | 対象リソース    | 削除手順                      |
| --- | --------------- | ----------------------------- |
| 4章 | CloudWatch Logs | [削除手順](04_logs_delete.md) |

以上でハンズオン関連の主要なリソース削除は完了です。
お疲れ様でした。

なお、SAM用のS3バケットやCopilotから間接的に実行されたCloudFormation用のS3バケットについては、読者の皆さまの既存環境への影響を考慮し、削除していません。
必要に応じて皆さまの方で適宜削除してください。

[^delete-metrics]: AWSの仕様上、ミニハンズオンにて作成された標準メトリクス及びカスタムメトリクスは利用者側で削除できません。15ヶ月保持された後、自動で削除されます。また、サンプルアプリのECSタスクロールに付与されたIAMポリシーに関して、Copilotによるサンプルアプリケーション削除時に併せて削除されるため、個別の対応は不要です。

[^delete-logs]: するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。

[^delete-resource-health]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。

[^delete-xray]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。

[^delete-servicelens]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。

[^delete-container-insights]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。

[^delete-lambda-insights]: 本章に関連するリソースは[Lambda関連のリソース削除]手順にて併せて自動で削除されます。
