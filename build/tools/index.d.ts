/**
 * Design System MCP Server Tools
 *
 * Comprehensive tool collection for design system management, token extraction,
 * and component analysis.
 */
export interface DesignSystemTool {
    name: string;
    description: string;
    inputSchema: any;
    handler: (args: any) => Promise<any>;
}
export declare const designSystemTools: Record<string, DesignSystemTool>;
//# sourceMappingURL=index.d.ts.map