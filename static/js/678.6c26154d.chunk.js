"use strict";(self.webpackChunkreact_portfolio_website_1=self.webpackChunkreact_portfolio_website_1||[]).push([[678],{7855:(e,r,t)=>{t.d(r,{ID:()=>l,vO:()=>d});var a=t(2791),o=t(2279);const n=["home","home","about","about","experience","services","portfolio","portfolio","portfolio","testimonials","contact","contact"];var i=t(184);const s=(0,a.createContext)(null);function l(e){let{children:r,viewMode:t="3d"}=e;const l=function(){let{enabled:e=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const[r,t]=(0,a.useState)(null),[i,s]=(0,a.useState)(!0),[l,d]=(0,a.useState)(null),c=(0,a.useCallback)((e=>{const r=Math.max(0,Math.min(o.Q1-1,e));t(r),d(r),s(!1)}),[]),m=(0,a.useCallback)((()=>{t(null),s(!0)}),[]);(0,a.useEffect)((()=>{e&&m()}),[e]),(0,a.useEffect)((()=>{if(e)return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r);function r(e){"Escape"===e.key&&(e.preventDefault(),m())}}),[m,e]),(0,a.useEffect)((()=>{if(!e)return;let r=0;function a(e){e.preventDefault();const a=Date.now();a-r<500||(r=a,t((r=>{if(null===r)return r;const t=e.deltaY>0?Math.min(o.Q1-1,r+1):Math.max(0,r-1);return d(t),s(!1),t})))}return window.addEventListener("wheel",a,{passive:!1}),()=>window.removeEventListener("wheel",a)}),[e]),(0,a.useEffect)((()=>{if(!e)return;let r=0,a=0;const n=e=>{r=e.touches[0].clientX,a=e.touches[0].clientY},i=e=>{const n=e.changedTouches[0].clientX-r,i=e.changedTouches[0].clientY-a;Math.abs(n)<50||Math.abs(n)<Math.abs(i)||t((e=>{if(null===e)return e;const r=n<0?Math.min(o.Q1-1,e+1):Math.max(0,e-1);return d(r),s(!1),r}))};return window.addEventListener("touchstart",n,{passive:!0}),window.addEventListener("touchend",i,{passive:!0}),()=>{window.removeEventListener("touchstart",n),window.removeEventListener("touchend",i)}}),[e]),(0,a.useEffect)((()=>{if(e)return;const r=[["home",0],["about",2],["strengths",3],["experience",4],["services",5],["portfolio",6],["testimonials",9],["contact",10]],t=new IntersectionObserver((e=>{e.forEach((e=>{if(e.isIntersecting){const t=r.find((r=>{let[t]=r;return t===e.target.id}));t&&d(t[1])}}))}),{threshold:.25});return r.forEach((e=>{let[r]=e;const a=document.getElementById(r);a&&t.observe(a)})),()=>t.disconnect()}),[e]);const p=(0,a.useCallback)((r=>{if(e)c(r);else{var t,a;const e=null!==(t=n[r])&&void 0!==t?t:"home";null===(a=document.getElementById(e))||void 0===a||a.scrollIntoView({behavior:"smooth"})}}),[e,c]),A=null!==l?l/(o.Q1-1):0;return{activeSection:r,isOverview:i,currentSection:l,zoomToSection:c,zoomOut:m,scrollTo:p,totalSections:o.Q1,progress:A,enabled:e}}({enabled:"3d"===t});return(0,i.jsx)(s.Provider,{value:l,children:r})}function d(){const e=(0,a.useContext)(s);if(!e)throw new Error("useScroll must be used within a ScrollProvider");return e}},2678:(e,r,t)=>{t.r(r),t.d(r,{default:()=>gt});var a=t(2791),o=t(9677),n=t(7855),i=t(184);let s=!1;function l(e){let{variant:r="initial",playToken:t=0,minDurationMs:o=1500,fadeDurationMs:n=800,title:l="Explore the portfolio",showName:d=!0,blockPointerEvents:c=!0}=e;const[m,p]=(0,a.useState)((()=>"initial"===r&&!s)),[A,g]=(0,a.useState)(!1),[x,h]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{if("initial"!==r||!m)return;s=!0;const e=window.setTimeout((()=>{g(!0)}),o);return()=>{window.clearTimeout(e)}}),[o,r,m]),(0,a.useEffect)((()=>{if("initial"!==r||!m||!A)return;h(!0);const e=window.setTimeout((()=>{p(!1)}),n);return()=>{window.clearTimeout(e)}}),[n,A,m,r]),(0,a.useEffect)((()=>{if("transition"!==r||!t)return;p(!0),g(!1),h(!1);const e=window.setTimeout((()=>{g(!0),h(!0)}),o),a=window.setTimeout((()=>{p(!1)}),o+n);return()=>{window.clearTimeout(e),window.clearTimeout(a)}}),[n,o,t,r]),m?(0,i.jsxs)("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"radial-gradient(circle at top left, rgba(102, 212, 239, 0.14), transparent 24%), radial-gradient(circle at top right, rgba(183, 112, 69, 0.12), transparent 24%), linear-gradient(180deg, #f7f3ec 0%, #ebe4d8 100%)",opacity:x?0:1,transition:`opacity ${n}ms var(--ease-standard)`,pointerEvents:c&&!x?"auto":"none",fontFamily:"var(--font-body)"},children:[d?(0,i.jsx)("div",{style:{fontSize:"clamp(2.2rem, 6vw, 3.2rem)",fontWeight:700,letterSpacing:"-0.04em",color:"var(--text-primary)",lineHeight:1,marginBottom:"0.5rem",fontFamily:"var(--font-display)"},children:"Travis Stephenson"}):null,(0,i.jsx)("div",{style:{fontSize:"clamp(0.65rem, 1.8vw, 0.75rem)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"3rem"},children:l}),(0,i.jsx)("div",{style:{width:"clamp(140px, 28vw, 220px)",height:"3px",background:"rgba(18,25,34,0.08)",borderRadius:"99px",overflow:"hidden"},children:(0,i.jsx)("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--accent), var(--accent-secondary))",borderRadius:"99px",animation:`ts-bar ${Math.max(o-60,320)}ms cubic-bezier(0.4,0,0.6,1) forwards`}})}),(0,i.jsx)("style",{children:"\n        @keyframes ts-bar {\n          0% { width: 0%; }\n          60% { width: 72%; }\n          100% { width: 100%; }\n        }\n      "})]}):null}var d=t(2279);const c={position:"fixed",top:"50%",left:"50%",zIndex:10,width:"90vw",maxWidth:"900px",background:"linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(247,242,235,0.7) 100%)",backdropFilter:"blur(28px) saturate(170%)",WebkitBackdropFilter:"blur(28px) saturate(170%)",border:"1px solid rgba(255,255,255,0.82)",borderTop:"1px solid rgba(255,255,255,0.96)",borderRight:"1px solid rgba(18,25,34,0.05)",borderBottom:"1px solid rgba(18,25,34,0.08)",borderRadius:"var(--radius-lg)",overflow:"hidden",boxShadow:["0 24px 70px rgba(18,25,34,0.14)","0 16px 38px rgba(18,25,34,0.1)","0 6px 18px rgba(18,25,34,0.06)","inset 0 1px 0 rgba(255,255,255,0.94)","inset 0 -1px 0 rgba(255,255,255,0.24)"].join(", "),maxHeight:"84vh",display:"flex",flexDirection:"column",transition:"opacity var(--motion-slow) var(--ease-standard), transform var(--motion-slow) var(--ease-standard)"},m={position:"fixed",top:"50%",left:"50%",zIndex:10,width:"90vw",maxWidth:"1100px",display:"flex",alignItems:"center",justifyContent:"center",transition:"opacity var(--motion-slow) var(--ease-standard), transform var(--motion-slow) var(--ease-standard)"};function p(e){var r,t;let{sectionIndex:o,children:s,noPanel:l}=e;const p=(0,a.useRef)(),{activeSection:A,zoomOut:g}=(0,n.vO)(),x=A===o,h=null!==(r=d.X4[o])&&void 0!==r?r:"#888",b=null!==(t=d.g6[o])&&void 0!==t?t:"";(0,a.useLayoutEffect)((()=>{const e=p.current;e&&(x?(e.style.opacity="1",e.style.transform="translate(-50%, -50%) scale(1)",e.style.pointerEvents="auto"):(e.style.opacity="0",e.style.transform="translate(-50%, -50%) scale(0.93)",e.style.pointerEvents="none"))}),[x]);const f={...l?m:c,opacity:0,transform:"translate(-50%, -50%) scale(0.93)",pointerEvents:"none"};return l?(0,i.jsx)("div",{ref:p,style:f,children:s}):(0,i.jsxs)("div",{ref:p,style:f,children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0 1.25rem",borderBottom:"1px solid var(--border-subtle)",flexShrink:0},children:[(0,i.jsx)("span",{style:{display:"inline-block",width:"10px",height:"10px",borderRadius:"50%",background:h,flexShrink:0}}),(0,i.jsx)("h2",{style:{margin:0,padding:"0.9rem 0",fontSize:"clamp(0.9rem, 2vw, 1.1rem)",fontWeight:700,color:"var(--text-primary)",fontFamily:"var(--font-display)",letterSpacing:"-0.01em",flex:1},children:b}),(0,i.jsx)("button",{onClick:g,"aria-label":"Back to overview",title:"Back (Esc)",style:{background:"rgba(255,255,255,0.66)",border:"1px solid var(--border-subtle)",borderRadius:"50%",width:"1.9rem",height:"1.9rem",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"0.8rem",color:"var(--text-secondary)",boxShadow:"var(--shadow-sm)",flexShrink:0},children:"\u2715"})]}),(0,i.jsx)("div",{style:{height:"5px",background:h,flexShrink:0}}),(0,i.jsx)("div",{style:{overflowY:"auto",padding:"clamp(1.2rem, 3.5vw, 2.5rem)",flex:1},children:s})]})}var A=t(5867);const g=A.ZP.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 240px;
  background: var(--border-subtle);
  border-radius: 2px;
  z-index: 100;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    right: 12px;
    height: 180px;
    width: 2px;
  }
`,x=A.ZP.div`
  width: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: height var(--motion-fast) var(--ease-soft-out);
  box-shadow: 0 0 8px var(--accent-glow);
`,h=A.ZP.div`
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  pointer-events: none;

  @media screen and (max-width: 600px) {
    right: 7px;
    height: 180px;
  }
`,b=A.ZP.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${e=>e.$active?"var(--accent)":"var(--border-medium)"};
  transition: all var(--motion-normal) var(--ease-standard);
  box-shadow: ${e=>e.$active?"0 0 8px var(--accent-glow)":"none"};
  transform: ${e=>e.$active?"scale(1.3)":"scale(1)"};

  @media screen and (max-width: 600px) {
    width: 5px;
    height: 5px;
  }
`;function f(){const{progress:e,currentSection:r,totalSections:t}=(0,n.vO)(),a=Math.max(0,Math.min(100,100*e));return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g,{"aria-hidden":"true",children:(0,i.jsx)(x,{style:{height:`${a}%`}})}),(0,i.jsx)(h,{"aria-hidden":"true",children:Array.from({length:t},((e,t)=>(0,i.jsx)(b,{$active:t===r},t)))})]})}const u=["Hero","Tagline","About","Strengths","Skills","Tools","Work \u2014 Mobile Apps","Work \u2014 Platforms","Work \u2014 AI","Testimonials","Contact","Footer"],v={position:"absolute",width:"1px",height:"1px",padding:0,margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",border:0};function y(){const{currentSection:e,totalSections:r}=(0,n.vO)(),t=u[e]||`Section ${e+1}`;return(0,i.jsxs)("div",{id:"scroll-status",style:v,"aria-live":"polite","aria-atomic":"true",children:["Viewing ",t,", section ",e+1," of ",r]})}function w(){const{isOverview:e,zoomOut:r}=(0,n.vO)();return(0,i.jsx)("button",{onClick:r,"aria-label":"Back to overview",title:"Back (Esc)",style:{position:"fixed",bottom:"6.2rem",left:"50%",transform:`translateX(-50%) scale(${e?.6:1})`,zIndex:200,width:"3rem",height:"3rem",borderRadius:"50%",background:"rgba(255,255,255,0.78)",backdropFilter:"blur(24px) saturate(200%)",WebkitBackdropFilter:"blur(24px) saturate(200%)",border:"1px solid rgba(255,255,255,0.7)",boxShadow:["0 8px 32px rgba(0,0,0,0.14)","0 2px 8px rgba(0,0,0,0.08)","inset 0 1px 0 rgba(255,255,255,0.95)"].join(", "),cursor:"pointer",fontSize:"1.7rem",lineHeight:1,color:"#333",display:"flex",alignItems:"center",justifyContent:"center",opacity:e?0:1,pointerEvents:e?"none":"auto",transition:"opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)",userSelect:"none"},children:"\u2212"})}var k=t(4006);const Q=A.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 0.25rem 1rem;
`,E=A.ZP.h1`
  color: var(--text-primary);
  font-size: clamp(2.3rem, 7vw, 4.8rem);
  font-weight: 700;
  font-family: var(--font-display);
  letter-spacing: -0.04em;
  line-height: 0.94;
  margin: 0;
`,B=A.ZP.h2`
  color: var(--text-secondary);
  font-size: clamp(0.74rem, 1.7vw, 0.94rem);
  font-weight: 700;
  font-family: var(--font-body);
  letter-spacing: 0.06em;
  text-transform: none;
  margin-top: 0.9rem;
  opacity: 0.88;
  max-width: min(92vw, 52rem);
  line-height: 1.5;
`,j=A.ZP.span`
  display: block;
`,I=()=>(0,i.jsxs)(Q,{children:[(0,i.jsx)(E,{children:k.u2}),(0,i.jsx)(B,{children:k.iQ.map((e=>(0,i.jsx)(j,{children:e},e)))})]});var S=t(3984);const C=A.ZP.div`
  .btn-31,
  .btn-31 *,
  .btn-31 :after,
  .btn-31 :before,
  .btn-31:after,
  .btn-31:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-31 {
    -webkit-tap-highlight-color: transparent;
    background-color: var(--btn-surface, var(--bg-void, #f5f5f5));
    background-image: none;
    color: var(--btn-text, #111);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display, 'Montserrat', sans-serif);
    font-size: 100%;
    font-weight: 900;
    line-height: 1.5;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
    padding: 0;
    text-decoration: none;
  }

  .btn-31:disabled {
    cursor: default;
  }

  .btn-31:-moz-focusring {
    outline: auto;
  }

  .btn-31 svg {
    display: block;
    vertical-align: middle;
  }

  .btn-31 [hidden] {
    display: none;
  }

  .btn-31 {
    border-width: 1px;
    border-color: var(
      --btn-border,
      color-mix(in srgb, var(--accent, #111) 24%, white)
    );
    border-style: solid;
    border-radius: 999px;
    min-height: 44px;
    padding: var(--btn-pad-y, 1rem) var(--btn-pad-x, 2rem);
    position: relative;
    text-transform: uppercase;
    font-size: var(--btn-font-size, 100%);
    overflow: hidden;
    isolation: isolate;
    box-shadow: var(--btn-shadow, none);
    transition:
      transform var(--motion-fast, 120ms) var(--ease-standard, ease),
      background-color var(--motion-fast, 120ms) var(--ease-standard, ease),
      border-color var(--motion-fast, 120ms) var(--ease-standard, ease),
      box-shadow var(--motion-fast, 120ms) var(--ease-standard, ease);
  }

  .btn-31:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--accent, #111) 38%, transparent);
    outline-offset: 3px;
  }

  .btn-31:hover {
    border-color: var(
      --btn-hover-border,
      var(--btn-border, color-mix(in srgb, var(--accent, #111) 24%, white))
    );
    box-shadow: var(--btn-hover-shadow, var(--btn-shadow, none));
  }

  .btn-31:before {
    --progress: 100%;
    background: var(--btn-fill, var(--accent, #111));
    border-radius: inherit;
    -webkit-clip-path: polygon(
      100% 0,
      var(--progress) var(--progress),
      0 100%,
      100% 100%
    );
    clip-path: polygon(
      100% 0,
      var(--progress) var(--progress),
      0 100%,
      100% 100%
    );
    content: "";
    inset: 0;
    position: absolute;
    z-index: 0;
    transition:
      clip-path var(--motion-normal, 220ms) var(--ease-standard, ease),
      -webkit-clip-path var(--motion-normal, 220ms) var(--ease-standard, ease);
  }

  .btn-31:hover:before {
    --progress: 0%;
  }

  .btn-31 .text-container {
    display: block;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .btn-31 .text {
    display: block;
    font-weight: 900;
    position: relative;
    color: var(--btn-text, #111);
    transition: color var(--motion-fast, 120ms) var(--ease-standard, ease);
  }

  .btn-31:hover .text {
    color: var(--btn-hover-text, #ffffff);
    -webkit-animation: move-up-alternate var(--motion-normal, 220ms) var(--ease-standard, ease)
      forwards;
    animation: move-up-alternate var(--motion-normal, 220ms) var(--ease-standard, ease) forwards;
  }

  @-webkit-keyframes move-up-alternate {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(80%);
    }

    51% {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes move-up-alternate {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(80%);
    }

    51% {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0);
    }
  }

  /* Responsive adjustments */
  @media screen and (max-width: 768px) {
    .btn-31 {
      padding: 0.8rem 1.6rem;
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 480px) {
    .btn-31 {
      padding: 0.6rem 1.2rem;
      font-size: 0.8rem;
    }
  }
`,M=e=>{let{children:r,onClick:t,type:a="button",className:o,style:n,as:s="button",...l}=e;const d={className:`btn-31 ${o||""}`.trim(),onClick:t,...l};return"button"===s&&(d.type=a),(0,i.jsx)(C,{style:n,children:(0,i.jsx)(s,{...d,children:(0,i.jsx)("span",{className:"text-container",children:(0,i.jsx)("span",{className:"text",children:r})})})})};var U=t(6355);const R=A.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
`,D=A.ZP.p`
  color: var(--text-secondary);
  font-size: clamp(1rem, 2.4vw, 1.18rem);
  font-family: var(--font-body);
  line-height: 1.75;
  max-width: 720px;
`,F=A.ZP.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`,T={"--btn-text":"#111111","--btn-hover-text":"#ffffff","--btn-surface":"color-mix(in srgb, var(--accent) 14%, white)","--btn-fill":"var(--accent)","--btn-border":"rgba(18, 25, 34, 0.34)","--btn-hover-border":"rgba(18, 25, 34, 0.34)","--btn-shadow":"0 10px 22px rgba(18, 25, 34, 0.1)","--btn-hover-shadow":"0 14px 28px rgba(18, 25, 34, 0.16)","--btn-pad-y":"0.78rem","--btn-pad-x":"1.35rem","--btn-font-size":"0.8rem"},P={"--btn-text":"var(--text-primary)","--btn-fill":"var(--accent-secondary)","--btn-pad-y":"0.78rem","--btn-pad-x":"1.35rem","--btn-font-size":"0.8rem"},Z=()=>{const{scrollTo:e}=(0,n.vO)();return(0,i.jsxs)(R,{children:[(0,i.jsx)(D,{children:"Owning product outcomes across AI, platform, and cloud systems from architecture through production."}),(0,i.jsxs)(F,{children:[(0,i.jsx)(M,{as:"a",href:S,download:!0,style:T,children:"Download Resume"}),(0,i.jsxs)(M,{as:"a",href:k.Ok.kG,target:"_blank",rel:"noopener noreferrer",style:P,children:[(0,i.jsx)(U.BUd,{style:{fontSize:"1.2em",marginRight:"8px"}}),"LinkedIn"]}),(0,i.jsx)(M,{onClick:r=>{r.preventDefault(),e(10)},style:T,children:"Let's Talk"})]})]})};var W=t(828),K=t(8014),z=t(7692);const V=A.ZP.nav`
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.10) 0%,
    rgba(240, 244, 255, 0.07) 100%
  );
  width: max-content;
  display: flex;
  align-items: stretch;
  padding: 0.7rem 1.1rem;
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translateX(-50%) perspective(600px) rotateX(-8deg);
  transform-origin: bottom center;
  bottom: 2rem;
  gap: 0.15rem;
  border-radius: 2rem;
  backdrop-filter: blur(52px) saturate(320%) brightness(124%);
  -webkit-backdrop-filter: blur(52px) saturate(320%) brightness(124%);
  border: 1.5px solid rgba(255, 255, 255, 0.84);
  border-top: 2px solid rgba(255, 255, 255, 1);
  box-shadow:
    0 32px 72px rgba(0, 0, 0, 0.16),
    0 10px 28px rgba(0, 0, 0, 0.10),
    0 2px 6px rgba(0, 0, 0, 0.05),
    inset 0 2px 0 rgba(255, 255, 255, 1),
    inset 0 1px 1px rgba(255, 255, 255, 0.85),
    inset 0 -1px 0 rgba(255, 255, 255, 0.42),
    inset 1px 0 0 rgba(255, 255, 255, 0.72),
    inset -1px 0 0 rgba(255, 255, 255, 0.38);

  @media screen and (max-width: 600px) {
    padding: 0.55rem 0.85rem;
    bottom: 1rem;
    /* Remove 3D tilt on small screens for readability */
    transform: translateX(-50%);
    border-radius: 1.6rem;
  }
`,O=A.ZP.button`
  background: transparent;
  padding: 0.62rem 1rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  color: var(--text-secondary, #555);
  transition: all 0.22s ease;
  cursor: pointer;
  border: none;
  outline: none;
  min-width: 66px;

  .icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.22s ease, filter 0.22s ease;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.18)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.10));
  }

  .label {
    font-size: 0.52rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    opacity: 0.5;
    line-height: 1;
    transition: opacity 0.22s ease;
    white-space: nowrap;
  }

  &:hover {
    color: var(--text-primary, #111);
    background: rgba(0, 0, 0, 0.055);
    transform: translateY(-2px);

    .icon {
      transform: scale(1.12) translateY(-1px);
      filter: drop-shadow(0 4px 6px rgba(0, 136, 204, 0.28)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
    }

    .label {
      opacity: 0.85;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      .icon { transform: none; }
    }
    &:active {
      color: var(--text-primary, #111);
      background: rgba(0, 0, 0, 0.08);
    }
  }

  &.active {
    background: rgba(0, 0, 0, 0.07);
    color: var(--text-primary, #111);

    .label {
      opacity: 1;
    }
  }

  &.active:hover {
    background: rgba(0, 0, 0, 0.10);
  }

  @media screen and (max-width: 600px) {
    padding: 0.5rem 0.75rem;
    min-width: 48px;
  }
`,H=[{icon:W.VLe,label:"Home",sectionIndex:0},{icon:W.Lhg,label:"About",sectionIndex:2},{icon:K.m4T,label:"Skills",sectionIndex:4},{icon:U.Rd$,label:"Work",sectionIndex:6},{icon:z.kK8,label:"Contact",sectionIndex:10},{icon:U.BUd,label:"LinkedIn",href:k.Ok.kG}],J={0:0,1:0,2:2,3:2,4:4,5:4,6:6,7:6,8:6,9:10,10:10,11:10},L=()=>{const{currentSection:e,scrollTo:r}=(0,n.vO)(),t=J[e];return(0,i.jsx)(V,{"aria-label":"Section navigation",children:H.map((e=>{let{icon:a,label:o,sectionIndex:n,href:s}=e;return s?(0,i.jsxs)(O,{as:"a",href:s,target:"_blank",rel:"noopener noreferrer","aria-label":o,title:o,children:[(0,i.jsx)("span",{className:"icon",children:(0,i.jsx)(a,{})}),(0,i.jsx)("span",{className:"label",children:o})]},o):(0,i.jsxs)(O,{onClick:()=>r(n),className:t===n?"active":"","aria-label":`Navigate to ${o}`,"aria-current":t===n?"true":void 0,title:o,children:[(0,i.jsx)("span",{className:"icon",children:(0,i.jsx)(a,{})}),(0,i.jsx)("span",{className:"label",children:o})]},o)}))})};var Y=t(7015);const G=A.ZP.div`
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  align-items: start;
  gap: clamp(2rem, 5vw, 4.5rem);
  width: 100%;

  @media screen and (max-width: 860px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`,X=A.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(100%, 280px);
`,q=A.ZP.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 2rem;
  padding: 0.55rem;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.84) 0%, rgba(255, 255, 255, 0.34) 42%, rgba(255, 255, 255, 0.18) 100%),
    linear-gradient(145deg, color-mix(in srgb, var(--accent) 18%, white) 0%, rgba(255, 255, 255, 0.22) 100%);
  border: 1px solid color-mix(in srgb, var(--accent) 18%, white);
  box-shadow:
    0 26px 50px rgba(20, 24, 30, 0.12),
    0 10px 22px rgba(20, 24, 30, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -10% auto auto -14%;
    width: 62%;
    height: 40%;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.08) 100%);
    filter: blur(14px);
    opacity: 0.88;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: -8%;
    bottom: -12%;
    width: 46%;
    height: 34%;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(183, 112, 69, 0.22) 0%, rgba(183, 112, 69, 0) 72%);
    filter: blur(16px);
    pointer-events: none;
  }

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 1.55rem;
    object-fit: cover;
    object-position: center 24%;
  }
`,N=A.ZP.div`
  padding: 1rem 1.05rem;
  border-radius: 1.4rem;
  background: color-mix(in srgb, var(--bg-surface) 86%, white);
  border: 1px solid color-mix(in srgb, var(--accent) 14%, white);
  box-shadow: var(--shadow-sm);
`,$=A.ZP.div`
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`,_=A.ZP.div`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0.35rem;
`,ee=A.ZP.div`
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.6;
  margin-top: 0.4rem;
`,re=A.ZP.div`
  max-width: 46rem;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: var(--leading-body);
  font-family: var(--font-body);
  padding-top: clamp(0.2rem, 1vw, 0.7rem);

  p {
    margin-bottom: 1rem;
  }

  strong {
    color: var(--text-primary);
  }

  @media screen and (max-width: 860px) {
    padding-top: 0;
  }
`,te=A.ZP.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 1.75rem;
  text-align: center;
`,ae=()=>(0,i.jsxs)("section",{children:[(0,i.jsx)(te,{children:"About Me"}),(0,i.jsxs)(G,{children:[(0,i.jsxs)(X,{children:[(0,i.jsx)(q,{children:(0,i.jsx)("img",{src:Y,alt:"Travis Stephenson"})}),(0,i.jsxs)(N,{children:[(0,i.jsx)($,{children:k.jZ.n9}),(0,i.jsx)(_,{children:k.jZ.pL}),(0,i.jsx)(ee,{children:k.jZ.r1})]})]}),(0,i.jsx)(re,{children:k.jZ.Vu.map((e=>(0,i.jsx)("p",{children:e},e)))})]})]}),oe=A.ZP.section`
  text-align: center;
`,ne=A.ZP.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
`,ie=A.ZP.ul`
  text-align: left;
  max-width: 46rem;
  margin: 0 auto;
  color: var(--text-secondary);
  line-height: 1.9;
  font-size: 1rem;

  li {
    padding-left: 0.75rem;
    position: relative;
    list-style: none;

    &::before {
      content: '->';
      color: var(--accent);
      position: absolute;
      left: -1rem;
      top: 0;
      font-family: var(--font-display);
      font-weight: 700;
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    line-height: 1.75;
  }
`,se=A.ZP.p`
  color: var(--text-secondary);
  margin-top: 1.5rem;
  font-size: 0.95rem;
  line-height: var(--leading-body);

  strong {
    color: var(--accent);
  }
`,le=()=>(0,i.jsxs)(oe,{children:[(0,i.jsx)(ne,{children:k.x5.TN}),(0,i.jsx)(ie,{children:k.x5.fr.map((e=>(0,i.jsx)("li",{children:e},e)))}),(0,i.jsxs)(se,{children:[(0,i.jsx)("strong",{children:k.x5.Mx})," ",k.Q1.S]})]}),de=A.ZP.section`
  text-align: center;
`,ce=A.ZP.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 2rem;
`,me=A.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
`,pe=A.ZP.div`
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition:
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 52px color-mix(in srgb, var(--accent) 12%, rgba(18, 25, 34, 0.1));
  }
`,Ae=A.ZP.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem 1.1rem;
  text-align: left;
  outline: none;
  gap: 0.75rem;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
    border-radius: var(--radius-md);
  }
`,ge=A.ZP.span`
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  flex: 1;
`,xe=A.ZP.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-secondary);
  opacity: 0.75;
  letter-spacing: 0.05em;
`,he=A.ZP.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.65;
  transition: transform var(--motion-normal) var(--ease-standard);
  transform: rotate(${e=>e.$open?"180deg":"0deg"});
  flex-shrink: 0;
`,be=A.ZP.div`
  display: grid;
  grid-template-rows: ${e=>e.$open?"1fr":"0fr"};
  transition: grid-template-rows var(--motion-slow) var(--ease-standard);
`,fe=A.ZP.div`
  overflow: hidden;
`,ue=A.ZP.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0 1.1rem 1rem;
`,ve=A.ZP.span`
  display: inline-block;
  color: var(--text-primary);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  background: color-mix(in srgb, var(--accent) 9%, white);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  border: 1px solid color-mix(in srgb, var(--accent) 16%, white);
  cursor: default;
  transition:
    background-color var(--motion-normal) var(--ease-standard),
    border-color var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);
  font-family: var(--font-body);

  &:hover {
    background: color-mix(in srgb, var(--accent) 14%, white);
    border-color: color-mix(in srgb, var(--accent) 22%, white);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }
`,ye=k.ao,we=()=>{var e;const[r,t]=(0,a.useState)((null===(e=ye[0])||void 0===e?void 0:e.category)||null);return(0,i.jsxs)(de,{children:[(0,i.jsx)(ce,{children:"Capabilities"}),(0,i.jsx)(me,{children:ye.map((e=>{let{category:a,skills:o}=e;const n=r===a;return(0,i.jsxs)(pe,{children:[(0,i.jsxs)(Ae,{onClick:()=>(e=>{t((r=>r===e?null:e))})(a),"aria-expanded":n,"aria-controls":`skills-${a}`,children:[(0,i.jsx)(ge,{children:a}),(0,i.jsxs)(xe,{children:[o.length," skills"]}),(0,i.jsx)(he,{$open:n,children:"v"})]}),(0,i.jsx)(be,{$open:n,id:`skills-${a}`,role:"region",children:(0,i.jsx)(fe,{children:(0,i.jsx)(ue,{children:o.map((e=>(0,i.jsx)(ve,{children:e},e)))})})})]},a)}))})]})},ke=A.ZP.section`
  text-align: center;
`,Qe=A.ZP.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 2rem;
`,Ee=A.ZP.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
`,Be=A.ZP.div`
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.1rem 1.2rem;
  box-shadow: var(--shadow-md);
  transition:
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);

  &:hover {
    box-shadow: 0 24px 54px color-mix(in srgb, var(--accent) 12%, rgba(18, 25, 34, 0.1));
    transform: translateY(-2px);
  }
`,je=A.ZP.p`
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.8rem;
`,Ie=A.ZP.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`,Se=A.ZP.span`
  display: inline-block;
  color: var(--text-primary);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  background: color-mix(in srgb, var(--accent) 9%, white);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  border: 1px solid color-mix(in srgb, var(--accent) 16%, white);
  cursor: default;
  transition:
    background-color var(--motion-normal) var(--ease-standard),
    border-color var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);
  font-family: var(--font-body);

  &:hover {
    background: color-mix(in srgb, var(--accent) 14%, white);
    border-color: color-mix(in srgb, var(--accent) 22%, white);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }
`,Ce=k.hQ,Me=()=>(0,i.jsxs)(ke,{children:[(0,i.jsx)(Qe,{children:"Tools and Platforms"}),(0,i.jsx)(Ee,{children:Ce.map((e=>{let{category:r,tools:t}=e;return(0,i.jsxs)(Be,{children:[(0,i.jsx)(je,{children:r}),(0,i.jsx)(Ie,{children:t.map((e=>(0,i.jsx)(Se,{children:e},e)))})]},r)}))})]});var Ue=t(175),Re=t(6076),De=t(7383),Fe=t(942),Te=t(1183);const Pe={width:"100%",aspectRatio:"2.42 / 1.12",background:"linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 50%, #0088cc 100%)",borderRadius:"var(--radius-md)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-display)",fontSize:"var(--text-sm)",letterSpacing:"0.12em",textTransform:"uppercase"},Ze=()=>(0,i.jsx)("div",{"aria-hidden":"true",style:Pe,children:"Movie Vault"});function We(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Ke(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return["title","summary","secondaryCta","secondaryUrl"].reduce(((r,t)=>(e[t]&&(r[t]=e[t]),r)),{})}function ze(e,r){var t;const a=(null===(t=k.hg)||void 0===t?void 0:t[e])||{},o=!1===a.enabled?null:function(e,r){const t=Array.isArray(k.featuredWork)?k.featuredWork:[],a=We(e),o=We(r);return t.find((e=>{const r=We(e.key),t=We(e.title);return r===a||r===o||t===o}))}(e,a.title||r.title);return{...r,...Ke(a),...Ke(o),profileKey:e}}const Ve=[ze("seedsOfThyme",{id:1,image:Ue,imageAlt:"Seeds of Thyme mobile app preview",title:"Seeds of Thyme",summary:"End-to-end product ownership for iOS/Android essential oil education app - architecture, UX direction, subscription model design, and App Store delivery.",primaryCta:"Case Study",routeUrl:"/projects/seeds-of-thyme",secondaryCta:"App Store",secondaryUrl:"https://apps.apple.com/us/app/seeds-of-thyme/id6450909951"}),ze("essentialLife",{id:2,image:Re,imageAlt:"The Essential Life mobile app preview",title:"The Essential Life App",summary:"Led Flutter platform modernization for a consumer mobile app at enterprise scale - 929 ratings, 6,000+ oil solutions, full cross-platform architecture.",primaryCta:"Case Study",routeUrl:"/projects/essential-life",secondaryCta:"App Store",secondaryUrl:"https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865"})],Oe=[ze("camsAtm",{id:3,image:De,imageAlt:"CAMS ATM platform dashboard preview",title:"CAMS ATM Management",summary:"Architected and delivered an enterprise ATM operational management platform - real-time workflow automation, compliance tracking, and cloud-native SaaS on AWS.",primaryCta:"Case Study",routeUrl:"/projects/cams-atm",secondaryCta:"Company Site",secondaryUrl:"https://camscompanion.com/"}),ze("safetyWallet",{id:4,image:Fe,imageAlt:"Safety Wallet compliance platform preview",title:"Safety Wallet",summary:"Directed delivery of a safety compliance platform - automated PDF generation, QR code verification, and multi-stakeholder integration across workers, employers, and certification bodies.",primaryCta:"Case Study",routeUrl:"/projects/safety-wallet",secondaryCta:"Contact Me",secondaryUrl:"#contact"})],He=[ze("videoStudio",{id:"video-studio",image:"/video-studio/video-studio-showcase-poster.png",imageAlt:"Video Studio local AI motion workspace with a cinematic prompt composer",video:"/video-studio/video-studio-sizzle.mp4",videoPoster:"/video-studio/video-studio-showcase-poster.png",videoBadge:"39s reel",title:"Video Studio",summary:"Designed and engineered a fully local AI video studio that turns 16 ComfyUI workflows into guided recipes, recoverable renders, and a cinematic results workspace.",primaryCta:"Case Study",routeUrl:"/projects/video-studio"}),ze("vega",{id:5,image:"/vega/vega-spec-extraction.png",imageAlt:"Vega AI estimation platform extraction workflow preview",title:"Vega",summary:"AI-assisted construction takeoff platform that converts blueprint sets into structured, trade-specific outputs estimators can review and use for bidding.",primaryCta:"Case Study",routeUrl:"/projects/vega",secondaryCta:"Contact Me",secondaryUrl:"#contact"}),ze("llmRagPipelines",{id:6,image:Te,imageAlt:"AI workflow visualization",title:"Multi-Agent LLM & RAG Pipelines",summary:"Architected multi-agent LLM systems and RAG pipelines for enterprise knowledge workflows. Integrated OpenAI, Gemini, and DeepSeek APIs to automate insight extraction and decision support across SaaS platforms.",primaryCta:"Case Study",routeUrl:"/projects/llm-rag-pipelines",secondaryCta:"LinkedIn",secondaryUrl:k.Ok.kG}),ze("movieVault",{id:7,imageComponent:Ze,imageAlt:"Movie Vault placeholder artwork",title:"Movie Vault",summary:"Personal film collection app built solo - TMDB API, Web Audio API, GPU-composited animations, multi-user social rating system. Vanilla JS, zero frameworks, 139KB total.",primaryCta:"Case Study",routeUrl:"/projects/movie-vault",secondaryCta:"View App",secondaryUrl:"/movies.html"})],Je={color:"var(--accent)",fontSize:"clamp(1.1rem, 2.5vw, 1.55rem)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",fontFamily:"var(--font-body)",marginBottom:"1.5rem"},Le={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 320px), 1fr))",gap:"1.5rem"},Ye={background:"linear-gradient(145deg, rgba(255,255,255,0.76) 0%, rgba(247,242,235,0.7) 100%)",backdropFilter:"blur(24px) saturate(170%)",WebkitBackdropFilter:"blur(24px) saturate(170%)",border:"1px solid rgba(255,255,255,0.8)",borderTop:"1px solid rgba(255,255,255,0.94)",borderRadius:"var(--radius-md)",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"var(--shadow-md)"},Ge={width:"100%",height:"176px",objectFit:"cover"},Xe={display:"block",position:"relative",height:"176px",overflow:"hidden",background:"#07131c"},qe={position:"absolute",top:"0.75rem",right:"0.75rem",zIndex:1,padding:"0.38rem 0.58rem",border:"1px solid rgba(255,255,255,0.24)",borderRadius:"999px",background:"rgba(8,17,25,0.72)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",color:"#ffffff",fontFamily:"var(--font-body)",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.1em",lineHeight:1,textTransform:"uppercase",pointerEvents:"none"},Ne={padding:"var(--space-5)",display:"flex",flexDirection:"column",gap:"0.65rem",flex:1},$e={color:"var(--text-primary)",fontWeight:700,fontSize:"1.02rem",fontFamily:"var(--font-display)",lineHeight:1.1,margin:0},_e={color:"var(--text-secondary)",fontSize:"0.88rem",lineHeight:1.6,margin:0,flex:1,fontFamily:"var(--font-body)"},er={display:"flex",gap:"0.65rem",flexWrap:"wrap",marginTop:"0.35rem"},rr="color-mix(in srgb, var(--accent-secondary) 58%, #0f3658)",tr="rgba(18, 25, 34, 0.44)",ar={"--btn-text":"#ffffff","--btn-hover-text":"#ffffff","--btn-surface":rr,"--btn-fill":"var(--accent)","--btn-border":tr,"--btn-hover-border":tr,"--btn-shadow":"0 10px 22px rgba(18, 25, 34, 0.12)","--btn-hover-shadow":"0 14px 28px rgba(18, 25, 34, 0.16)","--btn-pad-y":"0.62rem","--btn-pad-x":"1.05rem","--btn-font-size":"0.76rem"},or={"--btn-text":"#ffffff","--btn-hover-text":"#ffffff","--btn-surface":"var(--accent)","--btn-fill":rr,"--btn-border":tr,"--btn-hover-border":tr,"--btn-shadow":"0 10px 22px rgba(18, 25, 34, 0.12)","--btn-hover-shadow":"0 14px 28px rgba(18, 25, 34, 0.16)","--btn-pad-y":"0.62rem","--btn-pad-x":"1.05rem","--btn-font-size":"0.76rem"};function nr(e){let{item:r}=e;const t=(0,a.useRef)(null),n=function(){const[e,r]=(0,a.useState)((()=>"undefined"!==typeof window&&"function"===typeof window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches));return(0,a.useEffect)((()=>{if("undefined"===typeof window||"function"!==typeof window.matchMedia)return;const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=e=>r(e.matches);return"function"===typeof e.addEventListener?(e.addEventListener("change",t),()=>e.removeEventListener("change",t)):(e.addListener(t),()=>e.removeListener(t))}),[]),e}();(0,a.useEffect)((()=>{var e;const r=t.current;if(!r)return;const a=null===(e=navigator.connection)||void 0===e?void 0:e.saveData;if(n||a)return void r.pause();if("undefined"===typeof IntersectionObserver)return r.play().catch((()=>{})),()=>r.pause();const o=new IntersectionObserver((e=>{let[t]=e;t.isIntersecting?r.play().catch((()=>{})):r.pause()}),{threshold:.35});return o.observe(r),()=>{o.disconnect(),r.pause()}}),[r.video,n]);const s=(0,i.jsxs)("div",{style:Xe,children:[(0,i.jsx)("video",{ref:t,"aria-hidden":"true",autoPlay:!n,disablePictureInPicture:!0,loop:!0,muted:!0,playsInline:!0,poster:r.videoPoster||r.image,preload:"metadata",src:r.video,style:{...Ge,display:"block",pointerEvents:"none"}}),(0,i.jsx)("span",{style:qe,children:r.videoBadge||"Reel"})]});return r.routeUrl?(0,i.jsx)(o.rU,{"aria-label":`Open ${r.title} case study`,style:{color:"inherit",textDecoration:"none"},to:r.routeUrl,children:s}):s}function ir(e){let{items:r,title:t}=e;return(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{style:Je,children:t}),(0,i.jsx)("div",{style:Le,children:r.map((e=>(0,i.jsxs)("div",{style:Ye,children:[e.video?(0,i.jsx)(nr,{item:e}):e.imageComponent?(0,i.jsx)("div",{style:{padding:"0.9rem 0.9rem 0"},children:(0,i.jsx)(e.imageComponent,{})}):(0,i.jsx)("img",{src:e.image,alt:e.imageAlt||e.title,style:Ge,loading:"lazy",decoding:"async"}),(0,i.jsxs)("div",{style:Ne,children:[(0,i.jsx)("h3",{style:$e,children:e.title}),(0,i.jsx)("p",{style:_e,children:e.summary}),(0,i.jsxs)("div",{style:er,children:[e.routeUrl?(0,i.jsx)(M,{as:o.rU,to:e.routeUrl,style:ar,children:e.primaryCta}):e.primaryUrl&&"#contact"!==e.primaryUrl?(0,i.jsx)(M,{as:"a",href:e.primaryUrl,target:"_blank",rel:"noopener noreferrer",style:ar,children:e.primaryCta}):null,e.secondaryUrl&&"#contact"!==e.secondaryUrl&&(0,i.jsx)(M,{as:"a",href:e.secondaryUrl,target:"_blank",rel:"noopener noreferrer",style:or,children:e.secondaryCta})]})]})]},e.id)))})]})}var sr=t(8286),lr=t(1679),dr=t(8645),cr=t(8038),mr=t(3600);const pr=A.ZP.section`
  text-align: center;
  width: 100%;
`,Ar=A.ZP.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
`,gr=A.ZP.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  overflow: hidden;
`,xr=A.ZP.div`
  opacity: ${e=>e.$active?1:0};
  transform: ${e=>e.$active?"scale(1) translateX(0)":"scale(0.95) translateX(20px)"};
  transition:
    opacity var(--motion-slow) var(--ease-standard),
    transform var(--motion-slow) var(--ease-standard);
  position: ${e=>e.$active?"relative":"absolute"};
  top: 0;
  left: 0;
  width: 100%;
`,hr=A.ZP.div`
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 2rem;
  text-align: left;
  box-shadow: var(--shadow-md);

  @media (max-width: 600px) {
    padding: 1.2rem;
  }
`,br=A.ZP.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`,fr=A.ZP.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid color-mix(in srgb, var(--accent) 18%, white);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,ur=A.ZP.p`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
`,vr=A.ZP.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 0.15rem;
`,yr=A.ZP.div`
  display: flex;
  gap: 0.15rem;
  color: var(--accent);
  margin-bottom: 0.25rem;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }
`,wr=A.ZP.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-medium);
    border-radius: 2px;
  }
`,kr=A.ZP.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`,Qr=A.ZP.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${e=>e.$active?"var(--accent)":"var(--border-medium)"};
  box-shadow: ${e=>e.$active?"0 0 8px var(--accent-glow)":"none"};
  transition:
    background-color var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard);
  padding: 0;
`,Er=A.ZP.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`,Br=A.ZP.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${e=>e.$left?"left: -1.2rem;":"right: -1.2rem;"}
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: var(--bg-surface-strong);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  line-height: 1;
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--motion-normal) var(--ease-standard),
    background-color var(--motion-normal) var(--ease-standard),
    border-color var(--motion-normal) var(--ease-standard);
  z-index: 2;

  &:hover {
    background: color-mix(in srgb, var(--accent) 8%, white);
    border-color: color-mix(in srgb, var(--accent) 20%, white);
    transform: translateY(-50%) scale(1.08);
  }

  @media (max-width: 720px) {
    ${e=>e.$left?"left: 0.25rem;":"right: 0.25rem;"}
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: translateY(-50%);
      background: var(--bg-surface-strong);
    }

    &:active {
      background: color-mix(in srgb, var(--accent) 8%, white);
      transform: translateY(-50%) scale(1.05);
    }
  }
`,jr=[{avatar:sr,name:"Magesh",jobTitle:"QA Lead at Fidelity",review:'"I\'ve had a pleasure of working with Travis and can confidently say they are a highly skilled, dedicated professional. Their ability to manage projects efficiently, communicate effectively, and solve problems proactively sets them apart."',rating:5},{avatar:lr,name:"Bert Curtis",jobTitle:"Senior SDET",review:'"It has been a pleasure to see Travis as he develops his full stack software development skills. He consistently demonstrates a passion for learning and problem-solving, with a strong grasp of both front-end and back-end technologies."',rating:5},{avatar:dr,name:"Aryan Basak",jobTitle:"Project Manager @ Utah Tech Labs",review:'"Travis excels at managing complex projects with a keen eye for detail and a strong commitment to Agile principles. His ability to foster collaboration within the team and drive projects to successful completion is truly impressive."',rating:5},{avatar:cr,name:"Sammuel Syphrett",jobTitle:"Concrete Paving Estimator",review:'"As a supervisor, Travis has consistently demonstrated exceptional leadership and humility. His ability to explain complex concepts clearly and effectively makes him an invaluable asset to any team."',rating:5},{avatar:mr,name:"Anirban Dutta",jobTitle:"Python Data Engineer",review:'"Travis is a well organised Project Manager who has lots of experience in handling clients. He is a great team player and always keeps the team spirit high."',rating:5}],Ir=()=>{const[e,r]=(0,a.useState)(0),t=(0,a.useRef)(0);(0,a.useEffect)((()=>{const e=setInterval((()=>{r((e=>(e+1)%jr.length))}),4e3);return()=>clearInterval(e)}),[]);const o=()=>r((e=>(e-1+jr.length)%jr.length)),n=()=>r((e=>(e+1)%jr.length));return(0,i.jsxs)(pr,{children:[(0,i.jsx)(Ar,{children:"Recommendations"}),(0,i.jsxs)(Er,{children:[(0,i.jsx)(Br,{$left:!0,onClick:o,"aria-label":"Previous testimonial",children:"\u2039"}),(0,i.jsx)(gr,{onTouchStart:e=>{t.current=e.touches[0].clientX},onTouchEnd:e=>{const r=e.changedTouches[0].clientX-t.current;Math.abs(r)<40||(r<0?n():o())},children:jr.map(((r,t)=>{return(0,i.jsx)(xr,{$active:e===t,children:(0,i.jsxs)(hr,{children:[(0,i.jsxs)(br,{children:[(0,i.jsx)(fr,{children:(0,i.jsx)("img",{src:r.avatar,alt:r.name})}),(0,i.jsxs)("div",{children:[(0,i.jsx)(yr,{children:(a=r.rating,Array.from({length:a},((e,r)=>(0,i.jsx)("svg",{fill:"currentColor",viewBox:"0 0 20 20",children:(0,i.jsx)("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})},r))))}),(0,i.jsx)(ur,{children:r.name}),(0,i.jsx)(vr,{children:r.jobTitle})]})]}),(0,i.jsx)(wr,{children:r.review})]})},t);var a}))}),(0,i.jsx)(Br,{onClick:n,"aria-label":"Next testimonial",children:"\u203a"})]}),(0,i.jsx)(kr,{children:jr.map(((t,a)=>(0,i.jsx)(Qr,{$active:a===e,onClick:()=>r(a),"aria-label":`View testimonial ${a+1}`},a)))})]})};var Sr=t(6856),Cr=t(7425),Mr=t(4050);const Ur=A.ZP.section`
  width: 100%;
`,Rr=A.ZP.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 0.75rem;
  text-align: center;
`,Dr=A.ZP.p`
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  line-height: var(--leading-body);
`,Fr=A.ZP.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`,Tr=A.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Pr=A.ZP.article`
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.2rem;
  text-align: center;
  transition:
    transform var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    border-color var(--motion-normal) var(--ease-standard);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 54px color-mix(in srgb, var(--accent) 12%, rgba(18, 25, 34, 0.1));
    border-color: color-mix(in srgb, var(--accent) 18%, white);
  }

  svg {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  h4 {
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  h5 {
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 400;
    margin-bottom: 0.75rem;
  }
`,Zr=A.ZP.div`
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
`,Wr=A.ZP.p`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`,Kr=A.ZP.div`
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 0.6rem;
  margin-bottom: 0.8rem;
  transition:
    border-color var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    background-color var(--motion-normal) var(--ease-standard);

  &:focus-within {
    background: rgba(255, 255, 255, 0.82);
    border-color: color-mix(in srgb, var(--accent) 20%, white);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 10%, transparent);
  }
`,zr=A.ZP.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-family: var(--font-body);
  font-size: 0.95rem;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`,Vr=A.ZP.textarea`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  resize: vertical;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`,Or=()=>{const e=(0,a.useRef)(),r=k.Ok.Do.replace(/^mailto:/,"");(0,a.useEffect)((()=>{Mr.ZP.init("NDbWMvRzAqmh3g5Dj")}),[]);return(0,i.jsxs)(Ur,{children:[(0,i.jsx)(Rr,{children:"Contact Me"}),(0,i.jsx)(Dr,{children:k.Q1.S}),(0,i.jsxs)(Fr,{children:[(0,i.jsxs)(Tr,{children:[(0,i.jsxs)(Pr,{children:[(0,i.jsx)(Sr.F8X,{}),(0,i.jsx)("h4",{children:"Email"}),(0,i.jsx)("h5",{children:r}),(0,i.jsx)("a",{href:k.Ok.Do,style:{color:"inherit",textDecoration:"none"},children:(0,i.jsx)(M,{children:"Send a message"})})]}),(0,i.jsxs)(Pr,{children:[(0,i.jsx)(Cr.HcH,{}),(0,i.jsx)("h4",{children:"Messenger"}),(0,i.jsx)("h5",{children:"Travis Stephenson"}),(0,i.jsx)("a",{href:k.Ok.dQ,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:(0,i.jsx)(M,{children:"Send a message"})})]}),(0,i.jsxs)(Pr,{children:[(0,i.jsx)(U.BUd,{}),(0,i.jsx)("h4",{children:"LinkedIn"}),(0,i.jsx)("h5",{children:"Connect on LinkedIn"}),(0,i.jsx)("a",{href:k.Ok.kG,target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none"},children:(0,i.jsx)(M,{children:"Message me"})})]})]}),(0,i.jsx)(Zr,{children:(0,i.jsxs)("form",{ref:e,onSubmit:r=>{r.preventDefault(),Mr.ZP.sendForm("service_77o3efy","template_1kwjnyx",e.current,"NDbWMvRzAqmh3g5Dj").then((()=>{alert("Message sent successfully!"),r.target.reset()}),(()=>{alert("Failed to send message. Please try again.")}))},children:[(0,i.jsx)(Wr,{children:"Get In Touch"}),(0,i.jsx)(Kr,{children:(0,i.jsx)(zr,{required:!0,placeholder:"Name",type:"text",name:"name"})}),(0,i.jsx)(Kr,{children:(0,i.jsx)(zr,{required:!0,placeholder:"Email",type:"email",name:"email"})}),(0,i.jsx)(Kr,{children:(0,i.jsx)(zr,{required:!0,placeholder:"Subject",type:"text",name:"subject"})}),(0,i.jsx)(Kr,{children:(0,i.jsx)(Vr,{required:!0,placeholder:"Message",cols:"30",rows:"3",name:"message"})}),(0,i.jsx)(M,{type:"submit",children:"Send Message"})]})})]})]})},Hr=[{label:"Home",sectionIndex:0},{label:"About",sectionIndex:2},{label:"Skills",sectionIndex:4},{label:"Work",sectionIndex:6},{label:"Testimonials",sectionIndex:9},{label:"Contact",sectionIndex:10}],Jr=A.ZP.footer`
  text-align: center;
  padding: 1.5rem;
  width: 100%;
`,Lr=A.ZP.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  display: inline-block;
  transition:
    color var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);

  &:hover {
    color: var(--accent);
    transform: translateY(-2px);
  }
`,Yr=A.ZP.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto 1rem;
`,Gr=A.ZP.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color var(--motion-normal) var(--ease-standard);
  padding: 0;

  &:hover {
    color: var(--accent);
    text-decoration: none;
  }
`,Xr=A.ZP.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  a {
    background: var(--bg-surface);
    color: var(--text-primary);
    padding: 0.6rem;
    border-radius: var(--radius-pill);
    display: flex;
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-sm);
    transition:
      transform var(--motion-normal) var(--ease-standard),
      border-color var(--motion-normal) var(--ease-standard),
      background-color var(--motion-normal) var(--ease-standard);

    &:hover {
      background: color-mix(in srgb, var(--accent) 8%, white);
      border-color: color-mix(in srgb, var(--accent) 20%, white);
      transform: translateY(-2px);
    }
  }
`,qr=A.ZP.small`
  color: var(--text-secondary);
  opacity: 0.7;
  font-size: 0.8rem;
`,Nr=()=>{const{scrollTo:e}=(0,n.vO)();return(0,i.jsxs)(Jr,{children:[(0,i.jsx)(Lr,{onClick:()=>e(0),children:"Travis Stephenson"}),(0,i.jsx)(Yr,{children:Hr.map((r=>{let{label:t,sectionIndex:a}=r;return(0,i.jsx)("li",{children:(0,i.jsx)(Gr,{onClick:()=>e(a),children:t})},t)}))}),(0,i.jsx)(Xr,{children:(0,i.jsx)("a",{href:k.Ok.kG,target:"_blank",rel:"noopener noreferrer",children:(0,i.jsx)(U.BUd,{})})}),(0,i.jsx)(qr,{children:"\xa9 Travis Stephenson. All rights reserved."})]})};var $r=t(6635);const _r=(0,a.lazy)((()=>Promise.all([t.e(778),t.e(186)]).then(t.bind(t,186)))),et=(0,a.lazy)((()=>Promise.all([t.e(778),t.e(886),t.e(805)]).then(t.bind(t,805)))),rt=k.ot,tt={position:"fixed",top:"1.25rem",right:"1.25rem",zIndex:9e3,padding:"0.48rem 1.1rem",borderRadius:"50px",border:"1px solid rgba(255,255,255,0.52)",background:"linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.16) 100%)",backdropFilter:"blur(28px) saturate(240%)",WebkitBackdropFilter:"blur(28px) saturate(240%)",color:"var(--text-primary)",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.09em",textTransform:"uppercase",cursor:"pointer",boxShadow:"0 16px 36px rgba(18, 25, 34, 0.12), 0 4px 10px rgba(18, 25, 34, 0.05), inset 0 1px 0 rgba(255,255,255,0.96), inset 0 -1px 0 rgba(255,255,255,0.18)",fontFamily:"var(--font-display)",lineHeight:1,transition:"all 0.2s ease"},at="3rem",ot="2rem",nt={width:"120px",height:"120px",borderRadius:"50%",objectFit:"cover",border:"3px solid color-mix(in srgb, var(--accent) 24%, white)",boxShadow:"var(--shadow-md)"},it={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:"1rem"},st={background:"var(--glass-bg)",borderRadius:"var(--radius-md)",padding:"clamp(1rem, 3vw, 1.4rem)",textAlign:"center",border:"1px solid var(--glass-border)",boxShadow:"var(--shadow-sm)",backdropFilter:"blur(20px) saturate(170%)",WebkitBackdropFilter:"blur(20px) saturate(170%)"},lt={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",minHeight:"44px",padding:"0.72rem 1.45rem",borderRadius:"var(--radius-pill)",background:"var(--accent)",color:"#fff",fontFamily:"var(--font-display)",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.08em",textTransform:"uppercase",textDecoration:"none",boxShadow:"0 16px 34px color-mix(in srgb, var(--accent) 24%, transparent)"},dt={...lt,background:"var(--bg-surface)",color:"var(--text-primary)",border:"1px solid var(--glass-border)",boxShadow:"var(--shadow-sm)"},ct={position:"fixed",inset:0,zIndex:1,background:"radial-gradient(circle at top left, rgba(102, 212, 239, 0.1), transparent 24%), radial-gradient(circle at top right, rgba(183, 112, 69, 0.1), transparent 24%), linear-gradient(180deg, #f7f3ec 0%, #ebe4d8 100%)"};function mt(){return(0,i.jsx)("div",{style:it,children:rt.map((e=>{let{num:r,label:t,sub:a}=e;return(0,i.jsxs)("div",{style:st,children:[(0,i.jsx)("div",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(1.8rem, 4vw, 2.5rem)",fontWeight:700,letterSpacing:"-0.04em",color:"var(--text-primary)",lineHeight:1},children:r}),(0,i.jsx)("div",{style:{fontFamily:"var(--font-display)",fontSize:"0.82rem",fontWeight:700,color:"var(--accent)",marginTop:"0.35rem",letterSpacing:"0.08em",textTransform:"uppercase"},children:t}),(0,i.jsx)("div",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",marginTop:"0.3rem",lineHeight:1.55},children:a})]},t)}))})}function pt(e){var r;let{viewMode:t,setViewMode:o,onPrepareMode:n,isCompactViewport:s}=e;const[l,d]=(0,a.useState)(!1),[c,m]=(0,a.useState)(0),[p,A]=(0,a.useState)(!1),g="3d"===t?"classic":"3d",x="classic"===g?"Browse Mode":"Explore Mode",h="3d"===t?"Switch to browse mode":"Switch to explore mode",b="classic"===t,f=s?"9.85rem":"11.85rem",u=s?"3.05rem":"3.4rem",v=s?"0.9rem":"1.25rem",y=["topRight","bottomLeft","topLeft","bottomRight"],w=y[c],k=null!==(r={"topRight:bottomLeft":{prepX:"10px",prepY:"-2px",driftX:"-8px",driftY:"6px",settleX:"-4px",settleY:"3px"},"bottomLeft:topLeft":{prepX:"-2px",prepY:"10px",driftX:"0px",driftY:"-8px",settleX:"0px",settleY:"-4px"},"topLeft:bottomRight":{prepX:"-10px",prepY:"-2px",driftX:"8px",driftY:"6px",settleX:"4px",settleY:"3px"},"bottomRight:topRight":{prepX:"2px",prepY:"10px",driftX:"0px",driftY:"-8px",settleX:"0px",settleY:"-4px"}}[`${w}:${y[(c+1)%y.length]}`])&&void 0!==r?r:{prepX:"0px",prepY:"0px",driftX:"0px",driftY:"0px",settleX:"0px",settleY:"0px"},Q={topRight:{top:v,left:`calc(100vw - ${v} - ${f})`,transformOrigin:"100% 0%"},bottomLeft:{top:`calc(100vh - ${v} - ${u})`,left:v,transformOrigin:"0% 100%"},topLeft:{top:v,left:v,transformOrigin:"0% 0%"},bottomRight:{top:`calc(100vh - ${v} - ${u})`,left:`calc(100vw - ${v} - ${f})`,transformOrigin:"100% 100%"}};return(0,a.useEffect)((()=>{if(s)return m(0),void A(!1);const e=[],r=()=>{const t=window.setTimeout((()=>{A(!0),e.push(window.setTimeout((()=>{m((e=>(e+1)%y.length))}),260)),e.push(window.setTimeout((()=>{A(!1)}),1440)),r()}),6e4);e.push(t)};return r(),()=>{e.forEach((e=>window.clearTimeout(e)))}}),[y.length,s]),(0,i.jsxs)("div",{style:{position:"fixed",top:Q[w].top,left:Q[w].left,zIndex:9e3,maxWidth:"calc(100vw - 1.8rem)",transformOrigin:Q[w].transformOrigin,animation:b?"mode-toggle-pulse 9.2s cubic-bezier(0.22, 1, 0.36, 1) infinite":"none",transition:"top 1120ms cubic-bezier(0.2, 0.84, 0.2, 1), left 1120ms cubic-bezier(0.2, 0.84, 0.2, 1)"},children:[(0,i.jsx)("span",{"aria-hidden":"true",style:{position:"absolute",inset:s?"-0.24rem":"-0.38rem",borderRadius:"999px",background:"classic"===g?"radial-gradient(circle, rgba(183, 112, 69, 0.28) 0%, rgba(183, 112, 69, 0.12) 48%, rgba(183, 112, 69, 0) 78%)":"radial-gradient(circle, rgba(102, 212, 239, 0.32) 0%, rgba(102, 212, 239, 0.12) 46%, rgba(102, 212, 239, 0) 78%)",opacity:b?.74:0,pointerEvents:"none",filter:"blur(14px)",animation:b?"mode-toggle-halo 9.2s cubic-bezier(0.22, 1, 0.36, 1) infinite":"none"}}),(0,i.jsxs)("button",{type:"button",style:{...tt,position:"relative",top:"auto",right:"auto",zIndex:1,width:f,minHeight:u,padding:s?"0.58rem 1rem":"0.68rem 1.42rem",borderRadius:"999px",border:"1px solid rgba(255, 255, 255, 0.72)",background:l?"linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.32) 42%, rgba(255,255,255,0.16) 100%)":"linear-gradient(135deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.26) 42%, rgba(255,255,255,0.12) 100%)",color:"#0d141c",boxShadow:l?"0 20px 44px rgba(18, 25, 34, 0.18), 0 8px 16px rgba(18, 25, 34, 0.08), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,0.32)":"0 14px 34px rgba(18, 25, 34, 0.14), 0 5px 12px rgba(18, 25, 34, 0.06), inset 0 1px 0 rgba(255,255,255,0.96), inset 0 -1px 0 rgba(255,255,255,0.2)",backdropFilter:"blur(32px) saturate(255%)",WebkitBackdropFilter:"blur(32px) saturate(255%)",overflow:"hidden",isolation:"isolate","--mode-toggle-sneak-prep-x":k.prepX,"--mode-toggle-sneak-prep-y":k.prepY,"--mode-toggle-sneak-drift-x":k.driftX,"--mode-toggle-sneak-drift-y":k.driftY,"--mode-toggle-sneak-settle-x":k.settleX,"--mode-toggle-sneak-settle-y":k.settleY,transform:p?"translate3d(0, 0, 0)":l?"translateY(-1px)":"translateY(0)",transition:"transform 220ms var(--ease-standard), background 220ms var(--ease-standard), border-color 220ms var(--ease-standard), box-shadow 220ms var(--ease-standard)",animation:p?"mode-toggle-sneak 1440ms cubic-bezier(0.2, 0.84, 0.2, 1) both":"none",fontSize:s?"0.62rem":"0.68rem"},onClick:()=>{null===n||void 0===n||n(g),o(g)},onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),onBlur:()=>d(!1),"aria-label":h,children:[(0,i.jsx)("span",{"aria-hidden":"true",style:{position:"absolute",inset:"1px",borderRadius:"inherit",background:"linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.28) 28%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.14) 100%)",opacity:1,pointerEvents:"none",zIndex:0}}),(0,i.jsx)("span",{"aria-hidden":"true",style:{position:"absolute",top:"8%",left:"9%",width:"52%",height:"40%",borderRadius:"999px",background:"linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.08) 100%)",opacity:.98,filter:"blur(6px)",transform:"rotate(-7deg)",pointerEvents:"none",zIndex:0}}),(0,i.jsx)("span",{"aria-hidden":"true",style:{position:"absolute",left:"14%",bottom:"12%",width:"58%",height:"34%",borderRadius:"999px",background:"classic"===g?"linear-gradient(90deg, rgba(183, 112, 69, 0.16) 0%, rgba(255,255,255,0.28) 34%, rgba(255,255,255,0) 100%)":"linear-gradient(90deg, rgba(102, 212, 239, 0.18) 0%, rgba(255,255,255,0.28) 34%, rgba(255,255,255,0) 100%)",opacity:.9,filter:"blur(10px)",transform:"rotate(3deg)",pointerEvents:"none",zIndex:0}}),(0,i.jsx)("span",{"aria-hidden":"true",style:{position:"absolute",right:"0.65rem",top:"50%",width:"1.85rem",height:"1.85rem",borderRadius:"999px",background:"classic"===g?"radial-gradient(circle, rgba(183, 112, 69, 0.54) 0%, rgba(255,255,255,0.18) 32%, rgba(183, 112, 69, 0.12) 58%, rgba(183, 112, 69, 0) 100%)":"radial-gradient(circle, rgba(102, 212, 239, 0.58) 0%, rgba(255,255,255,0.18) 32%, rgba(102, 212, 239, 0.14) 58%, rgba(102, 212, 239, 0) 100%)",transform:"translateY(-50%)",filter:"blur(3.5px)",pointerEvents:"none",zIndex:0}}),(0,i.jsx)("span",{"aria-hidden":"true",style:{position:"absolute",inset:"1px",borderRadius:"inherit",border:"1px solid rgba(255,255,255,0.34)",opacity:.72,pointerEvents:"none",zIndex:0,mixBlendMode:"screen"}}),(0,i.jsx)("span",{style:{position:"relative",zIndex:1,display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:s?"7.1rem":"9rem",textShadow:"0 1px 0 rgba(255,255,255,0.48)",fontWeight:800},children:x})]}),(0,i.jsx)("style",{children:"\n        @keyframes mode-toggle-pulse {\n          0%, 100% {\n            transform: scale(1);\n          }\n          7% {\n            transform: scale(1.024);\n          }\n          14% {\n            transform: scale(1);\n          }\n          21% {\n            transform: scale(1.03);\n          }\n          28% {\n            transform: scale(1);\n          }\n          35% {\n            transform: scale(1.024);\n          }\n          42% {\n            transform: scale(1);\n          }\n        }\n\n        @keyframes mode-toggle-halo {\n          0%, 100% {\n            opacity: 0.34;\n            transform: scale(0.97);\n          }\n          7% {\n            opacity: 0.84;\n            transform: scale(1.12);\n          }\n          14% {\n            opacity: 0.28;\n            transform: scale(1);\n          }\n          21% {\n            opacity: 0.88;\n            transform: scale(1.15);\n          }\n          28% {\n            opacity: 0.26;\n            transform: scale(1);\n          }\n          35% {\n            opacity: 0.82;\n            transform: scale(1.12);\n          }\n          42% {\n            opacity: 0.24;\n            transform: scale(1);\n          }\n        }\n\n        @keyframes mode-toggle-sneak {\n          0% {\n            transform: translate3d(0, 0, 0) scale(1);\n          }\n          6% {\n            transform: translate3d(-1.5px, 0.5px, 0) scale(0.994) rotate(-0.35deg);\n          }\n          12% {\n            transform: translate3d(2px, -0.5px, 0) scale(0.992) rotate(0.38deg);\n          }\n          18% {\n            transform: translate3d(-1.75px, 0.75px, 0) scale(0.99) rotate(-0.42deg);\n          }\n          24% {\n            transform: translate3d(1px, -0.4px, 0) scale(0.992) rotate(0.24deg);\n          }\n          32% {\n            transform: translate3d(var(--mode-toggle-sneak-prep-x), var(--mode-toggle-sneak-prep-y), 0) scale(0.95, 0.92);\n          }\n          52% {\n            transform: translate3d(var(--mode-toggle-sneak-drift-x), var(--mode-toggle-sneak-drift-y), 0) scale(0.985, 0.97);\n          }\n          76% {\n            transform: translate3d(var(--mode-toggle-sneak-settle-x), var(--mode-toggle-sneak-settle-y), 0) scale(1.01);\n          }\n          100% {\n            transform: translate3d(0, 0, 0) scale(1);\n          }\n        }\n      "})]})}function At(e){let{viewMode:r,setViewMode:t}=e;const s=(0,o.TH)(),d=(0,o.s0)(),{scrollTo:c}=(0,n.vO)(),m=function(){const[e,r]=(0,a.useState)((()=>"undefined"!==typeof window&&window.innerWidth<=768));return(0,a.useEffect)((()=>{if("undefined"===typeof window)return;const e=window.matchMedia("(max-width: 768px)"),t=e=>{r(e.matches)};return r(e.matches),"function"===typeof e.addEventListener?(e.addEventListener("change",t),()=>e.removeEventListener("change",t)):(e.addListener(t),()=>e.removeListener(t))}),[]),e}(),A={paddingTop:m?"2rem":at,paddingBottom:m?"1.5rem":ot},g={contentVisibility:"auto",containIntrinsicSize:m?"480px":"640px",contain:"layout style paint"};(0,a.useEffect)((()=>{var e;if(void 0===(null===(e=s.state)||void 0===e?void 0:e.returnToSection))return;const r=window.setTimeout((()=>{c(s.state.returnToSection),d(s.pathname,{replace:!0,state:null})}),60);return()=>window.clearTimeout(r)}),[s.pathname,s.state,d,c]),(0,a.useEffect)((()=>"classic"===r?(document.body.style.overflow="auto",document.body.style.height="auto",()=>{document.body.style.overflow="auto",document.body.style.height="auto"}):(document.body.style.overflow="hidden",document.body.style.height="100vh",()=>{document.body.style.overflow="auto",document.body.style.height="auto"})),[r]);const x=(0,i.jsx)(pt,{viewMode:r,setViewMode:t,onPrepareMode:()=>{},isCompactViewport:m});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l,{variant:"initial"}),x,"3d"===r?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.Suspense,{fallback:(0,i.jsx)("div",{style:ct}),children:(0,i.jsx)(_r,{children:(0,i.jsx)(et,{})})}),(0,i.jsx)(p,{sectionIndex:0,children:(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:m?"1rem":"1.25rem",textAlign:"center",padding:m?"0 1rem":void 0},children:[(0,i.jsx)("img",{src:$r,alt:"Travis Stephenson",style:{...nt,width:"110px",height:"110px"}}),(0,i.jsx)(I,{}),(0,i.jsx)(Z,{})]})}),(0,i.jsx)(p,{sectionIndex:1,children:(0,i.jsx)(mt,{})}),(0,i.jsx)(p,{sectionIndex:2,children:(0,i.jsx)(ae,{})}),(0,i.jsx)(p,{sectionIndex:3,children:(0,i.jsx)(le,{})}),(0,i.jsx)(p,{sectionIndex:4,children:(0,i.jsx)(we,{})}),(0,i.jsx)(p,{sectionIndex:5,children:(0,i.jsx)(Me,{})}),(0,i.jsx)(p,{sectionIndex:6,children:(0,i.jsx)(ir,{items:Ve,title:"Featured Work - Mobile Apps"})}),(0,i.jsx)(p,{sectionIndex:7,children:(0,i.jsx)(ir,{items:Oe,title:"Featured Work - Platforms"})}),(0,i.jsx)(p,{sectionIndex:8,children:(0,i.jsx)(ir,{items:He,title:"Featured Work - AI"})}),(0,i.jsx)(p,{sectionIndex:9,children:(0,i.jsx)(Ir,{})}),(0,i.jsx)(p,{sectionIndex:10,children:(0,i.jsx)(Or,{})}),(0,i.jsx)(p,{sectionIndex:11,children:(0,i.jsxs)("div",{style:{textAlign:"center",padding:"0.5rem 0"},children:[(0,i.jsx)("p",{style:{maxWidth:"44rem",margin:"0 auto 2rem",fontSize:"clamp(0.9rem, 2vw, 1rem)",color:"var(--text-secondary)",lineHeight:1.8},children:k.Q1.S}),(0,i.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem",justifyContent:"center"},children:[(0,i.jsx)("a",{href:k.Ok.kG,target:"_blank",rel:"noopener noreferrer",style:lt,children:"LinkedIn"}),(0,i.jsx)("a",{href:k.Ok.Do,style:dt,children:"Email"})]})]})}),(0,i.jsx)(L,{}),(0,i.jsx)(w,{}),(0,i.jsx)(f,{}),(0,i.jsx)(y,{})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{style:{maxWidth:m?"100%":"960px",margin:"0 auto",padding:m?"1rem 1rem 7rem":"2rem 1.5rem 8rem"},children:[(0,i.jsxs)("div",{id:"home",style:{paddingTop:m?"4.25rem":"5rem",paddingBottom:m?"2.25rem":"3rem",display:"flex",flexDirection:"column",alignItems:"center",gap:m?"1.15rem":"1.5rem",textAlign:"center"},children:[(0,i.jsx)("img",{src:$r,alt:"Travis Stephenson",style:nt}),(0,i.jsx)(I,{}),(0,i.jsx)(Z,{})]}),(0,i.jsx)("div",{style:{...A,...g,paddingTop:"0.5rem"},children:(0,i.jsx)(mt,{})}),(0,i.jsx)("div",{id:"about",style:{...A,...g},children:(0,i.jsx)(ae,{})}),(0,i.jsx)("div",{id:"strengths",style:{...A,...g},children:(0,i.jsx)(le,{})}),(0,i.jsx)("div",{id:"experience",style:{...A,...g},children:(0,i.jsx)(we,{})}),(0,i.jsx)("div",{id:"services",style:{...A,...g},children:(0,i.jsx)(Me,{})}),(0,i.jsxs)("div",{id:"portfolio",style:{...A,...g,display:"flex",flexDirection:"column",gap:m?"2rem":"2.5rem"},children:[(0,i.jsx)(ir,{items:Ve,title:"Featured Work - Mobile Apps"}),(0,i.jsx)(ir,{items:Oe,title:"Featured Work - Platforms"}),(0,i.jsx)(ir,{items:He,title:"Featured Work - AI"})]}),(0,i.jsx)("div",{id:"testimonials",style:{...A,...g},children:(0,i.jsx)(Ir,{})}),(0,i.jsx)("div",{id:"contact",style:{...A,...g},children:(0,i.jsx)(Or,{})}),(0,i.jsx)(Nr,{})]}),(0,i.jsx)(L,{})]})]})}function gt(){const[e,r]=(0,a.useState)("classic");return(0,i.jsx)(n.ID,{viewMode:e,children:(0,i.jsx)(At,{viewMode:e,setViewMode:r})})}},2279:(e,r,t)=>{t.d(r,{Q1:()=>a,TG:()=>o,n4:()=>n,d6:()=>l,Ff:()=>d,Ku:()=>c,X4:()=>m,g6:()=>p});const a=12,o=2.8,n=1.8,i=4*o+3*.55,s=3*n+1,l=10.5,d=6;function c(e){const r=e%4,t=Math.floor(e/4);return[r*(o+.55)-i/2+o/2,-t*(n+.5)+s/2-n/2,1.5*-Math.hypot(r-1.5,t-1)]}const m=["#b77045","#66d4ef","#7d9d73","#b88b68","#66d4ef","#7d9d73","#b77045","#66d4ef","#7d9d73","#b77045","#66d4ef","#8f8c84"],p=["Hello","Tagline","About Me","Strengths","Experience","Services","Mobile Apps","Platforms","AI Work","Testimonials","Contact","Connect"]},3984:(e,r,t)=>{e.exports=t.p+"static/media/cv.ff0c29edf46fe84e86dd.pdf"},7383:(e,r,t)=>{e.exports=t.p+"static/media/CAMS.77c69965f397a6fcb039.png"},942:(e,r,t)=>{e.exports=t.p+"static/media/Safety.0e5d68ee0100b3366b48.png"},3600:e=>{e.exports="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCABkAGQDASIAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAAAAEDBAcCBQYI/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/9oADAMBAAIQAxAAAAH0W5g5njkqZSsm8vP1FsteZnrfr92jLxh5Ao8RCpjONuSKqLK5+i7X4KOvaR+of5vQrH0hSd19nluCLWeAFRGcbckVFbRWtZWNz+Hq8u3tp87Sr1rWyunzMlQrFBBzFcj1+nZUajdSzvOIqLfYdthyOD6rPts+xfEFg9fkeoClrKM96NiK88r6/W3WyahtNu9Xxr4+362tNVHpOTtFJvzOjncrJa9lHj0l83Fy16qasN8Hc4+I9o1FWdXpUWReBhjrg6A1QnCignMlgoitg6HACYBSXUgN4BL/xAAlEAABAwMEAQUBAAAAAAAAAAADAQIEAAURBhIgIRMHEBQiMSP/2gAIAQEAAQUCTi8jRJK1LBjVCv4j0x7SN4Jx1NqB0iR8ha+Q6tKageEvBOF+m/AtUC1CIwNuDiTZAFqHCfb7unBOGsF3WsMqOx0ZUc0qKrJAfIdODfdfzUxXvo9tkZiw3JMa6QRto8vyODfci/XUZMEdOYAUSaEEuHJQS2r+txTg33KvWom74w3AukYcZwqDbv6ad2GlJwRau+tI9pnG9SX0vqRKVlyvEm4HgsMaEHVphDt4J10CkxwzQda3COOB6g5dFvkGaua1RqZmno8ue+YdxaV9OX7aduy2m5SJr5ku96zJPsTy0I30aegzHBLYr8K8W+dcj3KTv73978qq/fOKERHiOZSlz0N2RCL0hqQqpSupxKaVVXetOcufItDMrR5zRF2tb0zOHMNXlpz+nOoa9JW7vNI76NdWN6uWlWmupCU9aWog0KRBJ5ipsdTl6of5ntfxq1mv/8QAHxEAAQQCAgMAAAAAAAAAAAAAAQIDESAAEgQQEyFB/9oACAEDAQE/Ae4swkTJyEnHRqqBVlIKc8Qx8QqrLmno4rkNxi1bmeopyddEQLrVITX7b//EAB0RAAICAwADAAAAAAAAAAAAAAABAhEDECAhMDH/2gAIAQIBAT8BekUusjaVI8oi7W3qTpikyO6KMkG/hHHNihS6g6svpev/xAAwEAACAQIDBgMHBQAAAAAAAAABAgMAEQQSIRATIjFBUSAwcTNSYYGRsdEUMkJjcv/aAAgBAQAGPwLw3dgo+NMBMJHHRfzTl2CrfSrqbjuPKaON+AaaVzNDiNhSYWTijdtD1B8meUfutYfOt7NxM3Ja0iW3pXs8p7rpWFHMFxlJ8kJ3lUVZpk0+NXQhx8K10rCL13yjyd1pu7ZvnR0DA96EOZ14c3CbUpJklXsWqNuLMHXKj8ifJiNrg6GrCV1J5XIP3p2lZ2dhqx61YKrQubjPoQaizBQFvYKb9PJJA1XiFJfmO1EcbHoQaV5X5dKldSLR8IF/FJhmhaRkA1B60d3hFH+nvTBsPDm6EXFGSaZnPrpX6nCm8kOkkY+9FDHxU2KxN8LgoxmZuRb0rOrEHvesu+3g/sF6AxcIt78X4qMQ4mNnfkt9fpsWy7zESXyL09TTzSNmd2uT4I5bZozwyJ3FPiGAjN75V0C1Bg7ZZW9q3vL0+uy+xHRirrqCOlLOWEbjhcE/yp8RiJDJK/MnaatsZjr3FMx60aXxX2A7JNq01aeQ3gPp4cp5Uya2FEeI7f/EACcQAQACAgECBgIDAQAAAAAAAAEAESExQVFhECBxgZGxocHR4fDx/9oACAEBAAE/IZIEPDv2N1KoG50vvoSmQCz3/uACPkTHkYYeRmJyuCZVMkFpdo7TSXSuVg9oeLNfIleRXeVV+4QBRaaCCrYQc4SF4BeLv5DNYeNNb+4gEymiB3d3cZUD3jVV0tdF8hmni6TBQ4EuuDUwXKiiyqtsrkHH5nemAP5mJAa3w1nnS66Q8WaQ8KIJxWuk4YRw9AH4sdAAAPZVfUIpbkPNp6e0yVoEMrZ0eQxQZczo1uP8ED6K4Vm6l0iyhH5uGPQycaqBqi5C3n4+4pcuLKJelwOFi6+GezPZ9AjW6NWPUtuMiHGA7BxH76XROPf+oAd1zuCC3WUgvf7mVAWDIhj5y/O5mF+ynu/mXVV1nW8sxmnzLLhW+xn3jWXn8rF6zKC7jqBxuMHl5h/9ftHR+ofQHp1jxes4A/7Pp0Y7qUBsQrMSMttSjmO4qvGAXXbMeAH8I6EK7RITaxs/aZXZCioJzmt9X1zKQhd0aO0edxKh1Jli5JT7Q7DUrNxqsnZYhUHVuVbHqTMOw+6hXuJRyxSntNz+xAhl+WA5BOnM4ibWWOybSg+ofZKIV3iWFHE2OsV1mUmI1xQjbheI+9RslLrQ8wYgPWDiKbeDUQVT/9oADAMBAAIAAwAAABDdoT07gyirACcr+Gj7jm4Fsw+xPf3kBUQMELSTjuf0wAEL8GD3/8QAHREBAQEAAwEAAwAAAAAAAAAAAQARECExQSBxof/aAAgBAwEBPxDg74BnDPD4vQQyHiH2Y9tUE4GQZ/gEfR0YkZXd8MgiIAOzZMs49sicz8M/rPcFl8ldfqPOTj//xAAbEQEBAQADAQEAAAAAAAAAAAABABEQITFBUf/aAAgBAgEBPxDgNeBM4yeP0rHtrsxrZx6j2fGYz057Qy7X1J4WEDIl3HRx4yLtdrbONthixLlt9vrHnBPzj//EACQQAQACAgEEAgMBAQAAAAAAAAEAESExQVFhcYEQoZGxwdHx/9oACAEBAAE/EIPwV6QQqPbEqqL6Z5h6mUxBwA5KLXELumKCFCnrSqyCP0AKHI34g3DcqoqZiggQxLoivp4YDaWbbC26wQZQtm8561C6gUL5Kv2sBTNyQCjrYCu/r4kdTbEOEPi4I5AtQTj0E+og8TVO0pysB0dVV/yN1KUHY/GGGi2RC6mS9ln1FcI6m80xfDLt4QXQ93bn1KFbFJDFVc5O7oRH00VwjITMcqL+ooRcTeaPEC4aniiBwFpMzhPTr7mXdNSWubRxiV2SiUbbx2Z0zQZPCLFvoROsa5cYpamwDbTkNM5wfjeLD4XAS2LlC0YNPnL+WVMtNZ9v7lnY2kNdIVwDnEHXnJUWAclUvk51DQiDI4CWii8Z32ily47dzD8JaUBwEqVPdgu1nsWI+mWAqmEz/wAmGZzH21iux0RA0WBbbfOpWumAupaXdGF69GD89D8BEFTWEapgAtznFczSfzr/ADkfUcBgtjwp9wiCKxcF4OB2DmIGDbkDUdgj1VHkFbFo+I+7s9mAbWCWwd3EcEzYFzjO77wQEqqg/fL2xn8lKPcLt+h4ghUWvlhoD2TNNXAWUGrhQ0ws0RQbWWUptx8bYXwdDgmlks5QC/BD8ZFmO9zSDAo3ixoP6LFKMx6tgFZodSluYvqsQaigNWoMa0RRV4MvqJVIxbLS8MGqW/CEDwiExeHWUlnlVTzXEsd4Ro4DQGAMBqUV8sN4jaFNX0idJA+WdwVSVlvMoxQC7KwUavOe8K5QMQ8DoBQdgmQVtHVatInSjCQGUVUpqjdXAvA9TUAqRqZCKt1zUzNlHiXiusURyU64lfOrR5H9R6lXwxSm8JUY3SLXayhxBQYMnsjDAlSjx0Zq2+VgkB0C9QthLbLhdcFzLmj90vmYtkV3BsNMT3IfUpYDwZlWJDvHMvHSMsYgJK9OIrG3At1vHeGtKQ7R7Tsf2AA0IH9xqeI5IDztmHbGvxEwMQwn/9k="},8645:e=>{e.exports="data:image/jpeg;base64,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"},1679:e=>{e.exports="data:image/jpeg;base64,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"},8286:e=>{e.exports="data:image/jpeg;base64,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"},7015:(e,r,t)=>{e.exports=t.p+"static/media/me-about.d933577455260e968926.png"},6635:(e,r,t)=>{e.exports=t.p+"static/media/me.266d005b45d3cc944681.png"},6076:(e,r,t)=>{e.exports=t.p+"static/media/portfolio3.eb565ac3dd3b0e2d43d0.gif"},1183:(e,r,t)=>{e.exports=t.p+"static/media/portfolio5.28c3bec32ae9a741451c.png"},8038:e=>{e.exports="data:image/jpeg;base64,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"},175:(e,r,t)=>{e.exports=t.p+"static/media/sot.7d8d608994738f016ce0.png"},4006:e=>{e.exports=JSON.parse('{"u2":"Travis Stephenson","iQ":["AI Platform Product Manager | PMP Certified | LLM Workflow Automation","Technical Product Leader | Building AI Systems That Ship"],"Ok":{"kG":"https://www.linkedin.com/in/trastephenson/","Do":"mailto:stephenson.tra@gmail.com","dQ":"https://m.me/travis.stephenson.9887"},"jZ":{"Vu":["I build AI-powered platforms that turn complex, manual workflows into automated systems. Over the past 10+ years across product, architecture, and engineering, I\u2019ve shipped systems at scale. That includes consumer apps serving 500,000+ daily users and AI estimation platforms that process construction blueprints 32x faster with 99% accuracy validated against independent domain experts. What drives me is the gap between what AI can do and what most organizations actually ship. I work in that gap, turning LLM capabilities into production systems with real accuracy, real governance, and real business impact. That means owning decisions end-to-end, from data pipelines and model evaluation to workflow design and domain expert trust. Outside of work, I\u2019m usually with my family or building something new just to see how far I can push it. If you\u2019re building serious AI products and need someone who can operate across product and architecture, I\u2019m always open to connecting."],"n9":"Product & platform","pL":"AI Platform Product Manager","r1":"AI platforms, enterprise systems, and high-scale delivery - systems serving 500,000+ daily users."},"ot":[{"num":"10+","label":"Years","sub":"Enterprise and AI delivery"},{"num":"5+","label":"Platforms","sub":"Shipped into production"},{"num":"LLM","label":"Systems","sub":"Multi-agent and RAG architecture"},{"num":"AWS","label":"Cloud","sub":"Platform and DevOps strategy"}],"ao":[{"category":"AI Systems","skills":["Multi-Agent LLM Systems","RAG Architecture","OpenAI / Gemini / DeepSeek","LLM Workflow Orchestration","AI-Enabled Automation"]},{"category":"Platform Architecture","skills":["System Design","Enterprise Architecture","Microservices","API Design","Cloud Architecture","Integration Patterns"]},{"category":"Engineering Operations","skills":["Delivery Governance","Technical Roadmapping","Agile / Scrum","ITIL Foundations","Lean Six Sigma"]},{"category":"Cloud and DevOps","skills":["AWS","Docker","Kubernetes","Terraform","CI/CD","GitHub / GitLab"]},{"category":"Languages and Frameworks","skills":["Python","TypeScript","React","Node.js","GraphQL","PostgreSQL"]},{"category":"Certifications","skills":["AWS Cloud Practitioner","CompTIA Project+","PMP","ITIL Foundations","Lean Six Sigma Yellow Belt"]}],"hQ":[{"category":"Cloud and Infrastructure","tools":["AWS","Azure","Docker","Kubernetes","Terraform","Jenkins"]},{"category":"Development and API","tools":["GitHub / GitLab","VSCode","IntelliJ","Postman","CI/CD Pipelines"]},{"category":"Design and Prototyping","tools":["Figma","Prototyping","Wireframing"]},{"category":"Project and Collaboration","tools":["Jira","Confluence","Slack","Microsoft Teams"]}],"x5":{"TN":"What I Do Best","fr":["Own and scale AI-driven product platforms, including multi-agent systems, RAG pipelines, and production LLM workflows at enterprise scale.","Drive product outcomes across mobile, backend, and cloud systems, improving performance, reliability, and time-to-iteration in production environments.","Lead cross-functional execution across product, engineering, data, and executive stakeholders to deliver complex systems from concept to launch.","Define platform architecture across APIs, cloud infrastructure, and data models to support scalable, high-reliability systems."],"Mx":"Open to:"},"Q1":{"S":"Open to: Senior PM, Principal PM, and AI Platform PM roles at AI-native and enterprise SaaS organizations."},"W":{"e0":"AI platforms \xb7 enterprise\\n500,000+ DAU","vd":"26+ platforms at Appstango\\nLLM \xb7 document AI \xb7 execution","x5":"AI product platforms \xb7 RAG \xb7 LLM\\nMobile \xb7 backend \xb7 cloud \xb7 launch\\nAPIs \xb7 infra \xb7 data at scale","b8":"Engineering Operations\\nAI Platform Product Management\\nDelivery Governance \xb7 LLM Systems","rj":"Figma \xb7 AWS \xb7 Docker \xb7 Kubernetes\\nTerraform \xb7 Jira \xb7 Confluence\\nGitHub \xb7 Postman \xb7 CI/CD","PX":"AI-native products\\nEnterprise SaaS platform leadership","$j":"Senior PM\\nPrincipal PM \xb7 AI Platform PM"},"hg":{"seedsOfThyme":{"title":"Seeds of Thyme","summary":"End-to-end product ownership for iOS/Android essential oil education app - architecture, UX direction, subscription model design, and App Store delivery.","secondaryCta":"App Store","secondaryUrl":"https://apps.apple.com/us/app/seeds-of-thyme/id6450909951"},"essentialLife":{"title":"The Essential Life App","summary":"Led Flutter platform modernization for a consumer mobile app at enterprise scale - 929 ratings, 6,000+ oil solutions, full cross-platform architecture.","secondaryCta":"App Store","secondaryUrl":"https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865"},"camsAtm":{"title":"CAMS ATM Management","summary":"Architected and delivered an enterprise ATM operational management platform - real-time workflow automation, compliance tracking, and cloud-native SaaS on AWS.","secondaryCta":"Company Site","secondaryUrl":"https://camscompanion.com/"},"safetyWallet":{"title":"Safety Wallet","summary":"Directed delivery of a safety compliance platform - automated PDF generation, QR code verification, and multi-stakeholder integration across workers, employers, and certification bodies.","secondaryCta":"Contact Me","secondaryUrl":"#contact"},"vega":{"title":"Vega","summary":"AI-assisted construction takeoff platform that converts blueprint sets into structured, trade-specific outputs estimators can review and use for bidding.","secondaryCta":"Contact Me","secondaryUrl":"#contact"},"llmRagPipelines":{"title":"Multi-Agent LLM & RAG Pipelines","summary":"Architected multi-agent LLM systems and RAG pipelines for enterprise knowledge workflows. Integrated OpenAI, Gemini, and DeepSeek APIs to automate insight extraction and decision support across SaaS platforms.","secondaryCta":"LinkedIn"},"movieVault":{"title":"Movie Vault","summary":"Personal film collection app built solo - TMDB API, Web Audio API, GPU-composited animations, multi-user social rating system. Vanilla JS, zero frameworks, 139KB total.","secondaryCta":"View App"}}}')}}]);
//# sourceMappingURL=678.6c26154d.chunk.js.map