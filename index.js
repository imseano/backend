const { PORT } = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')

logger.info('Hello world')

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
