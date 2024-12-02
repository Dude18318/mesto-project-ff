//  Темплейт карточки
const cardTemplate            = document.querySelector( '#card-template').content;
//  DOM узлы
const pageContentElement      = document.querySelector('.content');
const placesListElement       = pageContentElement.querySelector('.places__list');
//  Функция создания карточки

function createCard(name,link, removeCard ) {
   const cardNode         = cardTemplate.cloneNode(true);
   const cardTitle        = cardNode.querySelector('.card__title');
   const cardImage        = cardNode.querySelector('.card__image');
   const cardDeleteButton = cardNode.querySelector('.card__delete-button');
   cardDeleteButton.addEventListener('click',removeCard);
   cardImage.src          = link;
   cardTitle.textContent  = name;
   placesListElement.appendChild(cardNode);
}
// Функция удаления карточки
  const removeCard = (event) => {
  const parentElement = event.target.parentElement;
  parentElement.remove();
 }; 
// Выводим карточки на страницу
initialCards.forEach((card) => { 
  createCard(card.name, card.link,removeCard );
} );
