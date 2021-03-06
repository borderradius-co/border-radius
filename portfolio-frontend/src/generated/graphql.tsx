import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['Float'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  comments: Array<Comment>;
};

export type BookToComment = {
  id: Scalars['Float'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  text: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
  books: Array<Book>;
  projects: Array<Project>;
  createdAt: Scalars['String'];
};

export type CreateBookInput = {
  title: Scalars['String'];
};

export type CreateCommentInput = {
  text: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createProject: Project;
  updateProject?: Maybe<Project>;
  deleteProject: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createComment: Comment;
  createProjectComment: Comment;
  updateComment: Comment;
  deleteComment: Comment;
  createBook: Book;
  updateBook: Book;
  deleteBook: Book;
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  projectId: Scalars['Int'];
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationUpdateProjectArgs = {
  text: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  books: Array<BookToComment>;
  comment: CreateCommentInput;
};


export type MutationCreateProjectCommentArgs = {
  projects: Array<ProjectToComment>;
  comment: CreateCommentInput;
};


export type MutationUpdateCommentArgs = {
  comment: CreateCommentInput;
  id: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
};


export type MutationCreateBookArgs = {
  book: CreateBookInput;
};


export type MutationUpdateBookArgs = {
  book: CreateBookInput;
  id: Scalars['String'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['String'];
};

export type PaginatedBooks = {
  __typename?: 'PaginatedBooks';
  books: Array<Book>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  projects: Array<Project>;
  hasMore: Scalars['Boolean'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  name: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type ProjectInput = {
  name: Scalars['String'];
  text: Scalars['String'];
};

export type ProjectToComment = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  projects: PaginatedProjects;
  project?: Maybe<Project>;
  me?: Maybe<User>;
  comments: Array<Comment>;
  comment?: Maybe<Comment>;
  allBooks: Array<Book>;
  books: PaginatedBooks;
  book?: Maybe<Book>;
};


export type QueryProjectsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryCommentsArgs = {
  text?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryCommentArgs = {
  id?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
};


export type QueryAllBooksArgs = {
  title?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryBooksArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryBookArgs = {
  id?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type BookSnippetFragment = (
  { __typename?: 'Book' }
  & Pick<Book, 'id' | 'title' | 'createdAt' | 'updatedAt'>
);

export type DefaultErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type DefaultUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type DefaultUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & DefaultErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & DefaultUserFragment
  )> }
);

export type ProjectSnippetFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'name' | 'text' | 'textSnippet' | 'createdAt' | 'updatedAt' | 'creatorId' | 'points' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'createdAt'>
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & DefaultUserResponseFragment
  ) }
);

export type CreateBookMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateBookMutation = (
  { __typename?: 'Mutation' }
  & { createBook: (
    { __typename?: 'Book' }
    & Pick<Book, 'id' | 'title'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text'>
    )> }
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  id: Scalars['Float'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text'>
    & { books: Array<(
      { __typename?: 'Book' }
      & Pick<Book, 'id'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'text' | 'createdAt' | 'updatedAt' | 'points' | 'creatorId'>
  ) }
);

export type CreateProjectCommentMutationVariables = Exact<{
  text: Scalars['String'];
  id: Scalars['Float'];
}>;


export type CreateProjectCommentMutation = (
  { __typename?: 'Mutation' }
  & { createProjectComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id'>
    )> }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  ) }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & DefaultUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & DefaultUserResponseFragment
  ) }
);

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'name' | 'id' | 'updatedAt' | 'textSnippet'>
  )> }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  projectId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type AllBooksQueryVariables = Exact<{
  take: Scalars['Int'];
}>;


export type AllBooksQuery = (
  { __typename?: 'Query' }
  & { allBooks: Array<(
    { __typename?: 'Book' }
    & Pick<Book, 'title' | 'id'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'text' | 'id'>
    )> }
  )> }
);

export type BookQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type BookQuery = (
  { __typename?: 'Query' }
  & { book?: Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'title' | 'id' | 'createdAt'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )> }
  )> }
);

export type BooksQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books: (
    { __typename?: 'PaginatedBooks' }
    & Pick<PaginatedBooks, 'hasMore'>
    & { books: Array<(
      { __typename?: 'Book' }
      & BookSnippetFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & DefaultUserFragment
  )> }
);

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'points' | 'text' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  )> }
);

