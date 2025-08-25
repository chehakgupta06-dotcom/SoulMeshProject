// import Image from "next/image";
import Link from "next/link";
import { FC, useContext } from "react";
import { MouseContext } from "src/context/mouse-context";
import s from "./DontMint.module.scss";

interface Props {
  audioRef?: any;
}

const DontMint: FC<Props> = ({ audioRef }) => {
  const { cursorChangeHandler } = useContext(MouseContext);

  return (
    <div className={s.container}>
      <div className="container">
        <div className={s.content}>
          <span className={s.title} data-aos="fade-up">
            Create your Own,
            <br />Digital Identity.
          </span>
          
          <div>
            <Link href="http://localhost:3001/">
              <a
                data-aos="fade-up"
                className={`p-btn p-btn-bordered ${s.action}`}
                onMouseEnter={() => cursorChangeHandler("hovered")}
                onMouseLeave={() => cursorChangeHandler("")}
              >
                Go to DashBoard
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DontMint;
