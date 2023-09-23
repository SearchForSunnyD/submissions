'use strict'

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $('body')
const $window = $(window)

const $storiesLoadingMsg = $('#stories-loading-msg')
const $allStoriesList = $('#all-stories-list')

const $loginForm = $('#login-form')
const $signupForm = $('#signup-form')
const $postSubmitForm = $('#story-submit')
const $editSubmitForm = $('#edit-submit')
const $userSettings = $('#user-settings')

const $navLogin = $('#nav-login')
const $navUserProfile = $('#nav-user-profile')
const $navLogOut = $('#nav-logout')
const $navPost = $('#nav-post')
const $navLeft = $('.nav-left')

const $setName = $('#settings-name')
const $setPass = $('#settings-password')
const $editTitle = $('#edit-title')
const $editAuthor = $('#edit-author')
const $editUrl = $('#edit-url')

const $submit = $(':button')

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
    const components = [
        $allStoriesList,
        $loginForm,
        $signupForm,
        $postSubmitForm,
        $userSettings,
        $editSubmitForm,
    ]
    components.forEach((c) => c.hide())
}

/** Overall function to kick off the app. */

async function start() {
    console.debug('start')

    hidePageComponents()

    // "Remember logged-in user" and log in, if credentials in localStorage
    await checkForRememberedUser()
    await getAndShowStories()
    // if we got a logged-in user
    if (currentUser) updateUIOnUserLogin()
}

// Once the DOM is entirely loaded, begin the app

console.warn(
    'HEY STUDENT: This program sends many debug messages to' +
        " the console. If you don't see the message 'start' below this, you're not" +
        ' seeing those helpful debug messages. In your browser console, click on' +
        " menu 'Default Levels' and add Verbose"
)
$(start)
