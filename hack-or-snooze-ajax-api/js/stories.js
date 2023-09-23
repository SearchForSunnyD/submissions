'use strict'

// This is the global list of the stories, an instance of StoryList
let storyList
let $loadMore = true

/** Get and show stories when site first loads. */

async function getAndShowStories() {
    storyList = await StoryList.getStories()
    $storiesLoadingMsg.remove()

    putStoriesOnPage()
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
    // console.debug("generateStoryMarkup", story);

    const hostName = story.getHostName()
    return $(`
        <li id="${story.storyId}">
            <div class="box-1">
                ${Boolean(currentUser) ? heart(story, currentUser) : ''}
                <div class="box-2">
                    <div class="box-3">
                        <a href="${
                            story.url
                        }" target="a_blank" class="story-link">
                        ${story.title}
                        </a>
                        <small class="story-hostname">(${hostName})</small>
                    </div>
                    <small class="story-author">by ${story.author}</small>
                    <small class="story-user">posted by ${
                        story.username
                    }</small>
                </div>
                ${Boolean(currentUser) ? (isOwner(story) ? edit() : '') : ''}
                ${Boolean(currentUser) ? (isOwner(story) ? trash() : '') : ''}
            </div>
        </li>
    `)
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
    console.debug('putStoriesOnPage')

    $allStoriesList.empty()

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
        const $story = generateStoryMarkup(story)
        $allStoriesList.append($story)
    }

    $allStoriesList.show()
}

/** Gets list of stories from currentUser.favorites, generates their HTML, and puts on page. */

function putFavoritesOnPage() {
    console.debug('putFavoritesOnPage')

    $allStoriesList.empty()

    if (currentUser.favorites.length !== 0) {
        // loop through all of our stories and generate HTML for them
        for (let story of currentUser.favorites) {
            story = new Story(story)
            const $story = generateStoryMarkup(story)
            $allStoriesList.append($story)
        }

        $loadMore = false
    } else {
        $allStoriesList.append(
            `<h3>You haven't favorited any stories yet!</h3><h6>Click the heart next to a story to favorite it!</h6>`
        )
    }
    $allStoriesList.show()
}

/** Gets list of stories from currentUser.ownStories, generates their HTML, and puts on page. */

function putUserStoriesOnPage() {
    console.debug('putUserStoriesOnPage')

    $allStoriesList.empty()

    if (currentUser.ownStories.length !== 0) {
        // loop through all of our stories and generate HTML for them
        for (let story of currentUser.ownStories) {
            story = new Story(story)
            const $story = generateStoryMarkup(story)
            $allStoriesList.append($story)
        }

        $loadMore = false
    } else {
        $allStoriesList.append(
            `<h3>You haven't posted any stories yet!</h3><h6>Use the Submit link to post a story!</h6>`
        )
    }

    $allStoriesList.show()
}

/** Posts a story to the server */

async function post(evt) {
    console.debug('post')
    evt.preventDefault()

    // create obj from title, author and url
    const newStory = {
        title: $('#title').val(),
        author: $('#author').val(),
        url: $('#url').val(),
    }

    //try to send information to api and wait
    try {
        await storyList.addStory(currentUser, newStory)
    } catch (err) {
        alert(err.response.data.error.message)
    }

    $postSubmitForm.trigger('reset')
    await updateCurrUser()
    getAndShowStories()
}

$postSubmitForm.on('submit', post)

/** Toggles a story as being a favorite on the server, webpage and currentUser */

async function toggleFavorite(evt) {
    console.debug('favorite', evt)
    const $t = evt.target.closest('li')
    const $i = evt.target.closest('span').childNodes[1]

    if (!favorite($t.id)) {
        await addFav($t.id)
    } else {
        await removeFav($t.id)
    }
    $i.classList.toggle('fa-regular')
    $i.classList.toggle('fa-solid')

    updateCurrUser()
}

$allStoriesList.on('click', 'span.heart', toggleFavorite)

/** Generate heart can html */

function heart(story) {
    return `<span class="heart">
    <i class="fa-heart fa-${favorite(story.storyId) ? 'solid' : 'regular'}"></i>
</span>`
}

/** Generate trash can html */

function trash() {
    return `<span class="delete-post">
    <i class="fa-solid fa-trash-can"></i>
</span>`
}

/** Generate gear html */

function edit() {
    return `<span class="edit-post">
    <i class="fa-solid fa-pencil"></i>
</span>`
}

/** Determines if the currentUser is the owner of a post. */

function isOwner(story) {
    return currentUser.ownStories.some((item) => item.storyId === story.storyId)
}

/** Determines if the post is selected as a favorite of the currentUser. */

function favorite(story) {
    return currentUser.favorites.some((item) => item.storyId === story)
}


/** Shows edit form on click of edit icon */

async function showEditForm(evt) {
    console.debug('edit', evt.target)
    await hidePageComponents()
    const storyId = evt.target.closest('li').id
    const response = await axios.get(`${BASE_URL}/stories/${storyId}`)
    const story = new Story(response.data.story)

    $editTitle.attr('placeholder', story.title)
    $editAuthor.attr('placeholder', story.author)
    $editUrl.attr('placeholder', story.url)

    $editSubmitForm.data('storyId', storyId)
    $editSubmitForm.data('story', story)

    $editSubmitForm.show()
}

$allStoriesList.on('click', 'span.edit-post', showEditForm)

/** Edits a post on the server, webpage and from the currentUser local storage. */

async function editPostSubmit(evt) {
    console.debug('editPost',evt)
    evt.preventDefault()
    
    const data = $editSubmitForm.data()

    if ($editTitle.val() !== '') {
        data.story.title = $editTitle.val()
    }
    if ($editAuthor.val() !== '') {
        data.story.author = $editAuthor.val()
    }
    if ($editUrl.val() !== '') {
        data.story.url = $editUrl.val()
    }

    await editPost(data.story, data.storyId)
    getAndShowStories()
}

$editSubmitForm.on('submit', editPostSubmit)


/** Deletes a post on the server, webpage and from the currentUser local storage. */

async function deletePost(evt) {
    if (
        confirm(
            'Are you sure you want to delete your post? \nThere is no turning back!'
        )
    ) {
        const $t = evt.target.closest('li')
        try {
            await axios.delete(
                `${BASE_URL}/stories/${$t.id}?token=${currentUser.loginToken}`
            )
            $t.remove()
        } catch (err) {
            alert(err.response.data.error.message)
        }
        updateCurrUser()
    }
}

$allStoriesList.on('click', 'span.delete-post', deletePost)

/** Gets another list of stories from server, generates their HTML, and puts on page. */

async function loadMoreStories() {
    if (
        $window[0].scrollY + $window.height() > $body.height() && //if scroll is at the bottom of the page
        storyList.stories.length % 25 === 0 && //max size of a response has 25 stories. if the story list doesnt have a multiple of 25, then there arent any more stories
        $loadMore === true //latch if program is running or not
    ) {
        //latch closed to stop multiple firings of function
        $loadMore = false
        const response = await axios({
            url: `${BASE_URL}/stories?skip=${storyList.stories.length}`,
            method: 'GET',
        })

        // turn plain old story objects from API into instances of Story class
        const stories = response.data.stories.map((story) => new Story(story))
        for (let story of stories) {
            storyList.stories.push(story)
        }
        putStoriesOnPage()
        //unlatch function to be able to load more stories
        $loadMore = true
    }
}

$window.scroll(loadMoreStories)
