# playing-around-with-gemini-ai-api
Wanted to move from OpenAi API to `gemini-pro` API. That's why I started to playing around with it to see how it goes with my need. So far I'm very pleased. 

## Downside
The only downside is JSON object generation by the model. `gemini-pro` generates parsable JSON string inside markdown syntax. Probably in training, it sees a lot JSON data in markdown documentation. So it respond with it. JSON generation was a bit problem in OpenAI too. But with some checks, validations or rerequesting, those can be overcome. Basically we are in the bleeding edge of AI era and AIs are still learning and improving ...fast.

## Sample Response Object
**Success**  
```json
{
   "response": {
      "candidates": [
         {
            "content": {
               "parts": [
                  {
                     "text": "```jsonn{\\n  \\"title\\": \\"The Importance of Questioning\\",\\n  \\"types\\": [\\n    \\"Philosophy\\",\\n    \\"Critical Thinking\\"\\n  ],\\n  \\"categories\\": [\\n    \\"Reasoning\\",\\n    \\"Decision Making\\",\\n    \\"Problem Solving\\"\\n  ],\\n  \\"keywords\\": [\\n    \\"Questioning\\",\\n    \\"Answering\\",\\n    \\"Conclusion\\",\\n    \\"Reasoning\\",\\n    \\"Critical Thinking\\"\\n  ],\\n  \\"overallRating\\": 8,\\n  \\"clarityRating\\": 9,\\n  \\"criticism\\": \\"The article is well-written and easy to understand. It provides a clear and concise overview of the importance of questioning. However, the article could be improved by providing more specific examples of how questioning can be used to improve decision-making and problem-solving.\\"\\n}\\n```"
                  }
               ],
               "role": "model"
            },
            "finishReason": "STOP",
            "index": 0,
            "safetyRatings": [
               {
                  "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  "probability": "NEGLIGIBLE"
               },
               {
                  "category": "HARM_CATEGORY_HATE_SPEECH",
                  "probability": "NEGLIGIBLE"
               },
               {
                  "category": "HARM_CATEGORY_HARASSMENT",
                  "probability": "NEGLIGIBLE"
               },
               {
                  "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                  "probability": "NEGLIGIBLE"
               }
            ]
         }
      ],
      "promptFeedback": {
         "safetyRatings": [
            {
               "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
               "probability": "NEGLIGIBLE"
            },
            {
               "category": "HARM_CATEGORY_HATE_SPEECH",
               "probability": "NEGLIGIBLE"
            },
            {
               "category": "HARM_CATEGORY_HARASSMENT",
               "probability": "NEGLIGIBLE"
            },
            {
               "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
               "probability": "NEGLIGIBLE"
            }
         ]
      }
   }
}
```

## Sample REST request
```cmd
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$API_KEY \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
        "contents": [{
            "parts":[
                {"text": "Write a story about a magic backpack."}
            ]
        }],
        "safetySettings": [
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_ONLY_HIGH"
            }
        ],
        "generationConfig": {
            "stopSequences": [
                "Title"
            ],
            "temperature": 1.0,
            "maxOutputTokens": 800,
            "topP": 0.8,
            "topK": 10
        }
    }'  2> /dev/null | grep "text"
```
