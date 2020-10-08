import { gql } from '@apollo/client';

export const GET_PAGE = gql`
  query GetPage($pageNumber: Int, $pageSize: Int, $tag: String) {
    posts(pageNumber: $pageNumber, pageSize: $pageSize, tag: $tag) {
      hasMore
      posts {
        author
        description
        indexName
        image
        postedOn
        tag
        title
        readingTime
        _id
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPage($id: ID!) {
    post(id: $id) {
      author
      content
      indexName
      image
      postedOn
      tag
      title
      readingTime
      _id
    }
  }
`;
