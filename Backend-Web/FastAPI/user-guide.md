# FastAPI Usage Guide

## Install

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install fastapi uvicorn[standard]
```bash

## Minimal App

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"hello": "fastapi"}
```bash

Run:

```bash
uvicorn main:app --reload
```bash

Docs at <http://localhost:8000/docs>

## Path Parameters and Body Models

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/{item_id}")
async def create(item_id: int, item: Item):
    return {"id": item_id, **item.dict()}
```bash

## Dependencies

```python
from fastapi import Depends

def get_settings():
    return {"db": "sqlite"}

@app.get("/settings")
async def settings(cfg = Depends(get_settings)):
    return cfg
```bash

## Testing

```bash
pip install httpx pytest
pytest
```bash

Use `TestClient` from `fastapi.testclient`.

## Deployment

- Production: `uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4`
- Container: base on `python:3.11-slim`; install deps; expose 8000

## Next Steps

- Add middlewares (CORS, auth)
- Use background tasks for deferred work
- Integrate SQLModel or SQLAlchemy for persistence
