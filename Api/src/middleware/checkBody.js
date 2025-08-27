export function checkBody (schema) {
  return (req, res, next) => {
    try {
      schema.validateSync(req.body)
      const body = schema.cast(req.body)
      req.body = body
      return next()
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
