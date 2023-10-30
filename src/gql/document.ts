import { graphql } from "./generated";

export const GetHelloWorld = graphql(
  /* GraphQL */
  `
    query GetHelloWorld {
      helloworld
    }
  `
);

export const Login = graphql(
  /* GraphQL */
  `
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `
);

export const GetUserProfile = graphql(
  /* GraphQL */
  `
    query UserProfile {
      userProfile {
        username
        image_url
        posts {
          id
          content
          imageUrl
        }
        follows {
          following {
            username
            image_url
          }
        }
        followers {
          following {
            username
            image_url
          }
        }
      }
    }
  `
);

export const GetUserProfileByUsername = graphql(
  /* GraphQL */
  `
    query UserProfileByUsername($username: String!) {
      user(username: $username) {
        username
        image_url
        posts {
          id
          content
          imageUrl
        }
        follows {
          following {
            username
            image_url
          }
        }
        followers {
          following {
            username
            image_url
          }
        }
      }
    }
  `
);

export const GetUserFollowingFeed = graphql(
  /* GraphQL */
  `
    query UserFollowingFeed {
      userProfile {
        followingFeed {
          author {
            username
            image_url
          }
          imageUrl
          content
          postType
          repostUser {
            username
          }
          likeCount
          repostCount
          commentCount
        }
      }
    }
  `
);

export const CreatePost = graphql(
  /* GraphQL */
  `
    mutation CreatePost($content: String, $imageUrl: String) {
      createPost(content: $content, imageUrl: $imageUrl) {
        id
        content
        imageUrl
      }
    }
  `
);

export const GetPost = graphql(
  /* GraphQL */
  `
    query Post($postId: ID!) {
      post(id: $postId) {
        id
        author {
          username
          image_url
        }
        content
        likeCount
        repostCount
        comments {
          author {
            username
            image_url
          }
          content
        }
        createdAt
      }
    }
  `
);
