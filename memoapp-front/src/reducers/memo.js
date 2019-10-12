export const intialState = {
  memoList: [],
  memoCount: 0,
  selectedMemo: null,
  isLoading: false,
  createdMemoFlg: false,
  updatedMemoFlg: false,
  deletedMemoFlg: false
};

export const GET_MEMO_LIST_REQUEST = 'GET_MEMO_LIST_REQUEST';
export const GET_MEMO_LIST_SUCCESS = 'GET_MEMO_LIST_SUCCESS';
export const GET_MEMO_LIST_FAILURE = 'GET_MEMO_LIST_FAILURE';

export const GET_MEMO_REQUEST = 'GET_MEMO_REQUEST';
export const GET_MEMO_SUCCESS = 'GET_MEMO_SUCCESS';
export const GET_MEMO_FAILURE = 'GET_MEMO_FAILURE';

export const CREATE_MEMO_REQUEST = 'CREATE_MEMO_REQUEST';
export const CREATE_MEMO_SUCCESS = 'CREATE_MEMO_SUCCESS';
export const CREATE_MEMO_FAILURE = 'CREATE_MEMO_FAILURE';

export const UPDATE_MEMO_REQUEST = 'UPDATE_MEMO_REQUEST';
export const UPDATE_MEMO_SUCCESS = 'UPDATE_MEMO_SUCCESS';
export const UPDATE_MEMO_FAILURE = 'UPDATE_MEMO_FAILURE';

export const REMOVE_MEMO_REQUEST = 'REMOVE_MEMO_REQUEST';
export const REMOVE_MEMO_SUCCESS = 'REMOVE_MEMO_SUCCESS';
export const REMOVE_MEMO_FAILURE = 'REMOVE_MEMO_FAILURE';

export const REMOVE_MEMOS_REQUEST = 'REMOVE_MEMOS_REQUEST';
export const REMOVE_MEMOS_SUCCESS = 'REMOVE_MEMOS_SUCCESS';
export const REMOVE_MEMOS_FAILURE = 'REMOVE_MEMOS_FAILURE';

export const RESET_CREATED_MEMO_FLG = 'RESET_CREATED_MEMO_FLG';
export const RESET_UPDATED_MEMO_FLG = 'RESET_UPDATED_MEMO_FLG';
export const RESET_DELETED_MEMO_FLG = 'RESET_DELETED_MEMO_FLG';

export const UPDATE_MEMO_LIST_BY_LABEL = 'UPDATE_MEMO_LIST_BY_LABEL';
export const RESET_SELECTED_MEMO = 'RESET_SELECTED_MEMO';
export const RESET_MEMO_LIST = 'RESET_MEMO_LIST';

export const getMemoListAction = {
  type: GET_MEMO_LIST_REQUEST
}

export const getMemoAction = (id) => {
  return {
    type: GET_MEMO_REQUEST,
    data: id
  }
};

export const createMemoAction = (memo) => {
  return {
    type: CREATE_MEMO_REQUEST,
    data: memo
  }
};

export const updateMemoAction = (memo) => {
  return {
    type: UPDATE_MEMO_REQUEST,
    data: memo
  }
};

export const removeMemoAction = (id) => {
  return {
    type: REMOVE_MEMO_REQUEST,
    data: id
  }
};

export const removeMemosAction = (memoIds) => {
  return {
    type: REMOVE_MEMOS_REQUEST,
    data: memoIds
  }
};

export const updateMemoListByLabel = (memos) => {
  return ({
    type: UPDATE_MEMO_LIST_BY_LABEL,
    data: memos
  });
};

export const resetSelectedMemo = {
  type: RESET_SELECTED_MEMO
};

export const resetMemoList = {
  type: RESET_MEMO_LIST
};

export const resetCreatedMemoFlg = {
  type: RESET_CREATED_MEMO_FLG
};

export const resetUpdatedMemoFlg = {
  type: RESET_UPDATED_MEMO_FLG
};

export const resetDeletedMemoFlg = {
  type: RESET_DELETED_MEMO_FLG
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_MEMO_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_MEMO_LIST_SUCCESS: {
      return {
        ...state,
        memoList: action.data,
        memoCount: action.data.length,
        isLoading: false
      };
    }
    case GET_MEMO_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case GET_MEMO_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_MEMO_SUCCESS: {
      return {
        ...state,
        selectedMemo: action.data,
        isLoading: false
      };
    }
    case GET_MEMO_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case CREATE_MEMO_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CREATE_MEMO_SUCCESS: {
      return {
        ...state,
        selectedMemo: action.data,
        createdMemoFlg: true,
        isLoading: false
      };
    }
    case CREATE_MEMO_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_MEMO_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UPDATE_MEMO_SUCCESS: {
      return {
        ...state,
        selectedMemo: action.data,
        updatedMemoFlg: true,
        isLoading: false
      };
    }
    case UPDATE_MEMO_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case REMOVE_MEMO_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case REMOVE_MEMO_SUCCESS: {
      return {
        ...state,
        deletedMemoFlg: true,
        isLoading: false
      };
    }
    case REMOVE_MEMO_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case REMOVE_MEMOS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case REMOVE_MEMOS_SUCCESS: {
      return {
        ...state,
        deletedMemoFlg: true,
        isLoading: false
      };
    }
    case REMOVE_MEMOS_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_MEMO_LIST_BY_LABEL: {
      return {
        ...state,
        memoList: action.data
      };
    }
    case RESET_SELECTED_MEMO: {
      return {
        ...state,
        selectedMemo: {}
      };
    }
    case RESET_MEMO_LIST: {
      return {
        ...state,
        memoList: []
      };
    }
    case RESET_CREATED_MEMO_FLG: {
      return {
        ...state,
        createdMemoFlg: false
      }
    }
    case RESET_UPDATED_MEMO_FLG: {
      return {
        ...state,
        updatedMemoFlg: false
      }
    }
    case RESET_DELETED_MEMO_FLG: {
      return {
        ...state,
        deletedMemoFlg: false
      }
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;