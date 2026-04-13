import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerJobTools } from '@/lib/mcp/tools/jobs'

export function createMcpServer() {
  const server = new McpServer({
    name: 'upwork-job-mcp',
    version: '0.1.0',
  })

  registerJobTools(server)

  return server
}
