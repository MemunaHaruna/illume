/* eslint-disable no-console */

import { register } from 'register-service-worker'

function showAddToHomeScreen() {
  var a2hsBtn = document.querySelector('.add-to-home')
  a2hsBtn.style.display = 'block'
  a2hsBtn.addEventListener('click', addToHomeScreen)
}

function addToHomeScreen() {
  // hide our user interface that shows our A2HS button
  var a2hsBtn = document.querySelector('.add-to-home')
  a2hsBtn.style.display = 'none' // Show the prompt
  deferredPrompt.prompt() // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(function(choiceResult) {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
    } else {
      console.log('User dismissed the A2HS prompt')
    }

    deferredPrompt = null
  })
}

if (process.env.NODE_ENV === 'production') {
  var deferredPrompt
  window.addEventListener('beforeinstallprompt', function(event) {
    console.log('before app install prompt...')
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = event
    showAddToHomeScreen()
  })

  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      console.log('New content is available; please refresh.')
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
