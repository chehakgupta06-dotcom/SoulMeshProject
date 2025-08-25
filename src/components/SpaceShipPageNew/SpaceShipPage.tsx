import SpaceShipOverlayPage from "@components/common/SpaceShipOverlayPage";
import Image from "next/image";
import { useRef, useState } from "react";
import s from "./SpaceShipPage.module.scss";
const SpaceShipPage = () => {
  const audioRef = useRef<any>(null);
  const audioControl = () => {
    if (!audioRef.current) {
      return;
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  return (
    <>
      {!isPageLoaded && (
        <SpaceShipOverlayPage
          onLoaded={() => setIsPageLoaded(true)}
          audioRef={audioRef}
          audioControl={() => {
            audioControl();
          }}
        />
      )}
      <div className={s.container}>
        <div className={`${s.leftWrap}`}>
          <div className={`${s.heroWraper}`}>
            <div className={`${s.hero}`}>
              <div className={`${s.heroVideo}`}>
                <video ref={audioRef} id="vid" loop playsInline>
                  <source
                    src="https://res.cloudinary.com/dduru0fz4/video/upload/v1669713424/spaceship/Rectangle_4_1_qxz7wa.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className={`${s.logoWrapper}`}>
                {/* <Image
                  src="/images/spaceship-logo.svg"
                  alt="spaceship-logo"
                  objectFit="contain"
                  width={175}
                  height={55}
                /> */}
              </div>
              {/* <div className={`${s.rocketImgHero}`}>
          <Image
            src="/images/rocket.png"
            alt="spaceship-logo"
            objectFit="contain"
            width={843}
            height={982}
          />
        </div> */}
              <div className={s.tagline}>
                Let your <br />
                Identity
                <br /> bring you
                {/* <br />  */}
                <br /> Opportunities
              </div>

              <div className={`${s.iconRow}`}>
                <div className={`${s.plusIcon}`}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9583 21.0417V39.7917H21.0417V21.0417H39.7917V18.9583H21.0417V0.208336H18.9583V18.9583H0.208344V21.0417H18.9583Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className={`${s.xIcon}`}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5268 15L0.268595 28.2583L1.74173 29.7314L15 16.4731L28.2582 29.7314L29.7314 28.2583L16.4731 15L29.7314 1.74175L28.2582 0.268613L15 13.5269L1.74173 0.268613L0.268595 1.74175L13.5268 15Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className={`${s.plusIcon}`}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9583 21.0417V39.7917H21.0417V21.0417H39.7917V18.9583H21.0417V0.208336H18.9583V18.9583H0.208344V21.0417H18.9583Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div className={`${s.xIcon}`}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5268 15L0.268595 28.2583L1.74173 29.7314L15 16.4731L28.2582 29.7314L29.7314 28.2583L16.4731 15L29.7314 1.74175L28.2582 0.268613L15 13.5269L1.74173 0.268613L0.268595 1.74175L13.5268 15Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className={`${s.plusIcon}`}>
                  {/* <Image
              src="/images/plus.svg"
              alt="spaceship-logo"
              objectFit="contain"
              width={40}
              height={40}
            /> */}
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9583 21.0417V39.7917H21.0417V21.0417H39.7917V18.9583H21.0417V0.208336H18.9583V18.9583H0.208344V21.0417H18.9583Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className={`${s.xIcon}`}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5268 15L0.268595 28.2583L1.74173 29.7314L15 16.4731L28.2582 29.7314L29.7314 28.2583L16.4731 15L29.7314 1.74175L28.2582 0.268613L15 13.5269L1.74173 0.268613L0.268595 1.74175L13.5268 15Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/* <Image
              src="/images/x.svg"
              alt="spaceship-logo"
              objectFit="contain"
              width={40}
              height={40}
            /> */}
                </div>

                {/* <Image
            src="/images/x-icons.svg"
            alt="spaceship-logo"
            objectFit="contain"
            width={470}
            height={50}
          /> */}
              </div>

              <div
                className={s.joinNowBtnLeft}
                onClick={() =>
                  (window.location.href = "https://lu.ma/aimayhem")
                }
              >
                <p>+ JOIN US</p>
              </div>
            </div>
            <div className={s.content}>
              <p className={s.desc}>
                <strong>DigiSoul</strong> is a cutting-edge platform that
                transforms financial behavior into credibility through{" "}
                <strong>Soulbound Tokens (SBTs)</strong>. Users securely share
                their financial data to receive an SBT that attests to their
                credibility, unlocking exclusive incentives from companies. Our{" "}
                <strong>affordable yearly subscription</strong> ensures
                accessibility, while businesses benefit from{" "}
                <strong>cost-efficient, data-driven marketing</strong> by paying
                per query to access credibility insights. This eliminates the
                inefficiencies of mass advertising, allowing companies to
                directly engage with their ideal audience. Additionally,{" "}
                <strong>20% of all company revenue</strong> is allocated to user
                rewards, fostering a sustainable and mutually beneficial
                ecosystem. DigiSoul is redefining how financial credibility
                drives real-world value.
              </p>

              <div className={`${s.list}`}>
                <ul>
                  <li>User Data Privacy & Security</li>
                  <li className={s.lightText}>X</li>
                  <li>Soulbound Token (SBT) Utility</li>
                  <li className={s.lightText}>X</li>
                  <li>Company Benefits & Cost Savings</li>
                  <li className={s.lightText}>X</li>
                  <li>Reward & Incentive System</li>
                  <li className={s.lightText}>X</li>
                  <li>Zero-Knowledge Proofs (zKPs)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`${s.rightWrap}`}>
          {/* <div className={`${s.smallRocketRight}`}>
            <Image
              src="/images/smallrocket.svg"
              alt="rocket-logo"
              width={300}
              height={230}
            />
          </div> */}
          <div className={`${s.rocketImg}`}>
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Options: 'contain', 'cover', 'fill', etc.
              }}
              autoPlay
              loop
              muted
            >
              <source
                src="https://videos.pexels.com/video-files/6266922/6266922-uhd_2160_3840_25fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div
            className={s.joinNowBtn}
            onClick={() => (window.location.href = "")}
          >
            <p>+ JOIN US</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceShipPage;
