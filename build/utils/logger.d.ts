/**
 * Logger utility for Design System MCP Server
 */
export interface LogLevel {
    ERROR: 0;
    WARN: 1;
    INFO: 2;
    DEBUG: 3;
}
export declare class Logger {
    private level;
    private prefix;
    constructor(prefix?: string);
    private formatMessage;
    error(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    info(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
}
export declare const logger: Logger;
//# sourceMappingURL=logger.d.ts.map