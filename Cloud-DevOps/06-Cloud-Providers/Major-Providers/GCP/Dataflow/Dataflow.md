# Google Cloud Dataflow

## Introduction

Google Cloud Dataflow is a fully managed service for executing Apache Beam pipelines for batch and stream data processing. It provides a unified programming model that enables you to develop and execute a wide range of data processing patterns including ETL, analytics, real-time computation, and data integration.

### Key Features

- **Unified Batch & Stream**: Single programming model for both modes
- **Auto-scaling**: Automatic resource provisioning and scaling
- **Serverless**: No infrastructure management required
- **Apache Beam SDK**: Open-source, portable data processing
- **Horizontal Autoscaling**: Dynamic worker scaling based on workload
- **Flexible Resource Scheduling**: Optimize for cost or performance
- **Streaming Engine**: Optimized streaming execution
- **SQL Support**: Run SQL queries on streaming data
- **Integration**: Native integration with GCP services
- **Multi-language**: Java, Python, Go support

### Common Use Cases

- **ETL Pipelines**: Extract, transform, load data at scale
- **Real-time Analytics**: Process streaming data in real-time
- **Data Enrichment**: Enhance data with additional context
- **IoT Processing**: Process device telemetry and sensor data
- **Clickstream Analysis**: Analyze user behavior in real-time
- **Fraud Detection**: Real-time pattern detection
- **Log Analysis**: Process and analyze application logs
- **Machine Learning**: Feature engineering and data preparation

## Getting Started

### Prerequisites

```bash
# Install Google Cloud SDK
# macOS
brew install --cask google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Authenticate
gcloud auth login
gcloud auth application-default login

# Set project
gcloud config set project PROJECT_ID

# Enable APIs
gcloud services enable dataflow.googleapis.com
gcloud services enable compute.googleapis.com
gcloud services enable storage-api.googleapis.com

# Install Apache Beam SDK
# Python
pip install apache-beam[gcp]

# Java (Maven)
# Add to pom.xml:
# <dependency>
#   <groupId>org.apache.beam</groupId>
#   <artifactId>beam-sdks-java-core</artifactId>
#   <version>2.52.0</version>
# </dependency>
# <dependency>
#   <groupId>org.apache.beam</groupId>
#   <artifactId>beam-runners-google-cloud-dataflow-java</artifactId>
#   <version>2.52.0</version>
# </dependency>

# Create GCS bucket for staging
gsutil mb gs://my-dataflow-bucket
```

## Python Batch Pipeline

### Basic WordCount Example

```python
# wordcount.py
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
from apache_beam.options.pipeline_options import GoogleCloudOptions
from apache_beam.options.pipeline_options import StandardOptions

def run():
    # Pipeline options
    options = PipelineOptions(
        runner='DataflowRunner',
        project='your-project-id',
        region='us-central1',
        temp_location='gs://my-dataflow-bucket/temp',
        staging_location='gs://my-dataflow-bucket/staging',
        job_name='wordcount-job'
    )
    
    # Create pipeline
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read' >> beam.io.ReadFromText('gs://my-bucket/input.txt')
         | 'Split' >> beam.FlatMap(lambda line: line.split())
         | 'PairWithOne' >> beam.Map(lambda word: (word, 1))
         | 'GroupAndSum' >> beam.CombinePerKey(sum)
         | 'Format' >> beam.Map(lambda word_count: f'{word_count[0]}: {word_count[1]}')
         | 'Write' >> beam.io.WriteToText('gs://my-bucket/output')
        )

if __name__ == '__main__':
    run()
```

```bash
# Run pipeline
python wordcount.py \
  --runner DataflowRunner \
  --project your-project-id \
  --region us-central1 \
  --temp_location gs://my-dataflow-bucket/temp \
  --staging_location gs://my-dataflow-bucket/staging
```

### ETL Pipeline

