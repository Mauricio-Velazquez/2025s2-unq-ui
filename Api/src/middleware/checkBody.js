export function checkBody (schema) {
  return (req, res, next) => {
    try {
      const body = schema.cast(req.body)
      schema.validateSync(body)
      req.body = body
      return next()
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
