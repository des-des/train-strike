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

  var firebaseConfig = {
    apiKey: "AIzaSyAmOWeoxK07P0d17ESvw126PRJGi5NmuPs",
    authDomain: "train-strike.firebaseapp.com",
    databaseURL: "https://train-strike.firebaseio.com",
    projectId: "train-strike",
    storageBucket: "",
    messagingSenderId: "778542716200"
  };
  firebase.initializeApp(firebaseConfig);

  var data = firebase.database()

  var submissions = data.ref('/submissions')
  var emails = data.ref('/emails')


  submissions.push({
    name: 'Eoin',
    comment: 'God is great'
  })

  emails.push({
    "email": '123@456'
  })

  submissions.on('value').then(function(snapshot) {
    console.log(snapshot.val());
  })

}())
