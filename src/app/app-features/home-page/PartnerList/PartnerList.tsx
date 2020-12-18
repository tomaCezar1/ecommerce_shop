import "slick-carousel/slick/slick-theme.css";
import RightArrow from "../../../../../public/svg/RightPartnerIcon.svg";
import LeftArrow from "../../../../../public/svg/LeftPartnerIcon.svg";
import { useState } from "react";

function PartnerList(): JSX.Element {
  const paths = [
    "https://source.unsplash.com/RyRpq9SUwAU/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
    "https://source.unsplash.com/yXpA_eCbtzI/1600x900",
    "https://source.unsplash.com/RyRpq9SUwAU/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
    "https://source.unsplash.com/BeOW_PJjA0w/1600x900",
  ];

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? null : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (paths.length - 5) ? null : setX(x - 100);
  };

  console.log(x);

  return (
    <div className="slider-container">
      <i id="goLeft" onClick={goLeft}>
        <LeftArrow />
      </i>
      <div className="slider">
        {paths.map((item, index) => {
          return (
            <div
              key={index}
              className="slide"
              style={{ transform: `translateX(${x}%)` }}
            >
              <img src={item} alt="" className="partner-img" />
            </div>
          );
        })}
      </div>
      <i id="goRight" onClick={goRight}>
        <RightArrow />
      </i>
    </div>
  );
}

export default PartnerList;
