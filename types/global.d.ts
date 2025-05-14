// Define Ethereum window interface
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: {
      method: string;
      params?: unknown[] | object;
    }) => Promise<unknown>;
    on: (event: string, handler: (...args: any[]) => void) => void;
    removeListener: (event: string, handler: (...args: any[]) => void) => void;
  };
}

// Define additional ethers types if needed
declare namespace ethers {
  interface BrowserProvider {
    send: (method: string, params: Array<any>) => Promise<any>;
    getNetwork: () => Promise<{ chainId: number | bigint }>;
  }
}
