import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      // Get user's balance in ether
      const balance = ethers.utils.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const recipient = "0x02bC12dAc51024f330fc79bFD651f66946aeF974";

      // Convert 1 ether to wei
      const amount = ethers.utils.parseEther("0.000001");

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: recipient,
        value: amount,
        // maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        // maxFeePerGas: "6000000000000", // Max fee per gas
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("sendTransaction tx: ", tx)

      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await signer.signMessage(originalMessage);

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }

  async getFreeMoney(faucet:any, userAddress:any): Promise<any> {
    try {
      console.log("getFreeMoney start")
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = new ethers.Wallet( faucet, ethersProvider )
      // console.log("signer:", signer)
      const amount = ethers.utils.parseEther("0.000111");
      console.log("amount:", amount)
      console.log("signer.address:", signer.address)
      console.log("ethersProvider:", ethersProvider)

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: userAddress,
        value: amount,
        // maxPriorityFeePerGas: "5000000000",
        // maxFeePerGas: "6000000000000",
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      console.log("getFreeMoney tx:", tx)
      console.log("getFreeMoney done")
      return receipt;
    } catch (error) {
      return error as string;
    }
    
  }
}