```python
# etl_pipeline.py
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
import json

class ParseJson(beam.DoFn):
    def process(self, element):
        try:
            data = json.loads(element)
            yield data
        except json.JSONDecodeError as e:
            # Log error and skip malformed data
            print(f"Error parsing JSON: {e}")

class TransformData(beam.DoFn):
    def process(self, element):
        # Transform the data
        transformed = {
            'user_id': element.get('id'),
            'name': element.get('name', '').upper(),
            'email': element.get('email', '').lower(),
            'timestamp': element.get('created_at'),
            'active': element.get('status') == 'active'
        }
        yield transformed

class FilterActive(beam.DoFn):
    def process(self, element):
        if element.get('active'):
            yield element

def run_etl():
    options = PipelineOptions(
        runner='DataflowRunner',
        project='your-project-id',
        region='us-central1',
        temp_location='gs://my-dataflow-bucket/temp',
        staging_location='gs://my-dataflow-bucket/staging',
        job_name='etl-pipeline'
    )
    
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read from GCS' >> beam.io.ReadFromText('gs://my-bucket/users/*.json')
         | 'Parse JSON' >> beam.ParDo(ParseJson())
         | 'Transform' >> beam.ParDo(TransformData())
         | 'Filter Active' >> beam.ParDo(FilterActive())
         | 'Write to BigQuery' >> beam.io.WriteToBigQuery(
             'your-project:dataset.users',
             schema='user_id:STRING,name:STRING,email:STRING,timestamp:TIMESTAMP,active:BOOLEAN',
             create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED,
             write_disposition=beam.io.BigQueryDisposition.WRITE_APPEND
         )
        )

if __name__ == '__main__':
    run_etl()
```

## Streaming Pipeline

### Real-time Processing from Pub/Sub

```python
# streaming_pipeline.py
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
from apache_beam.options.pipeline_options import StandardOptions
from apache_beam.transforms.window import FixedWindows
from apache_beam.transforms.trigger import AfterWatermark, AfterProcessingTime
import json

class ParseMessage(beam.DoFn):
    def process(self, element):
        try:
            data = json.loads(element.decode('utf-8'))
            yield data
        except Exception as e:
            print(f"Error parsing message: {e}")

class EnrichData(beam.DoFn):
    def process(self, element):
        # Enrich with additional data
        element['processed_at'] = beam.utils.timestamp.Timestamp.now().to_utc_datetime()
        element['partition_key'] = element.get('user_id', 'unknown')
        yield element

class CalculateMetrics(beam.DoFn):
    def process(self, element):
        key, values = element
        count = len(values)
        total = sum(v.get('amount', 0) for v in values)
        
        yield {
            'window_key': key,
            'event_count': count,
            'total_amount': total,
            'average_amount': total / count if count > 0 else 0
        }

def run_streaming():
    options = PipelineOptions(
        runner='DataflowRunner',
        project='your-project-id',
        region='us-central1',
        temp_location='gs://my-dataflow-bucket/temp',
        staging_location='gs://my-dataflow-bucket/staging',
        streaming=True,
        job_name='streaming-pipeline'
    )
    
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read from Pub/Sub' >> beam.io.ReadFromPubSub(
             subscription='projects/your-project-id/subscriptions/my-subscription'
         )
         | 'Parse Messages' >> beam.ParDo(ParseMessage())
         | 'Enrich Data' >> beam.ParDo(EnrichData())
         | 'Window' >> beam.WindowInto(
             FixedWindows(60),  # 1-minute windows
             trigger=AfterWatermark(early=AfterProcessingTime(10)),
             accumulation_mode=beam.transforms.trigger.AccumulationMode.DISCARDING
         )
         | 'Group by User' >> beam.GroupBy('user_id')
         | 'Calculate Metrics' >> beam.ParDo(CalculateMetrics())
         | 'Write to BigQuery' >> beam.io.WriteToBigQuery(
             'your-project:dataset.metrics',
             create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED,
             write_disposition=beam.io.BigQueryDisposition.WRITE_APPEND
         )
        )

if __name__ == '__main__':
    run_streaming()
```

## Java Pipeline

### Batch Processing

