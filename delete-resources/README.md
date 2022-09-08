# ミニハンズオンのリソース削除手順

ミニハンズオンで作成したリソースはそのまま放置すると料金が発生してしまいます。
終了後は次の手順にしたがって削除しましょう。

1. 各ミニハンズ固有のリソース事前削除
2. Lambda関連のリソース削除
3. Copilot関連のリソース削除
4. Cloud9の削除
5. 各ミニハンズオン固有のリソース事後削除

## 各ミニハンズオン固有のリソース事前削除

実施したミニハンズオンにしたがって、各リソースをまず削除してください。
この手順は、Copilotによる事前準備リソースの削除前に必ず実施してください。

|章|対象リソース|削除手順|
|-|-|-|
|3章|CloudWatch Metrics|本章に関する削除対象のリソースはありません。[^delete-metrics]|
|5章|CloudWatch Alarm|[削除手順](05_alarm_delete.md)|
|6章|CloudWatch Events/EventBridge|[削除手順](06_event_delete.md)|
|7章|Resource Health|本章に関する削除対象のリソースはありません。[^delete-resource-health]|
|8章|Synthetics|[削除手順](08_synthetics_delete.md)|
|9章|Evidently|[削除手順](09_evidently_delete.md)|
|10章|RUM|[削除手順](10_rum_delete.md)|
|11章|X-Ray|本章に関する削除対象のリソースはありません。[^delete-xray]|
|12章|ServiceLens|本章に関する削除対象のリソースはありません。[^delete-servicelens]|
|13章|Container Inisghts|本章に関する削除対象のリソースはありません。[^delete-container-insights]|
|14章|Lambda Insights|本章に関する削除対象のリソースはありません。[^delete-lambda-insights]|
|15章|Contributor Insights|[削除手順](15_contributor_insights_delete.md)|
|16章|Application Insights|[削除手順](16_application_insights_delete.md)|
|17章|Anomaly Detection|[削除手順](17_anomaly_detection_delete.md)|

## Lambda関連のリソース削除

TBD

## Copilot関連のリソース削除

Copilotにて作成した以下のリソースを順番に削除します。

1. ECSアプリケーション「cnosapp1」の削除
2. ECSアプリケーション「cnosapp2]の削除
3. App Runnerアプリケーション「cnosapp」の削除
4. App Runnerアプリケーション「webapp」の削除
5. copilotのapplicationを削除

### ECSアプリケーション「cnosapp1」の削除

- 以下コマンドを実行してください。

```bash
$ copilot svc delete --name cnosapp1
Sure? Yes	# Yesと入力
✔ Delete stack cnos-test-cnosapp1
✔ Deleted resources of service cnosapp1 from application cnos.

✔ Deleted service cnosapp1 from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists.

```


### ECSアプリケーション「cnosapp2」の削除

- 以下コマンドを実行してください。

```bash
$ copilot svc delete --name cnosapp2
Sure? Yes	# Yesと入力
✔ Delete stack cnos-test-cnosapp2
✔ Deleted resources of service cnosapp2 from application cnos.

✔ Deleted service cnosapp2 from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists.
```

### App Runnerアプリケーション「cnosapp」の削除

- 以下コマンドを実行してください。

```bash
$ copilot svc delete --name cnosapp
Sure? Yes	# Yesと入力
✔ Delete stack cnos-test-cnosapp
✔ Deleted resources of service cnosapp from application cnos.

✔ Deleted service cnosapp from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists
```

### App Runnerアプリケーション「webapp」の削除

- 以下コマンドを実行してください。

```bash
$ copilot svc delete --name webapp
Sure? Yes	# Yesと入力
✔ Deleted resources of service webapp from application cnos.

✔ Deleted service webapp from application cnos.
Recommended follow-up action:
  - Run `copilot pipeline deploy` to update the corresponding pipeline if it exists.
```

### copilotのapplicationを削除

- 以下コマンドを実行してください。
``` bash
$ copilot app delete --name cnos
Sure? Yes	# Yesと入力
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

TBD

## 各ミニハンズオン固有のリソース事後削除

実施したミニハンズオンにしたがって、各リソースをまず削除してください。
この手順は、Copilotによる事前準備リソースの削除後に実施してください。

|章|対象リソース|削除手順|
|-|-|-|
|4章|CloudWatch Logs|[削除手順](04_logs_delete.md)|


[^delete-metrics]: AWSの仕様上、ミニハンズオンにて作成された標準メトリクス及びカスタムメトリクスは利用者側で削除できません。15ヶ月保持された後、自動で削除されます。
[^delete-resource-health]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。
[^delete-xray]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。
[^delete-servicelens]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。
[^delete-container-insights]: 本章に関連するリソースは[Copilot関連のリソース削除]手順にて併せて自動で削除されます。
[^delete-lambda-insights]: 本章に関連するリソースは[Lambda関連のリソース削除]手順にて併せて自動で削除されます。