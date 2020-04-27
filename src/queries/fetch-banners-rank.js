import gql from'graphql-tag'

export default gql`
{
    validBannersForUser{
        id,
        name_en,
        rank
    }

}`;