```java
// WordCount.java
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.io.TextIO;
import org.apache.beam.sdk.options.*;
import org.apache.beam.sdk.transforms.*;
import org.apache.beam.sdk.values.*;

public class WordCount {
    
    public interface WordCountOptions extends PipelineOptions {
        @Description("Path of the file to read from")
        @Default.String("gs://apache-beam-samples/shakespeare/kinglear.txt")
        String getInputFile();
        void setInputFile(String value);

        @Description("Path of the file to write to")
        @Validation.Required
        String getOutput();
        void setOutput(String value);
    }

    static class ExtractWordsFn extends DoFn<String, String> {
        @ProcessElement
        public void processElement(@Element String element, OutputReceiver<String> receiver) {
            for (String word : element.split("[^\\p{L}]+")) {
                if (!word.isEmpty()) {
                    receiver.output(word);
                }
            }
        }
    }

    static class FormatAsTextFn extends SimpleFunction<KV<String, Long>, String> {
        @Override
        public String apply(KV<String, Long> input) {
            return input.getKey() + ": " + input.getValue();
        }
    }

    public static void main(String[] args) {
        WordCountOptions options = PipelineOptionsFactory
            .fromArgs(args)
            .withValidation()
            .as(WordCountOptions.class);

        Pipeline p = Pipeline.create(options);

        p.apply("ReadLines", TextIO.read().from(options.getInputFile()))
         .apply("ExtractWords", ParDo.of(new ExtractWordsFn()))
         .apply("CountWords", Count.perElement())
         .apply("FormatResults", MapElements.via(new FormatAsTextFn()))
         .apply("WriteCounts", TextIO.write().to(options.getOutput()));

        p.run().waitUntilFinish();
    }
}
```

```bash
# Run Java pipeline
mvn compile exec:java \
  -Dexec.mainClass=com.example.WordCount \
  -Dexec.args="--runner=DataflowRunner \
    --project=your-project-id \
    --region=us-central1 \
    --tempLocation=gs://my-dataflow-bucket/temp \
    --output=gs://my-bucket/output"
```

### Streaming with Pub/Sub

```java
// StreamingPipeline.java
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.io.gcp.pubsub.PubsubIO;
import org.apache.beam.sdk.io.gcp.bigquery.BigQueryIO;
import org.apache.beam.sdk.options.*;
import org.apache.beam.sdk.transforms.*;
import org.apache.beam.sdk.transforms.windowing.*;
import org.apache.beam.sdk.values.*;
import org.joda.time.Duration;
import com.google.api.services.bigquery.model.TableRow;

public class StreamingPipeline {

    public interface StreamingOptions extends PipelineOptions {
        @Description("Pub/Sub subscription")
        @Validation.Required
        String getSubscription();
        void setSubscription(String value);

        @Description("BigQuery output table")
        @Validation.Required
        String getOutputTable();
        void setOutputTable(String value);
    }

    static class ParseMessageFn extends DoFn<String, TableRow> {
        @ProcessElement
        public void processElement(@Element String message, OutputReceiver<TableRow> receiver) {
            // Parse JSON message
            TableRow row = new TableRow()
                .set("message", message)
                .set("timestamp", System.currentTimeMillis() / 1000);
            receiver.output(row);
        }
    }

    public static void main(String[] args) {
        StreamingOptions options = PipelineOptionsFactory
            .fromArgs(args)
            .withValidation()
            .as(StreamingOptions.class);
        
        options.setStreaming(true);

        Pipeline p = Pipeline.create(options);

        p.apply("ReadFromPubSub", 
                PubsubIO.readStrings().fromSubscription(options.getSubscription()))
         .apply("ParseMessages", ParDo.of(new ParseMessageFn()))
         .apply("FixedWindow", 
                Window.<TableRow>into(FixedWindows.of(Duration.standardMinutes(1))))
         .apply("WriteToBigQuery",
                BigQueryIO.writeTableRows()
                    .to(options.getOutputTable())
                    .withCreateDisposition(BigQueryIO.Write.CreateDisposition.CREATE_IF_NEEDED)
                    .withWriteDisposition(BigQueryIO.Write.WriteDisposition.WRITE_APPEND));

        p.run();
    }
}
```

## Advanced Transforms

### Side Inputs

