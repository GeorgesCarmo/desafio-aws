import 'dotenv/config'
import aws from 'aws-sdk'
import fs from 'fs'

aws.config.update({ region: 'us-east-1' });
const sqs = new aws.SQS()

const writeFile = (content) => {
    const stream  = fs.createWriteStream(`./text.txt`, {flags: 'a'})

    stream.once('open', () => {
        stream.write('\n'+content+'\n')
    })

    stream.on('error', (err) => {
        console.log(err)
    })
}
const receive = () => {
    sqs.receiveMessage(
        {
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588738602512/queue',
            WaitTimeSeconds: 20,
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ['Atributo1', 'Atributo2'],
        },
        (err, data) => { 
            if (err){
                console.log(err)
            }else if (data.Messages) {
                console.log("Mensagens Recebidas ",data.Messages.length)

                data.Messages.forEach(element => {
                    writeFile(`${element.MessageId} - ${element.MessageAttributes.Atributo1.StringValue}`)

                    sqs.deleteMessage(
                        {
                            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588738602512/queue',
                            ReceiptHandle: element.ReceiptHandle
                        },
                        (err) => {
                            if (err){
                                console.log(err)
                            }else{
                                console.log("Deletado com Sucesso!")
                            }
                        }
                    )
                })
            }
        }
    )
}

setInterval(() => {
    receive()
}, 5000)