import gql from 'graphql-tag';

export default gql`
  mutation updateBanner($id:ID!,$input:BannerUpdateInput!) {
    updateBanner(id:$id,input:$input) {
      id
    }
  }`;