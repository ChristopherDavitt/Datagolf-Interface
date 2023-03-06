import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { NAV_HEIGHT } from "../theme/constants";
import useScrollTop from "../utils/useScrollTop";
import useWindowDimensions from "../utils/useWindowDimensions";
import withStyle from "../utils/withStyle";
import Blade from "./Blade";

const SideBar = withStyle('div', {
  display: 'block;',
  width: '280px',
  minHeight: '100vh',
  borderLeft: '1px solid',
  borderColor: 'gray.500',
  paddingX: '32px',
});

const SideBarInner = withStyle('div', {
  position: 'relative;',
  display: 'inline-block',
  width: '100%',
  height: '100%',
  alignSelf: 'flex-start'
});

const StickyNode = withStyle('div', {
  position: 'sticky',
  top: 0,
  display: 'block',
})

const BlogLayout = ({children}: {children: React.ReactNode}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  
  const [pointer, setPointer] = React.useState<number>(0)
  const [position, setPosition] = React.useState<'relative' | 'sticky'>('sticky')
  const [top, setTop] = React.useState(0);
  const [margin, setMargin] = React.useState(0);
  const [tB, setTB] = React.useState<'top' | 'bot'>('top');
  
  const divHeight = ref?.current?.clientHeight || undefined;
  const { height: windowHeight } = useWindowDimensions();
  const { scrollTop } = useScrollTop();

  React.useEffect(() => {
    const height = divHeight || 0;
    const dif =  height - windowHeight + 60;
    if (dif < 0) {
      setPosition('sticky');
      setTop(0);
      setMargin(0);
      return;
    }
    if (tB === 'top') {
      if (pointer + dif >= scrollTop && scrollTop >= pointer) {
        if (position === 'sticky') {
          setPosition('relative');
          setMargin(scrollTop < NAV_HEIGHT ? scrollTop : scrollTop - NAV_HEIGHT);
          setTop(0);
        }
        return
      } else if (position === 'relative') {
        if (scrollTop > pointer + dif) {
          setPosition('sticky');
          setTB('bot');
          setTop(-1 * dif);
        }
        else {
          setPosition('sticky');
          setTB('top');
          setTop(0);
          setMargin(0);
        }
      } 
    } else if (tB === 'bot') {
      if (pointer - dif <= scrollTop && scrollTop <= pointer) {
        if (position === 'sticky') {
          setPosition('relative');
          setMargin(scrollTop - dif - NAV_HEIGHT);
          setTop(0);
        }
        return
      } else if (position === 'relative') {
        if (scrollTop <= pointer) {
          setPosition('sticky');
          setTB('top');
          setTop(0);
          setMargin(0);
        }
        else {
          setPosition('sticky');
          setTB('bot');
          setTop(-1 * dif);
        }
      } 
    }
    setPointer(scrollTop);    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTop, windowHeight]);

  return (
    <Blade>
      <Flex flexDir="row" justify="space-around">
        <div style={{ width: '800px' }}>
          {children}
        </div>
        <SideBar>
          <SideBarInner>
            <StickyNode position={position} marginTop={`${margin}px`} top={`${top}`} ref={ref}>
              Get Stuff
            </StickyNode>
          </SideBarInner>
        </SideBar>
      </Flex>
    </Blade>
  )
}
export default BlogLayout;