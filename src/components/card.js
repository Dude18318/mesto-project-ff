
function createCard(card, removeCard, handleOpenImage, likeCard, unlikeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');
  const cardLikeButton = cardNode.querySelector('.card__like-button');
  const cardDeleteButton = cardNode.querySelector('.card__delete-button');
  const cardLikeCount = cardNode.querySelector('.card__like-counter');

  cardDeleteButton.addEventListener('click', () => {
    removeCard(card._id);
    cardNode.remove();
  });
  cardImage.src = card.link;
  cardImage.alt = `${card.name}`;
  cardTitle.textContent = card.name;
  cardImage.addEventListener('click', handleOpenImage);
  toggleLikeButtonClick(card.isLiked, cardLikeButton);
  cardLikeButton.addEventListener('click', (evt) => {

    const action = card.isLiked ? unlikeCard : likeCard;

    action(card._id)
      .then((res) => {
        card.isLiked = !card.isLiked;
        toggleLikeButtonClick(card.isLiked, cardLikeButton);
        cardLikeCount.textContent = res.likes.length || 0;
      })
      .catch((err) => console.error(`Ошибка при обработке лайка: ${err}`));
  });

  ;
  cardLikeCount.textContent = card.likes.length || 0;
  if (!card.myCardFlag) {
    cardDeleteButton.style.display = 'none';
  }
  return cardNode;
}

const toggleLikeButtonClick = (isLiked, likeElement) => {
  likeElement.classList.toggle('card__like-button_is-active', isLiked);
}
export { createCard };