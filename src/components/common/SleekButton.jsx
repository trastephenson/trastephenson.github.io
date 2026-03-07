import React from 'react';
import styled from 'styled-components';

const SleekButton = ({
  children,
  onClick,
  type = 'button',
  className,
  style,
  as: Component = 'button',
  ...rest
}) => {
  const sharedProps = {
    className: `btn-31 ${className || ''}`.trim(),
    onClick,
    ...rest,
  };

  if (Component === 'button') {
    sharedProps.type = type;
  }

  return (
    <StyledWrapper style={style}>
      <Component {...sharedProps}>
        <span className="text-container">
          <span className="text">{children}</span>
        </span>
      </Component>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
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
`;

export default SleekButton;