```python
import apache_beam as beam

class EnrichWithSideInput(beam.DoFn):
    def process(self, element, lookup_data):
        # Access side input as dictionary
        user_id = element.get('user_id')
        enrichment = lookup_data.get(user_id, {})
        
        element['user_name'] = enrichment.get('name')
        element['user_tier'] = enrichment.get('tier')
        
        yield element

def pipeline_with_side_input():
    with beam.Pipeline(options=options) as p:
        # Main data
        main_data = (p 
                    | 'Read Main' >> beam.io.ReadFromText('gs://bucket/data.json')
                    | 'Parse Main' >> beam.Map(json.loads))
        
        # Side input data
        lookup_data = (p
                      | 'Read Lookup' >> beam.io.ReadFromText('gs://bucket/users.json')
                      | 'Parse Lookup' >> beam.Map(json.loads)
                      | 'Create Dict' >> beam.Map(lambda x: (x['id'], x))
                      | 'To Dict' >> beam.combiners.ToDict())
        
        # Use side input
        enriched = (main_data
                   | 'Enrich' >> beam.ParDo(EnrichWithSideInput(), 
                                           lookup_data=beam.pvalue.AsDict(lookup_data)))
```

### Composite Transforms

```python
class CalculateUserMetrics(beam.PTransform):
    def expand(self, pcoll):
        return (pcoll
                | 'Extract User' >> beam.Map(lambda x: (x['user_id'], x))
                | 'Group by User' >> beam.GroupByKey()
                | 'Calculate' >> beam.Map(self.calculate_metrics))
    
    @staticmethod
    def calculate_metrics(user_events):
        user_id, events = user_events
        events_list = list(events)
        
        return {
            'user_id': user_id,
            'event_count': len(events_list),
            'total_value': sum(e.get('value', 0) for e in events_list),
            'unique_types': len(set(e.get('type') for e in events_list))
        }

# Usage
metrics = events | 'User Metrics' >> CalculateUserMetrics()
```

## BigQuery Integration

### Read from BigQuery

```python
def read_from_bigquery():
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read from BQ' >> beam.io.ReadFromBigQuery(
             query='SELECT user_id, name, created_at FROM `project.dataset.users` WHERE active = true',
             use_standard_sql=True
         )
         | 'Process' >> beam.Map(lambda row: process_row(row))
         | 'Write Results' >> beam.io.WriteToText('gs://bucket/output')
        )
```

### Write to BigQuery

```python
def write_to_bigquery():
    schema = 'user_id:STRING,name:STRING,email:STRING,score:INTEGER,created_at:TIMESTAMP'
    
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read Data' >> beam.io.ReadFromText('gs://bucket/input.json')
         | 'Parse' >> beam.Map(json.loads)
         | 'Write to BQ' >> beam.io.WriteToBigQuery(
             'project:dataset.output_table',
             schema=schema,
             create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED,
             write_disposition=beam.io.BigQueryDisposition.WRITE_TRUNCATE,
             custom_gcs_temp_location='gs://bucket/bq-temp'
         )
        )
```

## Cloud Storage Integration

```python
# Read multiple file patterns
def read_multiple_sources():
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read JSONs' >> beam.io.ReadFromText('gs://bucket/data/*.json')
         | 'Parse JSON' >> beam.Map(json.loads)
         | 'Process' >> beam.ParDo(ProcessData())
        )

# Write partitioned output
def write_partitioned():
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read' >> beam.io.ReadFromText('gs://bucket/input.txt')
         | 'Process' >> beam.Map(lambda x: (x.split(',')[0], x))
         | 'Write Partitioned' >> beam.io.WriteToText(
             'gs://bucket/output',
             file_name_suffix='.txt',
             num_shards=10
         )
        )
```

## Monitoring & Optimization

### Pipeline Metrics

