import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import LabelInputModal from './modals/LabelInputModal';
import { getLabelListAction, getLabelAction, resetSelectedLabelAction } from '../reducers/label';
import { getMemoListAction, resetSelectedMemo } from '../reducers/memo';

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 20%;
  margin-right: 5px;
  border: 1px solid #DFDFDF;
  height: auto;
  overflow-y: scroll;
`;
const LabelItem = styled.div`
  border-bottom: 1px solid #DFDFDF;
  padding: 16px;
  text-align: center;
  word-break: break-word;
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  cursor: pointer;
  &:hover{
    background-color: mediumaquamarine;
  }
  &:active{
    background-color: gainsboro;
  }
  &.add-btn {
    border-top: 1px solid #DFDFDF;
    border-bottom: 0px;
    margin-top: auto;
  }
`;

const LabelListView = () => {
  const { labelList, selectedLabel, updatedLabel } = useSelector(state => state.label);
  const { updatedMemo, memoCount } = useSelector(state => state.memo);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getLabelListAction);
  }, []);

  useEffect(() => {
    if (updatedLabel || updatedMemo) {
      dispatch(getLabelListAction);
    }
  }, [updatedLabel, updatedMemo]);

  const [isOpenModal, setModal] = useState(false);

  const onClickLabel = useCallback((label) => {
    if(label === null) {
      dispatch(getMemoListAction);
      dispatch(resetSelectedLabelAction);
    } else {
      dispatch(getLabelAction(label));
    }
    dispatch(resetSelectedMemo);
  }, [selectedLabel]);

  const handleModal = useCallback(() => {
    setModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Overlay>
      <div>
        { isOpenModal ? 
            <LabelInputModal label={null} close={handleModal} /> 
          : null }
        <LabelItem
          style={Object.entries(selectedLabel).length === 0 && selectedLabel.constructor === Object ? 
            { backgroundColor: '#DFDFDF' } : null
          }
          onClick={() => onClickLabel(null)}>
          전체메모 ({memoCount})
        </LabelItem>
        {labelList.map((v,i) => {
          return (
            <LabelItem 
              style={ v._id === selectedLabel._id ?  { backgroundColor: '#DFDFDF' } : null } 
              key={i} 
              onClick={() => onClickLabel(v)} 
            >
              {v.title} ({v.memos.length})
            </LabelItem>
          )})
        }
      </div>
      <LabelItem className="add-btn" onClick={handleModal}>
        라벨추가
      </LabelItem>
    </Overlay>
  );
};

export default LabelListView;