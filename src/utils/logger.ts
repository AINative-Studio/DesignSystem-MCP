/**
 * Logger utility for Design System MCP Server
 */

export interface LogLevel {
  ERROR: 0;
  WARN: 1;
  INFO: 2;
  DEBUG: 3;
}

export class Logger {
  private level: number;
  private prefix: string;

  constructor(prefix = 'DesignSystemMCP') {
    this.prefix = prefix;
    this.level = process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL) : 2; // INFO by default
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${this.prefix} ${level}: ${message}${metaStr}`;
  }

  error(message: string, meta?: any): void {
    if (this.level >= 0) {
      console.error(this.formatMessage('ERROR', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (this.level >= 1) {
      console.warn(this.formatMessage('WARN', message, meta));
    }
  }

  info(message: string, meta?: any): void {
    if (this.level >= 2) {
      console.log(this.formatMessage('INFO', message, meta));
    }
  }

  debug(message: string, meta?: any): void {
    if (this.level >= 3) {
      console.log(this.formatMessage('DEBUG', message, meta));
    }
  }
}

export const logger = new Logger();