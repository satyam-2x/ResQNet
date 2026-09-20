const { Groq } = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const analyzeReport = async ({ rawText }) => {
    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",

        messages: [
            {
                role: "system",
                content: `
You are a flood emergency triage analyzer.

Analyze the flood report and classify:
1. Priority
2. Most appropriate resource

Follow these rules strictly:

PRIORITY RULES:
- Critical:
  If people are trapped, unable to escape, water is rapidly rising,
  water is dangerously deep, children/elderly are trapped,
  or there is an immediate threat to life.
- High:
  If the situation is serious and urgent help is needed,
  but there is no immediate life-threatening danger.
- Medium:
  If there is flooding/waterlogging but people are safe
  and no urgent rescue is required.

RESOURCE RULES:
- Lifeboat:
  If people are trapped, roads are underwater,
  or deep/rising water prevents safe movement.
- Medical:
  If someone has a serious medical emergency or needs urgent treatment.
- Food:
  If people are stranded and primarily need food/drinking water.
- Rescue Team:
  If physical rescue/evacuation assistance is needed
  but a lifeboat is not specifically required.
- None:
  Only when no immediate resource is required.

IMPORTANT:
- If multiple conditions match, choose the most urgent priority.
- For a life-threatening situation, never return Medium.
- If people are trapped in deep or rising flood water, prefer Lifeboat.
- Return ONLY the required JSON. Do not return reasoning or explanation
`
            },
            {
                role: "user",
                content: String(rawText)
            }
        ],

        response_format: {
            type: "json_schema",
            json_schema: {
                name: "flood_analysis",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        priority: {
                            type: "string",
                            enum: ["Critical", "High", "Medium"]
                        },
                        resourceNeeded: {
                            type: "string",
                            enum: [
                                "Lifeboat",
                                "Medical",
                                "Food",
                                "Rescue Team",
                                "None"
                            ]
                        }
                    },
                    required: ["priority", "resourceNeeded"],
                    additionalProperties: false
                }
            }
        }
    });

    const aiData = JSON.parse(
        response.choices[0].message.content
    );

    return aiData;
};

module.exports = { analyzeReport };