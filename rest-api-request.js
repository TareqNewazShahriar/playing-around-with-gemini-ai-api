require('dotenv').config()
const request = require('request')

const article = `If you can prove a scientific theory wrong then this is a great achievement for humans and the science community. Humans will get rid of a wrong theory. That will save huge time and money on a mistake. They will search for the correct explanation. It is your contribution to the whole of humanity. If you are pondering upon a scientific theory and ask,"if animal evolution is a fact, then where is the species that is between monkey and chimpanzee?" That is a good question to investigate. And if it is a good question to test, then test it.
If someone has certain beliefs and he is pondering upon it to prove evolution wrong, then there's no use to engage in a  discussion with him. Nothing but only conviction to his ideology will satisfy him.`
const prompt = `Please suggest a simple title for the following article; also suggest types, categories and extract keywords; out of 10, give an overall rating and clarity rating; also do a criticism of the article. Do NOT respond in markdown, please respond in parsable JSON.
Here's the article:
${article}`

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
request.post({ url, headers, json: payload },
   (error, response, body) => {
      if (error) {
         console.error('Error:', error);
         return;
      }
      else {
         console.log('Status:', response.statusCode);
         const answerText = body.candidates && body.candidates.length && body.candidates[0].content.parts.length ?
            body.candidates[0].content.parts[0].text :
            null
         console.log('answer:', answerText);

         let jsonString = answerText && answerText.indexOf('{') !== -1 && answerText.lastIndexOf('}') !== -1 ?
            answerText.substring(answerText.indexOf('{'), answerText.lastIndexOf('}') + 1) :
            null;

         jsonString = (jsonString || '').replace(/\n/g, '<br>')

         console.log(JSON.parse(jsonString))
      }
   });
