import { Suspense } from 'react';


import { fetchSession, getJWTCookie } from '@/../script/state/repository/session';
import BottomStats from '@/dom/atom/common/BottomStats';
import DevelopmentRegister from '@/dom/organ/layout/DevelopmentRegister';
import DevelopmentProfile from '@/dom/organ/layout/DevelopmentProfile';
import ByteTown from '@/model/level/level1/ByteTown';
import SignInHeaderMenu from '@/dom/atom/overlay/SignInHeaderMenu';
import RootScene from '@/model/core/RootScene';

export default async function Page() {  
  const foundJWT:any = await getJWTCookie()
  const foundUser = await fetchSession()
  const eraName = "townEra"

  return (<>
    <main className='flex-col px-3 pos-rel' style={{background: "linear-gradient(0deg, #000000, #333333)"}}>
      <SignInHeaderMenu foundJWT={foundJWT} eraName={eraName} />
      
      <div className='pos-abs top-0 w-100 h-100 '  >
        <Suspense> <ByteTown eraName={eraName} /> </Suspense>
        {/* <RootScene /> */}
        {!foundJWT &&  <> <DevelopmentRegister /> </>}
        {!!foundJWT && !!foundUser &&
          <div className=''>
            <DevelopmentProfile {...{foundJWT, foundUser}} />
            <div className=' bottom-0'> <BottomStats /> </div>
          </div>
        }
      </div>
    </main>
  </>)
}