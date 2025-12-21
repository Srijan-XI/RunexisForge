from langchain.prompts import PromptTemplate

template = "Write a short explanation of {topic} in {style} style."

prompt = PromptTemplate(
    input_variables=["topic", "style"],
    template=template,
)

print(prompt.format(topic="YAML", style="beginner-friendly"))
