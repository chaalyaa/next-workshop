import nc from 'next-connect';
import ErrorHandler from '@/src/handler/error.handler';
import bcrypt from 'bcryptjs';
import UserController from '@/src/controllers/user.controller';
import { isNumber } from 'lodash';
const handler =  nc(ErrorHandler);

handler
    .post(async(req, res)=>{
        let inputDTO = req.body;

        let salt = bcrypt.genSaltSync(10),
            hashPassword =  bcrypt.hashSync(inputDTO?.password, salt);

        Reflect.set(inputDTO, 'password', hashPassword);
        Reflect.set(inputDTO, 'salt', salt);

        const [err, data] = await new UserController({
            fields: inputDTO
        }).create();

        if(err) return res.status(400).json({
            message: err?.message ?? "Error: Some error occured"
        })

        Reflect.deleteProperty(data, "password");
        Reflect.deleteProperty(data, "salt")

        return res.status(200).json({
            message: "OK!",
            data: data
        })
    })
    .delete(async(req, res) =>{
        try{
            const inputDtO = req.body;
            
            const [err, result] = await new UserController({
                key: inputDtO?.key ?? "id",
                value: isNumber(inputDtO?.value) ? 
                        Number(inputDtO?.value) : inputDtO?.value 
            }).delete();

            if(err) return res.status(400).json({
                error: true,
                message: err?.message ?? "Bad request"
            })
            return res.status(201).json({});

        } catch(err){
            return res.status(400).json({
                error: true,
                message: err?.message ?? "Exceptions error"
            })
        }
    })

export default handler