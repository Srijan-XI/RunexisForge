# Streamlit User Guide

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
