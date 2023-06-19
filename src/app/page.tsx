import { fetchUser } from '@/../script/state/repository/auth';
import { Ticker, fetchTicker } from '@/../script/state/repository/ticker'
// import Level2 from '@/model/level/level2';
import { fetchSession, getJWTCookie } from '@/../script/state/repository/session';
import Level2 from '@/model/level/level2';
import ConnectPlayerForm from '@/model/overlay/ConnectPlayerForm';
import DisconnectPlayerForm from '@/model/overlay/DisconnectPlayerForm';
import { Suspense } from 'react';
import Image from 'next/image';
import DevelopmentRegister from '@/dom/atom/holders/DevelopmentRegister';
import DevelopmentProfile from '@/dom/atom/holders/DevelopmentProfile';
import Head from 'next/head';
import BottomStats from '@/dom/atom/holders/BottomStats';

export default async function Page() {  
  const foundJWT:any = await getJWTCookie()
  const foundUser = await fetchSession()
  // console.log("foundUser", foundUser)
  // const foundUser:any = !!foundJWT ? await fetchUser(foundJWT) : null
  const LOCAL_TICKER_SYMBOLS:any = ["BTCUSDT","ETHUSDT"]
  const tickers: Ticker[] = await Promise.all(
    LOCAL_TICKER_SYMBOLS.map((aTicker:any)=>(fetchTicker(aTicker)))
  );

  return (<>
    {/* <a href="/dashboard" rel="noopener noreferrer"
      className='pos-abs bottom-0 right-0 pt-0 Q_xs_px-3 mt-3 pa-8 z-800 block tx-black tx-lg tx-ls-3 opaci-chov--50 tx-bold-2 nodeco '
    >
      Dashboard
    </a> */}
    {/* <Head>
      <link rel="icon" href="./favicon2.ico" type="image/x-icon"  sizes="any" />
    </Head> */}

    <main className='flex-col px-3 pos-rel' style={{background: "linear-gradient(0deg, #000000, #333333)"}}>
      <div className='  h-min-90vh pos-rel w-100 '>      
        
        <div className='flex '>
          <a href="/" rel="noopener noreferrer" className='nodeco  w-min-80px z-800 pos-rel pt-3 flex-center ' >
            <h1 className='tx-center px-2  flex-col tx-bold-2 tx-white bg-black py-2 z-800 pos-rel bord-r-5 box-shadow-5-b '
              style={{transform:"translateX(5px)"}}
            >
              {/* <span className='tx-sm tx-bold-8 tx-ls-4 opaci-50' title='Gamified Trading App'>G T A</span> */}
              <span className='tx-md'><b>Byt</b>e</span>
              <span className='tx-sm'><b>C</b>ity</span>
            </h1>
            <div>
              <div className="box-shadow-2-b pa-1 block bord-r-r-10" style={{background:"#ffffff"}}>
                <Image src={"/bytecity.png"} alt="bytecity" width={24} height={24} />
              </div>
            </div>
          </a>
        </div>
        {/* qwesdf */}
        
          {!foundJWT && <>
            <div className='pos-abs top-0 right-0 pt-3'>
              {/* <div className='Q_sm py-1'></div> */}
              <div className='Q_xs py-3'></div>
              <ConnectPlayerForm />
            </div>
          </>}

      </div>
      {/* style={{filter: "saturate(1.3)"}} */}
      <div className='pos-abs top-0 w-100 h-100 '  >
        {/* <div className='pt-8 flex-col'><img src="/images/landing.jpg" alt="" /></div> */}
        <Suspense>
          <Level2 />
        </Suspense>
        {!foundJWT &&  <>
          <DevelopmentRegister />
        </>}
        {!!foundJWT && !!foundUser && <>
          <DevelopmentProfile {...{foundJWT, foundUser}} />
          <BottomStats />
        </>}
      </div>
    </main>
  </>)
}