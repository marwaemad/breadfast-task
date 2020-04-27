import gql from 'graphql-tag'

export default gql`
    mutation createBanner($data:[BannerInput]!) {
        createBanner(data:$data){
           id
        }
    }`;