```python
import apache_beam.metrics as metrics

class CountMetrics(beam.DoFn):
    def __init__(self):
        self.processed_counter = metrics.Metrics.counter('main', 'processed')
        self.error_counter = metrics.Metrics.counter('main', 'errors')
        self.processing_time = metrics.Metrics.distribution('main', 'processing_time_ms')
    
    def process(self, element):
        start_time = time.time()
        
        try:
            result = process_element(element)
            self.processed_counter.inc()
            
            elapsed = (time.time() - start_time) * 1000
            self.processing_time.update(int(elapsed))
            
            yield result
        except Exception as e:
            self.error_counter.inc()
            print(f"Error processing element: {e}")
```

### Performance Tuning

```python
# Configure pipeline for performance
options = PipelineOptions(
    runner='DataflowRunner',
    project='your-project-id',
    region='us-central1',
    temp_location='gs://my-dataflow-bucket/temp',
    staging_location='gs://my-dataflow-bucket/staging',
    
    # Worker configuration
    num_workers=10,
    max_num_workers=50,
    autoscaling_algorithm='THROUGHPUT_BASED',
    
    # Machine type
    machine_type='n1-standard-4',
    disk_size_gb=100,
    
    # Streaming optimizations
    streaming=True,
    enable_streaming_engine=True,
    
    # Batch optimizations
    experiments=['use_runner_v2', 'use_beam_bq_sink']
)
```

## Dataflow SQL

```python
from apache_beam.transforms.sql import SqlTransform

def run_dataflow_sql():
    with beam.Pipeline(options=options) as p:
        # Create input PCollection with schema
        input_data = (p
                     | 'Create' >> beam.Create([
                         beam.Row(user_id='user1', amount=100, timestamp='2026-01-17'),
                         beam.Row(user_id='user2', amount=200, timestamp='2026-01-17'),
                         beam.Row(user_id='user1', amount=150, timestamp='2026-01-17')
                     ]))
        
        # Apply SQL query
        result = (input_data
                 | 'SQL Query' >> SqlTransform("""
                     SELECT 
                       user_id,
                       SUM(amount) as total_amount,
                       COUNT(*) as transaction_count
                     FROM PCOLLECTION
                     GROUP BY user_id
                   """))
        
        result | 'Print' >> beam.Map(print)
```

## Flex Templates

### Create Flex Template

```python
# pipeline.py - Parameterized pipeline
import argparse
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

def run(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True)
    parser.add_argument('--output', required=True)
    known_args, pipeline_args = parser.parse_known_args(argv)
    
    options = PipelineOptions(pipeline_args)
    
    with beam.Pipeline(options=options) as p:
        (p
         | 'Read' >> beam.io.ReadFromText(known_args.input)
         | 'Process' >> beam.Map(lambda x: x.upper())
         | 'Write' >> beam.io.WriteToText(known_args.output)
        )

if __name__ == '__main__':
    run()
```

```dockerfile
# Dockerfile for Flex Template
FROM gcr.io/dataflow-templates-base/python3-template-launcher-base

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY pipeline.py .

ENV FLEX_TEMPLATE_PYTHON_PY_FILE="/template/pipeline.py"
```

```bash
# Build and upload template
export PROJECT_ID=your-project-id
export REGION=us-central1
export TEMPLATE_IMAGE=gcr.io/$PROJECT_ID/dataflow-template:latest
export TEMPLATE_PATH=gs://my-bucket/templates/template.json

# Build image
docker build -t $TEMPLATE_IMAGE .
docker push $TEMPLATE_IMAGE

# Create template spec
gcloud dataflow flex-template build $TEMPLATE_PATH \
  --image $TEMPLATE_IMAGE \
  --sdk-language PYTHON \
  --metadata-file metadata.json

# Run from template
gcloud dataflow flex-template run my-job \
  --template-file-gcs-location $TEMPLATE_PATH \
  --region $REGION \
  --parameters input=gs://bucket/input.txt \
  --parameters output=gs://bucket/output
```

## Best Practices

### Performance Optimization

1. **Autoscaling**: Enable autoscaling for variable workloads
2. **Fusion Breaks**: Use `Reshuffle()` to break fusion when needed
3. **Windowing Strategy**: Choose appropriate window size
4. **Side Input Size**: Keep side inputs small (< 1GB)
5. **Combiner Functions**: Use combiners for aggregations

