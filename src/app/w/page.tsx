import { Suspense } from 'react';
import Image from 'next/image';


import { fetchSession, getJWTCookie } from '@/../script/state/repository/session';
import BottomStats from '@/dom/atom/common/BottomStats';
import DevelopmentRegister from '@/dom/organ/layout/DevelopmentRegister';
import DevelopmentProfile from '@/dom/organ/layout/DevelopmentProfile';
import WebTown from '@/model/level/level1/WebTown';
import SignInHeaderMenu from '@/dom/atom/overlay/SignInHeaderMenu';
import RootScene from '@/model/core/RootScene';

export default async function Page() {  
  const foundJWT:any = await getJWTCookie()
  const foundUser = await fetchSession()
  const eraName = "townEra"

  return (<>
    <main className='flex-col px-3 pos-rel' style={{background: "linear-gradient(0deg, #000000, #333333)"}}>
      {/* <SignInHeaderMenu foundJWT={foundJWT} eraName={eraName} /> */}
    <div className='  h-min-100vh pos-rel w-100 '>      
       
    <div className='flex-col flex-align-start gap-3 pt-2'>
          {/* {!foundJWT &&  <> <div className='py-2'></div> </>} */}
          
          {/* <a href="https://webpov.vercel.app" rel="noopener noreferrer" className='nodeco   z-800 pos-rel  flex-center '
            title='WebPOV'
          >
            <div className='pt-'>
              <div className="box-shadow-2-b pa-1 pb-0 block bord-r-10" style={{background:"#ffffff"}}>
                <Image src={"/webpov2.jpg"} alt="WebPOV" width={32} height={32} />
              </div>
            </div>
          </a> */}
          
          <a href="/" rel="noopener noreferrer" className='nodeco   z-800 pos-rel  flex-center ' title="Web City">
            <div className='pt-'>
              <div className="box-shadow-2-b pa-1 block bord-r-10" style={{background:"#ffffff"}}>
                <Image src={"/webtown.png"} alt="webtown" width={32} height={32} />
              </div>
            </div>
          </a>
{/*           
          <a href="/" rel="noopener noreferrer" className='nodeco   z-800 pos-rel  flex-center ' title="Web Town">
            <div className='pt-'>
              <div className="box-shadow-2-b pa-1 block bord-r-10" style={{background:"#ffffff"}}>
                <Image src={"/webcity.png"} alt="webcity" width={32} height={32} />
              </div>
            </div>
          </a> */}

        </div>
    </div>
      
      <div className='pos-abs top-0 w-100 h-100 '  >
        <Suspense> <WebTown eraName={eraName} /> </Suspense>
        {/* <RootScene /> */}
        {/* {!foundJWT &&  <> <DevelopmentRegister /> </>}
        {!!foundJWT && !!foundUser &&
          <div className=''>
            <DevelopmentProfile {...{foundJWT, foundUser}} />
            <div className=' bottom-0'> <BottomStats /> </div>
          </div>
        } */}
      </div>
    </main>
  </>)
}