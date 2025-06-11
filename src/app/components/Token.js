"use client"

import { ethers } from "ethers"
import Image from 'next/image';

function Token({ token, account }) {

  const openInNewTab = () => {
    const tokenFid = token.fId
    localStorage.setItem('tradeData', JSON.stringify({tokenFid}));
    window.open('/Trade', '_blank', 'noopener,noreferrer');
  };

  return (
      <div>
        {!account ? (
          <button className="token">
            <div className="token__details">
              <Image src={token.image} alt="token image" width={200} height={200} />
              <p>created by {token.creator.slice(0, 6) + '...' + token.creator.slice(38, 42)}</p>
              <p>Market Cap: {ethers.formatUnits(token.raised, 18)} ETH</p>
              {token.name}
            </div>
          </button>
        ):(
          <button onClick={openInNewTab} className="token">
            <div className="token__details">
              <Image src={token.image} alt="token image" width={200} height={200} />
              <p>created by {token.creator.slice(0, 6) + '...' + token.creator.slice(38, 42)}</p>
              <p>Market Cap: {ethers.formatUnits(token.raised, 18)} ETH</p>
              {token.name}
            </div>
          </button>
        )}
      </div>     
  );
}

export default Token;