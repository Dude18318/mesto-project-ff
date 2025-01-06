import { closeModal,openModal } from './modal.js';
function createCard(card, removeCard ,handleOpenImage,handleLikeButtonClick) {
  const cardTemplate      = document.querySelector('#card-template').content;
  const cardNode          = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle         = cardNode.querySelector('.card__title');
  const cardImage         = cardNode.querySelector('.card__image');
  const cardLikeButton    = cardNode.querySelector('.card__like-button');
  const cardDeleteButton  = cardNode.querySelector('.card__delete-button');
   
  cardDeleteButton.addEventListener('click', ()=>removeCard(cardNode));
  cardImage.src         = card.link;
  cardImage.alt         = `${card.name}`;
  cardTitle.textContent = card.name;
  cardImage.addEventListener('click', handleOpenImage);
  cardLikeButton.addEventListener('click',handleLikeButtonClick);

  return cardNode;
}

const removeCard = (card) => {
  card.remove();
};

export {createCard,removeCard};