# Pulumi

## Introduction

Pulumi is an Infrastructure as Code (IaC) platform that allows you to define cloud infrastructure using general-purpose programming languages like permissions **TypeScript, Python, Go, C# and Java**.

Unlike Terraform (which uses HCL), Pulumi lets you use loops, functions, classes, and package managers (npm, pip) to structure your infrastructure code.

## Installation

```bash
curl -fsSL https://get.pulumi.com | sh
```
Or `choco install pulumi` on Windows.

## Usage (TypeScript Example)

1.  **Create Project**:
    ```bash
    mkdir my-aws-infra && cd my-aws-infra
    pulumi new aws-typescript
    ```
2.  **Edit `index.ts`**:
    ```typescript
    import * as pulumi from "@pulumi/pulumi";
    import * as aws from "@pulumi/aws";

    // Create an S3 bucket
    const bucket = new aws.s3.Bucket("my-bucket", {
        website: {
            indexDocument: "index.html",
        },
    });

    // Export the name of the bucket
    export const bucketName = bucket.id;
    ```
3.  **Deploy**:
    ```bash
    pulumi up
    ```

## Real World Use Case
**Dynamic Infrastructure**: You need to create 50 S3 buckets based on a list of client names in a JSON file.
*   **Terraform**: Requires `for_each` loops which can be tricky with complex logic.
*   **Pulumi**: Just use a standard JavaScript `for` loop or `map()` function to iterate over the JSON and create resources.
