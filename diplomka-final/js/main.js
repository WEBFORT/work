(function () {


    document.addEventListener('click', (e) => {
        // Аккордеон навигации
        const dropBtn = document.querySelector('.dropdown-btn')
        const dropContentOpen = dropBtn.parentElement

        document.addEventListener('click', (e) => {

            if (e.target && e.target.classList.contains('dropdown-btn')) {

                dropContentOpen.classList.toggle('dropdown--active')
            }
            else {
                dropContentOpen.classList.remove('dropdown--active')
            }
        })

        // Бургер меню

        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.nav__item')

        if (!burgerIcon && !burgerNavLink) return
        if (document.documentElement.clientWidth > 900) return

        document.body.classList.toggle('body--opened-menu')

        if (e.target && e.target.classList.contains('dropdown-link')) {
            document.querySelector('.body--opened-menu').classList.remove('body--opened-menu')
        }
    })

    //Табы
    const tabList = document.querySelector('.service__tabs-list')

    tabList.addEventListener('click', (e) => {

        const target = e.target
        const tabItem = target.parentElement
        e.preventDefault()

        document.querySelector('.service--tabs-active').classList.remove('service--tabs-active')
        tabItem.classList.add('service--tabs-active')

        const tabId = target.getAttribute('href')
        const tabContent = document.querySelector(tabId)

        document.querySelector('.service--content-active').classList.remove('service--content-active')
        tabContent.classList.add('service--content-active')
    })

    //Аккордион

    document.querySelectorAll('.accord__content-heading').forEach((el) => {
        el.addEventListener('click', () => {
            const accordActive = el.parentElement
            if (accordActive && accordActive.classList.contains('accord--open-active')
            ) {
                accordActive.classList.remove('accord--open-active')

            } else {
                accordActive.classList.add('accord--open-active')

            }


            const accordContent = el.nextElementSibling;

            if (accordContent.style.maxHeight) {
                accordContent.style.maxHeight = null;
            } else {
                accordContent.style.maxHeight = accordContent.scrollHeight + 'px';
            }

        })

    })

    //  Кейс-слайдер

    new Swiper('.case__slider', {
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: true,
        slidesPerGroup: 1,


        navigation: {
            nextEl: '.case__nav-next',
            prevEl: '.case__nav-prev',
        },

        breakpoints: {

            401: {
                slidesPerView: 1.1,

            },
            501: {
                slidesPerView: 1.3,
            },
            601: {
                slidesPerView: 1.5,
            },
            701: {
                slidesPerView: 1.7,
            },
            801: {
                slidesPerView: 1.8,
            },
            901: {
                slidesPerView: 2,
                centeredSlides: false,
                slidesPerGroup: 2,

            },
            1101: {
                slidesPerView: 2.5,
                spaceBetween: 40,
                centeredSlides: false,
                slidesPerGroup: 2,


            },
            1261: {
                slidesPerView: 3,
                spaceBetween: 15,
                centeredSlides: false,
                slidesPerGroup: 3,
            }
        }

    })


    //Табы-plans

    function initializeTabContainer(tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.plans__tabs-button');
        const tabBackground = tabContainer.querySelector('.plans__tabs-background');
        const tabContentContainer = tabContainer.nextElementSibling;
        const tabItems = tabContentContainer.querySelectorAll('.plans__tabs-item');
        let currentActiveTab = 0;

        function setActiveTab(newTabIndex) {
            const currentTab = tabButtons[currentActiveTab];
            const newTab = tabButtons[newTabIndex];

            tabButtons.forEach(button => button.classList.remove('active'));
            newTab.classList.add('active');

            tabItems.forEach(item => {
                if (item.dataset.tab == newTab.dataset.tab) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            const currentRect = currentTab.getBoundingClientRect();
            const newRect = newTab.getBoundingClientRect();
            const containerRect = tabButtons[0].parentElement.getBoundingClientRect();

            if (newTabIndex > currentActiveTab) {
                // Moving right
                tabBackground.style.width = `${newRect.right - currentRect.left}px`;
                tabBackground.style.left = `${currentRect.left - containerRect.left}px`;

                setTimeout(() => {
                    tabBackground.style.width = `${newRect.width}px`;
                    tabBackground.style.left = `${newRect.left - containerRect.left}px`;
                }, 150);
            } else {
                // Moving left
                tabBackground.style.width = `${currentRect.right - newRect.left}px`;
                tabBackground.style.left = `${newRect.left - containerRect.left}px`;

                setTimeout(() => {
                    tabBackground.style.width = `${newRect.width}px`;
                }, 150);
            }

            currentActiveTab = newTabIndex;
        }

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => setActiveTab(index));
        });

        // Initialize the first tab as active
        setActiveTab(0);
    }

    // Initialize all tab containers
    document.querySelectorAll('.plans__tabs-container').forEach(initializeTabContainer);



    //Клиент-слайдер
    new Swiper('.client__slider', {
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: true,


        navigation: {
            nextEl: '.client__nav-next',
            prevEl: '.client__nav-prev',
        }
    })


    window.addEventListener('scroll', function() {
        const scrollToTop = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) { // Показывать после 300px прокрутки
            scrollToTop.style.display = 'flex';
        } else {
            scrollToTop.style.display = 'none';

        }
    });
    
    // Плавный скролл наверх при клике
    document.querySelector('.scroll-to-top').addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращает стандартное поведение ссылки
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    });

})()