### Cost Optimization

1. **Right-size Workers**: Choose appropriate machine types
2. **Shuffle Service**: Use Dataflow Shuffle for large shuffles
3. **Streaming Engine**: Enable for streaming jobs
4. **Flexible Resource Scheduling**: Use for batch jobs
5. **Preemptible VMs**: Use for fault-tolerant batch jobs

### Reliability

1. **Error Handling**: Implement robust error handling
2. **Dead Letter Queue**: Handle failed elements
3. **Checkpointing**: Enable for stateful operations
4. **Monitoring**: Set up alerts for job failures
5. **Testing**: Test pipelines with DirectRunner

### Security

1. **Service Accounts**: Use least-privilege service accounts
2. **VPC**: Run workers in VPC for network isolation
3. **Encryption**: Use customer-managed encryption keys
4. **Private IPs**: Use private IP addresses for workers
5. **IAM Roles**: Implement fine-grained access control

## Pricing

### Batch Processing
- **vCPU**: $0.056 per vCPU-hour
- **Memory**: $0.003557 per GB-hour
- **Storage**: $0.000054 per GB-hour

### Streaming Processing
- **vCPU**: $0.069 per vCPU-hour
- **Memory**: $0.003557 per GB-hour
- **Storage**: $0.000054 per GB-hour
- **Streaming Engine**: Additional $0.018 per vCPU-hour

### Example Cost
- Job: 10 workers, n1-standard-4 (4 vCPU, 15 GB RAM)
- Duration: 1 hour
- **Batch**: ~$30/hour
- **Streaming**: ~$38/hour

## Troubleshooting

```bash
# List jobs
gcloud dataflow jobs list --region=us-central1

# Describe job
gcloud dataflow jobs describe JOB_ID --region=us-central1

# View job logs
gcloud dataflow jobs logs JOB_ID --region=us-central1

# Cancel job
gcloud dataflow jobs cancel JOB_ID --region=us-central1

# Drain streaming job (graceful shutdown)
gcloud dataflow jobs drain JOB_ID --region=us-central1

# Update streaming job
gcloud dataflow jobs update JOB_ID \
  --gcs-location gs://bucket/templates/updated-template.json \
  --region us-central1
```

## Resources

### Official Documentation
- [Dataflow Documentation](https://cloud.google.com/dataflow/docs)
- [Apache Beam Documentation](https://beam.apache.org/documentation/)
- [Python SDK](https://beam.apache.org/documentation/sdks/python/)
- [Java SDK](https://beam.apache.org/documentation/sdks/java/)
- [Best Practices](https://cloud.google.com/dataflow/docs/guides/best-practices)

### Templates
- [Google-provided Templates](https://cloud.google.com/dataflow/docs/guides/templates/provided-templates)
- [Template Gallery](https://cloud.google.com/dataflow/docs/guides/templates/provided-templates)
- [Flex Templates](https://cloud.google.com/dataflow/docs/guides/templates/using-flex-templates)

### Tools
- [Dataflow Console](https://console.cloud.google.com/dataflow)
- [Apache Beam Playground](https://play.beam.apache.org/)
- [Dataflow SQL](https://cloud.google.com/dataflow/docs/guides/sql/dataflow-sql-intro)

### Community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-dataflow)
- [Apache Beam Slack](https://apachebeam.slack.com/)
- [Issue Tracker](https://issuetracker.google.com/issues?q=componentid:187210)

### Learning Resources
- [Dataflow Learning Path](https://cloud.google.com/training/data-engineering-and-analytics)
- [Beam Examples](https://github.com/apache/beam/tree/master/examples)
- [Qwiklabs](https://www.qwiklabs.com/catalog?keywords=dataflow)
- [Codelabs](https://codelabs.developers.google.com/?cat=Data)

---

**Related Technologies**: [Apache Beam](https://beam.apache.org/), [BigQuery](../BigQuery/), [Pub/Sub](../PubSub/), [Cloud Storage](../Storage/), [AWS Kinesis](../../AWS/Kinesis/), [Azure Stream Analytics](../../Azure/StreamAnalytics/)
