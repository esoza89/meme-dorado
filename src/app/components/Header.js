import { ethers } from "ethers"
import {useTranslations} from 'next-intl';


function Header({ account, setAccount }) {

  const t = useTranslations('home');

  const openAcerca = () => {
    window.open('/Acerca', '_blank', 'noopener,noreferrer');
  };

  async function connectHandler() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.getAddress(accounts[0])
      setAccount(account)
    }

    window.ethereum.on('accountsChanged', async (accounts) => {
      const account = ethers.getAddress(accounts[0])
      setAccount(account)
    })

  }

  return (
    <header>
      <p className="brand">meme dorado</p>
      <div className="create">
          <button onClick={openAcerca} className="btn--fancy">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {t('about')}
          </button>
        </div>

      { account ? (
        <button className="btn--fancy">[ {account.slice(0, 6) + '...' + account.slice(38, 42)} ]</button>
      ) : (
        /* eslint-disable-next-line react/no-unescaped-entities */
        <button onClick={connectHandler} className="btn--fancy">{t('connect')}</button>
      )}
      
    </header>
  );
}

export default Header;