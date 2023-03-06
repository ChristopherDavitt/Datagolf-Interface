import { Box, createIcon, Divider, Flex, Icon } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import Link from 'next/link';
import DGLogo from '../public/dg_logo.svg';
import { FaLinkedin, FaFacebook, FaDiscord, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { IconType } from "react-icons/lib/esm/iconBase";
import { APP_NAME, MAX_WIDTH } from '../theme/constants';
import { SVGComponent } from "../types/SVGComponent";
import withStyle from '../utils/withStyle';
import Image from "next/image";
import React from "react";

const socialIcons: SocialIcons = {
  'linkedIn': FaLinkedin,
  'facebook': FaFacebook,
  'discord': FaDiscord,
  'twitter': FaTwitter,
  'github': FaGithub,
  'instagram': FaInstagram,
};

export type SocialIcons = {
  'linkedIn': IconType,
  'facebook': IconType,
  'discord': IconType,
  'twitter': IconType,
  'github': IconType,
  'instagram': IconType,
};

export type SocialTypes = keyof SocialIcons

export type SocialLinks = {
  link: string;
  social: SocialTypes;
}

export type NavLinks = {
  title: string;
  link: string;
}

export type NavItems = {
  logo: any;
  socials?: SocialLinks[];
  links?: NavLinks[];
};

const NavContainer = withStyle('header', { 
  maxWidth: '100vw',
  height: '60px',
  borderBottom: '1px solid',
  borderColor: 'cma.gray',
  backgroundColor: 'bg',
});

const NavFlex = withStyle('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: MAX_WIDTH,
  width: '100%',
  height: '100%',
  margin: '0 auto',
})

const ItemsFlex = withStyle(Flex, {
  alignItems: 'center',
  width: 'inherit',
})

const NavLinkContainer = withStyle('div', {
  marginLeft: '1rem',
  transition: '100ms ease-out',
  width: 'inherit',
})

export type NavButtonProps = {
  title: React.ReactNode;
  link: string;
}

const NavText = withStyle('p', {
  width: 'max-content',
})

const NavLink = (props: NavButtonProps) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link href={props.link}>
      <NavLinkContainer 
        onMouseDown={() => setHover(true)}
        onMouseUp={() => setHover(false)}
        onMouseLeave={() => setHover(false)}
        style={{ transform: hover ? 'scale(0.95)' : undefined }}
      >
          <NavText>{props.title}</NavText>
      </NavLinkContainer>
    </Link>
  )
}

const ImageWrapper = withStyle('div', {
  height: '100%',
  width: 'auto',
  position: 'relative',
});

const DGIcon = createIcon({
  path: <DGLogo />
})

const Navbar = (props: NavItems) => {
  return (
    <NavContainer>
      <NavFlex>
        <ItemsFlex>
          <ImageWrapper>
            <Image src={props.logo} alt={`logo for ${APP_NAME}`} />
          </ImageWrapper>
          {/* DELETE THESE LATER
          <NavLink link="/#" title="Home" />
          <NavLink link="/" title="Blog" />
          <NavLink link="/" title="About" />
          <NavLink link="/" title="Categories" /> */}
          {props.links?.map((link) => (
            <>
              <NavLink key={link.title} link={link.link} title={link.title} />
            </>
          ) )}
        </ItemsFlex>
        <ItemsFlex flex={0}>
          {props.socials?.map((soc) => (
            <>
              <Link key={soc.social} passHref href={soc.link}>
                <Icon marginLeft="0.5rem" boxSize="6" _hover={{ color: 'gray.600' }} color="gray.500" as={socialIcons[soc.social]} />
              </Link>
            </>
          ))}
        </ItemsFlex>
      </NavFlex>
    </NavContainer>
  );
};
export default Navbar;