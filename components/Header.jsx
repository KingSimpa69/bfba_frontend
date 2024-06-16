import styles from "@/styles/Header.module.css"
import Image from "next/image"
import Web3Button from "./Web3Button"

const Header = () => {

    return(
        <div className={styles.headerWrap}>
            <div className={styles.headerCont}><Image src={"/images/noggles.png"} width={100} height={100} alt={"noggles"}/></div>
            <div className={styles.headerCont}><Web3Button /></div>
        </div>
    )
}

export default Header