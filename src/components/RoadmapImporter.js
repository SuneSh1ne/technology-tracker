import React, { useState } from 'react';
import './RoadmapImporter.css';

function RoadmapImporter({ onImport }) {
    const [importing, setImporting] = useState(false);
    const [customUrl, setCustomUrl] = useState('');

    const handleImport = async (roadmapUrl) => {
        try {
            setImporting(true);

            // Имитация загрузки дорожной карты из API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Мок данные дорожной карты
            const mockRoadmapData = {
                technologies: [
                    {
                        title: 'JavaScript Fundamentals',
                        description: 'Основы JavaScript: переменные, функции, циклы',
                        category: 'frontend',
                        difficulty: 'beginner',
                        resources: ['https://learn.javascript.ru', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript']
                    },
                    {
                        title: 'DOM Manipulation',
                        description: 'Работа с Document Object Model',
                        category: 'frontend',
                        difficulty: 'beginner',
                        resources: ['https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model']
                    },
                    {
                        title: 'Async JavaScript',
                        description: 'Promise, async/await, Event Loop',
                        category: 'frontend',
                        difficulty: 'intermediate',
                        resources: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop']
                    }
                ]
            };

            // Добавляем каждую технологию из дорожной карты
            let importedCount = 0;
            for (const tech of mockRoadmapData.technologies) {
                await onImport(tech);
                importedCount++;
            }

            alert(`✅ Успешно импортировано ${importedCount} технологий!`);

        } catch (err) {
            alert(`❌ Ошибка импорта: ${err.message}`);
        } finally {
            setImporting(false);
        }
    };

    const handleExampleImport = () => {
        handleImport('https://api.example.com/roadmaps/frontend-basics');
    };

    const handleCustomImport = () => {
        if (customUrl.trim()) {
            handleImport(customUrl);
        } else {
            alert('Пожалуйста, введите URL дорожной карты');
        }
    };

    return (
        <div className="roadmap-importer">
            <h3>📥 Импорт дорожной карты</h3>
            <p className="importer-description">
                Загрузите готовую дорожную карту для быстрого добавления технологий
            </p>

            <div className="import-actions">
                <button
                    onClick={handleExampleImport}
                    disabled={importing}
                    className="import-button"
                >
                    {importing ? '⏳ Импорт...' : '🚀 Импорт пример дорожной карты'}
                </button>
            </div>

            <div className="custom-import">
                <h4>Или импортируйте по URL:</h4>
                <div className="url-input-group">
                    <input
                        type="url"
                        placeholder="https://api.example.com/roadmaps/frontend"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        className="url-input"
                        disabled={importing}
                    />
                    <button
                        onClick={handleCustomImport}
                        disabled={importing || !customUrl.trim()}
                        className="url-import-button"
                    >
                        Импорт
                    </button>
                </div>
            </div>

            {importing && (
                <div className="import-progress">
                    <div className="progress-spinner"></div>
                    <p>Импортируем технологии...</p>
                </div>
            )}
        </div>
    );
}

export default RoadmapImporter;