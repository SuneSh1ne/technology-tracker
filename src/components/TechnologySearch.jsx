import React, { useState, useEffect, useRef } from 'react';
import './TechnologySearch.css';

function TechnologySearch({ onSearch, placeholder = "Поиск технологий..." }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [localLoading, setLocalLoading] = useState(false);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    // Функция для выполнения поиска
    const performSearch = async (query) => {
        // Отменяем предыдущий запрос, если он существует
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Создаем новый AbortController для текущего запроса
        abortControllerRef.current = new AbortController();

        try {
            setLocalLoading(true);

            // Если поисковый запрос пустой, очищаем результаты
            if (!query.trim()) {
                onSearch([]);
                setLocalLoading(false);
                return;
            }

            // Имитация API запроса (в реальном приложении замените на реальный API)
            const response = await fetch(
                `https://api.example.com/technologies/search?q=${encodeURIComponent(query)}`,
                {
                    signal: abortControllerRef.current.signal,
                    // В демо-режиме используем мок данные
                    method: 'GET'
                }
            );

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            onSearch(data.technologies || []);

        } catch (err) {
            // Игнорируем ошибки отмены запроса
            if (err.name !== 'AbortError') {
                console.error('Ошибка при поиске технологий:', err);

                // В демо-режиме используем мок данные при ошибке
                const mockResults = [
                    {
                        id: 1001,
                        title: 'React',
                        description: 'Библиотека для создания пользовательских интерфейсов',
                        category: 'frontend'
                    },
                    {
                        id: 1002,
                        title: 'React Native',
                        description: 'Фреймворк для мобильной разработки',
                        category: 'mobile'
                    },
                    {
                        id: 1003,
                        title: 'React Router',
                        description: 'Маршрутизация для React приложений',
                        category: 'frontend'
                    }
                ].filter(tech =>
                    tech.title.toLowerCase().includes(query.toLowerCase()) ||
                    tech.description.toLowerCase().includes(query.toLowerCase())
                );

                onSearch(mockResults);
            }
        } finally {
            setLocalLoading(false);
        }
    };

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Очищаем предыдущий таймер
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Устанавливаем новый таймер для debounce (500ms)
        searchTimeoutRef.current = setTimeout(() => {
            performSearch(value);
        }, 500);
    };

    // Очистка при размонтировании компонента
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleClear = () => {
        setSearchTerm('');
        onSearch([]);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    };

    return (
        <div className="technology-search">
            <div className="search-box">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="clear-button"
                        type="button"
                    >
                        ×
                    </button>
                )}
                {localLoading && (
                    <div className="search-loading">
                        <div className="spinner-small"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TechnologySearch;