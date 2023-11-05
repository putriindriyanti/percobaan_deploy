const imagekit = require('../libs/imagekit');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../helpers');

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
            return res.status(400).json({
            status: false,
            message: err.message,
            data: null
            });
        }
    },


    getAllImage: async (req, res, next) =>{
        try{
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let allImage = await prisma.post.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });

            const { _count } = await prisma.post.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, allImage}
            });
        } catch (err) {
            next(err);
        }
    },

    getImageById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const detailImage = await prisma.post.findUnique({
                where: {
                    id: Number(id)
                }
            });
    
            if (!detailImage) {
                throw new Error('Data not found');
            }
    
            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: detailImage
            });
        } catch (err) {
            return res.status(404).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    
    deteletImage: async (req, res, next) => {
        try {
          const { id } = req.params;
          const existingImage = await prisma.post.findUnique({
            where: { id: Number(id) }
          });
      
          if (!existingImage) {
            return res.status(400).json({
              status: false,
              message: 'Bad Request: data not found ',
              err: null,
              data: null
            });
          }
      
          const deleteImage = await prisma.post.delete({
            where: { id: Number(id) }
          });
      
          return res.status(200).json({
            status: true,
            message: 'Successful delete image',
            err: null,
            data: deleteImage
          });
        } catch (err) {
          next(err);
        }
      },      


    updateImage: async (req, res, next) => {
        try {
            const { id, judul, deskripsi } = req.body;
            
            const updateImage = await prisma.post.update({
                where: {
                    id: Number(req.params.id)
                },
                data: { judul, deskripsi }
            });
            
            return res.status(200).json({
                status: true,
                message: 'Successful update image',
                err: null,
                data: updateImage
            });
            
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: 'Failed to update image',
                error: err.message,
                data: null
            });
        }
    }

};
      