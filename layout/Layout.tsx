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
    title: 'Bet Tracker',
    link: '/bet-tracker',
  },
  {
    title: 'Account Settings',
    link: '/account-settings',
  },
];

const socials: SocialLinks[] = [
  {
    social:  'discord',
    link: 'https://discordapp.com/channels/995687014550741022/1077259906689798174',
  },
  // {
  //   social:  'instagram',
  //   link: 'https://google.com',
  // },
  // {
  //   social:  'facebook',
  //   link: 'https://google.com',
  // },
  // {
  //   social:  'linkedIn',
  //   link: 'https://google.com',
  // },
  // {
  //   social:  'github',
  //   link: 'https://google.com',
  // },
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
