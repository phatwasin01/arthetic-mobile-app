/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetHelloWorld {\n      helloworld\n    }\n  ": types.GetHelloWorldDocument,
    "\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n      }\n    }\n  ": types.LoginDocument,
    "\n    mutation CreateUser(\n      $username: String!\n      $password: String!\n      $fname: String!\n      $lname: String!\n      $imageUrl: String\n    ) {\n      createUser(\n        username: $username\n        password: $password\n        fname: $fname\n        lname: $lname\n        imageUrl: $imageUrl\n      ) {\n        id\n        username\n        imageUrl\n        fname\n        lname\n      }\n    }\n  ": types.CreateUserDocument,
    "\n    query UserProfile {\n      userProfile {\n        id\n        username\n        imageUrl\n        posts {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n        following {\n          username\n          imageUrl\n        }\n        followers {\n          username\n          imageUrl\n        }\n      }\n    }\n  ": types.UserProfileDocument,
    "\n    query SearchUsers($username: String!) {\n      searchUsers(username: $username) {\n        id\n        username\n        imageUrl\n      }\n    }\n  ": types.SearchUsersDocument,
    "\n    query UserProfileByUsername($username: String!) {\n      user(username: $username) {\n        id\n        username\n        imageUrl\n        isFollowing\n        posts {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n        following {\n          username\n          imageUrl\n        }\n        followers {\n          username\n          imageUrl\n        }\n      }\n    }\n  ": types.UserProfileByUsernameDocument,
    "\n    mutation Follow($username: ID!) {\n      follow(username: $username) {\n        success\n      }\n    }\n  ": types.FollowDocument,
    "\n    mutation Unfollow($username: ID!) {\n      unfollow(username: $username) {\n        success\n      }\n    }\n  ": types.UnfollowDocument,
    "\n    query UserFollowingFeed {\n      userProfile {\n        id\n        followingFeed {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n      }\n    }\n  ": types.UserFollowingFeedDocument,
    "\n    mutation CreatePost($content: String, $imageUrl: String) {\n      createPost(content: $content, imageUrl: $imageUrl) {\n        id\n        content\n        imageUrl\n      }\n    }\n  ": types.CreatePostDocument,
    "\n    query Post($postId: ID!) {\n      post(id: $postId) {\n        id\n        author {\n          username\n          imageUrl\n        }\n        content\n        imageUrl\n        likeCount\n        repostCount\n        comments {\n          author {\n            username\n            imageUrl\n          }\n          content\n          createdAt\n        }\n        isUserLiked\n        isUserReposted\n        createdAt\n      }\n    }\n  ": types.PostDocument,
    "\n    query DiscoverGlobalPosts {\n      discoverGlobalPosts {\n        id\n        imageUrl\n        createdAt\n      }\n    }\n  ": types.DiscoverGlobalPostsDocument,
    "\n    mutation LikePost($postId: String!) {\n      likePost(postId: $postId) {\n        post {\n          id\n        }\n      }\n    }\n  ": types.LikePostDocument,
    "\n    mutation UnLikePost($postId: String!) {\n      unlikePost(postId: $postId)\n    }\n  ": types.UnLikePostDocument,
    "\n    mutation RepostPost($postId: String!) {\n      repostPost(postId: $postId)\n    }\n  ": types.RepostPostDocument,
    "\n    mutation CommentPost($content: String!, $postId: String!) {\n      commentPost(content: $content, postId: $postId) {\n        id\n        content\n      }\n    }\n  ": types.CommentPostDocument,
    "\n    mutation CreateProduct(\n      $name: String!\n      $price: Int!\n      $description: String\n      $imageUrl: String\n      $categoryId: ID\n    ) {\n      createProduct(\n        name: $name\n        price: $price\n        description: $description\n        imageUrl: $imageUrl\n        categoryId: $categoryId\n      ) {\n        id\n        name\n        category {\n          id\n          name\n        }\n        description\n        imageUrl\n        price\n        owner {\n          username\n          imageUrl\n        }\n        isSold\n        createdAt\n      }\n    }\n  ": types.CreateProductDocument,
    "\n    mutation UpdateProductById(\n      $updateProductId: ID!\n      $updateProductName2: String\n      $updateProductDescription2: String\n      $updateProductPrice2: Int\n      $updateProductImageUrl2: String\n      $updateProductCategoryId2: ID\n      $isSold: Boolean\n    ) {\n      updateProduct(\n        id: $updateProductId\n        name: $updateProductName2\n        description: $updateProductDescription2\n        price: $updateProductPrice2\n        imageUrl: $updateProductImageUrl2\n        categoryId: $updateProductCategoryId2\n        isSold: $isSold\n      ) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n      }\n    }\n  ": types.UpdateProductByIdDocument,
    "\n    mutation SoftDeleteProductById($deleteProductId: ID!) {\n      deleteProduct(id: $deleteProductId) {\n        id\n        isDeleted\n      }\n    }\n  ": types.SoftDeleteProductByIdDocument,
    "\n    mutation UnDeleteProductById($unDeleteProductId: ID!) {\n      unDeleteProduct(id: $unDeleteProductId) {\n        id\n        isDeleted\n      }\n    }\n  ": types.UnDeleteProductByIdDocument,
    "\n    query DiscoverGlobalProducts {\n      discoverGlobalProducts {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n      }\n    }\n  ": types.DiscoverGlobalProductsDocument,
    "\n    query MyProducts {\n      myProducts {\n        id\n        name\n        price\n        imageUrl\n        category {\n          id\n          name\n        }\n        isSold\n        isDeleted\n        description\n        createdAt\n      }\n    }\n  ": types.MyProductsDocument,
    "\n    query GetProductById($productId: ID!) {\n      product(id: $productId) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n        isDeleted\n      }\n    }\n  ": types.GetProductByIdDocument,
    "\n    query GetAllCategories {\n      Categories {\n        id\n        name\n      }\n    }\n  ": types.GetAllCategoriesDocument,
    "\n    query GetProductByCategoryId($categoryId: ID!) {\n      productsByCategory(id: $categoryId) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n        isDeleted\n      }\n    }\n  ": types.GetProductByCategoryIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetHelloWorld {\n      helloworld\n    }\n  "): (typeof documents)["\n    query GetHelloWorld {\n      helloworld\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n      }\n    }\n  "): (typeof documents)["\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateUser(\n      $username: String!\n      $password: String!\n      $fname: String!\n      $lname: String!\n      $imageUrl: String\n    ) {\n      createUser(\n        username: $username\n        password: $password\n        fname: $fname\n        lname: $lname\n        imageUrl: $imageUrl\n      ) {\n        id\n        username\n        imageUrl\n        fname\n        lname\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateUser(\n      $username: String!\n      $password: String!\n      $fname: String!\n      $lname: String!\n      $imageUrl: String\n    ) {\n      createUser(\n        username: $username\n        password: $password\n        fname: $fname\n        lname: $lname\n        imageUrl: $imageUrl\n      ) {\n        id\n        username\n        imageUrl\n        fname\n        lname\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserProfile {\n      userProfile {\n        id\n        username\n        imageUrl\n        posts {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n        following {\n          username\n          imageUrl\n        }\n        followers {\n          username\n          imageUrl\n        }\n      }\n    }\n  "): (typeof documents)["\n    query UserProfile {\n      userProfile {\n        id\n        username\n        imageUrl\n        posts {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n        following {\n          username\n          imageUrl\n        }\n        followers {\n          username\n          imageUrl\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query SearchUsers($username: String!) {\n      searchUsers(username: $username) {\n        id\n        username\n        imageUrl\n      }\n    }\n  "): (typeof documents)["\n    query SearchUsers($username: String!) {\n      searchUsers(username: $username) {\n        id\n        username\n        imageUrl\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserProfileByUsername($username: String!) {\n      user(username: $username) {\n        id\n        username\n        imageUrl\n        isFollowing\n        posts {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n        following {\n          username\n          imageUrl\n        }\n        followers {\n          username\n          imageUrl\n        }\n      }\n    }\n  "): (typeof documents)["\n    query UserProfileByUsername($username: String!) {\n      user(username: $username) {\n        id\n        username\n        imageUrl\n        isFollowing\n        posts {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n        following {\n          username\n          imageUrl\n        }\n        followers {\n          username\n          imageUrl\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Follow($username: ID!) {\n      follow(username: $username) {\n        success\n      }\n    }\n  "): (typeof documents)["\n    mutation Follow($username: ID!) {\n      follow(username: $username) {\n        success\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Unfollow($username: ID!) {\n      unfollow(username: $username) {\n        success\n      }\n    }\n  "): (typeof documents)["\n    mutation Unfollow($username: ID!) {\n      unfollow(username: $username) {\n        success\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserFollowingFeed {\n      userProfile {\n        id\n        followingFeed {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n      }\n    }\n  "): (typeof documents)["\n    query UserFollowingFeed {\n      userProfile {\n        id\n        followingFeed {\n          id\n          author {\n            username\n            imageUrl\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreatePost($content: String, $imageUrl: String) {\n      createPost(content: $content, imageUrl: $imageUrl) {\n        id\n        content\n        imageUrl\n      }\n    }\n  "): (typeof documents)["\n    mutation CreatePost($content: String, $imageUrl: String) {\n      createPost(content: $content, imageUrl: $imageUrl) {\n        id\n        content\n        imageUrl\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Post($postId: ID!) {\n      post(id: $postId) {\n        id\n        author {\n          username\n          imageUrl\n        }\n        content\n        imageUrl\n        likeCount\n        repostCount\n        comments {\n          author {\n            username\n            imageUrl\n          }\n          content\n          createdAt\n        }\n        isUserLiked\n        isUserReposted\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    query Post($postId: ID!) {\n      post(id: $postId) {\n        id\n        author {\n          username\n          imageUrl\n        }\n        content\n        imageUrl\n        likeCount\n        repostCount\n        comments {\n          author {\n            username\n            imageUrl\n          }\n          content\n          createdAt\n        }\n        isUserLiked\n        isUserReposted\n        createdAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query DiscoverGlobalPosts {\n      discoverGlobalPosts {\n        id\n        imageUrl\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    query DiscoverGlobalPosts {\n      discoverGlobalPosts {\n        id\n        imageUrl\n        createdAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LikePost($postId: String!) {\n      likePost(postId: $postId) {\n        post {\n          id\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation LikePost($postId: String!) {\n      likePost(postId: $postId) {\n        post {\n          id\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UnLikePost($postId: String!) {\n      unlikePost(postId: $postId)\n    }\n  "): (typeof documents)["\n    mutation UnLikePost($postId: String!) {\n      unlikePost(postId: $postId)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RepostPost($postId: String!) {\n      repostPost(postId: $postId)\n    }\n  "): (typeof documents)["\n    mutation RepostPost($postId: String!) {\n      repostPost(postId: $postId)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CommentPost($content: String!, $postId: String!) {\n      commentPost(content: $content, postId: $postId) {\n        id\n        content\n      }\n    }\n  "): (typeof documents)["\n    mutation CommentPost($content: String!, $postId: String!) {\n      commentPost(content: $content, postId: $postId) {\n        id\n        content\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateProduct(\n      $name: String!\n      $price: Int!\n      $description: String\n      $imageUrl: String\n      $categoryId: ID\n    ) {\n      createProduct(\n        name: $name\n        price: $price\n        description: $description\n        imageUrl: $imageUrl\n        categoryId: $categoryId\n      ) {\n        id\n        name\n        category {\n          id\n          name\n        }\n        description\n        imageUrl\n        price\n        owner {\n          username\n          imageUrl\n        }\n        isSold\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateProduct(\n      $name: String!\n      $price: Int!\n      $description: String\n      $imageUrl: String\n      $categoryId: ID\n    ) {\n      createProduct(\n        name: $name\n        price: $price\n        description: $description\n        imageUrl: $imageUrl\n        categoryId: $categoryId\n      ) {\n        id\n        name\n        category {\n          id\n          name\n        }\n        description\n        imageUrl\n        price\n        owner {\n          username\n          imageUrl\n        }\n        isSold\n        createdAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateProductById(\n      $updateProductId: ID!\n      $updateProductName2: String\n      $updateProductDescription2: String\n      $updateProductPrice2: Int\n      $updateProductImageUrl2: String\n      $updateProductCategoryId2: ID\n      $isSold: Boolean\n    ) {\n      updateProduct(\n        id: $updateProductId\n        name: $updateProductName2\n        description: $updateProductDescription2\n        price: $updateProductPrice2\n        imageUrl: $updateProductImageUrl2\n        categoryId: $updateProductCategoryId2\n        isSold: $isSold\n      ) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateProductById(\n      $updateProductId: ID!\n      $updateProductName2: String\n      $updateProductDescription2: String\n      $updateProductPrice2: Int\n      $updateProductImageUrl2: String\n      $updateProductCategoryId2: ID\n      $isSold: Boolean\n    ) {\n      updateProduct(\n        id: $updateProductId\n        name: $updateProductName2\n        description: $updateProductDescription2\n        price: $updateProductPrice2\n        imageUrl: $updateProductImageUrl2\n        categoryId: $updateProductCategoryId2\n        isSold: $isSold\n      ) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SoftDeleteProductById($deleteProductId: ID!) {\n      deleteProduct(id: $deleteProductId) {\n        id\n        isDeleted\n      }\n    }\n  "): (typeof documents)["\n    mutation SoftDeleteProductById($deleteProductId: ID!) {\n      deleteProduct(id: $deleteProductId) {\n        id\n        isDeleted\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UnDeleteProductById($unDeleteProductId: ID!) {\n      unDeleteProduct(id: $unDeleteProductId) {\n        id\n        isDeleted\n      }\n    }\n  "): (typeof documents)["\n    mutation UnDeleteProductById($unDeleteProductId: ID!) {\n      unDeleteProduct(id: $unDeleteProductId) {\n        id\n        isDeleted\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query DiscoverGlobalProducts {\n      discoverGlobalProducts {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    query DiscoverGlobalProducts {\n      discoverGlobalProducts {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MyProducts {\n      myProducts {\n        id\n        name\n        price\n        imageUrl\n        category {\n          id\n          name\n        }\n        isSold\n        isDeleted\n        description\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    query MyProducts {\n      myProducts {\n        id\n        name\n        price\n        imageUrl\n        category {\n          id\n          name\n        }\n        isSold\n        isDeleted\n        description\n        createdAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProductById($productId: ID!) {\n      product(id: $productId) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n        isDeleted\n      }\n    }\n  "): (typeof documents)["\n    query GetProductById($productId: ID!) {\n      product(id: $productId) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n        isDeleted\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllCategories {\n      Categories {\n        id\n        name\n      }\n    }\n  "): (typeof documents)["\n    query GetAllCategories {\n      Categories {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProductByCategoryId($categoryId: ID!) {\n      productsByCategory(id: $categoryId) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n        isDeleted\n      }\n    }\n  "): (typeof documents)["\n    query GetProductByCategoryId($categoryId: ID!) {\n      productsByCategory(id: $categoryId) {\n        id\n        name\n        price\n        imageUrl\n        owner {\n          username\n          imageUrl\n        }\n        category {\n          id\n          name\n        }\n        isSold\n        description\n        createdAt\n        isDeleted\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;