import styles from "@/styles/Index.module.css"
import { useState,useEffect } from "react"
import useDebounce from "@/hooks/useDebounce"
import CONFIG from "@/config.json"
import ABI from "@/functions/abi.json"
import { ethers } from "ethers"
import { isAddress } from "ethers/lib/utils"
import LoadingSpinner from "./LoadingSpinner"


const BridgeUI = ({isConnected,chainId,address,Provider,alert}) => {

    const [chain,setChain] = useState("")
    const [input,setInput] = useState("")
    const debouncedInput = useDebounce(input, 750);
    const [buttonText,setButtonText] = useState("Bridge")
    const [buttonCss,setButtonCss] = useState("bigButtonNope")
    const [infoText,setInfoText] = useState("")
    const [BRIDGE_FEE,setBRIDGE_FEE] = useState(0)

    const handleInput = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d.]/g, "");
        if (value.toString().length > 6) {
          value = value.slice(0, 7);
        } else if (value > 10000) {
          value = 10000;
        }
        setInput(value)
    }

    const getBridgeFee = async () => {
        try {
            if (!Provider) return;
            const provider = new ethers.providers.Web3Provider(Provider)
            const bridge = new ethers.Contract(CONFIG[chain].bridgeContract, ABI[chain], provider)
            const fee = await bridge.BRIDGE_FEE()
            setBRIDGE_FEE(fee)
            return await fee
        } catch (e) {
            console.log(e)
        }
    }


    const checkApproval = async (id) => {
        try {
            if (!Provider) return;
            const provider = new ethers.providers.Web3Provider(Provider)
            const asset = new ethers.Contract(CONFIG[chain].asset, ABI[CONFIG[chain].abi], provider)
            const approved = await asset.getApproved(id)
            const FEE = parseFloat(await getBridgeFee())/10**18
            approved === CONFIG[chain].bridgeContract ? setButtonText("Bridge") : setButtonText("Approve")
            approved === CONFIG[chain].bridgeContract ? setInfoText(`Bridge NOUN #${id} for ${FEE} ETH`) : 
            setInfoText(`NOUN #${id} needs approval`)
            setButtonCss("bigButton")
        } catch (e) {
            setButtonText("Invalid ID")
            //console.log(e)
        }
    }

    const exists = async (id) => {
        setInfoText("loading")
        try {
            if (!Provider) return;
            const provider = new ethers.providers.Web3Provider(Provider)
            const asset = new ethers.Contract(CONFIG[chain].asset, ABI[CONFIG[chain].abi], provider)
            const owner = await asset.ownerOf(id)
            console.log(owner)
            if(isAddress(owner) && owner.toLowerCase(owner) === address.toLowerCase()){
                checkApproval(id)
            } else {
                setInfoText("")
                setButtonText("You don't own this NOUN")
                setButtonCss("bigButtonNope")
            }
        } catch (e) {
            setInfoText("")
            setButtonCss("bigButtonNope")
            setButtonText("Invalid ID")
            //console.log(e)
        }
    }

    const approve = async () => {
        setInfoText("loading")
        try {
            if (!Provider) return;
            const provider = new ethers.providers.Web3Provider(Provider)
            const signer = provider.getSigner()
            const asset = new ethers.Contract(CONFIG[chain].asset, ABI[CONFIG[chain].abi], signer)
            const tx = await asset.approve(CONFIG[chain].bridgeContract,input)
            await tx.wait()
            alert("success",`NOUN #${input} approved`)
        } catch (e) {
            checkApproval(input)
            //console.log(e)
        } finally {
            setInfoText("")
            checkApproval(input)
        }
    }

    const bridge = async () => {
        setInfoText("loading")
        try {
            console.log(chain)
            if (!Provider) return;
            const provider = new ethers.providers.Web3Provider(Provider)
            const signer = provider.getSigner()
            const bridge = new ethers.Contract(CONFIG[chain].bridgeContract, ABI[chain], signer)
            const tx = await bridge.bridgeOut(input,{value:BRIDGE_FEE})
            await tx.wait()
            alert("success","Your NFT will arrive after 25 confirmations")
            setInput("")
        } catch (e) {
            checkApproval(input)
            //console.log(e)
        } finally {
            setInfoText("")
        }
    }

    const buttonClick = async () => {
        if (buttonCss === "bigButtonNope") return
        if (buttonText === "Approve") {
            approve()
        }
        if (buttonText === "Bridge") {
            bridge()
        }
    }

    useEffect(() => {
        setInput("")
        setInfoText("")
        parseInt(chainId) === CONFIG.native.chain ? setChain("native") :
        parseInt(chainId) === CONFIG.receiver.chain ? setChain("receiver") :
        null
    }, [chainId])
    
    useEffect(() => {
        debouncedInput !== "" ? exists(debouncedInput) : setButtonText("Bridge")
        if(debouncedInput === ""){
            setButtonCss("bigButtonNope") 
            setInfoText("")
        }
    }, [debouncedInput])
    

    return(isConnected && Provider && chainId &&
        <div className={styles.uiCont}>
            <input className={styles.idInput} placeholder="ID" onChange={(e)=>{handleInput(e)}} value={input}/>
            <div>{infoText === "loading" ? <LoadingSpinner /> : infoText}</div>
            <div onClick={()=>buttonClick()} className={styles[buttonCss]}>{buttonText}</div>
        </div>
    )
}

export default BridgeUI