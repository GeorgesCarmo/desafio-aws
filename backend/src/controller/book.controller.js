import { createBook, getAllBooks, updateBook, getBookById,deleteBook } from '../repository/book.repository.js';
import aws from 'aws-sdk'

aws.config.update({ region: 'us-east-1' });
const sqs = new aws.SQS();

export const create = async (req, res) => {
    try {
        const book = await createBook(req.body);
        res.status(201).send(book);

        const title = (req.body.title).toString()
        const author = (req.body.author).toString()

        console.log(title)
        console.log(author)

        sqs.sendMessage(
            {
                MessageBody: 'Informações sobre o atual best-seller de ficção do NY Times',
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588738602512/queue',
                MessageAttributes: {
                    'Title': {
                        DataType: 'String',
                        StringValue: `${title}`
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
                } else {
                    console.log(`Success - `, data.MessageId)
                }
            }
        )

    } catch (error) {
        res.status(400).send(error);
    }
}

export const getAll = async (req, res) => {
    try {
        const book = await getAllBooks(req.body);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getId = async (req, res) => {
    try {
        const book = await getBookById(Number(req.params.id));
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const update = async (req, res) => {
    try {
        const book = await updateBook(Number(req.params.id), req.body);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const remove = async (req, res) => {
    try {
        await deleteBook(Number(req.params.id));
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }

        sqs.receiveMessage(
            {
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/588738602512/queue',
                WaitTimeSeconds: 15,
                MaxNumberOfMessages: 1,
                MessageAttributeNames: ['Title', 'Author'],
            },
            (err, data) => { 
                if (err){
                    console.log(err)
                }else if (data.Messages) {
                    console.log(data.Messages.length," mensagem recebida")
    
                    data.Messages.forEach(element => {
                        console.log('Mensagem lida - ', data.Messages.at().MessageId)
    
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
    
 /*   setInterval(() => {
        receive()
    }, 5000)
*/
}