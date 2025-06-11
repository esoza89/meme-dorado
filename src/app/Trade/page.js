"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import Token from "../abis/Token.json"
import config from "../config.json"
import Factory from "../abis/Factory.json"
import ProgressBar from "../components/ProgressBar"
import PriceHistoryChart from '../components/PriceHistoryChart';
import Image from 'next/image';



const TradePage = ()=> {
  const [target, setTarget] = useState(0)
  const [limit, setLimit] = useState(0)
  const [price, setPrice] = useState(0)
  const [amountBValue, setAmountBValue] = useState(1)
  const [amountSValue, setAmountSValue] = useState(1)
  const [totalCostB, setTotalCostB] = useState(0)
  const [totalCostS, setTotalCostS] = useState(0)
  const [toastB, setToastB] = useState(null);
  const [toastS, setToastS] = useState(null);
  let [tokenFid, setTokenFid] = useState(0);
  let [token, setToken] = useState(null);
  const [provider, setProvider] = useState(null)
  const [factory, setFactory] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState([]);

  const stimateCostB = async (event) => {
    setAmountBValue(event.target.value)
    const amountB = ethers.parseUnits(event.target.value, 18)
    const cost = await factory.getCost(token.sold, amountB)
    setTotalCostB(cost)
  }

  const stimateCostS = async (event) => {
    setAmountSValue(event.target.value)
    const amountS = ethers.parseUnits(event.target.value, 18)
    const cost = await factory.getCost(token.sold, amountS)
    setTotalCostS(cost)
  }


  async function buyHandler(form) {
    const amountB = ethers.parseUnits(form.get("amountB"), 18)

    if(token.sold + amountB > limit) {
      setToastB("No hay suficientes tokens en existencia");
      setTimeout(() => setToastB(null), 6000);
      return;
    }
    const signer = await provider.getSigner()
    const userBalance = await provider.getBalance(signer)

    const sold = token.sold
    const totalCost = await factory.getCost(sold, amountB)

    if(userBalance < totalCost) {
      setToastB("No cuentas con ETH suficiente");
      setTimeout(() => setToastB(null), 6000);
      return;
    }

    const transaction = await factory.connect(signer).buy(
      token.token,
      amountB,
      { value: totalCost }
    )

    setToastB("Procesando compra...");
    setTimeout(() => setToastB(null), 6000);

    await transaction.wait()

    const finalPrice = await factory.getPrice(sold + amountB)
    const finalPriceFormatted = Number(ethers.formatUnits(finalPrice, 18))

    const response = await fetch(`/api/coins/${tokenFid}/trades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: parseFloat(finalPriceFormatted) })
    });

    if (!response.ok) {
      throw new Error('Failed to save coin data to the database');
    }

    window.location.reload();
  }

  async function sellHandler(form) {
    const amountS = ethers.parseUnits(form.get("amountS"), 18)

    if(token.sold - amountS < 0 ) {
      setToastS("No hay suficientes tokens vendidos");
      setTimeout(() => setToastS(null), 6000);
      return;
    }
    const signer = await provider.getSigner()
    const network = await provider.getNetwork()

    const userBalance = await factory.balances(token.token, signer)
    if(userBalance < amountS) {
      setToastS("No tienes suficientes tokens para vender");
      setTimeout(() => setToastS(null), 6000);
      return;
    }

    const sold = token.sold

    const factoryAddress = config[network.chainId].factory.address

    const tokenContract = new ethers.Contract(
      token.token, 
      Token, 
      signer
    );
    
    const approveTx = await tokenContract.approve(
      factoryAddress, 
      amountS
    );

    await approveTx.wait();


    const transaction = await factory.connect(signer).sell(
      token.token,
      amountS
    )

    setToastS("Procesando venta...");
    setTimeout(() => setToastS(null), 6000);

    await transaction.wait()

    const finalPrice = await factory.getPrice(sold - amountS)
    const finalPriceFormatted = Number(ethers.formatUnits(finalPrice, 18))

    const response = await fetch(`/api/coins/${tokenFid}/trades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: parseFloat(finalPriceFormatted) })
    });

    if (!response.ok) {
      throw new Error('Failed to save coin data to the database');
    }

    window.location.reload();
  }

  async function getSaleDetails() {
    try {
      const storedData = localStorage.getItem('tradeData');
      const parsedData = JSON.parse(storedData);
      const gotToken = parsedData.tokenFid;
      tokenFid = gotToken
      setTokenFid(gotToken)
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)
      const network = await provider.getNetwork()
      const factoryAddress = config[network.chainId].factory.address
      const factory = new ethers.Contract(factoryAddress, Factory, provider)
      setFactory(factory)
      const targetD = await factory.getTarget()
      setTarget(targetD)

      const limitD = await factory.getTokenLimit()
      setLimit(limitD)

      let tokenSale = await factory.getTokenSale(tokenFid)

      const response = await fetch(`/api/coins2/${tokenFid}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const imageLink = data.imageURL;
        const creatorMsg = data.creatorMessage;
        const dbSocial1 = data.Social1 || null;
        const dbSocial2 = data.Social2 || null;
        const dbTrades = data.trades;

      token = {
          token: tokenSale.token,
          name: tokenSale.name,
          creator: tokenSale.creator,
          crtMsg: creatorMsg,
          sold: tokenSale.sold,
          raised: tokenSale.raised,
          isOpen: tokenSale.isOpen,
          image: imageLink,
          fId: tokenFid,
          rSocial1: dbSocial1,
          rSocial2: dbSocial2,
      }
      setToken(token)
      const priceD = await factory.getPrice(token.sold)
      setPrice(priceD)

      const trades = dbTrades
      const priceHistoryD = trades.slice(-75) || []
      setPriceHistory(priceHistoryD)

    } catch (error) {
    console.error("Error fetching sale details:", error);
    } finally {
    setIsLoading(false);
    }

  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getSaleDetails();
    }
  }, []);

  if (isLoading) {
    return <div>Cargando moneda...</div>;
  }
  
  if (!token) {
    return <div>Token no encontrado</div>;
  }

  return (
    <div className="trade">
      <h1>trade</h1>

      <div className="token__details">
        <a
          href={`https://basescan.org/address/${token.token}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={token.image} alt="token image" width={250} height={250} />
        </a>
        <p>creado por {token.creator.slice(0, 6) + '...' + token.creator.slice(38, 42)}</p>
        <p>{token.crtMsg}</p>
        <p>Market Cap: {Number(ethers.formatUnits(token.raised, 18)).toFixed(18)} ETH</p>
        <p>Precio base: {ethers.formatUnits(price, 18)} ETH</p>
        <p>
          <a 
            href={`${token.rSocial1}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >   
            {token.rSocial1}
          </a>          
        </p>
        <p>
          <a 
            href={`${token.rSocial2}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >   
            {token.rSocial2}
          </a>          
        </p>
        <p className="name">{token.name}</p>
      </div>

      {token.sold >= limit || token.raised >= target ? (
        <div>
          <p className="disclaimer">¡Objetivo alcanzado!</p>
          <p>
              <a 
                href={`https://app.uniswap.org/explore/tokens/base/${token.token}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link"
              >   
              Ver en Uniswap
              </a>
          </p>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <h3>Compra</h3>
            <form action={buyHandler}>
              <input type="number" name="amountB" min={1} max={limit} placeholder="1" value={amountBValue} onChange={stimateCostB}/>
              <input type="submit" value="[ comprar ]" />
            </form>
            <div className="trade__cost">
              <p>{Number(ethers.formatUnits(totalCostB, 18)).toFixed(18)} ETH</p>
            </div>
            {toastB && (
              <div className="toast">
                {toastB}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <h3>Vende</h3>
            <form action={sellHandler}>
              <input type="number" name="amountS" min={1} max={limit} placeholder="1" value={amountSValue} onChange={stimateCostS}/>
              <input type="submit" value="[ vender ]" />
            </form>
            <div className="trade__cost">
              <p>{Number(ethers.formatUnits(totalCostS, 18)).toFixed(18)} ETH</p>
            </div>
            {toastS && (
              <div className="toast">
                {toastS}
              </div>
            )}
          </div>
          <div>
            <ProgressBar currentSales={token.sold} currentTarget={limit} />
          </div>
        </div>
      )}
      <PriceHistoryChart prices={priceHistory} />
    </div >
  );
}

export default TradePage;