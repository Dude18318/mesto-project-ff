
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handlePressEsc);
}

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlePressEsc);

}

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
}

const handlePressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export { closeModal, openModal, handleOverlayClick, handlePressEsc };