"use client"

import { useEffect, useState } from "react"
import { ethers } from 'ethers'
import { useSelector} from 'react-redux';


// Components
import Header from "../components/Header"
import Token from "../components/Token"

// ABIs & Config
import Factory from "../abis/Factory.json"
import config from "../config.json"

const ListaPage = ()=> {

  const [account, setAccount] = useState(null)
  const [tokens, setTokens] = useState([])
  const [isToggled, setIsToggled] = useState(true);  

  const tokensState = useSelector((state) => state.tokens.tokens);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  async function loadBlockchainData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum)

      const network = await provider.getNetwork()
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.getAddress(accounts[0])
      setAccount(account)
      const factoryAddress = config[network.chainId].factory.address
      const factory = new ethers.Contract(factoryAddress, Factory, provider)

      const totalTokens = await factory.totalTokens()
      const totalTokensNumber = Number(totalTokens)
      console.log(`total tokens ${totalTokens}`)
      const tokens = []
      
      for (let i = totalTokensNumber-1; i >= 0; i--) {
        const tokenSale = await factory.getTokenSale(i)

        const token = {
          token: tokenSale.token,
          name: tokenSale.name,
          creator: tokenSale.creator,
          sold: tokenSale.sold,
          raised: tokenSale.raised,
          isOpen: tokenSale.isOpen,
          image: tokensState[i]?.imageURL,
          fId: i
        }
      
        tokens.push(token)
      }

      setTokens(tokens)

    }
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
          <h1>Lista maestra de monedas</h1>
            <div className="tokens">
              {!account ? (
                <p>conecta la cuenta</p>
              ) : tokens.length === 0 ? (
                <p>no hay meme monedas</p>
              ) : (
                tokens.map((token, index) => (
                  <Token
                    token={token}
                    key={index}
                  />
                ))
              )}
            </div>
        </div>

      </main>

    </div>
  );
}

export default ListaPage;