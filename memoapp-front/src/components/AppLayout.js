import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import MemoInputModal from './modals/MemoInputModal';

const MenuBar = styled.div`
  display: flex;
  border: 1px solid #DFDFDF;
  padding: 7px;
  height: 40px;
  align-items: center;
  & .btn{
    border: 1px solid #DFDFDF;
    padding: 7px 30px;
    background-color: white;
    cursor: pointer;
    &:hover{
      background-color: mediumaquamarine;
    }
    &:active{
      background-color: gainsboro;
    }
  };
`;

const AppLayout = ({ children }) => {

  const [isOpenModal, setModal] = useState(false);

  const handleModal = useCallback(() => {
    setModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div>
      { isOpenModal ? <MemoInputModal memo={null} close={handleModal}/> : null }
      <MenuBar>
        <button className="btn" onClick={handleModal}>메모작성</button>
      </MenuBar>
      {children}
    </div>
  );
};

export default AppLayout;