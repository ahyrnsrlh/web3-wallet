# Web3 Wallet Application

A modern, secure Web3 wallet application with 3D object integration and dark mode UI.

## Features

- Connect to various wallets (MetaMask, etc.)
- View wallet balance and transaction history
- Send tokens to other addresses
- Switch between different networks (Ethereum, Polygon, BSC, etc.)
- View and manage NFTs
- Modern UI with responsive design

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahyrnsrlh/web3-wallet.git
   cd web3-wallet
   ```

2. **Quick Setup (Recommended)**

   Use our automated setup script that will install dependencies, set up environment variables, check Spline integration, and optionally start the development server:

   ```bash
   node setup.js
   ```

   Or, follow the manual steps below:

3. **Install dependencies**

   ```bash
   npm install
   ```

   Note: If you encounter dependency conflicts, you may need to use the `--force` flag:

   ```bash
   npm install --force
   ```

4. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   **IMPORTANT:** All API keys should be stored in your `.env.local` file and never committed to version control. Update the values in `.env.local` with your own API keys:

   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Get from [Supabase](https://supabase.com/)
   - `NEXTAUTH_SECRET` - Generate a secure random string for NextAuth.js
   - `NEXT_PUBLIC_ETHEREUM_RPC_URL` - Get from [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/)
   - `NEXT_PUBLIC_POLYGON_RPC_URL` - Get from a Polygon RPC provider
   - `NEXT_PUBLIC_BSC_RPC_URL` - Get from Binance Smart Chain RPC provider
   - `NEXT_PUBLIC_AVALANCHE_RPC_URL` - Get from Avalanche RPC provider
   - `NEXT_PUBLIC_GOERLI_RPC_URL` - Get from [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/)
   - `INFURA_API_KEY` - Get from [Infura](https://infura.io/)
   - `ALCHEMY_API_KEY` - Get from [Alchemy](https://www.alchemy.com/)
   - `ETHERSCAN_API_KEY` - Get from [Etherscan](https://etherscan.io/apis)

5. **Run the development server**

   ```bash
   npm run dev
   ```

   The application will run on [http://localhost:3000](http://localhost:3000)

6. **PowerShell Execution Policy (Windows Only)**

   If you encounter execution policy issues on Windows, run PowerShell as administrator and execute:

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## Project Structure

- `app/` - Next.js app directory
  - `page.tsx` - Main landing page
  - `wallet/` - Wallet connection pages
  - `globals.css` - Global styles
  - `spline-overrides.css` - Custom styles for 3D objects
- `components/` - Reusable React components
  - `spline-component.tsx` - Hero 3D object component
  - `feature-spline-component.tsx` - Feature section 3D object
  - `ui/` - UI components using shadcn/ui
  - `layout/` - Layout components (navigation, etc.)
- `contexts/` - React contexts (wallet connection, etc.)
- `public/` - Static assets

## 3D Object Integration

The application uses Spline 3D objects in two places:

1. **Hero Section**
   - Uses `SplineComponent` with scene URL: "https://prod.spline.design/PDyXIzA4SACdUIhV/scene.splinecode"
2. **Feature Section**
   - Uses `FeatureSplineComponent` with scene URL: "https://prod.spline.design/ptwm-huwtsTMuIMd/scene.splinecode"

To modify or replace the 3D objects:

1. Create your own 3D scene on [Spline](https://spline.design/)
2. Export and publish the scene
3. Copy the scene URL
4. Update the URL in the respective component files

For detailed instructions on 3D object integration, see the [3D Integration Guide](docs/3d-integration-guide.md).

## Troubleshooting

- **3D objects not rendering**: Make sure the Spline script is loaded properly in `layout.tsx`
- **CSS positioning issues**: Adjust the transform values in `spline-overrides.css`
- **Dependency conflicts**: Try installing with `--force` flag

## Technologies Used

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- Ethers.js
- Spline 3D
- shadcn/ui

## License

MIT

## Required Browser Extensions

- **MetaMask**: To interact with the Ethereum blockchain. [Download here](https://metamask.io/download.html)

## Usage Guide

1. Connect your wallet using the "Connect Wallet" button
2. Use the network selector to switch between different blockchain networks
3. View your account balance and token information in the Dashboard tab
4. Send tokens to other addresses in the Transfer tab
5. View your NFTs in the NFTs tab
6. Check your transaction history in the History tab

## Development

This project uses:

- Next.js for the frontend framework
- ethers.js for Ethereum interaction
- TailwindCSS for styling
- shadcn/ui for UI components