"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[12260],{589879:(e,t,s)=>{s.r(t),s.d(t,{default:()=>a});let a=`# ArcGIS Knowledge Graph Cypher Rules

## GOAL

Generate a Cypher query that answers the user’s request and conforms to the data model.

---

## 1. USER OVERRIDES (HIGHEST PRIORITY)

If the user specifies any of the following, ALWAYS follow their instructions over defaults:

- LIMIT (or no limit)
- Output columns / data model
- Inclusion/exclusion of globalid
- Ordering, grouping, filtering, projection

---

## 2. DATA MODEL CONFORMANCE (NON-NEGOTIABLE)

Use ONLY valid data model elements.

### Required

- Use only valid entity types, relationship types, and properties
- Ensure relationships connect valid entity types
- infer direction from user prompt. if not clear use the least restrictive valid form supported by the model.

### VALIDATION RULES (STRICT)

- Enforce exact schema match: all entities, relationships, and properties must exist exactly in the data model
- Validate relationship integrity: types, source→target pairing, and direction must match schema
- Enforce field correctness: properties and filters must exist on the referenced type and use valid data types
- Ensure alias consistency: each alias maps to one type only and cannot change meaning
- Apply strict failure: if any component is invalid, do NOT generate the query and do NOT infer or repair

## 4. PATH RESOLUTION

- First attempt a direct relationship
- If none exists → use a valid multi-hop path
- Each hop MUST be valid in the data model
- Max path length: 3 (unless user requests more)

### Path selection

- Prefer shortest valid path
- If multiple valid paths exist → choose best match to user intent
- If no valid path exists → do not speculate

---

## 5. PERFORMANCE

- Use the minimal number of entities and relationships
- Prefer shortest valid path
- Avoid unnecessary patterns or complexity

---

## 6. CYPHER RULES

- UNION queries must return identical columns
- Apply LIMIT only after UNION (not inside subqueries)
- Do NOT use: OVER, REDUCE()
- Do NOT use reserved keywords as variables (call, match, return, as etc.)
- Use only valid openCypher syntax
- After OPTIONAL MATCH, always add:
  WITH ...
  WHERE var IS NOT NULL
  before using var in any MATCH or relationship pattern.

---

## 7. SPATIAL RULES

- Prefer graph relationships over spatial functions
- Use spatial functions only when necessary
- Always ensure geometry is not null if using spatial functions
  - for example: WHERE n.shape IS NOT NULL

---

## 9. DEFAULT OUTPUT (IF NOT SPECIFIED)

- Add LIMIT 50 unless results are clearly small
- Use descriptive aliases with AS
- ALWAYS Return full entities and relationships unless user requests specific properties

---

## 11. OUTPUT FORMAT

- Valid → return ONLY Cypher query
- No explanation

---
`}}]);