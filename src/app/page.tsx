import { Suspense } from 'react';
import Image from 'next/image';


import { fetchSession, getJWTCookie } from '@/../script/state/repository/session';
import BottomStats from '@/dom/atom/common/BottomStats';
import ConnectPlayerForm from '@/model/overlay/ConnectPlayerForm';
import DevelopmentRegister from '@/dom/organ/layout/DevelopmentRegister';
import DevelopmentProfile from '@/dom/organ/layout/DevelopmentProfile';
import Level2 from '@/model/level/level2';

export default async function Page() {  
  const foundJWT:any = await getJWTCookie()
  const foundUser = await fetchSession()

  return (<>
    <main className='flex-col px-3 pos-rel' style={{background: "linear-gradient(0deg, #000000, #333333)"}}>
      <div className='  h-min-90vh pos-rel w-100 '>      
        
        <div className='flex '>
          <a href="/" rel="noopener noreferrer" className='nodeco  w-min-80px z-800 pos-rel pt-3 flex-center ' >
            <h1 className='tx-center px-2  flex-col tx-bold-2 tx-white bg-black py-2 z-800 pos-rel bord-r-5 box-shadow-5-b '
              style={{transform:"translateX(5px)"}}
            >
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
        
          {!foundJWT && <>
            <div className='pos-abs top-0 right-0 pt-3'>
              <div className='Q_xs py-3'></div>
              <ConnectPlayerForm />
            </div>
          </>}

      </div>
      <div className='pos-abs top-0 w-100 h-100 '  >
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