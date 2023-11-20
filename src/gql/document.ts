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
export const CreateUser = graphql(
  /* GraphQL */
  `
    mutation CreateUser(
      $username: String!
      $password: String!
      $fname: String!
      $lname: String!
      $imageUrl: String
    ) {
      createUser(
        username: $username
        password: $password
        fname: $fname
        lname: $lname
        imageUrl: $imageUrl
      ) {
        id
        username
        imageUrl
        fname
        lname
      }
    }
  `
);
export const GetUserProfile = graphql(
  /* GraphQL */
  `
    query UserProfile {
      userProfile {
        id
        username
        imageUrl
        posts {
          id
          author {
            username
            imageUrl
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
          isUserLiked
          isUserReposted
          timestamp
        }
        following {
          username
          imageUrl
        }
        followers {
          username
          imageUrl
        }
      }
    }
  `
);

export const SearchUser = graphql(
  /* GraphQL */
  `
    query SearchUsers($username: String!) {
      searchUsers(username: $username) {
        id
        username
        imageUrl
      }
    }
  `
);

export const GetUserProfileByUsername = graphql(
  /* GraphQL */
  `
    query UserProfileByUsername($username: String!) {
      user(username: $username) {
        id
        username
        imageUrl
        isFollowing
        posts {
          id
          author {
            username
            imageUrl
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
          isUserLiked
          isUserReposted
          timestamp
        }
        following {
          username
          imageUrl
        }
        followers {
          username
          imageUrl
        }
      }
    }
  `
);

export const FollowUser = graphql(
  /* GraphQL */
  `
    mutation Follow($username: ID!) {
      follow(username: $username) {
        success
      }
    }
  `
);

export const UnfollowUser = graphql(
  /* GraphQL */
  `
    mutation Unfollow($username: ID!) {
      unfollow(username: $username) {
        success
      }
    }
  `
);

export const GetUserFollowingFeed = graphql(
  /* GraphQL */
  `
    query UserFollowingFeed {
      userProfile {
        id
        followingFeed {
          id
          author {
            username
            imageUrl
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
          isUserLiked
          isUserReposted
          timestamp
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
          imageUrl
        }
        content
        imageUrl
        likeCount
        repostCount
        comments {
          author {
            username
            imageUrl
          }
          content
          createdAt
        }
        isUserLiked
        isUserReposted
        createdAt
      }
    }
  `
);
export const GetPostGlobal = graphql(
  /* GraphQL */
  `
    query DiscoverGlobalPosts {
      discoverGlobalPosts {
        id
        imageUrl
        createdAt
      }
    }
  `
);

export const LikePost = graphql(
  /* GraphQL */
  `
    mutation LikePost($postId: String!) {
      likePost(postId: $postId) {
        post {
          id
        }
      }
    }
  `
);

export const UnLikePost = graphql(
  /* GraphQL */
  `
    mutation UnLikePost($postId: String!) {
      unlikePost(postId: $postId)
    }
  `
);

export const RepostPost = graphql(
  /* GraphQL */
  `
    mutation RepostPost($postId: String!) {
      repostPost(postId: $postId)
    }
  `
);

export const CommentPost = graphql(
  /* GraphQL */
  `
    mutation CommentPost($content: String!, $postId: String!) {
      commentPost(content: $content, postId: $postId) {
        id
        content
      }
    }
  `
);

export const CreateProduct = graphql(
  /* GraphQL */
  `
    mutation CreateProduct(
      $name: String!
      $price: Int!
      $description: String
      $imageUrl: String
      $categoryId: ID
    ) {
      createProduct(
        name: $name
        price: $price
        description: $description
        imageUrl: $imageUrl
        categoryId: $categoryId
      ) {
        id
        name
        category {
          id
          name
        }
        description
        imageUrl
        price
        owner {
          username
          imageUrl
        }
        isSold
        createdAt
      }
    }
  `
);

export const UpdateProductById = graphql(
  /* GraphQL */
  `
    mutation UpdateProductById(
      $updateProductId: ID!
      $updateProductName2: String
      $updateProductDescription2: String
      $updateProductPrice2: Int
      $updateProductImageUrl2: String
      $updateProductCategoryId2: ID
      $isSold: Boolean
    ) {
      updateProduct(
        id: $updateProductId
        name: $updateProductName2
        description: $updateProductDescription2
        price: $updateProductPrice2
        imageUrl: $updateProductImageUrl2
        categoryId: $updateProductCategoryId2
        isSold: $isSold
      ) {
        id
        name
        price
        imageUrl
        owner {
          username
          imageUrl
        }
        category {
          id
          name
        }
        isSold
        description
        createdAt
      }
    }
  `
);
export const SoftDeleteProductById = graphql(
  /* GraphQL */
  `
    mutation SoftDeleteProductById($deleteProductId: ID!) {
      deleteProduct(id: $deleteProductId) {
        id
        isDeleted
      }
    }
  `
);

export const UnDeleteProductById = graphql(
  /* GraphQL */
  `
    mutation UnDeleteProductById($unDeleteProductId: ID!) {
      unDeleteProduct(id: $unDeleteProductId) {
        id
        isDeleted
      }
    }
  `
);

export const DiscoveryGlobalProducts = graphql(
  /* GraphQL */
  `
    query DiscoverGlobalProducts {
      discoverGlobalProducts {
        id
        name
        price
        imageUrl
        owner {
          username
          imageUrl
        }
        category {
          id
          name
        }
        isSold
        description
        createdAt
      }
    }
  `
);

export const GetMyProducts = graphql(
  /* GraphQL */
  `
    query MyProducts {
      myProducts {
        id
        name
        price
        imageUrl
        category {
          id
          name
        }
        isSold
        isDeleted
        description
        createdAt
      }
    }
  `
);

export const GetProductById = graphql(
  /* GraphQL */
  `
    query GetProductById($productId: ID!) {
      product(id: $productId) {
        id
        name
        price
        imageUrl
        owner {
          username
          imageUrl
        }
        category {
          id
          name
        }
        isSold
        description
        createdAt
        isDeleted
      }
    }
  `
);

export const GetAllCategories = graphql(
  /* GraphQL */
  `
    query GetAllCategories {
      Categories {
        id
        name
      }
    }
  `
);

export const GetProductByCategoryId = graphql(
  /* GraphQL */
  `
    query GetProductByCategoryId($categoryId: ID!) {
      productsByCategory(id: $categoryId) {
        id
        name
        price
        imageUrl
        owner {
          username
          imageUrl
        }
        category {
          id
          name
        }
        isSold
        description
        createdAt
        isDeleted
      }
    }
  `
);
