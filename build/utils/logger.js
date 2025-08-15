/**
 * Logger utility for Design System MCP Server
 */
export class Logger {
    level;
    prefix;
    constructor(prefix = 'DesignSystemMCP') {
        this.prefix = prefix;
        this.level = process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL) : 2; // INFO by default
    }
    formatMessage(level, message, meta) {
        const timestamp = new Date().toISOString();
        const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${this.prefix} ${level}: ${message}${metaStr}`;
    }
    error(message, meta) {
        if (this.level >= 0) {
            console.error(this.formatMessage('ERROR', message, meta));
        }
    }
    warn(message, meta) {
        if (this.level >= 1) {
            console.warn(this.formatMessage('WARN', message, meta));
        }
    }
    info(message, meta) {
        if (this.level >= 2) {
            console.log(this.formatMessage('INFO', message, meta));
        }
    }
    debug(message, meta) {
        if (this.level >= 3) {
            console.log(this.formatMessage('DEBUG', message, meta));
        }
    }
}
export const logger = new Logger();
//# sourceMappingURL=logger.js.map