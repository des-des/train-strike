var trainStrike

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
  var emails_count = data.ref('/emails_count')

  // Helpers //
  var firstOfClass = function(className) {
    var result = document.getElementsByClassName(className)
    return result && result[0]
  }

  var tag = document.createElement.bind(document)

  var openModal = function() {
    nodes.modal.classList.add('sign-me-modal--open')
  }

  var closeModal = function() {
    nodes.modal.classList.remove('sign-me-modal--open')
  }

  var renderComment = function(data) {
    nodes.commentsInner.classList.add('comments__inner--hidden')
    setTimeout(function() {
      nodes.commentsAuthor.textContent = data.name
      nodes.commentsText.textContent = data.comment
      nodes.commentsInner.classList.remove('comments__inner--hidden')
    }, 500)
  }

  var renderEmailCount = function(count) {
    nodes.emailCount.textContent = count.toString() || 'many'
  }

  // DOM nodes //
  var nodes = {
    modal: firstOfClass('sign-me-modal'),
    openModalButton: firstOfClass('sign-me-modal__open-button'),
    closeModalButton: firstOfClass('sign-me-modal__close-button'),
    form: firstOfClass('sign-me-modal__form'),
    commentsText: firstOfClass('comments__text'),
    commentsAuthor: firstOfClass('comments__author'),
    commentsInner: firstOfClass('comments__inner'),
    emailCount: firstOfClass('email-count'),
    formNameError: firstOfClass('sign-me-modal__form__name-error'),
    formEmailError: firstOfClass('sign-me-modal__form__email-error')
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

    var name = e.target.name.value
    var email = e.target.email.value
    var comment = e.target.comment.value

    var nameInvalid = !name || name === ''
    if (nameInvalid) {
      nodes.formNameError.classList.remove('dn')
      nodes.formNameError.classList.add('di')
    }

    var emailInvalid = !email || email === ''
    if (emailInvalid) {
      nodes.formEmailError.classList.remove('dn')
      nodes.formEmailError.classList.add('di')
    }

    if (nameInvalid || emailInvalid) {
      return
    }

    submissions.push({
      name: name,
      comment: comment
    })

    emails.push(email)

    nodes.form.reset()
    closeModal()
  })

  submissions.limitToLast(1).on('child_added', function(snapshot) {
    renderComment(snapshot.val())
  })

  emails_count.on('value', function(snapshot) {
    renderEmailCount(snapshot.val())
  })

}())
