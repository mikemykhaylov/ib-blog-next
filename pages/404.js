import Link from 'next/link';
import React from 'react';
import styled from 'styled-components/macro';
import { PrimaryButton, DestyledLink } from '../components/general/Buttons';
import { Container, InnerContainer } from '../components/general/Containers';
import { Heading1 } from '../components/general/Headings';
import Navbar from '../components/general/Navbar';

const NotFoundContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25vh;
  & > :first-child {
    margin-bottom: 32px;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <InnerContainer>
        <Navbar />
        <NotFoundContainer>
          <Heading1>Looks like you are lost</Heading1>
          <PrimaryButton>
            <Link href="/page/1">
              <DestyledLink>Return back</DestyledLink>
            </Link>
          </PrimaryButton>
        </NotFoundContainer>
      </InnerContainer>
    </Container>
  );
};

export default NotFound;
