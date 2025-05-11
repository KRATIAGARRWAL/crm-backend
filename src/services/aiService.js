const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function naturalLanguageToRules(prompt) {
  const systemPrompt = `Convert the following natural language segment description into a JSON rule object for MongoDB. Example: "People who haven't shopped in 6 months and spent over ₹5K" => { "and": [ { "field": "lastActive", "op": "<", "value": "2023-01-01" }, { "field": "totalSpend", "op": ">", "value": 5000 } ] }`;
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent([
    { role: "system", parts: [{ text: systemPrompt }] },
    { role: "user", parts: [{ text: prompt }] }
  ]);
  
  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from response
  const match = text.match(/\{[\s\S]*\}/);
  return match ? JSON.parse(match[0]) : null;
}

async function messageSuggestions(objective, customerName) {
  const prompt = `Generate 3 short, friendly marketing messages for the objective: "${objective}". Personalize for the customer "${customerName}".`;
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent([
    { role: "system", parts: [{ text: "You are a marketing copywriter." }] },
    { role: "user", parts: [{ text: prompt }] }
  ]);
  
  const response = await result.response;
  return response.text().split('\n').filter(line => line.trim());
}

module.exports = {
  naturalLanguageToRules,
  messageSuggestions
};
