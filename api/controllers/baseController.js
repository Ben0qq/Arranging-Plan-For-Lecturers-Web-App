const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => async (req, res, next) => {
    try{
        const doc = await Model.findByIdAndDelete(req.params.id)
        if(!doc){
            return next(new AppError(404, 'fail', 'No document found with that id'),
            req,
            res,
            next)
        }

        res.status(204).json({
            status: 'success',
            data: 'User has been deleted'
        })
    } catch(err){
        next(err)
    }
}

exports.createOne = Model => async (req, res, next) => {
    try{
        const doc = await Model.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        })

    } catch (err){
        next(err)
    }
}

exports.updateOne = Model => async (req, res, next) => {
    try{
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!doc){
            return next(new AppError(404, 'fail', 'No document found with that id',
            req,
            res,
            next))
        }

        res.status(200).json({
            status: 'success',
            data:{
                doc
            }
        })
    } catch(err){
        next(err)
    }
}

exports.getOne = Model => async (req, res, next) => {
    try{
        const id = req.params.id
        const doc = await Model.findById(id)
        if(!doc){
            return next(new AppError(404, 'fail', 'No document found with that id'),
            req,
            res,
            next)
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        })

    } catch (err){
        next(err)
    }
}

exports.getAll = Model => async (req, res, next) => {
    try{
        // const features = new APIFeatures(Model.find(), req.query)
        // .sort()
        // .paginate()

        // const doc = await features.query
        const doc = await Model.find()
        
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                doc
            }
        })
    } catch (err){
        next(err)
    }
}