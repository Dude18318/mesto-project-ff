
import '../styles/index.css';
import {
	createCard
} from './card.js';
import {
	closeModal,
	openModal,
	handleOverlayClick,
	handlePressEsc
} from './modal.js';

import {
	enableValidation,
	clearValidation
}
	from './validation.js';

import {
	getInitialCards,
	getUserInfo,
	updateUserProfile,
	addNewCard,
	removeCard,
	likeCard,
	unlikeCard,
	updateAvatar
}
	from './api.js';

//  DOM узлы
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeRefresh = document.querySelector('.popup_type_refresh');
const pageContentElement = document.querySelector('.content');
const placesListElement = pageContentElement.querySelector('.places__list');
const addProfileButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileImage = document.querySelector('.profile__image');
const profileImageEditButton = document.querySelector('.profile__image_edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name')
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar-url')
const newCardName = document.querySelector('.popup__input_type_card-name');
const newCardUrl = document.querySelector('.popup__input_type_url');
const saveForm = document.querySelector('form[name="new-place"]');
const newAvatarForm = document.querySelector('form[name="edit-avatar"]');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
let ownerId = '';
let initialCards = '';

const setPopUpButtonText = (form, text) => {
	let popupButton = form.querySelector('.popup__button');
	popupButton.textContent = text;
}

// Обновляем данные из API

Promise.all([getUserInfo(), getInitialCards()])
	.then(([userData, cardsData]) => {
		initialCards = cardsData.map(({ link, name, likes, _id, owner }) => {
			const myCardFlag = owner._id === userData._id ? true : false;
			const isLiked = likes.some(like => like._id === userData._id);
			return { link, name, likes, _id, myCardFlag, isLiked }
		}
		);

		// Создание карточек из массива
		initialCards.forEach((card) => {
			const cardNode = createCard(card, removeCard, handleOpenImage, likeCard, unlikeCard);
			placesListElement.append(cardNode);
		});
		// Обновление интерфейса
		profileImage.style.backgroundImage = `url('${userData.avatar}')`;
		profileTitle.textContent = userData.name;
		profileDescription.textContent = userData.about;
		ownerId = userData._id;
	})
	.catch(error => {
		console.log('Ошибка запроса:', err);
	});

// Ищем все кнопки закрытия попапа и навешиваем слушателя
const popupCloseButtons = document.querySelectorAll('.popup__close');
popupCloseButtons.forEach((closeButton) => {
	closeButton.addEventListener('click', (evt) => {
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
	setPopUpButtonText(formEditProfile, 'Сохранение...')
	updateUserProfile(profileTitle.textContent, profileDescription.textContent)
		.then(res => { console.log(res) })
		.catch(err => { console.log('Ошибка запроса:', err) })
		.finally(setPopUpButtonText(formEditProfile, 'Сохранить'));
	closeModal(popupEditProfile);
}

// обработчик кнопки редактироания профиля
const handleEditButton = (evt) => {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;

	clearValidation(saveForm, validationConfig);
	openModal(popupEditProfile);

	formEditProfile.addEventListener('submit', handleEditFormSubmit);
}

// Обработчик кнопки сохранения новой карточки
const handleSaveNewPlace = (evt) => {
	evt.preventDefault();

	const card = {
		name: newCardName.value,
		link: newCardUrl.value,
	}
	setPopUpButtonText(saveForm, 'Сохранение...')
	addNewCard(newCardName.value, newCardUrl.value)
		.then(
			(data) => {
				const card = {
					name: data.name,
					link: data.link,
					likes: data.likes,
					_id: data._id,
					myCardFlag: true,
					isLiked: false
				}
				const cardNode = createCard(card, removeCard, handleOpenImage, likeCard, unlikeCard);
				placesListElement.prepend(cardNode);
				newCardName.value = '';
				newCardUrl.value = '';

			}).catch(err => console.log('Ошибка запроса:', err))
		.finally(setPopUpButtonText(saveForm, 'Сохранить'));

	closeModal(popupNewCard);
}

// обработчик кнопки '+'
const handleAddButton = (evt) => {
	openModal(popupNewCard);
	saveForm.addEventListener('submit', handleSaveNewPlace);
	clearValidation(saveForm, validationConfig);
};

const handleNewAvatarForm = (evt) => {
	evt.preventDefault();
	setPopUpButtonText(newAvatarForm, 'Сохранение...')
	updateAvatar(avatarUrlInput.value).then(() => profileImage.style.backgroundImage = `url(${avatarUrlInput.value})`)
		.catch(err => console.log('Ошибка запроса'))
		.finally(setPopUpButtonText(newAvatarForm, 'Сохранить'));
	closeModal(popupTypeRefresh);

}

const handleImageEditButton = (evt) => {
	clearValidation(newAvatarForm, validationConfig);
	openModal(popupTypeRefresh);

	newAvatarForm.addEventListener('submit', handleNewAvatarForm);
}

//обработчик клика на картинку
const handleOpenImage = (evt) => {
	popupImage.src = evt.currentTarget.src;
	popupImage.alt = evt.currentTarget.alt;
	popupCaption.textContent = evt.currentTarget.alt;
	openModal(popupTypeImage);
}

document.addEventListener('click', handleOverlayClick);
formEditProfile.addEventListener('submit', handleEditFormSubmit);
editProfileButton.addEventListener('click', handleEditButton);
addProfileButton.addEventListener('click', handleAddButton);
profileImageEditButton.addEventListener('click', handleImageEditButton);

// Включение валидации
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inputErrorClass: 'popup__input_type_error',
	inputErrorTextClass: 'popup__input-error',
	errorClass: 'popup__input-error-active'
};

enableValidation(validationConfig);
