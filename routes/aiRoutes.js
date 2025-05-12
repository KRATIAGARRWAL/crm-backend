// import express from 'express';
// import { CohereClient } from 'cohere-ai';
// import dotenv from 'dotenv';

// dotenv.config();
// const router = express.Router();
// const cohere = new CohereClient({
//   token: process.env.COHERE_API_KEY,
// });

// router.post('/generate-messages', async (req, res) => {
//   const { objective } = req.body;

//   if (!objective) {
//     return res.status(400).json({ error: 'Objective is required' });
//   }

//   try {
//     const response = await cohere.generate({
//       model: 'command',
//       prompt: `Generate 3 short marketing message variants for given objective one variant should be in  one line do not start with numbers: "${objective}".`,
//       max_tokens: 100,
//       temperature: 0.9,
//       num_generations: 1,
//     });

//     // FIXED: Removed `.body`
//     const generations = response.generations[0].text
//       .trim()
//       .split('\n')
//       .filter(Boolean);

//     res.json({ messages: generations });
//   } catch (error) {
//     console.error('Cohere API error:', error);
//     res.status(500).json({ error: 'AI generation failed', details: error.message });
//   }
// });
// export default router;