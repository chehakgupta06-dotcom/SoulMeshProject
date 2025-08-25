import { SVGBrandLogo } from "@components/ui/SVGElements";
import Image from "next/image";
import { FC } from "react";
import s from "./HeroBanner.module.scss";

const HeroBanner: FC = () => {
  // useEffect(() => {
  // 	document.body.classList.add('page-loaded');
  // }, []);
  return (
    <div className={`${s.container}`}>
  <div className={s.items}>
    <div className={s.item}>
      <div className={`${s.textWrapper} ${s.heading1}`}>
      <div style={{ fontFamily: 'cursive', fontSize: '48px', fontStyle: 'italic', color: 'rgba(248, 248, 248, 0.84)', textAlign: 'center',  }}>
  
</div>
{/* <div style={{ fontFamily: 'cursive', fontSize: '48px', fontStyle: 'italic', color: 'rgba(248, 248, 248, 0.84)', textAlign: 'center' }}>
 
</div> */}

      </div>
    </div>
    
    {/* <SVGBrandLogo className={s.logo} /> */}
    <Image
        src="/images/layout/logo_white.png"
        width={480}
        height={150}
        objectFit="cover"
        alt=""
      />
    {/* <div className={s.paintDrop}>
      <Image
        src="/images/layout/paint-drop-1.png"
        width={220}
        height={240}
        objectFit="contain"
        alt=""
      />
      <div className={s.drop}>
        <Image
          src="/images/layout/paint-drop-2.png"
          width={200}
          height={230}
          objectFit="contain"
          alt=""
        />
      </div>
    </div> */}
  </div>
</div>
  );
};

export default HeroBanner;
