import styles from "@/styles/Index.module.css"
import { useWeb3Modal } from '@web3modal/ethers5/react'

const PleaseConnect = () => {

    const { open } = useWeb3Modal()

    return(
        <div onClick={()=>open()} className={styles.pleaseConnect}>
            Please conect a wallet
        </div>
    )
}

export default PleaseConnect