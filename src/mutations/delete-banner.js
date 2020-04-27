import gql from 'graphql-tag';

export default gql`
  mutation deleteBanner($id:ID!) {
    deleteBanner(id:$id) {
      id
    }
  }`;