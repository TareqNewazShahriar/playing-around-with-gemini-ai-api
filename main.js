require('dotenv').config()
const request = require('request')
//const { GoogleGenerativeAI } = require("@google/generative-ai");

const article = `Religious people, general and scholars of religion frequently say that “science cannot figure out the ayah that are currently contradictory with scientific knowledge, but one day it will see that everything in the Quran is correct once it is much advanced”. Well, we can assume that it will be matched, also it may not be. But most importantly, this is a statement that’s basically proposing that each and every wrong statement, each and every ignorance is basically correct, until we cannot gain knowledge up to such a point that those wrongs will become right and those ignorance may become knowledge we should keep gaining knowledge. This is also true for all other religions. We didn’t gain enough knowledge to understand that those religions are correct, once we gain enough knowledge, we will see there’s nothing contradictory.
Also telling “science cannot figure out…etc etc” is a statement that indicates that the commenter has a poor understanding of the term “science”. Science is not an organization or ideology. It is the name of a process or methodology.`
const prompt = `Please suggest a simple title for the following article; also suggest types, categories for this article and extract keywords; out of 10, give an overall rating and rating for clarity; also do a criticism of the article, as a mini article. Do respond in markdown and respond only in valid JSON.
Here's the article:
${article}`

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// async function run() {
//    // For text-only input, use the gemini-pro model
//    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
   
//    const result = await model.generateContent(prompt);
//    const response = await result.response;
//    const text = response.text();
//    console.log(text);
//    console.log(JSON.parse(text))
// }
// run()


const payload = {
   "contents": [{
      "parts": [{
         "text": prompt
      }]
   }]
}

// Replace with your API endpoint URL
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

// Set headers with content type as JSON
const headers = {
   'Content-Type': 'application/json',
};

// Send the POST request
request.post(
   { url, headers, json: payload },
   (error, response, body) => {
   if (error) {
      console.error('Error:', error);
      return;
   }
   else {
      console.log('Status:', response.statusCode);
      const answer = body.candidates && body.candidates.length && body.candidates[0].content.parts.length ? 
         body.candidates[0].content.parts[0].text : 
         null
      console.log('answer:', answer);

      const jsonAnswer = answer.indexOf('{') !== -1 && answer.lastIndexOf('}') !== -1 ?
         answer.substring(answer.indexOf('{'), answer.lastIndexOf('}')+1) : 
         null;

      console.log(JSON.parse(jsonAnswer))
   }
});
