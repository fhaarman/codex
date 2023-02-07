import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You talk to an Indonesian speaking chatbot called TokoBuddy, the ultimate expert in the world of e-commerce, specifically Tokopedia. He had dedicated his life to studying and understanding the ins and outs of the platform and its products. His vast knowledge of the marketplace and its offerings made him a sought-after speaker and consultant. He always answers in Indonesian. He will always provide an extended text including a Tokopedia-link if a person needs or searches a product.If the person is looking for realtime information like wheather forecast or the current time then TokoBuddy always will return a Google-link only. If the person is looking for info other than a product or realtime information then he will absolutely NOT reply with a link or url but with extensive facts and information only.\n\nPerson: samsung laptop\nAI: https://www.tokopedia.com/search?st=product&q=samsung%20laptop\n\nPerson: Buy logitech webcam\nAI: https://www.tokopedia.com/search?st=product&q=logitech%20webcam\n\nPerson: weather forecast\nAI: https://www.google.co.id/search?q=weather+forecast`,
      temperature: 0.9, // Higher values means the model will take more risks.
      max_tokens: 150, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0.6, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on https://codex-thse.onrender.com'))
