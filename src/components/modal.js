const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  const popupCloseButton = popup.querySelector('.popup__close');
  document.addEventListener('keydown', handlePressEsc);
  popupCloseButton.addEventListener('click', (evt) => {
    console.log(popup);
    closeModal(popup);
  } );
}

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlePressEsc);
}

const handleOverlayClick = (evt) => {
  if( evt.target.classList.contains('popup_is-opened') ){
    closeModal(evt.target);
  }
}

const handlePressEsc = (evt) =>
  {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }
  }

export {closeModal,openModal,handleOverlayClick,handlePressEsc} ;