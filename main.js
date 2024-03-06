require('dotenv').config()
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerativeModel } = require("@google/generative-ai");

const article = `If you can prove a scientific theory wrong then this is a great achievement for humans and the science community. Humans will get rid of a wrong theory. That will save huge time and money on a mistake. They will search for the correct explanation. It is your contribution to the whole of humanity. If you are pondering upon a scientific theory and ask,"if animal evolution is a fact, then where is the species that is between monkey and chimpanzee?" That is a good question to investigate. And if it is a good question to test, then test it.
If someone has certain beliefs and he is pondering upon it to prove evolution wrong, then there's no use to engage in a  discussion with him. Nothing but only conviction to his ideology will satisfy him.`
const prompt = `Please suggest a simple title for the following article; also suggest types, categories and extract keywords; out of 10, give an overall rating and clarity rating; also do a criticism of the article. Do NOT respond in markdown, please respond in parsable JSON.
Here's the article:
${article}`

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// model.safetySettings.push({
//    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
// })
// model.safetySettings.push({
//    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
// })
// model.safetySettings.push({
//    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
// })
// model.safetySettings.push({
//    category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
//    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
// })
// model.safetySettings.push({
//    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
// })

model.generationConfig.temperature = 0.3

model.generateContent(prompt)
   .then(result => {
      const answerText = result.response.text();

      let jsonString = answerText && answerText.indexOf('{') !== -1 && answerText.lastIndexOf('}') !== -1 ?
         answerText.substring(answerText.indexOf('{'), answerText.lastIndexOf('}') + 1) :
         null;

      jsonString = (jsonString || '').replace(/\n/g, ' ')
      console.log(jsonString)
      console.log(JSON.parse(jsonString))
   })
   .catch(error => {
      console.error(error)
   });
