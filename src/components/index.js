
import '../styles/index.css';
import {
	initialCards
} from './cards.js'
import {
	createCard,
	removeCard,
	handleLikeButtonClick
} from './card.js';
import {
	closeModal,
	openModal,
	handleOverlayClick,
	handlePressEsc
} from './modal.js';

//  DOM узлы
const popupNewCard       = document.querySelector('.popup_type_new-card');
const popupEditProfile   = document.querySelector('.popup_type_edit');
const popupTypeImage     = document.querySelector('.popup_type_image');
const pageContentElement = document.querySelector('.content');
const placesListElement  = pageContentElement.querySelector('.places__list');
const addProfileButton   = document.querySelector('.profile__add-button');
const editProfileButton  = document.querySelector('.profile__edit-button');
const profileTitle       = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement 			 = document.querySelector('form[name="edit-profile"]');
const nameInput          = formElement.querySelector('.popup__input_type_name')
const jobInput           = formElement.querySelector('.popup__input_type_description');
const newCardName        = document.querySelector('.popup__input_type_card-name');
const newCardUrl         = document.querySelector('.popup__input_type_url');
const saveForm           = document.querySelector('form[name="new-place"]');
const popupImage         = document.querySelector('.popup__image');
const popupCaption       = document.querySelector('.popup__caption');

// Ищем все кнопки закрытия попапа и навешиваем слушателя
const popupCloseButtons = document.querySelectorAll('.popup__close');
popupCloseButtons.forEach((closeButton) => {
   closeButton.addEventListener('click',  (evt) => {
		// находим открытый попап
		const popup = evt.target.closest('.popup_is-opened');
    closeModal(popup);
  })
});

// Обработчик сохранения персональных данных
const handleEditFormSubmit = (evt) => {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;
	evt.currentTarget.removeEventListener('submit', handleEditFormSubmit);
	closeModal(popupEditProfile);
}

// обработчик кнопки редактироания профиля
const handleEditButton = (evt) => {
	nameInput.value        = profileTitle.textContent;
	jobInput.value         = profileDescription.textContent;
	openModal(popupEditProfile);
	formElement.addEventListener('submit', handleEditFormSubmit);
}

// Обработчик кнопки сохранения новой карточки
const handleSaveNewPlace = (evt) => {
	evt.preventDefault();

	const card = {
		name: newCardName.value,
		link: newCardUrl.value,
	}
	const cardNode = createCard(card, removeCard, handleOpenImage, handleLikeButtonClick);
	placesListElement.prepend(cardNode);
	newCardName.value = '';
	newCardUrl.value = '';
	closeModal(popupNewCard);
}

// обработчик кнопки '+'
const handleAddButton = (evt) => {
	openModal(popupNewCard);
	saveForm.addEventListener('submit', handleSaveNewPlace);
};

//обработчик клика на картинку
const handleOpenImage = (evt) => {
	popupImage.src = evt.currentTarget.src;
	popupImage.alt = evt.currentTarget.alt;
	popupCaption.textContent = evt.currentTarget.alt;
	openModal(popupTypeImage);
}

// Создание карточек из массива
initialCards.forEach((card) => {
	const cardNode = createCard(card, removeCard, handleOpenImage, handleLikeButtonClick);
	placesListElement.append(cardNode);
});

document.addEventListener('click', handleOverlayClick);
formElement.addEventListener('submit', handleEditFormSubmit);
editProfileButton.addEventListener('click', handleEditButton);
addProfileButton.addEventListener('click', handleAddButton);