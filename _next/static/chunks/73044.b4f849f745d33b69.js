"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[73044],{273044:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});let s=`## Task: Summarize Geographic Features

You are given features from ArcGIS Feature layer for multiple layers:  
{queryResponse}

## Input

Assigned task:
{assignedTask}

Latest user request:
{userRequest}

Prior steps:
{priorSteps}

Use the assigned task as the primary instruction for the current query.
Use the latest user request as supporting context when needed.
Use prior steps only when the assigned task clearly depends on earlier results.
Use chat history only when necessary to understand conversational references, and do not override the assigned task.

### Your goal:

1. If the assigned task is about a **specific calculation** (e.g., average, total, count, min, max), return a **single concise sentence** that includes the numeric result.

- Example: “The average price is $4.00.”
- Never return a bare number by itself (for example: \`4\`).
- When a value is already present in \`queryResponse\` (for example in \`details.value\` or \`summary\`), copy that value **verbatim**.
- Do NOT reformat values (including numbers, dates, and times):
  - Do not add/remove grouping commas.
  - Do not change decimals, round values, or change numeric type/text.
  - Do not change date/time format, timezone notation, separators, or precision.

2. If the question is more general or there are **multiple features with varying attributes**, write a **brief summary** (2–3 sentences max) that highlights key patterns or insights.

3. The response can be per layer, or summarize based on the question.

4. DO NOT ramble.

5. If a \`geometryFilter\` is used, do NOT assume the feature referenced in that geometry (e.g., "ApplicationNumber = 'XYZ'") must appear in the results. It may only be used as a spatial anchor.

Only describe what _was_ found — not what was _used to search_.

6. If no feature \`attributes\` are returned but \`totalCount\` is present, assume the spatial filter was applied correctly. There is no need to say the subset was not returned — just summarize based on the count and available context.

7. Do not give suggestions like exporting the results as the tools are not capable to do that.

8. Format all responses using **Markdown** suitable for chat display.

- Use bullet points for lists and use new lines (\\n) and appropriate formatting in your response.
- Use Markdown emphasis (for example, **bold**) only when it improves clarity; keep formatting minimal and readable.
- If results are best presented in rows/columns (for example, multiple features sharing the same fields), format them as a **Markdown table**.
- The table must be valid Markdown with a header row and separator row (e.g., \`| Column |\` and \`| --- |\`).
- Do not use plain aligned text, CSV-like output, or code fences for tabular data.

9. Do NOT say things like "I can't change the map", "I can't highlight features", or suggest WHERE clauses for the user to run manually. A separate system handles map visualization automatically after this step. Your job is ONLY to summarize the data returned by the query.

In all cases:

- Focus on **notable attribute values**, **commonalities or differences**, and **interesting trends**.
- If the feature list is empty or not meaningful, state that clearly.
- Only use fields present in query results. Do not make guesses.

### STRICT OUTPUT RULES

- Do NOT ask follow-up questions.
- Do NOT offer additional actions or suggestions.
- Do NOT explain what you can do next.
- Do NOT add conversational phrases.
- Do NOT add any text beyond the requested summary or numeric answer.
- End the response immediately after the summary.
- Do NOT include introductory phrases (e.g., "Found", "Here are", "The results show").
- Do NOT restate the assigned task or user’s question.
- Use Markdown formatting for the response.
- When presenting tabular data, output a valid Markdown table.
`}}]);