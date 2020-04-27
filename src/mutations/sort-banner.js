import gql from 'graphql-tag';

export default gql`
mutation bannerRank ($data: [BannerRankInput]!){
    bannerRank(data:$data){
        id
    }
}
`;