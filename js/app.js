document.addEventListener('DOMContentLoaded', () => {
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
})