$('#submit').on('click', function () {
    if ($('#title').val() === '' || $('#title').val().length < 2){
        return alert('INVALID TITLE!')
    }
    if ($('#rating').val() < 0 || $('#rating').val() > 10 || $('#rating').val() === ''){
        return alert('INVALID RATING!')
    }
    $('#rate-container ul').append($('<li></li>').attr('li-rating', $('#rating').val()).attr('li-title', $('#title').val()[0].toLowerCase()).text(`${$('#title').val()}    ${$('#rating').val()}/10`).append('<button>X</button>').on('click', function () {
        $(this).remove()
    }))
    $('#title').val('')
    $('#rating').val('')
    refreshSorting()
})

$('#sort-select').on('change', function() {
    refreshSorting();
});
$('#sort-order').on('change', function() {
    refreshSorting();
});

function refreshSorting() {
    let arr = $('#rate-container li').get()
    sortHandler(arr)
    $('#rate-container ul').empty()
    $('#rate-container ul').append(arr)
}

function sortHandler(arr) {
    arr.sort(function(a, b) {
        let aValue = $(a).attr('li-title')
        let bValue = $(b).attr('li-title')
        if (aValue == null) aValue = ''
        if (bValue == null) bValue = ''
        
        if (aValue < bValue) {
            return -1;
        } else if (aValue > bValue) {
            return 1;
        } else {
            return 0;
        }
    })
    if ($('#sort-select').val() === 'rating') {
        arr.sort(function(a, b) {
            let aValue = $(a).attr('li-rating')
            let bValue = $(b).attr('li-rating')
            if (aValue == null) aValue = ''
            if (bValue == null) bValue = ''
            
            if (aValue < bValue) {
                return -1;
            } else if (aValue > bValue) {
                return 1;
            } else {
                return 0;
            }
        })
    }
    if ($('#sort-order').val() === 'ascend') {
        arr.reverse();
    }
}
