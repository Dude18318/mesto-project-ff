const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
}

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
}

const handleOverlayClick = (evt) => {
  if( evt.target.classList.contains('popup_is-opened') ){
    closeModal(evt.target);
  }
}

const handlePressEsc = (evt) =>
  {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
      closeModal(popup);
    }
  }

export {closeModal,openModal,handleOverlayClick,handlePressEsc} ;