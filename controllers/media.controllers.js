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

    getAllImage: async (req, res, next) =>{
        try{
            //let {judul, deskripsi, data_gambar} = req.body
            
            let allImage = await prisma.post.findMany ({
                select :{
                    id: true,
                    judul: true,
                    deskripsi: true,
                    data_gambar: true
                } 
            });

            return res.status(200).json({
                status: true,
                message : 'OK',
                err: null,
                data: allImage
            }); 

        } catch (err) {
            return res.status(400).json({
                status: false,
                message:   err.message,
                data: null
            });
        }
    },
    
};