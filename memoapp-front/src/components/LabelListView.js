import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import LabelInputModal from './modals/LabelInputModal';
import { getLabelListAction } from '../reducers/label';
import { resetSelectedMemo } from '../reducers/memo';

const Overlay = styled.div`
      display: flex;
      flex-direction: column;
      height: 100%;
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

const LabelListView = ({match}) => {
  const { labelList, selectedLabel, updatedLabel } = useSelector(state => state.label);
  const { updatedMemo, memoCount } = useSelector(state => state.memo);
  const dispatch = useDispatch();
  
  // 초기 1회 랜더링 처리
  useEffect(() => {
    dispatch(getLabelListAction);
  }, []);

  useEffect(() => {
    if (updatedLabel || updatedMemo) {
      dispatch(getLabelListAction);
    }
  }, [updatedLabel, updatedMemo]);

  const [isOpenModal, setModal] = useState(false);

  const onClickLabel = useCallback(() => {
    // 라벨변경시 선택메모 초기화
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
        <NavLink to={`/all`}>
          <LabelItem
            style={ 
              selectedLabel._id　=== 'all' ?
              { backgroundColor: '#DFDFDF' } : null
            }
            >
            전체메모 ({memoCount})
          </LabelItem>
        </NavLink>
        {labelList.map((v,i) => {
          return (
            <NavLink key={i} to={`/${v._id}`}>
              <LabelItem
                className={"label-item"}
                style={ v._id === selectedLabel._id ?  { backgroundColor: '#DFDFDF' } : null } 
                onClick={() => onClickLabel()} 
              >
                {v.title} ({v.memos.length})
              </LabelItem>
            </NavLink>
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