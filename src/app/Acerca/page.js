"use client"

import React from 'react';
const AcercaPage = () => {

  return (
    <div className="page">
      <main>
        <div className="listings">
          <h1>Acerca de</h1>
            <div className="max-w-3xl mx-auto p-4 text-gray-800">
                <h2 className="text-2xl font-bold mb-4">🚀 ¿Qué es meme dorado?</h2>
                <p className="token__details">
                    meme dorado es una aplicación que te permite participar en el emocionante mundo de las criptomonedas y meme monedas de manera sencilla y segura. Imagina que es como una tienda donde puedes crear, comprar y vender tokens, pero con un toque especial: ¡todo está automatizado y respaldado por contratos inteligentes!
                </p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Zu0CN4iNOH4?si=vLUA4ERC59MQEsdo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                <h2 className="text-2xl font-bold mb-4">🔐 Seguridad con Smart Contracts</h2>
                <p className="token__details">
                    En meme dorado, la seguridad es primordial. Utilizamos <strong>contratos inteligentes</strong> que son como programas informáticos que se ejecutan en la cadena de bloques. Estos contratos están diseñados para ser transparentes, seguros e inmutables, asegurando que todas las transacciones se realicen según las reglas establecidas, sin necesidad de intermediarios.
                </p>
                <ul className="token__details">
                  <li><strong>Puedes verificar el contrato inteligente en:</strong>  <a href="https://basescan.org/address/0xc9A2ECa2943F5c5182a8fcc9B25E918B3abAc8Fc#code" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Contrato en Basescan</a></li>
                </ul>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/KOipfCT1K84?si=p5eNeK2KWkPM-yBN" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <h2 className="text-2xl font-bold mb-4">💰 Proceso de Fondeo y Lanzamiento en Uniswap</h2>
                <ul className="token__details">
                    <li><strong>Fondeo Inicial:</strong> Para comenzar, puedes crear tu propia meme moneda, tras lo cual el creador podra comprar temprano tokens de su creacion. Tambien puedes adquirir tokens existentes. Esto se hace enviando ETH al contrato inteligente, que te devolverá la cantidad correspondiente de tokens.</li>
                    <li><strong>Lanzamiento en Uniswap:</strong> Una vez que hay suficiente ETH en el fondeo y las reservas de la meme moneda han sido vendidas, se crea un <a href="https://app.uniswap.org/explore/unichain" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">pool de liquidez en Uniswap</a>, en la L2, Base, red encima de Ethereum que permite bajo costo de transacciones y toda la seguridad de Ethereum. La creacion del pool permite que cualquier persona pueda comprar o vender tokens de meme dorado directamente en Uniswap, facilitando el acceso a un publico mayor e internacional y aumentando la liquidez del token. Una vez creado el pool, el creador de la meme moneda recibira automaticamente 0.2 ETH como recompensa.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">📈 Bonding Curve: ¿Cómo Funciona?</h2>
                <p className="token__details">
                    La <strong>bonding curve</strong> es una fórmula matemática que determina el precio del token en función de su oferta y demanda. A medida que más personas compran la meme moneda, el precio aumenta; si venden, el precio disminuye. Esto crea un mercado dinámico y justo para todos los participantes. Los creadores de meme monedas puedan comprar su propio token temprano garantizando los precios mas bajos.
                </p>

                <h2 className="text-2xl font-bold mb-4">🎉 Ejemplo Práctico</h2>
                <p className="token__details">
                    Imagina que eres uno de los primeros en comprar tokens en meme dorado. Al principio, el precio es bajo, así que obtienes más tokens por tu ETH. A medida que más personas se unen y compran monedas, el precio sube gracias a la bonding curve. Si decides vender tus tokens más adelante, podrías obtener una ganancia debido al aumento de precio. Al momento que se cumple la meta en meme dorado y se creal el pool en Base el precio de la meme moneda puede incrementar aun mas debido a su exposicion a mas compradores.
                </p>

                <h2 className="text-2xl font-bold mb-4">✅ Conclusión</h2>
                <p className="token__details">
                    meme dorado combina seguridad, accesibilidad y una economía dinámica para ofrecerte una experiencia única en el mundo de las criptomonedas. Con contratos inteligentes, integración con Uniswap y una bonding curve bien diseñada, es una plataforma pensada para usuarios como tú que buscan participar en el ecosistema cripto de manera sencilla y segura.
                </p>

                <h2 className="text-2xl font-bold mb-4">📝 Instrucciones basicas</h2>
                <ul className="token__details">
                    <li><strong>Financiar la billetera:</strong> En tu billetera cripto, por ejemplo Metamask, asegurate que estes conectado a la red de Ethereum principal o la red donde se encuentren tus fondos. Elige la 3ra opcion puente o bridge y elige la cantidad de ETH que enviaras, en la opcion de elegir red de destino selecciona Base y da click en enviar. Asegurate de cambiar Metamask a la red de Base antes de comenzar a utilizar meme dorado.</li>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/iqPlQGMy_Wc?si=70CIZlF6UfXCiWn3" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fzbuJBqv7uI?si=xHz85vvuUlIxsGDT" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <li><strong>Crea tu meme moneda:</strong> En la pagina principal conecta tu cartera cripto como Metamask dando click en [conectar] en la esquina superior derecha. En la parte central de la pagina principal da click en [crea una meme moneda]. Un formulario aparecera en la parte central donde deberas agregar el nombre de la meme moneda, su simbolo, una imagen o gif que represente al meme, un mensaje para la comunidad que inspire adquirir tu meme moneda y redes sociales donde pueda crearse una comunidad para tu token.</li>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/oBnWcQ-AwN4?si=3iYh7t1vmQ2cl92p" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <li><strong>Compra o vende meme monedas:</strong> Las meme monedas se listan en la pagina principal donde podras encontrar las que estan en tendencia y las mas nuevas. Tambien al final podras encontar un link a la lista maestra de meme monedas. Da click en el token y se abrira una pagina con detalles. Elige la cantidad de monedas que quieres adquirir o vender, del lado derecho podras observar un estimado de la transaccion. Da click en el boton de la accion [compra] o [vende] y sigue las instrucciones de la cripto billetera. Ten en cuenta que al vender la billetera te solicitara aprobar dos transacciones, aprobar la transferencia de meme monedas y realizar la transaccion.</li>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/JsYgDx3z3ao?si=Cf0ugBBl227xVQtW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <li>Para entrar en contacto escribe a cymarkettech@outlook.com o instagram.com/cymarkettech</li>
                </ul>
            </div>
        </div>
      </main>
    </div>
  );
}

export default AcercaPage;