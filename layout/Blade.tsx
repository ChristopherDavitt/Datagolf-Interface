import React from "react";
import { MAX_WIDTH } from "../theme/constants";
import withStyle from "../utils/withStyle";

const BladeContainer = withStyle('section', {
  width: '100vw',
});

const BladeMaxWidth = withStyle('div', {
  maxWidth: MAX_WIDTH,
  margin: '0 auto',
  width: '100%',
});

export type BladeProps = {
  children: React.ReactNode;
  bg?: string;
};

const Blade = (props: BladeProps) => {
  return (
    <BladeContainer backgroundColor={props.bg}>
      <BladeMaxWidth>
        {props.children}
      </BladeMaxWidth>
    </BladeContainer>
  )
};
export default Blade;
