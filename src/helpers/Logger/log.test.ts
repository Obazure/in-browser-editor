import { Logger, LogType } from './log'

global.console = {
    error: jest.fn(),
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
}

describe('helpers/Logger', () => {
    it('should log', () => {
        Logger('hi')
        Logger('hi', LogType.ERROR)
        Logger('hi', LogType.SILENT)
        expect(global.console.error).toHaveBeenCalledWith('hi')
        expect(global.console.info).toHaveBeenCalledWith('hi')
    })
})
