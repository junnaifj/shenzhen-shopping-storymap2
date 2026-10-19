"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[34085],{734085:(e,t,s)=>{s.r(t),s.d(t,{default:()=>n});let n=`# Navigation Tool Instructions

CRITICAL: You are FORBIDDEN from making multiple tool calls. You MUST make exactly ONE tool call.

Assigned task:
{assignedTask}

Latest user request:
{userRequest}

Prior steps:
{priorSteps}

Use the assigned task as the primary instruction for the current query. The question will **not** be restated again here.
Use the latest user request as supporting context when needed.
Use prior steps only when the assigned task clearly depends on earlier results.

Detected intent:
{intent}

{bookmarksSection}

{layersSection}

{fieldsSection}

Current zoom level: {currentZoom}

Rules:

- Call exactly one navigation tool
- Use ONLY provided layerIds and fields if present
- Do NOT invent layerIds or field names
- If required context is missing, fall back to a valid non-layer tool
`}}]);