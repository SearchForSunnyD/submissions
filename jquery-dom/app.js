$(document).ready(console.log(`Let’s get ready to party with jQuery!`))
$('img').addClass('image-center')
$('P')[$('P').length - 1].remove()
$('h1').css(`font-size`, `${Math.floor(Math.random()*100)}px`)
$('.col-sm-4 ol').append($(`<li>Polkadots</li>`))
$('.col-sm-4').empty().append(`<p>Im sorry for existing</p>`)
$('input').on('input', () => $('body').css('background-color', `rgb(${$('input:eq(0)').val()}, ${$('input:eq(1)').val()}, ${$('input:eq(2)').val()})`))
$('img').on('click', function () {
    $(this).remove()
})
