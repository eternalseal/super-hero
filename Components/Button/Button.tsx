import React, { ReactChildren, useEffect, useState } from 'react';

interface Props {
  onTap: Function,
  children: ReactChildren
}

const Button = (props: Props) => {

  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        props.onTap(e);
      }}
      className="primary-button"
    >
      {props.children}
    </button>
  );
};

export default Button;
