import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    hardhat({
      project: '.',
      deployments: {
        BaseMoonToken: {
          8453: '0x...', // Base mainnet address - to be filled in when deployed
        },
        BaseMoonNFT: {
          8453: '0x...', // Base mainnet address - to be filled in when deployed
        },
        BaseMoonStorage: {
          8453: '0x...', // Base mainnet address - to be filled in when deployed
        },
      },
    }),
  ],
})