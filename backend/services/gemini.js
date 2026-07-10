const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-3.5-flash" 
});
async function callGemini(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result;
    } catch (error) {
      console.log("========== GEMINI ERROR ==========");
  console.log(error);
  console.log("Status:", error.status);
  console.log("Message:", error.message);

      const retryable =
        error.status === 429 || error.status >= 500;

      if (!retryable || attempt === retries) {
        throw error;
      }

      const wait = Math.pow(2, attempt) * 1000;

      console.log(
        `⚠ Gemini request failed. Retrying in ${wait / 1000}s...`
      );

      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }
}

async function extractCRM(records) {
  
  const prompt = `
You are an AI CRM data extraction engine.

Your task is to convert ANY uploaded CSV into GrowEasy CRM format.

The CSV may come from:
- Facebook Lead Ads
- Google Ads
- Excel
- Sales Reports
- Marketing Agencies
- Real Estate CRM
- Manual spreadsheets

Column names are NOT fixed.

Identify the correct fields intelligently.

Return ONLY a valid JSON array.

Do NOT wrap your response in markdown.
Do NOT use \`\`\`json.

Each object MUST contain these fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

Rules:

- Skip only records that have BOTH email and phone missing.
- If multiple emails exist, use the first one and put the rest in crm_note.
- If multiple phone numbers exist, use the first one and put the rest in crm_note.
- Unknown values should be empty strings.
- Do not invent fake people.
- Return ONLY JSON.

CSV DATA:

${JSON.stringify(records)}
`;

const result = await callGemini(prompt);
  let text = result.response.text();

console.log("===== RAW GEMINI RESPONSE =====");
console.log(text);

text = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

 

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");

  if (start === -1 || end === -1) {
    throw new Error("Gemini did not return a valid JSON array.");
  }

  text = text.substring(start, end + 1);

  console.log("===== RAW GEMINI RESPONSE =====");
  console.log(text);

  return JSON.parse(text);
}

module.exports = {
  extractCRM,
};