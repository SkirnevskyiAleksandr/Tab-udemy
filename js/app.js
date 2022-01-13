document.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item')
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabsParent = document.querySelector('.tabheader')


    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.style.display = 'none'
        })

        tabs.forEach(element => {
            element.classList.remove('tabheader__item_active')
        });
    }

    function showContent(i = 0) {
        tabs[i].classList.add('tabheader__item_active')
        tabsContent[i].style.display = "block"
    }

    hideTabContent()
    showContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((element, i) => {
                if (element == target) {
                    hideTabContent()
                    showContent(i)
                }
            });

        }
    })

    // timer
    const deadLine = '2030-01-10'
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date)

        const days = Math.floor(t / (1000 * 60 * 60 * 24))
        const hours = Math.floor((t / ((1000 * 60 * 60)) % 24))
        const minutes = Math.floor((t / 1000 / 60) % 60)
        const seconds = Math.floor((t / 1000) % 60)
        return {
            total: t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    //add zero to numbers which less then 10 
    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }



    function setClock(selector, endtime) {

        const timer = document.querySelector(selector)
        const days = timer.querySelector('#days')
        const hours = timer.querySelector('#hours')
        const minutes = timer.querySelector('#minutes')
        const seconds = timer.querySelector('#seconds')
        const timeinterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock() {
            const time = getTimeRemaining(endtime)
            days.innerHTML = addZero(31)
            hours.innerHTML = addZero(time.hours)
            minutes.innerHTML = addZero(time.minutes)
            seconds.innerHTML = addZero(time.seconds)

            if (time.total <= 0) {
                clearInterval(timeinterval)
            }
        }
    }
    setClock('.timer', deadLine)

    //modal

    const modalTrigger = document.querySelectorAll('[data-modal]')
    const modalData = document.querySelector('.modal')
    const modalCloseBtn = document.querySelector('[data-close]')



    function close() {
        modalData.style.display = 'none'
        document.body.style.overflow = ""
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', (() => {
            modalData.style.display = 'block'
            document.body.style.overflow = 'hidden'
            // clearTimeout(timer) убрали временно таймер
        }))
    })

    function open() {
        modalData.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }

    modalCloseBtn.addEventListener('click', close)

    document.addEventListener('keydown', (event) => { //close dialog window with Esc btn
        if (event.code === 'Escape') {
            close()
        }
    })

    // const timer = setTimeout(open, 5000) закрыл. чтоб не мешало)))


    //show modal when scroll to bottom
    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            open()
            window.removeEventListener('scroll', showModalScroll)
        }

    }
    window.addEventListener('scroll', showModalScroll)

    //class

    class Card {
        constructor(src, alt, title, text, prise, parent, ...className) {
            this.src = src,
                this.alt = alt,
                this.title = title,
                this.text = text,
                this.prise = prise,
                this.parent = document.querySelector(parent)
            this.className = className,
                this.usd = 27
            this.convert()
        }

        convert() {
            return this.prise = this.prise * this.usd
        }

        render() {
            const element = document.createElement('div')
            if (this.className.length <= 0) {
                element.classList.add('menu__item')
            } else {
                this.className.forEach(item => { element.classList.add(item) })
            }

            element.innerHTML = `<div>
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.prise}</span> грн/день</div>
            </div>
          </div>`
            this.parent.append(element)
        }

    }

    new Card(
        "img/tabs/vegy.jpg",
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu__field .container'

    ).render()

    new Card(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu__field .container',
        'menu__item'
    ).render()

    new Card(
        "img/tabs/post.jpg",
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        30,
        '.menu__field .container',
        'menu__item'
    ).render()

    // POST forms

    const forms = document.querySelectorAll('form')
    const messageObj = {
        loading: "Loading",
        success: "Thank You, we will reach you soon",
        failure: 'huston we have a problem!'
    }
    forms.forEach((item) => {
        formData(item)
    })

    function formData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('div')
            statusMessage.innerText = messageObj.loading
            form.append(statusMessage)

            const request = new XMLHttpRequest()
            request.open('POST', 'server.php')
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
            const formData = new FormData(form)

            const object = {}
            formData.forEach((item, i) => {
                object[i] = item
            })
            const json = JSON.stringify(object)
            request.send(json)
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response)
                    statusMessage.innerText = messageObj.success
                    form.reset()
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 2000)
                } else {
                    statusMessage.innerText = messageObj.failure
                }
            })
        })
    }

})
