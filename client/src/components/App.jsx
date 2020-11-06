import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar.jsx';

const MainContainer = styled.div`
  width: 993px;
  height: 520px;
  background: linear-gradient(0deg, rgba(7, 1, 12, 0.86), rgba(7, 1, 12, 0.86)), rgba(40, 83, 165, 0.86);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
`;

const ChatBoxContainer = styled.div`
margin-top: 24px;
width: 280px;
height: 410px;
background: linear-gradient(0deg, rgba(7, 1, 12, 0.51), rgba(7, 1, 12, 0.51)), #4C7FE6;
box-shadow: inset 0px 4px 20px rgba(0, 0, 0, 0.5);
border-radius: 65px;
padding: 15px 30px 30px 30px;
`;

const LobbySign = styled.span`
  color: #E3A1FA;
  font-size: 20px;
  text-align: center;
  display: block;
  margin: 0;
`;

const PlayerName = styled.span`
  color: #E3A1FA;
  font-size: 15px;
  padding-right: 10px;
`;

const App = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    return fetch('/users')
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <MainContainer>
      <SearchBar users={users}/>
      <ChatBoxContainer>
        <LobbySign>Global Chat Room</LobbySign>
        <div>
          <div>
            <PlayerName>Paul Choi</PlayerName>
            <span>Yo whats up guys anyone want to play?</span>
          </div>
          <div>
            <PlayerName>Tracy Tea</PlayerName>
            <span>Does anyone have one more for among us!!!</span>
          </div>
        </div>
      </ChatBoxContainer>
    </MainContainer>
  );
}


export default App;
