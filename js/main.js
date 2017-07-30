;(function() {
  var modalNode = document.getElementsByClassName('sign-me-modal')[0]
  var openModal = () => {
    modalNode.classList.add('sign-me-modal--open')
  }

  var closeModal = () => {
    modalNode.classList.remove('sign-me-modal--open')
  }

  var openModalButton = document.getElementsByClassName('sign-me-modal__open-button')[0]
  var closeModalButton = document.getElementsByClassName('sign-me-modal__close-button')[0]


  openModalButton.addEventListener('click', function() {
    openModal()
  })

  closeModalButton.addEventListener('click', function() {
    closeModal()
  })
}())
