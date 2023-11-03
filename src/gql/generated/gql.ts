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
    "\n    query UserProfile {\n      userProfile {\n        username\n        image_url\n        posts {\n          id\n          content\n          imageUrl\n        }\n        follows {\n          following {\n            username\n            image_url\n          }\n        }\n        followers {\n          following {\n            username\n            image_url\n          }\n        }\n      }\n    }\n  ": types.UserProfileDocument,
    "\n    query UserProfileByUsername($username: String!) {\n      user(username: $username) {\n        username\n        image_url\n        posts {\n          id\n          content\n          imageUrl\n        }\n        follows {\n          following {\n            username\n            image_url\n          }\n        }\n        followers {\n          following {\n            username\n            image_url\n          }\n        }\n      }\n    }\n  ": types.UserProfileByUsernameDocument,
    "\n    query UserFollowingFeed {\n      userProfile {\n        followingFeed {\n          author {\n            username\n            image_url\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n      }\n    }\n  ": types.UserFollowingFeedDocument,
    "\n    mutation CreatePost($content: String, $imageUrl: String) {\n      createPost(content: $content, imageUrl: $imageUrl) {\n        id\n        content\n        imageUrl\n      }\n    }\n  ": types.CreatePostDocument,
    "\n    query Post($postId: ID!) {\n      post(id: $postId) {\n        id\n        author {\n          username\n          image_url\n        }\n        content\n        likeCount\n        repostCount\n        comments {\n          author {\n            username\n            image_url\n          }\n          content\n        }\n        createdAt\n      }\n    }\n  ": types.PostDocument,
    "\n    mutation LikePost($postId: String!) {\n      likePost(postId: $postId) {\n        post {\n          id\n        }\n      }\n    }\n  ": types.LikePostDocument,
    "\n    mutation UnLikePost($postId: String!) {\n      unlikePost(postId: $postId)\n    }\n  ": types.UnLikePostDocument,
    "\n    mutation RepostPost($postId: String!) {\n      repostPost(postId: $postId)\n    }\n  ": types.RepostPostDocument,
    "\n    mutation CommentPost($content: String!, $postId: String!) {\n      commentPost(content: $content, postId: $postId) {\n        id\n        content\n      }\n    }\n  ": types.CommentPostDocument,
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
export function graphql(source: "\n    query UserProfile {\n      userProfile {\n        username\n        image_url\n        posts {\n          id\n          content\n          imageUrl\n        }\n        follows {\n          following {\n            username\n            image_url\n          }\n        }\n        followers {\n          following {\n            username\n            image_url\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query UserProfile {\n      userProfile {\n        username\n        image_url\n        posts {\n          id\n          content\n          imageUrl\n        }\n        follows {\n          following {\n            username\n            image_url\n          }\n        }\n        followers {\n          following {\n            username\n            image_url\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserProfileByUsername($username: String!) {\n      user(username: $username) {\n        username\n        image_url\n        posts {\n          id\n          content\n          imageUrl\n        }\n        follows {\n          following {\n            username\n            image_url\n          }\n        }\n        followers {\n          following {\n            username\n            image_url\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query UserProfileByUsername($username: String!) {\n      user(username: $username) {\n        username\n        image_url\n        posts {\n          id\n          content\n          imageUrl\n        }\n        follows {\n          following {\n            username\n            image_url\n          }\n        }\n        followers {\n          following {\n            username\n            image_url\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserFollowingFeed {\n      userProfile {\n        followingFeed {\n          author {\n            username\n            image_url\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n      }\n    }\n  "): (typeof documents)["\n    query UserFollowingFeed {\n      userProfile {\n        followingFeed {\n          author {\n            username\n            image_url\n          }\n          imageUrl\n          content\n          postType\n          repostUser {\n            username\n          }\n          likeCount\n          repostCount\n          commentCount\n          isUserLiked\n          isUserReposted\n          timestamp\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreatePost($content: String, $imageUrl: String) {\n      createPost(content: $content, imageUrl: $imageUrl) {\n        id\n        content\n        imageUrl\n      }\n    }\n  "): (typeof documents)["\n    mutation CreatePost($content: String, $imageUrl: String) {\n      createPost(content: $content, imageUrl: $imageUrl) {\n        id\n        content\n        imageUrl\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Post($postId: ID!) {\n      post(id: $postId) {\n        id\n        author {\n          username\n          image_url\n        }\n        content\n        likeCount\n        repostCount\n        comments {\n          author {\n            username\n            image_url\n          }\n          content\n        }\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    query Post($postId: ID!) {\n      post(id: $postId) {\n        id\n        author {\n          username\n          image_url\n        }\n        content\n        likeCount\n        repostCount\n        comments {\n          author {\n            username\n            image_url\n          }\n          content\n        }\n        createdAt\n      }\n    }\n  "];
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

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;