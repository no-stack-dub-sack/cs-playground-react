// @flow
import type { ClearConsole, ConsoleLog } from '../types/Actions';

export const clearConsole = (): ClearConsole => ({ type: 'CLEAR_CONSOLE' })

export const consoleLog = (logs: string): ConsoleLog => ({
  type: 'CONSOLE_LOG',
  logs
})
