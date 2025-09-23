'use client'
import { ethers } from "ethers"
import { useState } from "react"
import {useTranslations} from 'next-intl';


function List({ toggleCreate, fee, provider, factory }) {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [toastC, setToastC] = useState(null);

  const t = useTranslations('createComponent');


  const uploadFile = async () => {
    try {
      if (!file) {
        alert("Elige una imagen primero");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Problema al cargar la imagen, intenta de nuevo");
    }
  };

  const handleChange = (e) => {
    setFile(e.target?.files?.[0]);
  };

  async function listHandler(form) {

    const name = form.get("name")
    const symbol = form.get("symbol")
    const image = url
    const creatorMessage = form.get("creatorMessage")
    const rSocial1 = form.get("rSocial1")
    const rSocial2 = form.get("rSocial2")

    if (name && symbol && image && creatorMessage) {
      const signer = await provider.getSigner()
      const transaction = await factory.connect(signer).create(name, symbol, { value: fee })
      setToastC("Creando meme moneda...");
      setTimeout(() => setToastC(null), 3000);
      await transaction.wait()
      const totalTokens = await factory.totalTokens()
      const tokenID = Number(totalTokens) - 1

      const tokenData = {
        id: tokenID,
        imageURL: image,
        creatorMessage: creatorMessage,
        socialMediaLinks: {
          rSocial1: rSocial1,
          rSocial2: rSocial2,
        },
        comments: [],
        trades: [],
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await fetch('/api/coins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tokenData)
        });

        if (!response.ok) {
          throw new Error('Failed to save coin data to the database');
        }
      } catch (error) {
        console.error('Error saving coin data:', error);
      }

      toggleCreate()
    }
  }

  return (
    <div className="list">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h2>{t('create2')}</h2>

      <div className="list_description">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>{t('comission')}: {ethers.formatUnits(fee, 18)} ETH</p>
      </div>

      <form action={listHandler}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <input type="text" name="name" placeholder={t('name')} />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <input type="text" name="symbol" placeholder={t('symbol')} />
        <input type="file" onChange={handleChange} />
        <button type="button" disabled={uploading} onClick={uploadFile}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {uploading ? t('loadingImg') : url ? t('imgLoaded') : t('loadImg')}
        </button>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <input type="text" name="creatorMessage" placeholder={t('message')} />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <input type="text" name="rSocial1" placeholder={t('social1')} />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <input type="text" name="rSocial2" placeholder={t('social2')} />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <input type="submit" value={t('create3')} />
      </form>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <button onClick={toggleCreate} className="btn--fancy">{t('cancel')}</button>
      {toastC && (
        <div className="toast">
          {toastC}
        </div>
      )}
    </div>
  );
}

export default List;