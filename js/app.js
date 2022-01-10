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
    const deadLine = '2022-01-10'
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
        }))
    })

    modalCloseBtn.addEventListener('click', close)

    document.addEventListener('keydown', (event) => { //close dialog window with Esc btn
        if (event.code === 'Escape') {
            close()
        }
    })

})
