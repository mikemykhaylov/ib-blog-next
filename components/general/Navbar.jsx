import React from 'react';
import styled from 'styled-components/macro';
import Link from 'next/link';
import { grayColor, lightGrayColor, primaryColor } from '../../constants/websiteColors';
import { Heading1 } from './Headings';
import Science from '../icons/Science';
import { DestyledLink } from './Buttons';

const Container = styled.header`
  width: 100%;
  padding: 40px 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 992px) {
    padding-bottom: 80px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  @media (min-width: 768px) {
    & > *:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const NavLink = styled.a`
  text-transform: uppercase;
  color: ${lightGrayColor};
  transition-duration: 200ms;
  text-decoration: none;
  &:hover {
    color: ${grayColor};
  }
`;

const Navbar = () => (
  <Container>
    <Navigation>
      <Heading1>
        <Link href="/page/1">
          <DestyledLink>Neutrino</DestyledLink>
        </Link>
      </Heading1>
      <Science height={32} color={primaryColor} />
    </Navigation>
    <Navigation>
      <Link href="/page/1">
        <NavLink>Home</NavLink>
      </Link>
      <Link href="/about">
        <NavLink>About</NavLink>
      </Link>
    </Navigation>
  </Container>
);

export default Navbar;
