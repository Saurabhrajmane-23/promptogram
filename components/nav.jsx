'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useState, useEffect} from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const nav = () => {
  const {data: session} = useSession();
  const [ providers, setProviders ] = useState(null);
  useEffect(() => {
      const setUpProviders = async () => {
        const resoponse = await getProviders();
        setProviders(resoponse);
      }
    setUpProviders();
  }, [])

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
         <Image 
           src = "/assets/images/logo6.png"
           width={30}
           height={30}
           className='object-contain'
           alt='logo'
         />
         <p className='logo_text'>GossipOn</p>
      </Link>
      {/* desktop navigation */}
      <div className='sm:flex hidden'>
        {session?.user ?(
          <div className='flex gap-3 md:gap-5'>
            <Link href={'/create-prompt'} className='black_btn'>
              Create post
            </Link>
            <button className='outline_btn' type='button' onClick={signOut}>
              Sign Out
            </button>
            <Link href={'/profile'}>
              <Image 
                src={session?.user.image}
                alt='Profile'
                height={37}
                width={37}
                className='rounded-full'
              />
            </Link>
          </div>
         ):(
          <>
            {/* if user is not loggedin then we use sign in btn*/}
            {providers &&
              Object.values(providers).map((providers) => (
                <button type='button' 
                  key={'provider.name'}
                  onClick={() => signIn(providers.id)}
                  className='balck_btn'
                >
                  Sign In
                </button>
              ))
            }
            
          </>
         )
        }
      </div>
      
      {/* mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ?(
          <div className='flex'>
            <Image 
                src={session?.user.image}
                alt='Profile'
                height={37}
                width={37}
                className='rounded-full'
                onClick={()=>setToggleDropdown((prev)=>!prev)}
              />
            {toggleDropdown?(
              <div className='dropdown'>
                <Link href={'/profile'}
                className='dropsown_link'
                onClick={() => toggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href={'/create-prompt'}
                className='dropsown_link'
                onClick={() => toggleDropdown(false)}>
                  Create Post
                </Link>
                <button type='button'
                onClick={()=>{
                  setToggleDropdown(false);
                  signOut();
                }}
                className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            ):(
              <></>
            )}
          </div>
        ): (
          <>
            {/* if user is not loggedin then we use sign in btn*/}
            {providers &&
              Object.values(providers).map((providers) => (
                <button type='button' 
                  key={'provider.name'}
                  onClick={() => signIn(provider.id)}
                  className='balck_btn'
                >
                  Sign In
                </button>
              ))
            }
            
          </>
        )}

      </div>
      
    </nav>
  )
}

export default nav
