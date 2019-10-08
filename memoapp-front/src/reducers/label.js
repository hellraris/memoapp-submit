export const intialState = {
  labelList: [],
  selectedLabel: {},
  updatedLabel: false
};

export const GET_LABEL_LIST_REQUEST = 'GET_LABEL_LIST_REQUEST';
export const GET_LABEL_LIST_SUCCESS = 'GET_LABEL_LIST_SUCCESS';
export const GET_LABEL_LIST_FAILURE = 'GET_LABEL_LIST_FAILURE';

export const GET_LABEL_REQUEST = 'GET_LABEL_REQUEST';
export const GET_LABEL_SUCCESS = 'GET_LABEL_SUCCESS';
export const GET_LABEL_FAILURE = 'GET_LABEL_FAILURE';

export const CREATE_LABEL_REQUEST = 'CREATE_LABEL_REQUEST';
export const CREATE_LABEL_SUCCESS = 'CREATE_LABEL_SUCCESS';
export const CREATE_LABEL_FAILURE = 'CREATE_LABEL_FAILURE';

export const UPDATE_LABEL_REQUEST = 'UPDATE_LABEL_REQUEST';
export const UPDATE_LABEL_SUCCESS = 'UPDATE_LABEL_SUCCESS';
export const UPDATE_LABEL_FAILURE = 'UPDATE_LABEL_FAILURE';

export const ADD_LABEL_MEMOS_REQUEST = 'ADD_LABEL_MEMOS_REQUEST';
export const ADD_LABEL_MEMOS_SUCCESS = 'ADD_LABEL_MEMOS_SUCCESS';
export const ADD_LABEL_MEMOS_FAILURE = 'ADD_LABEL_MEMOS_FAILURE';

export const REMOVE_LABEL_REQUEST = 'REMOVE_LABEL_REQUEST';
export const REMOVE_LABEL_SUCCESS = 'REMOVE_LABEL_SUCCESS';
export const REMOVE_LABEL_FAILURE = 'REMOVE_LABEL_FAILURE';

export const REMOVE_LABEL_MEMOS_REQUEST = 'REMOVE_LABEL_MEMOS_REQUEST';
export const REMOVE_LABEL_MEMOS_SUCCESS = 'REMOVE_LABEL_MEMOS_SUCCESS';
export const REMOVE_LABEL_MEMOS_FAILURE = 'REMOVE_LABEL_MEMOS_FAILURE';

export const REMOVE_ALL_LABEL_MEMOS_REQUEST = 'REMOVE_ALL_LABEL_MEMOS_REQUEST';
export const REMOVE_ALL_LABEL_MEMOS_SUCCESS = 'REMOVE_ALL_LABEL_MEMOS_SUCCESS';
export const REMOVE_ALL_LABEL_MEMOS_FAILURE = 'REMOVE_ALL_LABEL_MEMOS_FAILURE';

export const RESET_LABEL_LIST = 'RESET_LABEL_LIST';
export const RESET_SELECTED_LABEL = 'RESET_SELECTED_LABEL';

export const getLabelListAction = {
  type: GET_LABEL_LIST_REQUEST
}

export const resetLabelListAction = {
  type: RESET_LABEL_LIST
}

export const resetSelectedLabelAction = {
  type: RESET_SELECTED_LABEL
}

export const createLabelAction = (title) => {
  return {
    type: CREATE_LABEL_REQUEST,
    data: { title: title }
  }
};

export const updateLabelAction = (label) => {
  return {
    type: UPDATE_LABEL_REQUEST,
    data: label
  }
}

export const getLabelAction = (label) => {
  return {
    type: GET_LABEL_REQUEST,
    data: label._id
  }
};

export const addLabelMemosAction = (addMemosData) => {
  return {
    type: ADD_LABEL_MEMOS_REQUEST,
    data: addMemosData
  }
};

export const removeLabelAction = (id) => {
  return {
    type: REMOVE_LABEL_REQUEST,
    data: id
  }
};

export const removeLabelMemosAction = (removeMemosData) => {
  return {
    type: REMOVE_LABEL_MEMOS_REQUEST,
    data: removeMemosData
  }
};

export const removeAllLabelMemosAction = (memoIds) => {
  return {
    type: REMOVE_ALL_LABEL_MEMOS_REQUEST,
    data: memoIds
  }
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_LABEL_LIST_REQUEST: {
      return {
        ...state,
        labelList: []
      };
    }
    case GET_LABEL_LIST_SUCCESS: {
      return {
        ...state,
        labelList: action.data
      };
    }
    case GET_LABEL_LIST_FAILURE: {
      return {
        ...state
      };
    }
    case GET_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case GET_LABEL_SUCCESS: {
      return {
        ...state,
        selectedLabel: {
          _id: action.data._id,
          title: action.data.title
        }
      };
    }
    case GET_LABEL_FAILURE: {
      return {
        ...state
      };
    }
    case CREATE_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case CREATE_LABEL_SUCCESS: {
      return {
        ...state,
        selectedLabel: action.data
      };
    }
    case CREATE_LABEL_FAILURE: {
      return {
        ...state
      };
    }
    case UPDATE_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case UPDATE_LABEL_SUCCESS: {
      return {
        ...state,
        selectedLabel: action.data
      };
    }
    case UPDATE_LABEL_FAILURE: {
      return {
        ...state
      };
    }
    case ADD_LABEL_MEMOS_REQUEST: {
      return {
        ...state
      };
    }
    case ADD_LABEL_MEMOS_SUCCESS: {
      return {
        ...state
      };
    }
    case ADD_LABEL_MEMOS_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_LABEL_SUCCESS: {
      return {
        ...state
      };
    }
    case REMOVE_LABEL_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_LABEL_MEMOS_REQUEST: {
      return {
        ...state,
        updatedLabel: false
      };
    }
    case REMOVE_LABEL_MEMOS_SUCCESS: {
      return {
        ...state,
        updatedLabel: true
      };
    }
    case REMOVE_LABEL_MEMOS_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_ALL_LABEL_MEMOS_REQUEST: {
      return {
        ...state,
        updatedLabel: false
      };
    }
    case REMOVE_ALL_LABEL_MEMOS_SUCCESS: {
      return {
        ...state,
        updatedLabel: true
      };
    }
    case REMOVE_ALL_LABEL_MEMOS_FAILURE: {
      return {
        ...state
      };
    }
    case RESET_LABEL_LIST: {
      return {
        ...state,
        labelList: []
      };
    }
    case RESET_SELECTED_LABEL: {
      return {
        ...state,
        selectedLabel: {}
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;