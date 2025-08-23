export function checkBody (schema) {
  return (req, res, next) => {
    try {
      const { body } = req
      schema.validateSync(body)
      return next()
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
