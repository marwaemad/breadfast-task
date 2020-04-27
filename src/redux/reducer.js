const initialState = {
    updatedBanners: []
  }
  
  function BannerReducer  (state = initialState, action)  {
    switch (action.type) {
      case 'SORT':
        state = {
          ...state,
          updatedBanners: action.updatedBanners
        };
        break;
      default:
  
    }
    return state
  }

  export default BannerReducer