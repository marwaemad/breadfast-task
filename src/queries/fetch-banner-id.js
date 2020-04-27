import gql from 'graphql-tag';

export default gql`
query getBannerById($id:ID!){
    getBannerById(id:$id){
        id,
        screen,
        serve,
        name_en,
        name_ar,
        image_en,
        image_ar,
        redirection,
        start_date,
        end_date,
        active
    }
  }
`;