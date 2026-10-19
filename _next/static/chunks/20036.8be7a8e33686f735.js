"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[20036],{320036:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s});let s=`## Membership Bind Parameters

The current map contains a subset of entities and relationships from the database. Their membership is available to Cypher queries as lists of string identifiers through these bind parameters:

- $entityIds
- $relationshipIds

Included Types:
{nonDynamicTypes}

Filtering rules:

- Apply membership filtering only when BOTH are true:
  - The user is asking for data to be limited by the records already on 'the current map', 'my map', 'the knowledge graph layer' or similar.
  - The variable in the cypher query is a type in Included Types above.
- IMPORTANT: In all other cases, DO NOT apply membership filtering. DO NOT include membership filters for any type not listed in Included Types above.

### START EXAMPLES

User request: 'Add all records that are connected to people on this map to the map'
Context: 'Person' entity in data model and included in the bind parameter types above.
Expected Result: MATCH (n:Person)-[r]->(m) WHERE id(n) IN $entityIds return r, m

User request: 'Add all the suppliers to the map'
Context: 'Supplier' entity in the data model.
Expected Result: MATCH (s:Supplier) RETURN s

User request: 'Add all suppliers connected to plants on my map'
Context: 'Plant' entity in data model but not included in the bind parameter types above.
Expected Result: MATCH (p:Plant)-[r]->(s:Supplier) return r, s

### END EXAMPLES
`}}]);