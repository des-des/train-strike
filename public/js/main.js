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
  var firstOfClass = function(className, parent) {
    var result = (parent || document).getElementsByClassName(className)
    return result && result[0]
  }

  var tag = document.createElement.bind(document)

  var openModal = function() {
    nodes.modal.classList.add('sign-me-modal--open')
  }

  var closeModal = function() {
    nodes.modal.classList.remove('sign-me-modal--open')
  }

  var comment = function(nodeData) {
    var self = {}

    var node = nodes.commentsInner.cloneNode(true)
    firstOfClass('comments__author', node).textContent = nodeData.name
    firstOfClass('comments__text', node).textContent = nodeData.comment
    node.classList.add('comments__inner--hidden')
    node.style.top = '20px'
    nodes.comments.insertBefore(node, nodes.comments.firstChild)
    self.node = node

    setTimeout(function() {
      node.classList.remove('comments__inner--hidden')
    }, 50)

    var moveDown = function (dist) {
      var top = node.style.top
      var topNum = top
        ? parseInt(top.slice(0, top.indexOf('px')), 10)
        : 0

      node.style.top = (topNum + dist) + 'px'
    }
    self.moveDown = moveDown

    var deleteSelf = function() {
      node.classList.add('comments__inner--hidden')
      setTimeout(function() {
        node.parentNode.removeChild(node)
      }, 500)
    }
    self.deleteSelf = deleteSelf

    return self
  }

  var comments = (function () {
    var self = {}
    var nodes = []

    var addNode = function(nodeData) {
      var newNode = comment(nodeData)
      nodes.forEach(node => node.moveDown(newNode.node.clientHeight))
      nodes.push(newNode)
      if (nodes.length >= 4) {
        nodes.shift().deleteSelf()
      }
    }
    self.addNode = addNode

    return self
  })()

  var renderComment = function(data) {
    comments.addNode(data)
  }

  var renderEmailCount = function(count) {
    nodes.emailCount.textContent = count ? count.toString() : 'many'
  }

  var validateFormAndDisplayErrors = function(name, email) {
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

    return !(nameInvalid || emailInvalid)
  }

  var hideFormErrors = function() {
    nodes.formNameError.classList.remove('di')
    nodes.formNameError.classList.add('dn')
    nodes.formEmailError.classList.remove('di')
    nodes.formEmailError.classList.add('dn')
  }

  // DOM nodes //
  var nodes = {
    modal: firstOfClass('sign-me-modal'),
    openModalButton: firstOfClass('sign-me-modal__open-button'),
    closeModalButton: firstOfClass('sign-me-modal__close-button'),
    form: firstOfClass('sign-me-modal__form'),
    comments: firstOfClass('comments'),
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

    if (!validateFormAndDisplayErrors(name, email)) {
      return;
    } else {
      hideFormErrors()
    }

    var submissionId = uuidv4()

    data.ref('/submissions/' + submissionId).set({
      name: name,
      comment: comment
    })

    data.ref('/emails/' + submissionId).set(email)

    nodes.form.reset()
    closeModal()
  })

  submissions.limitToLast(3).on('child_added', function(snapshot) {
    renderComment(snapshot.val())
  })

  emails_count.on('value', function(snapshot) {
    renderEmailCount(snapshot.val())
  })

}())
