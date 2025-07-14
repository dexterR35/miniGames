<style>
  header {
    height: 4em;
    z-index: 10;
    width: 100%;
    position: absolute !important;
  }

  body {
    overflow: auto !important;
  }


  .__nav_d ul li:nth-child(3),
  .__nav_m ul li:nth-child(3) {
    background: var(--__casino) !important;
    border-radius: 100px !important;
    border: 3px solid #00C0FA !important;
  }

  .__nav_m ul li:nth-child(1),
  .__nav_d ul li:nth-child(1),
  .__nav_m ul li:nth-child(2),
  .__nav_d ul li:nth-child(2) {
    background: transparent !important;
    border: 3px solid #00C0FA !important;
    border-radius: 100px !important;
    padding: 10px 32px;
  }

  .__nav_d ul li {
    padding: 10px 32px !important;
    cursor: pointer;
  }

  body {
    overflow: hidden;
  }

  /* body::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
background: url({$asset}/png/bg-smoke2.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 6;
  mix-blend-mode: screen;
  animation: smoke 20s infinite alternate;
  }

  */ body::after {
    background-image: unset !important;
  }

  /* @media screen and (max-width: 991px) {
  body::after {
background: url({$asset}/png/bg-smoke2.webp);
  }
  }

  */ .cta-button {
    width: fit-content;
    height: 2.7em !important;
    padding: 0.4em 1.7em;
    margin: 0 auto !important;
    position: relative;
    overflow: hidden;
    font-size: 3.2vh !important;
  }

  .wrapper-full {
    height: 100dvh;
  }

  .wrapp-hero {
    display: block;
  }


  .wrapp-hero>a {
    display: block;
  }

  .wrapp-hero a:nth-child(1) {
    width: 100%;
    height: 100%;
  }

  .container-hero {
    max-width: 100% !important;
    height: 100%;
    margin: 0 auto;
  }

  .items {
    position: absolute;
    left: 88%;
    top: 82%;
    transform: translate(-50%, -50%);
    height: auto;
    width: auto;
    z-index: 24;
  }

  .items .store_buttons {
    flex-direction: column !important;
    gap: 7px;
  }

  .line-1,
  .line-2,
  .line-3,
  .line-4 {

    font-family: 'montBlack';
  }

  .line-1,
  .line-3,
  .line-7 {
    color: var(--color_blue);
    font-family: "montExtraBold";
  }

  .line-3,
  .line-1 {
    text-shadow: 1px 1px 4px black;
  }

  .line-2,

  .line-4 {
    color: var(--color_white);
    text-shadow: var(--textShadowFull);

  }

  .line-2>div span:nth-child(1) {
    font-size: 1.09em;

  }

  .line-4>div {
    flex-direction: column;
    line-height: 0.9;
  }

  .line-4,
  .line-4>div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line {
    height: 0.15em;
    background: var(--color_blue);
    width: 100%;
    margin: -0.1em 0 0.2em;

  }

  .line-0 {
    font-size: 1.25em;
    margin-bottom: 0.2em;
    margin-right: 0.5em;
    color: var(--color_blue);
  }

  .line-1 {
    font-size: 1.2em;
  }

  .line-2 {
    color: white;
    text-shadow: var(--textShadowFull);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    gap: 10px;

  }

  .line-2>div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.5em;
  }

  .line-3 {
    font-size: 1em;
    /* color: blue; */
  }

  .line-3 {
    font-size: 1em;

  }




  .container-full {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    text-align: center;
    position: relative;
    /* transform: translateY(3%);
    -webkit-transform: translateY(3%); */
  }

  .container-full::after,
  .container-full::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
  }

  /* .container-full::after {
background: url({$asset}/png/gradient2.webp);
  z-index: 5;
  }

  */
  /* @media (max-width: 991px) {
    .center-img::after {
      content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
background: url({$asset}/png/bg-smoke-mobile2.webp);
  z-index: 5;
  }
  }

  */
  /* .container-full::before {
background: url({$asset}/png/bg-smoke2.webp);
  z-index: 5;
  }

  */ .center-img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    z-index: 2;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: end;

  }

  .center-img>img {
    width: 100%;
    height: 84%;
    object-fit: contain;
    position: relative;
  }

  .c-roata {
    position: absolute;
    top: 64.4%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50.05%, -50%);
    z-index: -1;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .c-roata img {
    max-width: 24%;
    width: 24%;
    height: 100%;
    object-fit: contain;
  }

  .roata {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .roata img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  canvas {
    z-index: 0 !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }


  .offer {
    font-size: 3em;
    display: block;
    text-align: center;
  }

  .offer-content {
    position: absolute;
    top: 12%;
    transform: unset !important;
    z-index: 12;
    font-size: clamp(2.1rem, 2.3vw, 3rem) !important;
    line-height: 0.95;
  }

  .c-bonusCode {
    position: absolute;
    top: calc(29vh + 3.4vw);
    left: 59.4%;
    z-index: 10;
    background: hsla(211, 72%, 14%, 1);
    background: linear-gradient(30deg, hsla(211, 72%, 14%, 1) 0%, hsla(210, 73%, 42%, 1) 100%);
    background: -moz-linear-gradient(30deg, hsla(211, 72%, 14%, 1) 0%, hsla(210, 73%, 42%, 1) 100%);
    background: -webkit-linear-gradient(30deg, hsla(211, 72%, 14%, 1) 0%, hsla(210, 73%, 42%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr="#0A233D", endColorstr="#1D6BB8", GradientType=1);
    transform: translate(-50%, -50%);
    border: 3px solid white;
    border-style: dashed;
    border-radius: 14px;
    padding: 0.6em 1.3em;
    line-height: 1.2;
    transform: scale(1) rotate(13deg);
    font-size: 1.5vh;
  }

  .c-bonusCode>div {
    font-size: 1.2em;
    margin: 0;
    width: 100%;
    color: white;
  }

  .c-bonusCode div:nth-child(1) {
    font-family: 'montBold';
    /* font-size: 0.9rem; */
  }

  .c-bonusCode div:nth-child(2) {
    font-family: 'montBlack';
    font-size: 2.3em;
  }

  .absolute-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }


  .absolute-img img {
    width: 10%;
    height: auto;
    object-fit: contain;
    position: absolute;
  }


  .absolute-img img:nth-child(1) {
    top: 46%;
    left: 84%;
    transform: rotate(-35deg);
    animation: floating 30s ease infinite;
    animation-delay: 1s;
  }

  .absolute-img img:nth-child(2) {
    transform: rotate(35deg);
    top: 30%;
    width: 5%;
    left: 33%;
    opacity: 0.8;
    animation-delay: 2s;
    animation: floatingSecond 25s ease-in infinite reverse;
  }

  .absolute-img img:nth-child(3) {
    left: 9%;
    top: 44%;
    width: 7%;
    opacity: 0.8;
    transform: rotate(-27deg);
    animation: floatingThird 25s ease-in infinite reverse;
  }


  ._btn-container {
    width: 100%;
    position: absolute;
    z-index: 20;
    bottom: 12%;
  }


  .cta-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-200%, -50%) rotate(-60deg);
    width: 70%;
    height: 70%;
    background-color: rgba(255, 255, 255, 0.955);
    z-index: 5;
    pointer-events: none;
    animation: slide-before 2.2s ease infinite;
  }



  @keyframes smoke {
    from {
      transform: scale(1) translateY(0px);
    }

    to {
      transform: scale(1.05) translateY(50px);
    }
  }


  /* 
  @keyframes floating {
    0% {
      transform: translate(0%, 0%) rotate(-35deg);
    }

    50% {
      transform: translate(-10%, -20%) rotate(10deg);
    }

    100% {
      transform: translate(0%, 0%) rotate(-35deg);
    }
  } */

  /* @keyframes floatingSecond {
    0% {
      transform: translate(0%, 0%) rotate(35deg);
    }

    50% {
      transform: translate(-10%, -20%) rotate(-10deg);
    }

    100% {
      transform: translate(0%, 0%) rotate(35deg);
    } */
  }

  /* 
  @keyframes floatingThird {
    from {
      transform: translate(0, 0px);
    }

    60% {
      transform: translate(0, 32px);
    }

    to {
      transform: translate(0, -0px);
    }
  } */


  @keyframes slide-before {
    0% {
      transform: translateX(-170%) rotate(-60deg);
    }

    100% {
      transform: translateX(80%) rotate(-60deg);
    }
  }


  @media (orientation:portrait) and (max-width:991px) {
    .container-full {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 27vh 30% 0.6fr 1fr;
      /* background: rgba(255, 0, 0, 0.493); */
    }

    .offer-content {
      position: relative;
      top: 7%;
    }

    .c-roata {
      height: auto;
    }

    .center-img {
      width: 100%;
      height: 100%;
      align-items: start;
      /* background: aqua; */
    }

    .c-roata {
      position: absolute;
      top: calc(53% + 10px);
      left: 50%;
      width: 100%;
      height: 100%;
      /* background: blanchedalmond; */
      transform: translate(-50%, -50%);
    }

    #headerId {

      position: relative !important;

    }

    .wrapper-full {
      height: 100% !important;
    }

    .center-img>img {
      width: 120%;
      height: 100%;
    }

    .items {
      position: relative;
      left: 0;
      top: 0;
      transform: unset;
    }

    .items .store_buttons {
      flex-direction: row !important;
    }

    ._btn-container {
      bottom: 0;
      position: relative;
    }

    .c-bonusCode {
      font-size: 1.1vh;
      top: calc(25vh + 0.4vw);
      left: 46.5%;

    }

    .c-roata img {
      max-width: 32%;
      width: 32%;
    }

    .cta-button {
      margin: 0 auto !important;
      font-size: 2.6vh !important;
    }

    /* .girlsDesktop {
      display: none !important;
    } */
    .girlsDesktop::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url({$asset}/png/bg-smoke-mobile2.webp);
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
    }

    .center-img::after {
      /* content: ""; */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background: url({$asset}/png/fog.webp);
    }

    .fog {
      position: absolute !important;
      object-fit: cover !important;
      top: calc(50% + 10vh);
      mask: linear-gradient(to top, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 89%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0) 0) 100% 0% / 100% 100% repeat-x;
    }

  }

  @media (orientation:landscape) and (min-width:992px) {
    .parent-pilot {
      display: none !important;
    }

    .fog {
      display: none !important;
    }

    /* .girlsMobile {
      display: none !important;
    } */
  }
</style>