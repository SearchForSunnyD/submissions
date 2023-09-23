'use strict'

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
    console.debug('navAllStories', evt)
    hidePageComponents()
    putStoriesOnPage()
    $loadMore = true
}

$body.on('click', '#nav-all', navAllStories)

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
    console.debug('navLoginClick', evt)
    hidePageComponents()
    $loginForm.show()
    $signupForm.show()
}

$navLogin.on('click', navLoginClick)

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
    console.debug('updateNavOnLogin')
    $('.main-nav-links').show()
    $navLogin.hide()
    $navLogOut.show()
    $navLeft.show()
    $navUserProfile.text(`${currentUser.username}`).show()
}

/** Show submit post on click on "Submit" */

function showSubmit(evt) {
    console.debug('navLoginClick', evt)
    hidePageComponents()
    $postSubmitForm.show()
}

$navPost.on('click', showSubmit)

/** Show users stories on click on "My Stories" */

function navUserStories() {
    hidePageComponents()
    putUserStoriesOnPage()
}

$body.on('click', '#nav-myStory', navUserStories)

/** Show users favorite stories on click on "Favorites" */

function navFavoriteStories() {
    hidePageComponents()
    putFavoritesOnPage()
}

$body.on('click', '#nav-fav', navFavoriteStories)

/** Show users profile on click on their username */

function navUserProfile(evt) {
    console.debug('navUserProfile', evt)
    hidePageComponents()
    $setName.attr(`placeholder`, currentUser.name)
    $userSettings.show()
}

$navUserProfile.on('click', navUserProfile)
