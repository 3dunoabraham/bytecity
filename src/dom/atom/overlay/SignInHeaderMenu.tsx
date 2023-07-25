import Image from 'next/image';
import ConnectPlayerForm from "@/model/overlay/ConnectPlayerForm"

export function SignInHeaderMenu({foundJWT, eraName}:any) {
  return (
    <div className='  h-min-100vh pos-rel w-100 '>      
        <div className='flex '>
          {!foundJWT &&  <> <div className='py-2'></div> </>}
          <a href="/" rel="noopener noreferrer" className='nodeco  w-min-80px z-800 pos-rel  flex-center ' >
            <div className='pt-3'>
              <div className="box-shadow-2-b pa-1 block bord-r-10" style={{background:"#ffffff"}}>
                <Image src={"/webcity.png"} alt="webcity" width={32} height={32} />
              </div>
            </div>
          </a>
        </div>
        {!foundJWT && <>
          <div className='pos-abs top-0 right-0 '>
            <div className='Q_xs py-5'></div>
            <ConnectPlayerForm eraName={eraName} />
          </div>
        </>}

      </div>
  )
}

export default SignInHeaderMenu