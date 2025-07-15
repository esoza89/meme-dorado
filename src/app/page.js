"use client"

import { useEffect, useState } from "react"
import { ethers } from 'ethers'

// Components
import Header from "./components/Header"
import List from "./components/List"
import Token from "./components/Token"

// ABIs & Config
import Factory from "./abis/Factory.json"
import config from "./config.json"

export default function Home() {

  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [factory, setFactory] = useState(null)
  const [fee, setFee] = useState(0)
  const [showCreate, setShowCreate] = useState(false)
  const [tokens, setTokens] = useState([])
  const [tokensTop, setTokensTop] = useState([])
  const [isToggled, setIsToggled] = useState(true);
  let [chainId, setChainId] = useState(null);
  let [key, setKey] = useState(null);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  async function toggleCreate() {
    setShowCreate((prev) => !prev);
  }

  const openInNewTab = () => {
    window.open('/ListaMaestra', '_blank', 'noopener,noreferrer');
  };

  async function loadBlockchainData() {
    if (typeof window.ethereum !== 'undefined') {
      let key = Number(Object.keys(config)[0]);
      setKey(key);
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)
      const networkUser = await provider.getNetwork();
      let chainId = Number(networkUser.chainId);
      setChainId(chainId);

    }
    
    const rpcUrl = process.env.NEXT_PUBLIC_INFURA_RPC_URL;
    const providerRead = new ethers.JsonRpcProvider(rpcUrl);
    
    const network = await providerRead.getNetwork()
    const factoryAddress = config[network.chainId].factory.address
    const factory = new ethers.Contract(factoryAddress, Factory, providerRead)
    setFactory(factory)

    const fee = await factory.fee()
    setFee(fee)

    const totalTokens = await factory.totalTokens()
    const totalTokensNumber = Number(totalTokens)
    const tokens = []
    const startIndex = totalTokensNumber - 1
    
    for (let i = startIndex; i >= 0 && i >= totalTokensNumber - 56; i--) {
      const tokenSale = await factory.getTokenSale(i)

      const response = await fetch(`/api/coins/${i}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      let data = await response.json();
      let imageLink = data.imageURL;


      const token = {
        token: tokenSale.token,
        name: tokenSale.name,
        creator: tokenSale.creator,
        sold: tokenSale.sold,
        raised: tokenSale.raised,
        isOpen: tokenSale.isOpen,
        image: imageLink,
        fId: i
      }
    
      tokens.push(token)
    }

    setTokens(tokens)

    const sortedTokens = [...tokens].sort((a, b) => {
      if (a.isOpen && !b.isOpen) return -1;
      if (!a.isOpen && b.isOpen) return 1;
      
      if (b.sold > a.sold) return 1;
      if (b.sold < a.sold) return -1;
      
      return 0;
    });
  
    const top5Tokens = sortedTokens.slice(0, 5);
    setTokensTop(top5Tokens);

    
  }

  useEffect(() => {
    if (isToggled === true) {
      const interval = setInterval(() => {
        loadBlockchainData()
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isToggled, tokens])


  return (
    <div className="page">
      <Header account={account} setAccount={setAccount} />

      <main>
        <div className="create">
          <button onClick={factory && account && toggleCreate} className="btn--fancy">
            {!factory ? (
              "[ conecta la billetera en red Base para crear meme monedas y hacer trading ]"
            ) : !account ? (
              "[ conecta la billetera en red Base para crear meme monedas y hacer trading ]"
            ) : chainId != key ? (
              "[ conecta la billetera en red Base para crear meme monedas y hacer trading ]"
            ) : (
              "[ crear meme moneda ]"
            )}
          </button>
        </div>
        <div>
          <p>Actualizacion de memes</p>
          <button
            onClick={handleToggle}
            className={`toggle-button ${isToggled ? 'on' : 'off'}`}
          >
            {isToggled ? 'Enc' : 'Apag'}
          </button>
        </div>

        <div className="listings">
          <h1>monedas en tendencia</h1>
            <div className="tokens">
              {tokens.length === 0 ? (
                <p>cargando...</p>
              ) : (tokensTop.map((token, index) => (
                  <Token
                    token={token}
                    key={index}
                    account={account}
                    chainId={chainId}
                  />
                ))
              )}
            </div>
          </div>


        <div className="listings">
          <h1>nuevas monedas</h1>
            <div className="tokens">
              {tokens.length === 0 ? (
                <p>cargando...</p>
              ) : (
                tokens.map((token, index) => (
                  <Token
                    token={token}
                    key={index}
                    account={account}
                    chainId={chainId}
                  />
                ))
              )}
            </div>
        </div>

        <div className="create">
          {!account ? (
            <button className="btn--fancy">
              [ conecta tu billetera en red Base para ver todas las monedas ]
            </button>
          ) : chainId != key ? (
            <button className="btn--fancy">
              [ conecta tu billetera en red Base para ver todas las monedas ]
            </button>
          ) : (
            <button onClick={openInNewTab} className="btn--fancy">
              [ ver todas las monedas ]
            </button>
          )}
          
        </div>

      </main>

      { showCreate && (
        <List toggleCreate={toggleCreate} fee={fee} provider={provider} factory={factory} />
      )}


    </div>
  );
}
