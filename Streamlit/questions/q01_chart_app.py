# Q1: Build a simple chart app
#
# Goal:
# - Make a Streamlit app that:
#   - accepts a list of numbers (comma-separated)
#   - plots them as a line chart
#
# Hints:
# - Use st.text_input
# - Parse ints safely
# - Use st.line_chart

import streamlit as st

st.title("Chart App")

raw = st.text_input("Numbers (comma-separated)", "1,2,3")

# TODO: parse numbers from raw
values = []

st.line_chart(values)
