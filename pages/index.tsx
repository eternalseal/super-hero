import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import 'animate.css';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Image from 'next/image'
import superHeroes from '../public/images/all-heroes.png'
import spiderMan from '../public/images/spider-man.png'


const Landing = (props: AppProps) => {
  useEffect(() => { }, []);
  const router = useRouter()

  return (
    <div className="enter-bg">
      <div className="hero-container">
        <div className="landing-hero-bg">
          <div className="landing-wrapper">
            <div className="hanging-spider-man">
              <Image layout='responsive' src={spiderMan}  alt="Spiderman" className='haning-spider animate__animated animate__bounceInDown' />
            </div>

            <div className="landing-items flex">
              <div className="landing-item text-right">
              <Image layout="responsive" src={superHeroes}  alt="Super heroes" className='hero-img' />
              </div>
              <div className="landing-item flex flex-center">
                <div className="landing-content">
                  <div className="landing-content-text text-center">
                    <h1 tabIndex={0} area-aria-level="Create Your own Team of Superheroes" className="primary white size-40 bold">
                      Create Your own Team of Superheroes
                    </h1>
                  </div>
                  <div className="landing-content-action mt-20 text-center">
                    <Button tabIndex={0} onClick={() => router.push('/search')} className='primary-button' size='large' type="primary">Enter</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;