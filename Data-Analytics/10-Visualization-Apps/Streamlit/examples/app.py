import streamlit as st

st.set_page_config(page_title="DevSphere Streamlit Demo")

st.title("Streamlit Demo")
st.write("A tiny example app.")

n = st.slider("Pick a number", min_value=1, max_value=20, value=5)
st.write("Square:", n * n)

text = st.text_input("Type something")
if text:
    st.success(f"You typed: {text}")