export type ProjectsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'PaginatedProjects' }
    & Pick<PaginatedProjects, 'hasMore'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & ProjectSnippetFragment
    )> }
  ) }
);

export const BookSnippetFragmentDoc = gql`
    fragment BookSnippet on Book {
  id
  title
  createdAt
  updatedAt
}
    `;
export const DefaultErrorFragmentDoc = gql`
    fragment DefaultError on FieldError {
  field
  message
}
    `;
export const DefaultUserFragmentDoc = gql`
    fragment DefaultUser on User {
  id
  username
}
    `;
export const DefaultUserResponseFragmentDoc = gql`
    fragment DefaultUserResponse on UserResponse {
  errors {
    ...DefaultError
  }
  user {
    ...DefaultUser
  }
}
    ${DefaultErrorFragmentDoc}
${DefaultUserFragmentDoc}`;
export const ProjectSnippetFragmentDoc = gql`
    fragment ProjectSnippet on Project {
  id
  name
  text
  textSnippet
  createdAt
  updatedAt
  creatorId
  points
  voteStatus
  creator {
    id
    username
    createdAt
  }
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateBookDocument = gql`
    mutation CreateBook($title: String!) {
  createBook(book: {title: $title}) {
    id
    title
    comments {
      id
      text
    }
  }
}
    `;

export function useCreateBookMutation() {
  return Urql.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument);
};
export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $id: Float!) {
  createComment(comment: {text: $text}, books: {id: $id}) {
    id
    text
    books {
      id
    }
    user {
      username
    }
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    id
    name
    text
    createdAt
    updatedAt
    points
    creatorId
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const CreateProjectCommentDocument = gql`
    mutation CreateProjectComment($text: String!, $id: Float!) {
  createProjectComment(comment: {text: $text}, projects: {id: $id}) {
    id
    text
    user {
      id
      username
    }
    projects {
      id
    }
  }
}
    `;

export function useCreateProjectCommentMutation() {
  return Urql.useMutation<CreateProjectCommentMutation, CreateProjectCommentMutationVariables>(CreateProjectCommentDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Float!) {
  deleteComment(id: $id) {
    id
  }
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: Int!) {
  deleteProject(id: $id)
}
    `;

export function useDeleteProjectMutation() {
  return Urql.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument);
};
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation LOGOUT {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateProjectDocument = gql`
    mutation UpdateProject($id: Int!, $name: String!, $text: String!) {
  updateProject(id: $id, name: $name, text: $text) {
    name
    id
    updatedAt
    textSnippet
  }
}
    `;

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $projectId: Int!) {
  vote(value: $value, projectId: $projectId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const AllBooksDocument = gql`
    query AllBooks($take: Int!) {
  allBooks(take: $take) {
    title
    id
    comments {
      text
      id
    }
  }
}
    `;

export function useAllBooksQuery(options: Omit<Urql.UseQueryArgs<AllBooksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllBooksQuery>({ query: AllBooksDocument, ...options });
};
export const BookDocument = gql`
    query Book($id: Float!) {
  book(id: $id) {
    title
    id
    createdAt
    comments {
      id
      text
      createdAt
      user {
        username
      }
    }
  }
}
    `;

export function useBookQuery(options: Omit<Urql.UseQueryArgs<BookQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BookQuery>({ query: BookDocument, ...options });
};
export const BooksDocument = gql`
    query Books($limit: Int!, $cursor: String) {
  books(limit: $limit, cursor: $cursor) {
    hasMore
    books {
      ...BookSnippet
    }
  }
}
    ${BookSnippetFragmentDoc}`;

export function useBooksQuery(options: Omit<Urql.UseQueryArgs<BooksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BooksQuery>({ query: BooksDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...DefaultUser
  }
}
    ${DefaultUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProjectDocument = gql`
    query Project($id: Int!) {
  project(id: $id) {
    id
    createdAt
    updatedAt
    name
    points
    text
    voteStatus
    creator {
      id
      username
    }
    comments {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
}
    `;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectQuery>({ query: ProjectDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects($limit: Int!, $cursor: String) {
  projects(limit: $limit, cursor: $cursor) {
    hasMore
    projects {
      ...ProjectSnippet
    }
  }
}
    ${ProjectSnippetFragmentDoc}`;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};