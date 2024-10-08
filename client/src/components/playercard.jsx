import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="card">
      <h3>{card.name}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default Card;