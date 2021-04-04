import { createLogger, format, transports } from 'winston'

const customFormat = format.printf(
  ({ level, message, timestamp }) => `${timestamp} | ${level}: ${message}`
)

const customFormatFile = format.printf(
  ({ level, message, timestamp }) =>
    `{ "timestamp": "${timestamp}", "level": "${level}", "message": "${message}" },`
)

const logger = createLogger({
  transports: [
    new transports.File({
      level: 'debug',
      maxsize: 5120000,
      maxFiles: 5,
      filename: `logs/automat.log`,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD ( HH:mm:ss )',
        }),
        customFormatFile
      ),
    }),
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD ( HH:mm:ss )',
        }),
        customFormat
      ),
    }),
  ],
})

// TODO: add log function which use console.log too - for debugging
// const log = (type: string, msg: string) => {}

export default logger
