import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const SearchBarContainer = styled.div`
  box-sizing: border-box;
  width: 568px;
  align-items: center;
  margin-left: 25px;
  margin-right: 33px;
  display: block;
`;

const BackPulse = keyframes`
  50% {
    background-color: rgba(32, 152, 209, 0.75);
  }

  50% {
    background-color: rgba(32, 152, 209, 0.75);
  }
`;

const SearchBarInput = styled.input`
  width: 98%;
  height: 63px;
  outline: none;
  color: white;
  border: none;
  padding-left: 10px;
  font-size: 15px;
  background: linear-gradient(0deg, rgba(7, 1, 12, 0.51), rgba(7, 1, 12, 0.51)), #4C7FE6;
  box-shadow: inset 0px 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 65px;
  margin-top: 20px;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  // box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  overflow: hidden;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: color, background-color;
  transition-property: color, background-color;


  &:hover {
    animation: ${BackPulse};
    -webkit-animation-name: hvr-back-pulse;
  animation-name: hvr-back-pulse;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background-color: #2098D1;
  background-color: #2098d1;
  color: white;
  }
  &:active {
    -webkit-animation-name: hvr-back-pulse;
  animation-name: hvr-back-pulse;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background-color: #2098D1;
  background-color: #2098d1;
  color: white;
  }
  &:focus {
    -webkit-animation-name: hvr-back-pulse;
  animation-name: hvr-back-pulse;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background-color: #2098D1;
  background-color: #2098d1;
  color: white;
  }
`;

const SearchDropDown = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: auto;
  max-height: auto;
  min-width: 565px;
  background-color: #80A3EA;
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: 0 1px 4px 0 rgba(34, 34, 34, 0.1) inset;
  border-color: rgba(34, 34, 34, 0.15);
  margin-top: 12px;
  margin-left: 2px;
  z-index: 10;
`;

const SearchDropDownHeader = styled.span`
  box-sizing: border-box;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 0 10px;
  display: block;
  text-align: center;
  color: black;
`;

const OverLay = styled.div`
  box-sizing: border-box;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: ${(props) => (props.active ? 'all' : 'none')};
`;

const LobbyContainer = styled.div`
  text-align: center;
  padding-top: 14px;
  margin: 0;
`;

const LobbySign = styled.span`
  color: #E3A1FA;
  font-size: 20px;
`;

const GameSign = styled.span`
  color: #CC6CEE;
  font-size: 20px;
  padding-right: 10px;
`;

const GamePlayersBox = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 390px;
  background: linear-gradient(0deg, rgba(7, 1, 12, 0.51), rgba(7, 1, 12, 0.51)), #4C7FE6;
  box-shadow: inset 0px 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 65px;
`;

const GamePlayersContainer = styled.div`
  padding: 0 15px 10px 15px;
`;

const SearchList = styled.ul`
  list-style-type: none;
  text-align: center;
  padding: 0;
`;

const ListEntries = styled.li`
  color: #F0FFF0;
  display: block;
  border-top: 1px solid #4C7FE6;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 51%;
    right: 51%;
    bottom: 0;
    background: #2098D1;
    height: 4px;
    -webkit-transition-property: left, right;
    transition-property: left, right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  &:hover:before {
    left: 0;
    right: 0;
  }
`;

const PlayerList = styled.ul`
  padding: 0;
  list-style-type: none;
  height: 300px;
  width: auto;
  overflow-y: auto;
`;

const PlayerEntry = styled.li`
  padding: 10px;
  width: 93%;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #5F90F2;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  &::hover {
    color: white;
  }
  &:focus {
    color: white;
  }
  &:active {
    color: white;
  }
  &:hover:before{
    -webkit-transform: scaleX(1);
  transform: scaleX(1);
  }
  &:focus:before{
    -webkit-transform: scaleX(1);
  transform: scaleX(1);
  }
  &:active:before{
    -webkit-transform: scaleX(1);
  transform: scaleX(1);
  }
`;

