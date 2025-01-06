
import '../styles/index.css';
import {
	initialCards
} from './cards.js'
import {
	createCard,
	removeCard
} from './card.js';
import {
	closeModal,
	openModal,
	handleOverlayClick,
	handlePressEsc
} from './modal.js';

//  DOM узлы
const pageContentElement = document.querySelector('.content');
const placesListElement  = pageContentElement.querySelector('.places__list');
const addProfileButton   = document.querySelector('.profile__add-button');
const editProfileButton  = document.querySelector('.profile__edit-button');
const cardLikeButton     = document.querySelector('.card__like-button');
const profileTitle       = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement 			 = document.querySelector('form[name="edit-profile"]');
const nameInput          = formElement.querySelector('.popup__input_type_name')
const jobInput           = formElement.querySelector('.popup__input_type_description');
// переменная DOM для работы функций открытия
let popup;

// Хендлер установки лайка
const handleLikeButtonClick = (evt) => {
	evt.currentTarget.classList.add('card__like-button_is-active');
}


// Хендлер закрытия попапа
const handleCloseModal = (evt) => {
	closeModal(popup);
}

// В данную функцию вынесены общие действия при работе с модальными окнами
function setPropsForOpenedModal(domElement, handleCloseModal, handlePressEsc, openModal) {
	popup.classList.add('popup_is-animated');
	openModal(popup);
	if (popup.classList.contains('popup_is-opened')) {
		document.addEventListener('keydown', handlePressEsc);
	} else {
		document.removeEventListener('keydown', handlePressEsc);
	}
	const popupCloseButton = popup.querySelector('.popup__close');

	popupCloseButton.addEventListener('click', handleCloseModal);
}

// Обработчик сохранения персональных данных
const handleFormSubmit = (evt) => {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;
	evt.currentTarget.removeEventListener('submit', handleFormSubmit);
}

// обработчик кнопки редактироания профиля
const handleEditButton = (evt) => {
	popup = document.querySelector('.popup_type_edit');
	const popupInputName        = popup.querySelector('.popup__input_type_name');
	const popupInputDescrpition = popup.querySelector('.popup__input_type_description');
	popupInputName.value        = profileTitle.textContent;
	popupInputDescrpition.value = profileDescription.textContent;
	setPropsForOpenedModal(popup, handleCloseModal, handlePressEsc, openModal);
	formElement.addEventListener('submit', handleFormSubmit);
}

// Обработчик кнопки сохранения новой карточки
const handleSaveNewPlace = (evt) => {
	evt.preventDefault();
	const name = document.querySelector('.popup__input_type_card-name');
	const url = document.querySelector('.popup__input_type_url');
	const card = {
		name: name.value,
		link: url.value,
	}
	const cardNode = createCard(card, removeCard, handleOpenImage, handleLikeButtonClick);
	placesListElement.prepend(cardNode);
	name.value = '';
	url.value = '';
	closeModal(popup);
}

// обработчик кнопки '+'
const handleAddButton = (evt) => {
	popup = document.querySelector('.popup_type_new-card');
	const saveForm = document.querySelector('form[name="new-place"]');
	setPropsForOpenedModal(popup, handleCloseModal, handlePressEsc, openModal);
	saveForm.addEventListener('submit', handleSaveNewPlace);
};

//обработчик клика на картинку
const handleOpenImage = (evt) => {
	popup = document.querySelector('.popup_type_image');
	const popupImage = document.querySelector('.popup__image');
	const popupCaption = document.querySelector('.popup__caption');
	popupImage.src = evt.currentTarget.src;
	popupImage.alt = evt.currentTarget.alt;
	popupCaption.textContent = evt.currentTarget.alt;
	setPropsForOpenedModal(popup, handleCloseModal, handlePressEsc, openModal);
}

// Создание карточек из массива
initialCards.forEach((card) => {
	const cardNode = createCard(card, removeCard, handleOpenImage, handleLikeButtonClick);
	placesListElement.append(cardNode);
});

document.addEventListener('click', handleOverlayClick);
formElement.addEventListener('submit', handleFormSubmit);
editProfileButton.addEventListener('click', handleEditButton);
addProfileButton.addEventListener('click', handleAddButton);