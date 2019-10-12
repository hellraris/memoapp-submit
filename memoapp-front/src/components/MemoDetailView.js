import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'moment';

import { getMemoListAction, removeMemoAction, getMemoAction, resetUpdatedMemoFlg } from '../reducers/memo';
import { getLabelAction } from '../reducers/label';
import MemoInputModal from './modals/MemoInputModal';

const Overlay = styled.div`

`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .title {
      margin-top: 5px;
      padding: 10px;
      font-size: 20px;
      word-break: break-word;
      width: 75%;
    }
    .btns {
      display: flex;
      margin-bottom: 5px;
      button{
        margin: 5px;
        padding: 7px;
        border-radius: 3px;
        background-color: white;
        font-size: 12pt;
        border: 1px solid #bebebe;
        cursor: pointer;
        &:hover{
          background-color: mediumaquamarine;
        }
        &:active{
          background-color: gainsboro;
        }
      }
    }
`;

const Body = styled.div`
  word-break: break-word;
  white-space: pre;
  padding: 20px;
`;

const MemoDetailView = ({match}) => {
  const dispatch = useDispatch();
  const { selectedMemo, updatedMemoFlg } = useSelector(state => state.memo);
  const [isOpenModal, setModal] = useState(false);

  // 메모 수정시 메모리스트 갱신
  useEffect(() => {
    if (updatedMemoFlg) {
      if (match.params.label === 'all') {
        dispatch(getMemoListAction);
      } else {
        dispatch(getLabelAction(match.params.label));
      }
      dispatch(resetUpdatedMemoFlg);
    }
  }, [updatedMemoFlg]);

  const handleModal = useCallback(() => {
    setModal(!isOpenModal);
  }, [isOpenModal]);

  const removeMemo = useCallback((id) => {
    dispatch(removeMemoAction(id));
  }, []);

  useEffect(() => {
    dispatch(getMemoAction(match.params.memo));
  }, [match.params.memo]);

  return (
    <Overlay>
      { isOpenModal ? 
          <MemoInputModal memo={selectedMemo} close={handleModal} /> 
        : null }
      { selectedMemo !== null ? 
      <div>
        <Header>
          <label className={'title'}>{ selectedMemo.title }</label>
          <div>
            <div className={"btns"}>
              <button onClick={handleModal}>수정</button> 
              <button onClick = {() => removeMemo(selectedMemo._id)}>삭제</button>
            </div>
            <label>{ Moment(selectedMemo.updatedAt).format('YYYY-MM-DD') }</label>
          </div>
        </Header>
        <Body>
          { selectedMemo.content }
        </Body>
      </div>
      : <div></div>}
    </Overlay>
  );
};

export default MemoDetailView;