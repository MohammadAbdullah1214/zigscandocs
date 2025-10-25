import { TvMinimal } from "lucide-react"

// API Configuration for ZigScan API Documentation
export const API_CATEGORIES = {
  ping: {
    title: "Ping",
    icon: "Activity",
    endpoints: [
      {
        name: "Ping",
        method: "GET",
        path: "/api/v2/health",
        description: "Check API health status",
        parameters: [],
      },
    ],
  },
  key: {
    title: "Key",
    icon: "Key",
    endpoints: [
      {
        name: "Key",
        method: "GET",
        path: "/api/v2/stats",
        description: "Get API statistics",
        parameters: [],
      },
    ],
  },
  transactions: {
    title: "Transactions",
    icon: "ArrowRightLeft",
    endpoints: [
      {
        name: "Latest Transactions",
        method: "GET",
        path: "/api/v2/transactions/latest",
        description: "Get latest transactions",
        parameters: [],
      },
      {
        name: "Transaction Stats",
        method: "GET",
        path: "/api/v2/transactions/stats",
        description: "Get transaction statistics",
        parameters: [],
      },
      {
        name: "Transaction Details",
        method: "GET",
        path: "/api/v2/transaction/{txHash}",
        description: "Get details for a specific transaction",
        parameters: [{ name: "txHash", type: "string", required: true, description: "Transaction hash" }],
      },
    ],
  },
  contracts: {
    title: "Contracts",
    icon: "FileCode",
    endpoints: [
      {
        name: "List Contracts",
        method: "GET",
        path: "/api/v2/contracts",
        description: "Get list of all contracts",
        parameters: [],
      },
      {
        name: "Debug Contract",
        method: "GET",
        path: "/api/v2/contract/debug/{contractAddress}",
        description: "Debug a specific contract",
        parameters: [{ name: "contractAddress", type: "string", required: true, description: "Contract address" }],
      },
      {
        name: "Contract Details",
        method: "GET",
        path: "/api/v2/contract/details/{contractAddress}",
        description: "Get contract details",
        parameters: [{ name: "contractAddress", type: "string", required: true, description: "Contract address" }],
      },
      {
        name: "Contract Transactions",
        method: "GET",
        path: "/api/v2/contract/transactions/{contractAddress}",
        description: "Get transactions for a contract",
        parameters: [{ name: "contractAddress", type: "string", required: true, description: "Contract address" }],
      },
    ],
  },
  codes: {
    title: "Codes",
    icon: "Code",
    endpoints: [
      {
        name: "List Codes",
        method: "GET",
        path: "/api/v2/codes",
        description: "Get list of all codes",
        parameters: [],
      },
      {
        name: "Code Details",
        method: "GET",
        path: "/api/v2/code/details/{codeId}",
        description: "Get code details",
        parameters: [{ name: "codeId", type: "string", required: true, description: "Code ID" }],
      },
    ],
  },
  validators: {
    title: "Validators",
    icon: "CheckCircle",
    endpoints: [
      {
        name: "List Validators",
        method: "GET",
        path: "/api/v2/validators",
        description: "Get list of all validators",
        parameters: [],
      },
      {
        name: "Validator Details",
        method: "GET",
        path: "/api/v2/validator/details/{validatorAddress}",
        description: "Get validator details",
        parameters: [{ name: "validatorAddress", type: "string", required: true, description: "Validator address" }],
      },
    ],
  },
  accounts: {
    title: "Accounts",
    icon: "User",
    endpoints: [
      {
        name: "Account Details",
        method: "GET",
        path: "/api/v2/account/details/{address}",
        description: "Get account details",
        parameters: [{ name: "address", type: "string", required: true, description: "Account address" }],
      },
      {
        name: "Account Delegations",
        method: "GET",
        path: "/api/v2/account/delegations/{address}",
        description: "Get account delegations",
        parameters: [{ name: "address", type: "string", required: true, description: "Account address" }],
      },
      {
        name: "Total Accounts",
        method: "GET",
        path: "/api/v2/accounts/total",
        description: "Get total number of accounts",
        parameters: [],
      },
      {
        name: "Account Transactions",
        method: "GET",
        path: "/api/v2/account/transactions/{address}",
        description: "Get transactions for an account",
        parameters: [{ name: "address", type: "string", required: true, description: "Account address" }],
      },
    ],
  },
  admin: {
    title: "Admin",
    icon: "Shield",
    endpoints: [
      {
        name: "List Users",
        method: "GET",
        path: "/api/v2/admin/users",
        description: "Get list of admin users",
        parameters: [],
      },
      {
        name: "System Stats",
        method: "GET",
        path: "/api/v2/admin/system-stats",
        description: "Get system statistics",
        parameters: [],
      },
      {
        name: "Execute Query",
        method: "POST",
        path: "/api/v2/admin/execute-query",
        description: "Execute a custom query",
        parameters: [{ name: "query", type: "string", required: true, description: "Query to execute" }],
      },
      {
        name: "Audit Log",
        method: "GET",
        path: "/api/v2/admin/audit-log",
        description: "Get audit log",
        parameters: [],
      },
    ],
  },
  blocks: {
    title: "Blocks",
    icon: "Blocks",
    endpoints: [
      {
        name: "List Blocks",
        method: "GET",
        path: "/api/v2/blocks",
        description: "Get list of blocks",
        parameters: [],
      },
      {
        name: "Block Stats",
        method: "GET",
        path: "/api/v2/blocks/stats",
        description: "Get block statistics",
        parameters: [],
      },
      {
        name: "Block Transactions",
        method: "GET",
        path: "/api/v2/blocks/transactions/{height}",
        description: "Get transactions in a block",
        parameters: [{ name: "height", type: "number", required: true, description: "Block height" }],
      },
    ],
  },
  supply: {
    title: "Supply",
    icon: "TrendingUp",
    endpoints: [
      {
        name: "Supply Info",
        method: "GET",
        path: "/api/v2/supply",
        description: "Get supply information",
        parameters: [],
      },
      {
        name: "Market Data",
        method: "GET",
        path: "/api/v2/zig/market-data",
        description: "Get ZIG market data",
        parameters: [],
      },
      {
        name: "Staking Pool",
        method: "GET",
        path: "/api/v2/zig/staking-pool",
        description: "Get staking pool information",
        parameters: [],
      },
      {
        name: "Price Data",
        method: "GET",
        path: "/api/v2/zig/price-data",
        description: "Get ZIG price data",
        parameters: [],
      },
    ],
  },
  defi: {
    title: "DeFi",
    icon: "Zap",
    endpoints: [
      {
        name: "List Tokens",
        method: "GET",
        path: "/api/v2/tokens",
        description: "Get list of tokens",
        parameters: [],
      },
      {
        name: "Token Details",
        method: "GET",
        path: "/api/v2/tokens/details/{denom}",
        description: "Get token details",
        parameters: [{ name: "denom", type: "string", required: true, description: "Token denomination" }],
      },
      {
        name: "Token Pools",
        method: "GET",
        path: "/api/v2/tokens/{denom}/pools",
        description: "Get pools for a token",
        parameters: [{ name: "denom", type: "string", required: true, description: "Token denomination" }],
      },
      {
        name: "Token Holders",
        method: "GET",
        path: "/api/v2/tokens/{denom}/holders",
        description: "Get token holders",
        parameters: [{ name: "denom", type: "string", required: true, description: "Token denomination" }],
      },
      {
        name: "Token OHLCV",
        method: "GET",
        path: "/api/v2/tokens/{denom}/ohlcv",
        description: "Get OHLCV data for token",
        parameters: [{ name: "denom", type: "string", required: true, description: "Token denomination" }],
      },
      {
        name: "Pool Trades",
        method: "GET",
        path: "/api/v2/pools/{poolId}/trades",
        description: "Get trades in a pool",
        parameters: [{ name: "poolId", type: "string", required: true, description: "Pool ID" }],
      },
    ],
  },
  networks:{
    title: "Networks",
    icon: "Globe",
    endpoints:[
      {
          name: "Network Overview",
          method: "GET",
          path: "/api/v2/network/overview",
          description: "Overview of the network",
          parameters: [],
      }
    ],
    },
  tvl:{
    title: "TVL",
    icon: "Lock",
    endpoints:[
      {
          name: "TVL",
          method: "GET",
          path: "/api/v2/tvl",
          description: "Total Value Locked",
          parameters: [],
      }
    ],
    }
}

export type ApiCategory = keyof typeof API_CATEGORIES
export type ApiEndpoint = (typeof API_CATEGORIES)[ApiCategory]["endpoints"][number]