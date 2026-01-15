# Streamlit

## Introduction

## What is Streamlit?

Streamlit is a Python framework for building data apps quickly. You write Python scripts and Streamlit turns them into interactive web apps.

## Why Streamlit?

- Very fast to prototype dashboards and tools
- Great for data exploration (charts, tables)
- Simple deployment story (local, cloud, containers)

## Common use cases

- Internal dashboards
- Data science demos
- Lightweight admin/analytics tools

## Learning Path

1. Install Streamlit and run the hello app.
2. Learn basic widgets (slider, selectbox, text input).
3. Learn state (`st.session_state`).
4. Add charts and file uploads.

## User Guide

## Install

```bash
python -m pip install --upgrade pip
pip install streamlit
```bash

Verify:

```bash
streamlit --version
```bash

## Run an app

```bash
streamlit run app.py
```bash

## Basic UI

```python
import streamlit as st

st.title("Hello Streamlit")
name = st.text_input("Your name")
if name:
    st.write(f"Hello, {name}!")
```bash

## State

Use `st.session_state` to keep values between reruns.

## Files

`st.file_uploader` lets you upload files (CSV, images).

See `Streamlit/examples/app.py` for a runnable starter.

