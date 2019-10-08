import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'moment';

import { getMemoListAction, getMemoAction, removeMemosAction } from '../reducers/memo';
import { removeLabelMemosAction, removeLabelAction } from '../reducers/label';
import LabelSettingModal from './modals/LabelSettingModal';
import LabelInputModal from './modals/LabelInputModal';

const Overlay = styled.div`
  flex: 1 1 30%;
  margin: 0 5;
  border: 1px solid #DFDFDF;
  height: auto;
  overflow-y: scroll;
`;

const MemoItem = styled.div`
  border-bottom: 1px solid #DFDFDF;
  padding: 12;
  display: flex;
  word-break: break-word;
  cursor: pointer;
  &:hover{
    background-color: mediumaquamarine;
  }
  &:active{
    background-color: gainsboro;
  }
  .memo-selection {
    margin: auto 0;
    width: 10%;
  }
  .memo-content {
    width:90%;
    .memo-content-header {
      display: flex;
      justify-content: space-between;
    }
    .memo-content-body {
      width: 70%;
      padding:0 5px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .memo-title{
      width: 70%;
    }
    .memo-date{
      width: 100px;
    }
  }
`;

const MemoMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #DFDFDF;
  padding: 10;
  align-items: center;
  .label-title {
    font-size: 20px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .btns {
    margin-top: 10px;
    display: flex;
    div{
      margin: 0 5;
      border: 1px solid #DFDFDF;
      padding: 7;
      border-radius: 5px;
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

const MemoListView = () => {
  const dispatch = useDispatch();
  const { selectedLabel } = useSelector(state => state.label);
  const { memoList, updatedMemo, selectedMemo } = useSelector(state => state.memo);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenLabelInputModal, setLabelInputModal] = useState(false);
  const [isLabelMemoList, setLabelMemoMode] = useState(false);

  // 전체메모 리퀘스트 랜더링시 첫 회만 실행
  useEffect(() => {
    dispatch(getMemoListAction);
  }, []);
  
  // 선택라벨이 바뀔 때 실행
  useEffect(() => {
    if (Object.entries(selectedLabel).length === 0
      && selectedLabel.constructor === Object) {
      setLabelMemoMode(false);
    } else {
      setLabelMemoMode(true);
    }
    
    //체크박스리스트를 초기화
    setCheckedItems([]);
  }, [selectedLabel]);

  useEffect(() => {
    if ( updatedMemo ) {
      dispatch(getMemoListAction);
    }
  }, [updatedMemo]);
  
  const onChangeChekedItems = useCallback((e, _id) => {
    const newCheckedItems = [ ...checkedItems ];
    if (e.target.checked) {
      newCheckedItems.push(_id);
    } else {
      const index = newCheckedItems.findIndex((v) => v === _id);
      newCheckedItems.splice(index, 1);
    };
    setCheckedItems(newCheckedItems);
  }, [checkedItems]);

  const handleSettingModal = useCallback(() => {
    setLabelSettingModal(!isOpenLabelSettingModal);
  }, [isOpenLabelSettingModal]);

  const handleInputModal = useCallback(() => {
    setLabelInputModal(!isOpenLabelInputModal);
  }, [isOpenLabelInputModal]);

  const removeLabel = useCallback(() => {
    dispatch(removeLabelAction(selectedLabel._id));
  }, [selectedLabel]);

  const removeMemos = useCallback(() => {
    dispatch(removeMemosAction(checkedItems));
  }, [selectedLabel, checkedItems]);

  const removeLabelMemos = useCallback(() => {
    dispatch(removeLabelMemosAction({labelId: selectedLabel._id ,memoIds: checkedItems}));
  }, [selectedLabel, checkedItems]);

  const onClickMemo = useCallback((id) => {
    dispatch(getMemoAction(id));
  }, []);

  return (
    <Overlay>
      {isOpenLabelSettingModal ? 
          <LabelSettingModal settingTarget={checkedItems} close={handleSettingModal} /> 
        : null }
      {isOpenLabelInputModal ? 
          <LabelInputModal settingTarget={checkedItems} label={selectedLabel} close={handleInputModal} /> 
        : null }
      {isLabelMemoList ? 
          <MemoMenu>
              <div className={"label-title"}>{ selectedLabel.title }</div> 
              <div className={"btns"}>
                <div onClick={handleInputModal}>라벨명변경</div>
                <div onClick={handleSettingModal}>라벨설정</div>
                <div onClick={removeLabelMemos}>라벨해제</div>
                <div onClick={removeLabel}>라벨삭제</div>
              </div>
           </MemoMenu>
            :
            <MemoMenu>
              <div className={"label-title"}>전체메모</div> 
              <div className={"btns"}>
                <div onClick={handleSettingModal}>라벨설정</div>
                <div onClick={removeMemos}>삭제</div>
              </div>
            </MemoMenu>
          }
      { memoList.length !== 0 
          ? memoList.map((v,i) => {
              return (
                <MemoItem 
                  style={ v._id === selectedMemo._id ?  { backgroundColor: '#DFDFDF' } : null } 
                  key={i}
                >
                  <div className={"memo-selection"}>
                    <input 
                    type= "checkbox" 
                    name={v._id} 
                    checked={checkedItems.find((c) => c === v._id)} 
                    onChange={(e) => onChangeChekedItems(e, v._id)} 
                  />
                  </div>
                  <div className={"memo-content"} onClick={()=>onClickMemo(v._id)}>
                    <div className={"memo-content-header"}>
                      <div className={"memo-title"}>{v.title}</div>
                      <div className={"memo-date"}>{Moment(v.updatedAt).format('YYYY-MM-DD')}</div>
                    </div>
                    <div className={"memo-content-body"}>
                      {v.content}
                    </div>
                  </div>
                </MemoItem>
              )
            }
        ) :
        <div>메모를 작성해주세요</div>
    }
    </Overlay>
  );
};

export default MemoListView;