# Neo4j Usage Guide

## Install (Desktop)
- Download Neo4j Desktop: https://neo4j.com/download
- Create and start a local database; set password

## Install (Docker)
```bash
docker run -p7474:7474 -p7687:7687 -e NEO4J_AUTH=neo4j/test neo4j:5
```

## Cypher Basics
```cypher
CREATE (:Person {name: 'Alice'})-[:KNOWS]->(:Person {name: 'Bob'});
MATCH (p:Person)-[:KNOWS]->(friend)
RETURN p.name, friend.name;
```

## Connecting from Code (Python example)
```python
from neo4j import GraphDatabase

driver = GraphDatabase.driver("neo4j://localhost:7687", auth=("neo4j", "test"))
with driver.session() as session:
    session.run("MATCH (n) RETURN count(n)")
```

## Importing Data
- CSV: `LOAD CSV WITH HEADERS FROM 'file:///data.csv' AS row ...`
- Use APOC procedures for utility imports/exports

## Security
- Change default password after first start
- Configure `neo4j.conf` for TLS and auth settings

## Monitoring
- Neo4j Browser for quick queries
- Neo4j Bloom for visual exploration
