import * as React from 'react';

export default function RulesCard() {
  return (
    <>
      <div>How to play</div>
      <p>
      deal four(4) cards to each player  <br/>
      place them face down <br/>
      arrange in a horizontal row <br/>
      players can look at the two cards on the edge just once before the game starts  <br/>
      burn one card off the top of the deck <br/>
      player to the left of the dealer starts by picking a card off the top of the deck  <br/>
      they can replace one of their cards or discard the card  <br/>
      if a jack is played into the middle, you can look at one of your cards  <br/>
      if a queen is played into the middle, you can blindly swap cards with another player <br/>
      if you get a king, you can look at one of your oppents cards and decide if you want to swap with them  <br/>
      if someone discards into the middle and you have one of those cards, you can put it down and get rid of one of your cards,  <br/>
      if you're wrong and they do not match, you take another card and add it to your hand  <br/>
      if you have 5 points in your hand or lower, you can call "tamaloo", <br/>
      the rest of the players play one more round <br/>
      during the last round, you can only swap with the calling player by using a King <br/>
      the round is over and players show their cards 
      </p>

      <div>Scoring</div>
      <p>
      player calls and has lowest hand -10
      player calls and doesn't have lowest hand - hand value +10?
      any other player - face value of cards 
      player is out when they hit 50 points
      </p>

      <div>Edge Cases</div>
      <p>
        You cannot pick up the initial burned card <br/>
        You cannot play a matching card onto the initial burned card <br/>
        only one player can play a matching card <br/>
      </p>
    </>
  );
}
