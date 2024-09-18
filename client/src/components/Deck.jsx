//Card Deck Deal & Shuffle Component

import React, { useState } from 'react';
import Card from './Card';

const Deck = ({ deck, dealCard }) => {
  const [shuffledDeck, setShuffledDeck] = useState(deck);

  const shuffleDeck = () => {
    let shuffled = [...shuffledDeck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledDeck(shuffled);
  };

  const deal = () => {
    if (shuffledDeck.length > 0) {
      dealCard(shuffledDeck[0]);
      setShuffledDeck(shuffledDeck.slice(1));
    }
  };

  return (
    <div>
      <button onClick={shuffleDeck}>Shuffle Deck</button>
      <button onClick={deal}>Deal Card</button>
    </div>
  );
};

export default Deck;