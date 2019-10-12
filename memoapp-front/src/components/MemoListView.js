import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'moment';
import { NavLink } from 'react-router-dom';
 
import { getMemoListAction, removeMemosAction, resetDeletedMemoFlg } from '../reducers/memo';
import { getLabelListAction, 
         removeLabelMemosAction, 
         removeLabelAction, 
         getLabelAction, 
         resetSelectedLabel,
         resetUpdatedLabelFlg
        }
from '../reducers/label';
import LabelSettingModal from './modals/LabelSettingModal';
import LabelInputModal from './modals/LabelInputModal';

const Overlay = styled.div`
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
  button {
    width: 20%;
        margin: 1%;
        padding: 7px 0;
        border-radius: 5px;
        background-color: white;
        font-size: 12pt;
        border: 1px solid #bebebe;
        cursor: pointer;
        &:hover{
          background-color: mediumaquamarine;
        };
        &:active{
          background-color: gainsboro;
     }
  }
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
    width:100%;
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
  .label-btns {
    margin-top: 10px;
    width: 100%;
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

const MemoListView = ({ match, history }) => {
  const dispatch = useDispatch();
  const { selectedLabel, updatedLabelFlg } = useSelector(state => state.label);
  const { memoList, selectedMemo, deletedMemoFlg } = useSelector(state => state.memo);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenLabelInputModal, setLabelInputModal] = useState(false);
  const [isLabelMemoList, setLabelMemoMode] = useState(false);

   // 메모리스트뷰 초기화 
  useEffect(() => {
    if (match.params.label === 'all') {
      dispatch(getMemoListAction);
      setLabelMemoMode(false);
    } else {
      dispatch(getLabelAction(match.params.label));
      setLabelMemoMode(true);
    }
    dispatch(resetSelectedLabel);
    setCheckedItems([]);
  }, [match.params.label]);

  // 라벨업데이트시 라벨리스트 갱신
  useEffect(() => {
    if (updatedLabelFlg) {
      dispatch(getLabelListAction);
      dispatch(getLabelAction(match.params.label));
      dispatch(resetUpdatedLabelFlg);
    }
  }, [updatedLabelFlg]);

  // 메모삭제시 전체메모 갱신
  useEffect(() => {
    if (deletedMemoFlg) {
      history.push(`/${match.params.label}`);
      dispatch(getMemoListAction);
      dispatch(resetDeletedMemoFlg);
    }
  }, [deletedMemoFlg]);

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
    setCheckedItems([]);
  }, [checkedItems]);

  const removeLabelMemos = useCallback(() => {
    dispatch(removeLabelMemosAction({labelId: selectedLabel._id ,memoIds: checkedItems}));
    setCheckedItems([]);
  }, [selectedLabel, checkedItems]);

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
              <div className={"label-btns"}>
                <button onClick={handleInputModal}>라벨명변경</button>
                <button onClick={removeLabel}>라벨삭제</button>
                <button onClick={handleSettingModal}>라벨설정</button>
                <button onClick={removeLabelMemos}>라벨해제</button>
              </div>
            </MemoMenu>
          :
            <MemoMenu>
              <div className={"label-title"}>전체메모</div>
              <div className={"label-btns"}>
                <button disabled={ memoList.length === 0 || checkedItems.length === 0} onClick={handleSettingModal}>라벨설정</button>
                <button disabled={ memoList.length === 0 || checkedItems.length === 0} onClick={removeMemos}>삭제</button>
              </div>
            </MemoMenu>
        }
          { memoList.length !== 0 
            ? memoList.map((v,i) => {
              return (
                <MemoItem 
                  style={ v._id === (selectedMemo !== null ? selectedMemo._id : null ) 
                          ?  { backgroundColor: '#DFDFDF' } : null } 
                  key={i}
                >
                  <div className={"memo-selection"}>
                    <input 
                    type= "checkbox" 
                    name={v._id} 
                    checked={checkedItems.indexOf(v._id) !== -1} 
                    onChange={(e) => onChangeChekedItems(e, v._id)} 
                  />
                  </div>
                  <NavLink 
                    className={"memo-content"}  
                    key={i} 
                    to={ isLabelMemoList ? `/${match.params.label}/${v._id}` : `/all/${v._id}`
                  }>
                    <div className={"memo-content-header"}>
                      <div className={"memo-title"}>{v.title}</div>
                      <div className={"memo-date"}>{Moment(v.updatedAt).format('YYYY-MM-DD')}</div>
                    </div>
                    <div className={"memo-content-body"}>
                      {v.content}
                    </div>
                  </NavLink>
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