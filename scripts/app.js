document.addEventListener('DOMContentLoaded', ()=>{
    const heroSlider = new Swiper('.hero__slider', {
        loop: true,
        speed: 500,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    })
})