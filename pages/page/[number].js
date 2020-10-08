import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Link from 'next/link';
import { fromUnixTime } from 'date-fns';
import Navbar from '../../components/general/Navbar';
import Post from '../../components/general/Post';
import apolloClient from '../../lib/apolloClient';
import { Container, InnerContainer } from '../../components/general/Containers';
import { Heading2, Text } from '../../components/general/Headings';
import { PrimaryButton, DestyledLink } from '../../components/general/Buttons';
import { primaryColor, lightPrimaryColor } from '../../constants/websiteColors';
import { GET_PAGE } from '../../apollo/requests';

const MainHeading = styled(Heading2)`
  margin-bottom: 2rem;
`;

const MainText = styled(Text)`
  width: 100%;
  margin-bottom: 2.5rem !important;
  @media (min-width: 576px) {
    width: 60%;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  & > *:not(:last-child) {
    margin-right: 32px;
  }
`;

const TagFilter = styled.button`
  font-family: 'Raleway';
  font-variation-settings: 'wght' 700;
  font-size: 1rem;
  color: ${(props) => (props.active ? '#ffffff' : primaryColor)};
  background-color: ${(props) => (props.active ? primaryColor : lightPrimaryColor)};
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  transition-duration: 200ms;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: ${primaryColor};
  }
`;

const PostsRow = styled.section`
  width: 100%;
  display: grid;
  gap: 60px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: min-content;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  margin-bottom: 60px;
`;

const LoadMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  & > *:first-child {
    margin-right: 32px;
  }
`;

const Home = ({
  fetchedPosts,
  hasMore,
  currentTag,
  tags,
  currentPageNumber,
  allTags,
  setAllTags,
}) => {
  useEffect(() => {
    const checker = (arr, target) => target.every((v) => arr.includes(v));
    if (!checker(allTags, tags)) {
      setAllTags([...new Set([...allTags, ...tags])]);
    }
  }, [currentPageNumber]);
  return (
    <Container>
      <InnerContainer>
        <Navbar />
        <MainHeading>Let&apos;s talk science</MainHeading>
        <MainText>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis voluptate exercitationem
          earum, possimus deleniti sed? Dolorum quae velit pariatur provident ducimus, beatae rerum
          dolorem ut deleniti nam facere, molestiae illum!
        </MainText>
        <TagContainer>
          {allTags.map((tag) => (
            <TagFilter key={tag} active={tag === currentTag}>
              <Link href={tag === 'All' ? '/page/1' : `/page/1?tag=${tag}`}>
                <DestyledLink>{tag}</DestyledLink>
              </Link>
            </TagFilter>
          ))}
        </TagContainer>
        <>
          <PostsRow>
            {fetchedPosts.map((post, i) => {
              return (
                <Post
                  key={post._id}
                  isHuge={i % 7 === 0}
                  author={post.author}
                  description={post.description}
                  image={post.image}
                  postedOn={fromUnixTime(post.postedOn / 1000)}
                  tag={post.tag}
                  title={post.title}
                  indexName={post.indexName}
                  readingTime={post.readingTime}
                />
              );
            })}
          </PostsRow>
          <LoadMoreContainer>
            {currentPageNumber > 1 && (
              <PrimaryButton type="button">
                <Link
                  href={`/page/${currentPageNumber - 1}${
                    currentTag !== 'All' ? `?tag=${currentTag}` : ''
                  }`}
                >
                  <DestyledLink>Previous page</DestyledLink>
                </Link>
              </PrimaryButton>
            )}
            {hasMore && (
              <PrimaryButton type="button">
                <Link
                  href={`/page/${currentPageNumber + 1}${
                    currentTag !== 'All' ? `?tag=${currentTag}` : ''
                  }`}
                >
                  <DestyledLink>Next Page</DestyledLink>
                </Link>
              </PrimaryButton>
            )}
          </LoadMoreContainer>
        </>
      </InnerContainer>
    </Container>
  );
};

Home.propTypes = {
  fetchedPosts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      postedOn: PropTypes.string,
      tag: PropTypes.string,
      title: PropTypes.string,
      indexName: PropTypes.string,
      readingTime: PropTypes.number,
    }),
  ).isRequired,
  hasMore: PropTypes.bool.isRequired,
  currentTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setAllTags: PropTypes.func.isRequired,
};

export default Home;

export async function getServerSideProps(context) {
  const { number: currentPageNumber, tag: currentTag } = context.query;
  const { data } = await apolloClient.query({
    query: GET_PAGE,
    variables: {
      pageNumber: +currentPageNumber,
      pageSize: 28,
      tag: currentTag !== 'All' ? currentTag : null,
    },
  });
  const tags = [...new Set(data.posts.posts.map((post) => post.tag))];
  return {
    props: {
      hasMore: data.posts.hasMore,
      fetchedPosts: data.posts.posts,
      currentTag: currentTag || 'All',
      currentPageNumber: +currentPageNumber,
      tags,
    }, // will be passed to the page component as props
  };
}
