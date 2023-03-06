import Navbar, { SocialLinks } from "./Navbar";
import Footer from "./Footer";
import logo from '../public/stock.svg';

type LayoutProps = {
  children: React.ReactNode;
} 

const links = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Blog',
    link: '/blog',
  },
  {
    title: 'About Me',
    link: '/authors',
  },
  {
    title: 'Categories',
    link: '/categories',
  },
];

const socials: SocialLinks[] = [
  {
    social:  'discord',
    link: 'https://google.com',
  },
  {
    social:  'twitter',
    link: 'https://google.com',
  },
  {
    social:  'instagram',
    link: 'https://google.com',
  },
  {
    social:  'facebook',
    link: 'https://google.com',
  },
  {
    social:  'linkedIn',
    link: 'https://google.com',
  },
  {
    social:  'github',
    link: 'https://google.com',
  },
]

const Layout: React.ComponentType<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar logo={logo} links={links} socials={socials} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
export default Layout;
