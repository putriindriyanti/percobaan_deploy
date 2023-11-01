const imagekit = require('../libs/imagekit');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createImage: async (req,res,next) =>{
        try{
            let {judul, deskripsi} = req.body
            let strFile = req.file.buffer.toString('base64');

            let { url } = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            });
            

            let image = await prisma.post.create ({
                data :{
                    judul,
                    deskripsi,
                    data_gambar: url
                } 
            });

            return res.status(201).json({
                status: true,
                message : 'create image',
                err: null,
                data: {image}
            }); 
        } catch (err) {
            next(err);
        }
    },
    
};