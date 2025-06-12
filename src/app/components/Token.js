"use client"

import { ethers } from "ethers";
import Image from 'next/image';
import config from '../config.json';

function Token({ token, account, chainId }) {

  const openInNewTab = () => {
    let key = Number(Object.keys(config)[0]);
    if (account && chainId && chainId === key) {
      const tokenFid = token.fId
      localStorage.setItem('tradeData', JSON.stringify({tokenFid}));
      window.open('/Trade', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button onClick={openInNewTab} className="token">
      <div className="token__details">
        <Image src={token.image} alt="token image" width={200} height={200} />
        <p>created by {token.creator.slice(0, 6) + '...' + token.creator.slice(38, 42)}</p>
        <p>Market Cap: {ethers.formatUnits(token.raised, 18)} ETH</p>
        {token.name}
      </div>
    </button>   
  );
}

export default Token;