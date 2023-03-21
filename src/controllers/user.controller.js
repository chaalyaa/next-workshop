import { PrismaClient } from "@prisma/client";

export default class UserController {
    constructor(props){
        this.prisma = new PrismaClient();
        this.fields = props?.fields ?? null;
        this.key = props?.key ?? undefined;
        this.value = props?.value ?? null;
    }

    async create(){
        try {

            if(!this.fields) return [new Error('Fields is required'), null];

            const result = await this.prisma.user.create({
                data: this.fields
            });

            return [null, result];

        } catch(err){
            return [err, null];
        }
    }

    async delete(){
        try {
            console.log('just this value', this.value)
            console.log('this key', this.key)
            if(!this.key) return [new Error('Key is required'), null];
            // console.log('this params', this.prisma.user.delete(  {   where: {
            //     [this.key]: this.value
            // }}))
            const result = await this.prisma.user.delete({
                where: {
                    [this.key]: this.value
                }
            });
            console.log('result', result)
            return [null, result];

        } catch(err) {
            return [err, null]
        }
    }

    async softDelete(){
        try{
            if(!this.key) return [new Error('Key is required'), null];

            const result = await this.prisma.user.update({
                where: {
                    [this.key]: this.value
                },
                data: {

                }
            });

            return [null, result]
        }catch(err){
            return [err, null]
        }
    }
}