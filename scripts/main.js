const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const toLogin = document.getElementById('toLogin');
    const toRegister = document.getElementById('toRegister');

    document.querySelector('.registration_button').addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    toLogin.addEventListener('click', () => {
        registrationForm.style.display = 'none';
        loginForm.style.display = 'block';
        toLogin.classList.add('active');
        toRegister.classList.remove('active');
    });

    toRegister.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registrationForm.style.display = 'block';
        toRegister.classList.add('active');
        toLogin.classList.remove('active');
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    let currentPage = 1;
    const rowsPerPage = 25; // Количество криптовалют на странице (уменьшено для тестирования)

    function getTotalRows() {
        return document.querySelectorAll('.crypto-row').length;
    }

function updateCryptoList() {
    const totalRows = getTotalRows();
    let totalPages = Math.ceil(totalRows / rowsPerPage);

    totalPages = Math.max(totalPages, 1);

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    // Скрываем все строки
    const rows = document.querySelectorAll('.crypto-row');
    rows.forEach(row => {
        row.style.display = 'none'; // Скрываем все строки
    });

    // Показываем только строки для текущей страницы
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

    for (let i = startIndex; i < endIndex; i++) {
        if (rows[i]) {
            rows[i].style.display = 'flex'; // Показываем нужные строки
        }
    }
}

    function updatePageNumbers() {
        const pageNumbersContainer = document.getElementById('page-numbers');
        const totalRows = getTotalRows();
        let totalPages = Math.ceil(totalRows / rowsPerPage); // Используем Math.ceil для корректного расчета
        totalPages = Math.max(totalPages, 1); // Убедимся, что totalPages не меньше 1
        pageNumbersContainer.innerHTML = '';

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (endPage - startPage < maxVisiblePages - 1) {
            if (startPage === 1) {
                endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
            } else {
                startPage = Math.max(endPage - maxVisiblePages + 1, 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.textContent = i;
            pageNumber.classList.add('page-number');
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.onclick = () => {
                currentPage = i;
                updatePageNumbers();
                updateCryptoList();
            };
            pageNumbersContainer.appendChild(pageNumber);
        }

        if (endPage < totalPages) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pageNumbersContainer.appendChild(ellipsis);
            const lastPageNumber = document.createElement('span');
            lastPageNumber.textContent = totalPages;
            lastPageNumber.classList.add('page-number');
            lastPageNumber.onclick = () => {
                currentPage = totalPages;
                updatePageNumbers();
                updateCryptoList();
            };
            pageNumbersContainer.appendChild(lastPageNumber);
        }
    }

    function changePage(direction) {
        currentPage += direction;
        if (currentPage < 1) currentPage = 1;
        updatePageNumbers();
        updateCryptoList();
    }

    function toggleFavorite(star) {
        star.classList.toggle('favorited');
        star.textContent = star.classList.contains('favorited') ? '★' : '☆'; // Меняем символ звезды
    }

    // Инициализация
    updateCryptoList();
    updatePageNumbers();

    const newsData = [
        { id: 1, type: 'type1', title: 'Новость 1 тип 1', text: 'Описание новости 1', time: '12:00', image: 'https://images.techinsider.ru/upload/img_cache/b76/b76137ebad1c1cee0359a993137c28a7_cropped_510x491.webp' },
        { id: 2, type: 'type2', title: 'Новость 2 тип 2', text: 'Описание новости 2', time: '12:30', image: 'https://images.techinsider.ru/upload/img_cache/b76/b76137ebad1c1cee0359a993137c28a7_cropped_510x491.webp' },
        { id: 3, type: 'type3', title: 'Новость 3 тип 3', text: 'Описание новости 3', time: '13:00', image: 'https://images.techinsider.ru/upload/img_cache/b76/b76137ebad1c1cee0359a993137c28a7_cropped_510x491.webp' },
        { id: 4, type: 'type1', title: 'Новость 4 тип 1', text: 'Описание новости 4', time: '13:30', image: 'https://images.techinsider.ru/upload/img_cache/b76/b76137ebad1c1cee0359a993137c28a7_cropped_510x491.webp' },
        { id: 5, type: 'type2', title: 'Новость 5 тип 2', text: 'Описание новости 5', time: '14:00', image: 'https://images.techinsider.ru/upload/img_cache/b76/b76137ebad1c1cee0359a993137c28a7_cropped_510x491.webp' },
        { id: 6, type: 'type3', title: 'Новость 6 тип 3', text: 'Описание новости 6', time: '14:30', image: 'https://images.techinsider.ru/upload/img_cache/b76/b76137ebad1c1cee0359a993137c28a7_cropped_510x491.webp' },
    ];

    const buttons = document.querySelectorAll('.button');
    const newsGrid = document.getElementById('newsGrid');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс active у всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс active к нажатой кнопке
            button.classList.add('active');

            // Фильтруем новости
            const type = button.getAttribute('data-type');
            filterNews(type);
        });
    });

    function filterNews(type) {
        newsGrid.innerHTML = ''; // Очищаем текущие новости
        const filteredNews = type === 'all' ? newsData : newsData.filter(news => news.type === type);
        filteredNews.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <img src="${news.image}" alt="${news.title}">
                <div class="news-title">${news.title}</div>
                <br>
                <div class="news-text">${news.text}</div>
                <div class="news-time">${news.time}</div>
            `;
            newsGrid.appendChild(newsItem);
        });
    }

    // Инициализация с отображением всех новостей
    filterNews('all');