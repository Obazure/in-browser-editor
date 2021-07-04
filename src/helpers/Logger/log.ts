export enum LogType {
    SILENT = 'SILENT',
    ERROR = 'error',
    LOG = 'log',
    INFO = 'info',
    WARN = 'warn',
}

export const Logger = (message: unknown, logType: LogType = LogType.INFO): void => {
    if (logType !== LogType.SILENT) {
        // eslint-disable-next-line no-console
        console[logType](message)
    }
}
