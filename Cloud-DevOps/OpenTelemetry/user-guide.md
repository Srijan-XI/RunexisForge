# OpenTelemetry — User Guide

## 1) Install/Run the Collector

**Docker (all-in-one example):**

```bash
docker run --rm -it -p 4317:4317 -p 4318:4318 \
  -v "$PWD/otel-collector.yaml:/etc/otelcol/config.yaml" \
  otel/opentelemetry-collector:latest
```bash

**Minimal `otel-collector.yaml`:**

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:
processors:
  batch:
exporters:
  logging: {}
  otlphttp/prom:
    endpoint: http://prometheus:9090/api/v1/otlp
  otlphttp/tempo:
    endpoint: http://tempo:4318
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, otlphttp/tempo]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, otlphttp/prom]
```bash

## 2) Instrument an application

### Node.js (auto-instrumentation)

```bash
npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http
```bash

**otel.js:**

```javascript
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```bash

Start your app with the SDK preload:

```bash
node -r ./otel.js app.js
```bash

### Python (manual/auto)

```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp opentelemetry-instrumentation-flask
```bash

**Auto-instrument Flask:**

```bash
opentelemetry-instrument --traces_exporter otlp --service_name demo-service --flask-app app.py flask run
```bash

## 3) Export to backends

- **Prometheus**: metrics via OTLP → Prometheus Remote Write
- **Tempo/Jaeger/Zipkin**: traces via OTLP
- **Loki**: logs via Loki exporter or promtail scraping

## 4) Common settings

- Set `OTEL_SERVICE_NAME` to identify services
- Use resource attributes: `OTEL_RESOURCE_ATTRIBUTES=deployment.environment=prod,service.version=1.2.3`
- Propagation: `tracecontext`, `baggage` (default); enable `b3` if needed
- Sampling: `OTEL_TRACES_SAMPLER=parentbased_traceidratio`, `OTEL_TRACES_SAMPLER_ARG=0.1`

## 5) Troubleshooting

- Check Collector logs (use `logging` exporter)
- Ensure OTLP ports open: 4317 (gRPC), 4318 (HTTP)
- Verify headers if behind proxies/load balancers

## References

- <https://opentelemetry.io/docs/>
- Collector config: <https://opentelemetry.io/docs/collector/configuration/>
- Semantic conventions: <https://opentelemetry.io/docs/specs/semconv/>
