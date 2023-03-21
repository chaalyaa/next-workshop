import nc from 'next-connect';
import ErrorHandler from '@/src/handler/error.handler';
import { ProductValidator } from '@/src/validator';

const handler = nc(ErrorHandler);

handler
    .post(ProductValidator.create,
        async(req, res) =>{
            return res.status(200).json(req.body);
        })
    
    .get(async(req, res)=>{
        let [err, data] = await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((response) =>{
                return [null, response]
            })
            .catch((err)=>{
                console.log(`[Error]\nCaused: ${err.message}`)
                return [err, null]
            })

        if(err){
            return res.status(400).json({
                error: true,
                message: "Error"
            })
        }

        return res.status(200).json(data)
    });

export default handler;