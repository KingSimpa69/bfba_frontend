import BridgeDirection from "@/components/BridgeDirection";
import BridgeUI from "@/components/BridgeUI";
import PleaseConnect from "@/components/PleaseConnect";
import styles from "@/styles/Index.module.css";
import { useWeb3ModalProvider,useWeb3ModalAccount } from "@web3modal/ethers5/react"

export default function Index({alert}) {
  
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider:Provider } = useWeb3ModalProvider()

  return (
    <div className={styles.wrapper}>
      {!isConnected&&<PleaseConnect />}
      <BridgeDirection isConnected={isConnected} chainId={chainId}/>
      <BridgeUI alert={alert} address={address} Provider={Provider} isConnected={isConnected} chainId={chainId}/>
      <div className={styles.footer}>Bridge Authority By Based Fellas</div>
    </div>
  );
}
