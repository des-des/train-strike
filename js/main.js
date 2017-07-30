;(function() {

  // Firebase setup //
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


  // Helpers //
  var firstOfClass = function(className) {
    var result = document.getElementsByClassName(className)
    return result && result[0]
  }

  var openModal = function() {
    nodes.modal.classList.add('sign-me-modal--open')
  }

  var closeModal = function() {
    nodes.modal.classList.remove('sign-me-modal--open')
  }

  // DOM nodes //
  var nodes = {
    modal: firstOfClass('sign-me-modal'),
    openModalButton: firstOfClass('sign-me-modal__open-button'),
    closeModalButton: firstOfClass('sign-me-modal__close-button'),
    form: firstOfClass('sign-me-modal__form')
  }


  // Events //
  nodes.openModalButton.addEventListener('click', function() {
    openModal()
  })

  nodes.closeModalButton.addEventListener('click', function() {
    closeModal()
  })

  nodes.form.addEventListener('submit', function(e) {
    e.preventDefault()

    var name = e.target.name.value;
    var email = e.target.email.value;
    var comment = e.target.comment.value

    submissions.push({
      name: name,
      comment: comment
    })

    emails.push(email)
  })

  submissions.on('value', function(snapshot) {
    console.log(snapshot.val());
  })

}())
