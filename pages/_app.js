/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components/macro';
import fontFaces from '../constants/fontSetup';

const GlobalStyle = createGlobalStyle`
${fontFaces}
  body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #ffffff;
  font-family: 'Heebo', sans-serif;
  margin: 0;
  font-size: 20px;
}
`;

function MyApp({ Component, pageProps }) {
  const [allTags, setAllTags] = useState(['All']);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edges" />
        <title>Next.js Blog</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} allTags={allTags} setAllTags={setAllTags} />
    </>
  );
}

export default MyApp;
