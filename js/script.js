//===================================== DARK THEME =========================
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// PREVEIOSLY SELECTED TOPIC (checking from local storage)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme)?'dark':'light'
const getCurrentIcon = () => document.body.classList.contains(iconTheme)?'uil-moon':'uil-sun'

//We need to validate if the user has previously chosen a topic
if(selectedTheme){
    document.body.classList[selectedTheme === 'dark'?'add':'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon'?'add':'remove'](iconTheme)
}

// Activate/ deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    //ADD or remove the dark/light icon -- icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    //We save the theme and the current icon that the user has chosen
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
console.log("THEME SETTING IS WORKING!")

//===================================== MENU SHOW Y HIDDEN =========================
const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')

// ================  MENU SHOW  =============
/*  Validate if the constant exists */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
} 

// ================  MENU HIDE  =============
/*  Validate if the constant exists */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
} 



console.log("MENU Y SETTING WORKING!")
//===================================== REMOVE MENU PRORFILE =========================
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // when we click on nav__links, we remove the show menu
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))
console.log("Remove menu profile is working!")


//===================================== Typewriter Effect =========================


new Typewriter('#typewriter', {
  strings: ['Όλα αρχίζουν..', 'από την ιδέα',''],
  autoStart: true,
  loop: true,
  cursor: "|"
});
console.log("Typewriter effect is working!")

//===================================== Portfolio  =========================

class Tinyx {

    /**
     * @param {HTMLElement} element
     * @param {{}} options
     */
    constructor(element, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw Error('HTML element expected as argument.')
        }

        this.element = element
        this.options = {
            id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
            imgLinkClassName: 'js-tinyx-img-link',
            ...options,
        }
        this.imgLinks = [...this.element.querySelectorAll(`.${this.options.imgLinkClassName}`)]
        this.html = null
        this.closeBtn = null
        this.prevBtn = null
        this.nextBtn = null
        this.img = null

        this.imgIndex = null

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.closeByBackdrop = this.closeByBackdrop.bind(this)
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
        this.keyboardActions = this.keyboardActions.bind(this)

        this.init()
    }

    init() {
        this.imgIndex = 0

        this.createHTML()

        this.addIndexToImgs()

        this.addEvents()
    }

    createHTML() {
        document.body.insertAdjacentHTML('beforeend', this.generateHTML())

        this.html = document.querySelector(`.js-tinyx[data-tinyx-id="${this.options.id}"]`)
        this.closeBtn = this.html.querySelector('.js-tinyx-close-btn')
        this.prevBtn = this.html.querySelector('.js-tinyx-prev-btn')
        this.nextBtn = this.html.querySelector('.js-tinyx-next-btn')
        this.img = this.html.querySelector('.js-tinyx-img')
    }

    generateHTML() {
        return `
            <div class="tinyx is-hidden js-tinyx" tabindex="0" data-tinyx-id="${this.options.id}">
                <div class="tinyx__close">
                    <button type="button" class="tinyx__close-btn js-tinyx-close-btn">
                        &times;
                    </button>
                </div>
                <div class="tinyx__cont">
                    <img src="" alt="" class="tinyx__img js-tinyx-img" />
                    <button
                        type="button"
                        class="tinyx__control-btn tinyx__control-btn--prev js-tinyx-prev-btn"
                    >
                        &larr;
                    </button>
                    <button
                        type="button"
                        class="tinyx__control-btn tinyx__control-btn--next js-tinyx-next-btn"
                    >
                        &rarr;
                    </button>
                </div>
            </div>
        `
    }

    addIndexToImgs() {
        this.imgLinks.forEach((el, i) => {
            el
                .querySelector('img')
                .setAttribute('data-tinyx-img-index', i)
        })
    }

    /**
     * @param {*} e
     * @param {*} element
     */
    open(e = null, element = null) {
        if (e !== null) e.preventDefault()

        const target = element === null ? e.target : element
        const targetSrc = target.getAttribute('src')
        const targetAlt = target.getAttribute('alt')

        this.img.setAttribute('src', targetSrc)
        this.img.setAttribute('alt', targetAlt)

        this.imgIndex = parseInt(target.dataset.tinyxImgIndex)

        this.html.classList.remove('is-hidden')
        this.html.focus()
    }

    close() {
        this.html.classList.add('is-hidden')

        this.img.setAttribute('src', '')
        this.img.setAttribute('alt', '')

        this.imgIndex = 0
    }

    /**
     * @param {{}} e
     */
    closeByBackdrop(e) {
        if (this.html !== e.target) return null

        this.close()
    }

    prev() {
        if (this.imgIndex === 0) {
            this.imgIndex = this.imgLinks.length - 1
        } else {
            this.imgIndex--
        }

        this.open(null, this.element.querySelector(`[data-tinyx-img-index="${this.imgIndex}"]`))
    }

    next() {
        if (this.imgIndex === this.imgLinks.length - 1) {
            this.imgIndex = 0
        } else {
            this.imgIndex++
        }

        this.open(null, this.element.querySelector(`[data-tinyx-img-index="${this.imgIndex}"]`))
    }

    /**
     * @param {{}} e
     */
    keyboardActions(e) {
        /**
         * Key Codes:
         * 27 - Esc
         * 37 - Left Arrow
         * 39 - Right Arrow
         */
        switch (e.keyCode) {
            case 27:
                this.close()
                break
            case 37:
                this.prev()
                break
            case 39:
                this.next()
        }
    }

    addEvents() {
        this.html.addEventListener('click', this.closeByBackdrop)
        this.html.addEventListener('keyup', this.keyboardActions)
        this.closeBtn.addEventListener('click', this.close)
        this.imgLinks.forEach(el => {
            el.addEventListener('click', this.open)
        })
        this.prevBtn.addEventListener('click', this.prev)
        this.nextBtn.addEventListener('click', this.next)
    }

    destroy() {
        this.html.removeEventListener('click', this.closeByBackdrop)
        this.html.removeEventListener('keyup', this.keyboardActions)
        this.closeBtn.removeEventListener('click', this.close)
        this.imgLinks.forEach(el => {
            el.removeEventListener('click', this.open)
        })
        this.prevBtn.removeEventListener('click', this.prev)
        this.nextBtn.removeEventListener('click', this.next)

        this.close()

        this.html.parentNode.removeChild(this.html)

        this.html = null
        this.closeBtn = null
        this.prevBtn = null
        this.nextBtn = null
        this.img = null

        this.imgIndex = null
    }
}

// ---

window.lightboxObj = {}

window.addEventListener('DOMContentLoaded', () => {
    const lightboxEls = [...document.querySelectorAll('.js-lightbox')]

    if (lightboxEls.length) {
        lightboxEls.forEach(el => {
            lightboxObj[el.dataset.lightboxId] = new Tinyx(el, {
                id: el.dataset.lightboxId,
                imgLinkClassName: 'js-lightbox-img-link',
            })
        })
    }
})


//===================================== SCROLL UP =========================
function scrollUp(){
    const scrollup = document.getElementById('scroll-up');
    // When the scroll higher than 560 viewpoint /height , then the scroll up icon showld appear and on clicking should reach top of the page
    if(this.scrollY >= 560) {
        scrollup.classList.add('show-scroll');
    }
    else {
        scrollup.classList.remove('show-scroll')
    }
    console.log("Scroll up being called and working!")
}
window.addEventListener('scroll', scrollUp)

//===================================== SCROLL SECTION ACTIVE HIGHLIGHT =========================

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })


    console.log("Section highlight working!")
}
window.addEventListener('scroll', scrollActive)


