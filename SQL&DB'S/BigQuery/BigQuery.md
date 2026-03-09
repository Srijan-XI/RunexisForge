# BigQuery

## Introduction

BigQuery is Google Cloud's serverless, highly scalable data warehouse for analytics using standard SQL.

### Key Features

- Fully managed, no server provisioning
- Separation of storage and compute; on-demand or flat-rate pricing
- Federated queries (Cloud Storage, Bigtable, Drive)
- Built-in ML with BigQuery ML

### Resources

- Docs: <https://cloud.google.com/bigquery/docs>
- Console: <https://console.cloud.google.com/bigquery>

---

## User Guide

### Setup

- Create/select a Google Cloud project
- Enable BigQuery API and create a dataset
- Install CLI: `gcloud components install bq`

### CLI Basics

```bash
bq ls
bq query --use_legacy_sql=false 'SELECT 1'
```

### Create Table and Load

```bash
bq mk --table mydataset.items id:INT64,name:STRING
bq load --source_format=CSV mydataset.items gs://my-bucket/items.csv id:name
```

### Query

```sql
SELECT name, COUNT(*) FROM `myproject.mydataset.items`
GROUP BY name
ORDER BY 2 DESC;
```

### Partitioning and Clustering

- Partition by ingestion or column (DATE/TIMESTAMP)
- Cluster by frequently filtered columns

### Access Control

- IAM roles at project/dataset/table levels (e.g., `roles/bigquery.dataViewer`)

### Cost Tips

- Use `SELECT` specific columns
- Preview tables instead of full scans
- Set query bytes limit with `maximumBytesBilled`

### Clients

- Python: `pip install google-cloud-bigquery`
- Node.js: `npm install @google-cloud/bigquery`
