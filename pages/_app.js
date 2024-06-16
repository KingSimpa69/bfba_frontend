import Header from "@/components/Header";
import { Web3Modal } from "@/context/web3modal";
import "@/styles/globals.css";
import 'animate.css';
import Head from "next/head";
import Alert from "@/components/Alert";
import { useState } from "react";


export default function App({ Component, pageProps }) {

  const [alerts,setAlerts] = useState([])
  const alert = (type,message,tx) => {
    setAlerts(alerts=>[...alerts,{
      type:type,
      message:message,
      tx:tx
    }])
  }

  return (
  <Web3Modal>
    <Head>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"/>
      <title>NOUNS &#91;ETH|BASE&#93; Bridge</title>
    </Head>
    <Alert alerts={alerts} setAlerts={setAlerts} />
    <Header />
    <Component alert={alert} {...pageProps} />
  </Web3Modal>
  );
}
