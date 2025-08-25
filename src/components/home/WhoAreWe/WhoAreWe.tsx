import Image from "next/image";
import { FC } from "react";
import s from "./WhoAreWe.module.scss";

const WhoAreWe: FC = () => {
  return (
    <div className={`${s.container} who-we-are-main`} data-aos="who-we-are">
      <div className={s.team}>
        <div
          className={s.thumnailWrapper}
          data-aos="fade-in"
          data-aos-delay="0"
          data-aos-anchor=".who-we-are-main"
        >
          <Image
            src="/images/layout/team01.jpg"
            width={1300}
            height={770}
            objectFit="cover"
            alt=""
          />
        </div>
        <div className={`${s.titleWrapper} titleWrapper`}>
          {Array(4)
            .fill("WHO ARE WE")
            .map((item, i) => (
              <span className={`${s.title} title blockRevealer`} key={i}>
                {item}
              </span>
            ))}
        </div>
      </div>
      <div className="container">
        <div className={`${s.intro} who-are-we-intro`}>
          <span data-aos="fade-up" data-aos-anchor=".who-are-we-intro">
            {`We are everywhere.`}
          </span>
          <span
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-anchor=".who-are-we-intro"
          >
            We want to build a new world, with you in the middle.
            <br />Secure,transparent,credible.
          </span>
          <span
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-anchor=".who-are-we-intro"
          >
            {`Your digital footprint, your credit power`}
          </span>
        </div>
        <div className={s.details}>
          <div className="row">
            <div className="col-md-6">
              <p data-aos="fade-up">
              Digisoul leverages blockchain technology to create a transparent and secure credit scoring system based on your digital data. By analyzing your online activities and financial behavior, we provide a trustworthy credit score that reflects your true creditworthiness. Our decentralized approach ensures data privacy and accuracy, empowering you to take control of your financial future. With Digisoul, your digital footprint becomes a valuable asset, opening doors to new financial opportunities. Experience the future of credit with a system built on trust, transparency, and innovation.
              </p>
            </div>
            <div className="col-md-6" data-aos="fade-up">
              <span className={s.quote}>
                “Data Integrity, Credit Clarity”
              </span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
