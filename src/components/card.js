
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

const handleLikeButtonClick = (evt) => {
  if (evt.currentTarget.classList.contains('card__like-button_is-active')){
	  evt.currentTarget.classList.remove('card__like-button_is-active');
  }else {
    evt.currentTarget.classList.add('card__like-button_is-active');
  }
}
export {createCard,removeCard,handleLikeButtonClick};