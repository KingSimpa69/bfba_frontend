import styles from "@/styles/Index.module.css";
import Image from "next/image";
import { useEffect,useState } from "react";
import SVG from "@/svgs.json"
import { useWeb3Modal } from '@web3modal/ethers5/react'

const BridgeDirection = ({chainId,isConnected}) => {

    const [sendingB64,setSendingB64] = useState("")
    const [receiverB64,setreceiverB64] = useState("")

    const { open } = useWeb3Modal()
  
    useEffect(() => {
      chainId !== undefined ? setSendingB64(SVG[chainId]) : null
      return () => {
        setSendingB64("")
      }
    }, [chainId])
  
    useEffect(() => {
      if(sendingB64 !== "") {
        chainId === 1 ? setreceiverB64(SVG[8453]) :
        chainId === 8453 ? setreceiverB64(SVG[1]) :
        null
      }
      return () => {
        setreceiverB64("")
      }
    }, [sendingB64])

    return(isConnected && sendingB64 !== "" && receiverB64 !== "" &&
    <>
      <div className={styles.title}>NOUN BRIDGE</div>
      <div onClick={()=>open({ view: 'Networks' })} className={styles.directionContainer}>
          <Image alt={"sendingB64"} className={styles.chainLogo} src={sendingB64} width={69} height={69} />
          <Image alt={"sendingB64"} className={styles.chainLogo} src={SVG.arrow} width={42} height={42} />
          <Image alt={"receiverB64"} className={styles.chainLogo} src={receiverB64} width={69} height={69} />
      </div>
    </>
    )
}

export default BridgeDirection