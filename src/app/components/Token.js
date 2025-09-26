"use client"

import { ethers } from "ethers";
import Image from 'next/image';
import config from '../config.json';
import {useTranslations} from 'next-intl';

function Token({ token, account, chainId }) {
  const t = useTranslations('tokenDetails');

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
        <Image src={token.image} alt="token image" width={400} />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>{t('created') + token.creator.slice(0, 6) + '...' + token.creator.slice(38, 42)}</p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>{t('cap') + ethers.formatUnits(token.raised, 18)} ETH</p>
        {token.name}
      </div>
    </button>   
  );
}

export default Token;