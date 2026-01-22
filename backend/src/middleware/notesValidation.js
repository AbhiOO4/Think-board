
import Joi from 'joi'

export const notesValidate = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(60).required(),
        content: Joi.string().min(1).required()
    })

    const {error} = schema.validate(req.body)
    if (error){
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

export const editNoteValidate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(60),
    content: Joi.string().min(1)
  }).min(1)

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  next()
}


