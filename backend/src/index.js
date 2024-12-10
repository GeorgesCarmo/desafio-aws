import 'dotenv/config'
import path from 'node:path'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import routes from './routes/index.js'
import aws from 'aws-sdk'

dotenv.config()

const app = express()
const folder = path.resolve(process.env.PWD, '..', 'frontend')

app.use(express.static(folder))
app.use(cors())
app.use(express.json())

routes(app)

aws.config.update({ region: 'us-east-1' });
const sqs = new aws.SQS();

app.post('/queue', (req, res) => {
    const txt = (req.body.txt).toString()
    const author = (req.body.author).toString()

    console.log(txt)
    console.log(author)

        sqs.sendMessage(
            {
                MessageBody: 'Informações sobre o atual best-seller de ficção do NY Times',
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588738602512/queue',
                MessageAttributes: {
                    'Title': {
                        DataType: 'String',
                        StringValue: `${txt}`
                    },
                    'Author': {
                        DataType: 'String',
                        StringValue: `${author}`
                    },
                }
            },
            (err, data) => {
                if (err) {
                    console.log(err)
                }else{
                    console.log(`Success - `, data.MessageId)
                }
            }
        )

    res.json({
        ok: true
    })
})

app.listen(3001, () => {
    console.log("Server Started!")
})