import { gql } from '@apollo/client';

export const LOGIN = gql`
  query login($email: String!, $password: String!){
    login(email: $email, password: $password){
      ...on User{
        _id,
        name,
        email,
        password,
        role
      }
      ...on Message {
        message
      }
    }
  }
`;

export const USER_LIST = gql`
  query getUserList {
    getUserList{
      ...on User{
        _id,
        name,
        email,
        password,
        role
      }
      ...on Message {
        message
      }
    }
  }
`;

export const USER = gql`
  query getUser($id: String!) {
    getUser(id: $id){
      ...on User{
        _id,
        name,
        email,
        password,
        role
      }
      ...on Message {
        message
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $role: Int!) {
    addUser(name: $name, email: $email, password: $password, role: $role){
      message
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($id: String!, $name: String!, $email: String!, $password: String!, $role: Int!) {
    editUser(id: $id, name: $name, email: $email, password: $password, role: $role){
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!){
    deleteUser(id: $id){
      message
    }
  }
`;
