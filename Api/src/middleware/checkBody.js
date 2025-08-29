export function checkBody (schema) {
  return (req, res, next) => {
    try {
      req.body = schema.validateSync(req.body, { stripUnknown: true })
      return next()
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
