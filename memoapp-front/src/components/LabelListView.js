import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import LabelInputModal from './modals/LabelInputModal';
import { getLabelListAction, resetDeletedLabelFlg, resetSelectedLabel } from '../reducers/label';
import { resetSelectedMemo, getMemoListAction, resetCreatedMemoFlg } from '../reducers/memo';

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  a {
    text-decoration: none;
    color: inherit;
  }
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

const LabelListView = ({ history, match }) => {
  const { labelList, selectedLabel, deletedLabelFlg } = useSelector(state => state.label);
  const { memoCount, createdMemoFlg, selectedMemo } = useSelector(state => state.memo);
  const dispatch = useDispatch();

  // 초기 리스트 랜더링 (초기 1회만 실행)
  useEffect(() => {
    dispatch(getLabelListAction);
    dispatch(getMemoListAction);
  }, []);

  // 라벨삭제시 라벨리스트 갱신
  useEffect(() => {
    if (deletedLabelFlg) {
      dispatch(getLabelListAction);
      dispatch(getMemoListAction);
      dispatch(resetDeletedLabelFlg);
      history.push('/');
    }
  }, [deletedLabelFlg]);

  // 메모생성시 해당 메모상세뷰URL로 이동
  useEffect(() => {
    if (createdMemoFlg) {
      history.push(`/all/${selectedMemo._id}`);
      dispatch(resetCreatedMemoFlg);
    }
  }, [createdMemoFlg]);

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
            style={ (selectedLabel !== null ? selectedLabel._id : null)　=== 'all' ? 
                    { backgroundColor: '#DFDFDF' } : null }
            onClick={() => onClickLabel()} 
            >
            전체메모 ({memoCount})
          </LabelItem>
        </NavLink>
        {labelList.map((v,i) => {
          return (
            <NavLink key={i} to={`/${v._id}`}>
              <LabelItem
                className={"label-item"}
                style={ (selectedLabel !== null ? selectedLabel._id : null) === v._id ?
                        { backgroundColor: '#DFDFDF' } : null } 
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