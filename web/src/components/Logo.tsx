import React from 'react';

interface LogoProps {
  [key: string]: any;
}

function Logo(props: LogoProps) {
  return (
    <img
      alt="Logo"
      src="/static/kuka-mono.svg"
      {...props}
    />
  );
}

export default Logo;
