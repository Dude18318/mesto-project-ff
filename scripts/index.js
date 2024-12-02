//  Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
//  DOM узлы
const pageContentElement = document.querySelector('.content');
const placesListElement = pageContentElement.querySelector('.places__list');
//  Функция создания карточки
function createCard(card, removeCard) {
  const cardNode  = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');
  const cardDeleteButton = cardNode.querySelector('.card__delete-button');

  cardDeleteButton.addEventListener('click', ()=>removeCard(cardNode));
  cardImage.src         = card.link;
  cardImage.alt         = `${card.name}`;
  cardTitle.textContent = card.name;
  return cardNode;
}
// Функция удаления карточки
const removeCard = (card) => {
  card.remove();
};
// Выводим карточки на страницу
initialCards.forEach((card) => {
  const cardNode = createCard(card, removeCard);
  placesListElement.append(cardNode);
});
