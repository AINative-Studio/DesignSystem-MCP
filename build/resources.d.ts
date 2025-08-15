/**
 * Design System MCP Server Resources
 *
 * Provides access to design system templates, examples, and documentation
 * through the MCP resource system.
 */
export interface DesignSystemResource {
    uri: string;
    name: string;
    description: string;
    mimeType: string;
    handler: () => Promise<string | object>;
}
export declare const designSystemResources: DesignSystemResource[];
//# sourceMappingURL=resources.d.ts.map