const LoadingSign = styled.span`
  display: block;
  text-align: center;
  padding-top: 150px;
  padding-left: 10px;
  font-size: 20px;
`;

const PlayerEntryText = styled.span`
  padding-right: 10px;
  color: #F0FFF0;
`;

const PlayerEntryTitle = styled.span`
  color: #E3A1FA;
  font-size: 15px;
  text-decoration: underline;
  padding-right: 10px;
`;

const Buttons = styled.button`
  background: linear-gradient(180deg, #B747FC 46.21%, rgba(255, 255, 255, 0) 146.21%), #1C2331;
  box-shadow: inset 0px 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 65px;
  height: 37px;
  width: 75px;
  border: none;
  outline: none;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;

  &::before {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    content: '';
    top: 100%;
    left: 5%;
    height: 10px;
    width: 90%;
    opacity: 0;
    background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
    /* W3C */
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform, opacity;
    transition-property: transform, opacity;
  }
  &:hover {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    cursor: pointer;
    background-color: #DFB4F9;
  }
  &:hover:before {
    opacity: 1;
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
`;

const SearchBar = ({ users }) => {
  const [searching, setSearching] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [games, setGames] = useState([{ gameName: 'League of Legends' }, { gameName:'BattleField' } , { gameName: 'Among Us' }, { gameName: 'Fortnite' } , { gameName: 'Escape From Tarkov' }, { gameName: 'Valorant' }]);
  const [currentGame, setcurrentGame] = useState('');

  useEffect(() => {

  }, [])

  const getGames = (searchItem) => {
    axios.get('/games', {
      params: {
        search: searchItem,
      },
    })
      .then((results) => setGames(results.data))
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearching(e.target.value);
    getGames(e.target.value);
  }

  const handleSearchBarClick = (value) => {
    setIsSearching(value);
  }

  const searchBarDropDown = () => {
    if (isSearching) {
      return (
        <SearchDropDown>
          <SearchDropDownHeader>
            Popular Games
          </SearchDropDownHeader>
          <SearchList>
            {games.map(game => {
              return (
              <ListEntries onClick={() => {setcurrentGame(game.gameName); handleSearchBarClick(false);}}>{game.gameName}</ListEntries>
              )
            })}
          </SearchList>
        </SearchDropDown>
      )
    }
  }

  const gamesPlayerLobbyList = () => {
    if (currentGame !== '') {
      return (
        <GamePlayersContainer>
          <PlayerList>
          {users.map(user => {
            if (user.currentGame === currentGame) {
              return (
                <PlayerEntry>
                  <PlayerEntryTitle>UserName:</PlayerEntryTitle>
                  <PlayerEntryText>{user.userName}</PlayerEntryText>
                  <PlayerEntryTitle>Region:</PlayerEntryTitle>
                  <PlayerEntryText>{user.region}</PlayerEntryText>
                  <Buttons>Invite</Buttons>
                  <Buttons>Add</Buttons>
                </PlayerEntry>
              )
            }
          })}
          </PlayerList>
        </GamePlayersContainer>
      )
    } else {
      return (
        <LoadingSign>Choose a game to see the lobby . . . </LoadingSign>
      )
    }
  }

  return (
    <SearchBarContainer>
      <SearchBarInput type="text" placeholder="Enter a game to find a friend..." onClick={() => handleSearchBarClick(true)} onChange={(e) => handleSearch(e)} value={searching} name="searching"></SearchBarInput>
      {searchBarDropDown()}
      <GamePlayersBox>
        <LobbyContainer>
        <GameSign>
            {currentGame}
          </GameSign>
          <LobbySign>
            Lobby
          </LobbySign>
        </LobbyContainer>
        {gamesPlayerLobbyList()}
      </GamePlayersBox>
      <OverLay active={isSearching} onClick={() => handleSearchBarClick(false)} />
    </SearchBarContainer>
  )
}

export default SearchBar;