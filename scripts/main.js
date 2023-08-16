class Intro {
    init = () => {
        this.initDOMElements();
        this.handleSearchPopupAction();
        this.swiperInit();
        this.galleryInit();
        this.handleGalleryOpener();
        this.gallerySliderInit();
        this.gallerySliderActions();
        this.customCursorInit();
        this.navigationMenuOpener();
        this.animationInit();
        this.aosInit();
    }

    initDOMElements = () => {
        this.hamburgerButton = document.querySelector('.navigation-section .navigation-section__content__link-container--menu-opener');
        this.navigationSection = document.querySelector('.navigation-section');
        this.navigationContainer = document.querySelector('.navigation-section .navigation-section__content__link-container--list');
        this.navigationListLinks = document.querySelectorAll('.navigation-section .navigation-section__content__link-container--list ul li a')
        this.searchOpener = document.querySelector('.navigation-section button.magnifier');
        this.searchCloser = document.querySelector('.navigation-section .navigation-section__content__search .close-button');
        this.searchPopup = document.querySelector('.navigation-section .navigation-section__content__search');
        this.gallerySection = document.querySelector('.gallery-section');
        this.galleryBtn = document.querySelector('.gallery-section .btn-secondary');
        
        this.currentImageIndex = 0;
        this.sliderContainer = document.querySelector('.gallery-section__slider');
        this.sliderImage = document.querySelector('.slider-img');
        this.galleryImages = document.querySelectorAll('.gallery-section__images-img');
        this.images = Array.from(this.galleryImages).map(image => image.getAttribute('src'));
        this.arrowSliderNext = document.querySelector('.gallery-section .button-next');
        this.arrowSliderPrev = document.querySelector('.gallery-section .button-prev');
        this.gallerySliderClose = document.querySelector('.gallery-section .close-button')

        this.customCursor = document.querySelector('.custom-cursor');
        this.galeryImgs = document.querySelectorAll('.gallery-section__images-img');
    }



    handleSearchPopupAction = () => {
        this.searchOpener.addEventListener('click', () => {
            this.searchPopup.classList.add('search--active');
        });
        this.searchCloser.addEventListener('click', () => {
            this.searchPopup.classList.remove('search--active');
        })  
    }

    // nav menu 

    navigationMenuOpener = () => {
        this.hamburgerButton.addEventListener('click', () => {
            this.hamburgerButton.classList.toggle('button--active');
            this.navigationContainer.classList.toggle('navigation--active');
            this.navigationSection.classList.toggle('navigation-section--active');
        });
        this.navigationListLinks.forEach(element => {
            element.addEventListener('click', () => {
                this.hamburgerButton.classList.toggle('button--active');
                this.navigationContainer.classList.toggle('navigation--active');
                this.navigationSection.classList.toggle('navigation-section--active');
            });
        });
        document.addEventListener('click', event => {
            if(!this.navigationSection.contains(event.target)){
                this.hamburgerButton.classList.remove('button--active');
                this.navigationContainer.classList.remove('navigation--active');
                this.navigationSection.classList.remove('navigation-section--active');
            }
        });
    }


    swiperInit = () => {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }


    // Gallery images

    galleryInit = () => {
        new Macy({
            container: '.gallery-section__images',
            mobileFirst: false,
            columns: 3,
            breakAt: {
              500: 1,
              800: 2,
              1100: 3,
            },
            margin: {
              x: 43,
              y: 43,
            }
         })
    }
    

    handleGalleryOpener = () => {
        this.galleryBtn.addEventListener('click', () => {
            this.gallerySection.classList.toggle('gallery--active');
        });
    }

    gallerySliderInit = () => {
        
        for (let i = 0; i < this.galleryImages.length; i++) {
            this.galleryImages[i].addEventListener('click', () => this.openSlider(this.galleryImages[i]));
        }
        
    }

    openSlider = clickedImage => {
        this.currentImageIndex = this.images.indexOf(clickedImage.getAttribute('src'));
        this.sliderImage.src = clickedImage.getAttribute('src');
        this.sliderContainer.classList.add('slider--active');
    }

    closeSlider = () => {
        this.sliderContainer.classList.remove('slider--active');
    }

    gallerySliderActions = () => {

        this.arrowSliderNext.addEventListener('click', () => {
            this.nextImage();
        });
        this.arrowSliderPrev.addEventListener('click', () => {
            this.prevImage();
        });
        this.gallerySliderClose.addEventListener('click', () => {
            this.closeSlider();
        });
        

    }

    prevImage = () => {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.sliderImage.src = this.images[this.currentImageIndex];
    }
    
    nextImage = () => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.sliderImage.src = this.images[this.currentImageIndex];
    }


    // custom cursor


    showCursor = () => {
        this.customCursor.classList.toggle('custom-cursor--active');
    }

    hideCursor = () => {
        this.customCursor.classList.toggle('custom-cursor--active');
    }

    onMouseMove = (e) =>{
        this.customCursor.style.left = e.pageX + 'px';
        this.customCursor.style.top = e.pageY + 'px';
    }

    customCursorInit = () => {
        this.galeryImgs.forEach(element => {
            element.addEventListener('mouseover', this.showCursor);
        });
        this.galeryImgs.forEach(element => {
            element.addEventListener('mouseout', this.showCursor);
        });

        document.addEventListener('mousemove', this.onMouseMove);
    }


    // ###################
    //
    //     Animations
    //                          
    // ###################


    aosInit = () => {
        AOS.init({
            duration: 600,
            once: true,
        });
    }

    animationInit = () => {
        const tl = gsap.timeline({});

        tl.to('.opener-secion__content--logo img', {opacity: 1, duration: 1, delay: .5})
        tl.to('.opener-secion__content--img', {scale: 1.5, duration: 2.5}, "<");
        tl.to('.opener-secion', {y: '-150%', opacity:0, duration: 2, ease: 'Power4.easeOut'});
        tl.from('.main-section__content h1', {y: -20, opacity: 0, duration: 0.2, delay: 1}, "<");
        tl.from('.main-section__content p', {y: -20, opacity: 0, duration: 0.2, delay: .2}, "<");
        tl.from('.main-section__content .btn-primary', {y: -20, opacity: 0, duration: .2, delay: .2}, "<");
        tl.from('.main-section__content .btn-secondary', {y: -20, opacity: 0, duration: .2, delay: .2}, "<");
        tl.from('.main-section .arrow-container', {y: '100%'}, "<")


    }




}

let objIntro = new Intro();
objIntro.init();





// galeryImgs.forEach(element => {
//     element.addEventListener('mouseover', showCursor);
// });
// galeryImgs.forEach(element => {
//     element.addEventListener('mouseout', showCursor);
// });


// const onMouseMove = (e) =>{
//     customCursor.style.left = e.pageX + 'px';
//     customCursor.style.top = e.pageY + 'px';
// }

// document.addEventListener('mousemove', onMouseMove);