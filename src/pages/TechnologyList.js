import { Link } from 'react-router-dom';
import { useState } from 'react';
import './TechnologyList.css';
import TechnologySearch from '../components/TechnologySearch';
import RoadmapImporter from '../components/RoadmapImporter';
import Modal from '../components/Modal';

function TechnologyList({ technologies, updateStatus, onImportTechnology, loading, error }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const displayTechnologies = isSearchActive ? searchResults : technologies;

    const filteredByStatus = displayTechnologies.filter(tech => {
        switch (activeFilter) {
            case 'not-started':
                return tech.status === 'not-started';
            case 'in-progress':
                return tech.status === 'in-progress';
            case 'completed':
                return tech.status === 'completed';
            default:
                return true;
        }
    });

    const filteredTechnologies = filteredByStatus.filter(tech =>
        tech.title.toLowerCase().includes((isSearchActive ? '' : '').toLowerCase()) ||
        tech.description.toLowerCase().includes((isSearchActive ? '' : '').toLowerCase())
    );

    const handleSearch = (results) => {
        setSearchResults(results);
        setIsSearchActive(results.length > 0);
    };

    const handleImport = async (techData) => {
        await onImportTechnology(techData);
        setIsImportModalOpen(false);
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Изучено';
            case 'in-progress': return 'В процессе';
            case 'not-started': return 'Не начато';
            default: return status;
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/" className="back-link">← Назад на главную</Link>
                <h1>Все технологии</h1>
                <div className="header-actions">
                    <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="btn btn-secondary"
                    >
                        📥 Импорт из API
                    </button>
                    <Link to="/add-technology" className="btn btn-primary">
                        + Добавить технологию
                    </Link>
                </div>
            </div>

            <TechnologySearch
                onSearch={handleSearch}
                placeholder="Поиск технологий в базе знаний..."
            />

            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Загрузка данных...</p>
                </div>
            )}

            {error && (
                <div className="error-state">
                    <p>⚠️ {error}</p>
                </div>
            )}

            <div className="filter-tabs">
                <h3>Фильтр по статусу</h3>
                <div className="filter-tabs__container">
                    <button
                        className={`filter-tabs__tab ${activeFilter === 'all' ? 'filter-tabs__tab--active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        Все ({technologies.length})
                    </button>
                    <button
                        className={`filter-tabs__tab ${activeFilter === 'not-started' ? 'filter-tabs__tab--active' : ''}`}
                        onClick={() => setActiveFilter('not-started')}
                    >
                        Не начаты ({technologies.filter(t => t.status === 'not-started').length})
                    </button>
                    <button
                        className={`filter-tabs__tab ${activeFilter === 'in-progress' ? 'filter-tabs__tab--active' : ''}`}
                        onClick={() => setActiveFilter('in-progress')}
                    >
                        В процессе ({technologies.filter(t => t.status === 'in-progress').length})
                    </button>
                    <button
                        className={`filter-tabs__tab ${activeFilter === 'completed' ? 'filter-tabs__tab--active' : ''}`}
                        onClick={() => setActiveFilter('completed')}
                    >
                        Выполнены ({technologies.filter(t => t.status === 'completed').length})
                    </button>
                </div>
            </div>

            {isSearchActive && (
                <div className="search-info">
                    <p>
                        🔍 Найдено технологий: <strong>{searchResults.length}</strong>
                        <button
                            onClick={() => {
                                setSearchResults([]);
                                setIsSearchActive(false);
                            }}
                            className="clear-search-btn"
                        >
                            Очистить поиск
                        </button>
                    </p>
                </div>
            )}

            <div className="technologies-grid">
                {filteredTechnologies.map(tech => (
                    <div key={tech.id} className="technology-item">
                        <h3>{tech.title}</h3>
                        <p>{tech.description}</p>

                        {tech.difficulty && (
                            <div className="tech-meta">
                                <span className={`difficulty difficulty-${tech.difficulty}`}>
                                    Сложность: {tech.difficulty === 'beginner' ? 'Начальная' :
                                    tech.difficulty === 'intermediate' ? 'Средняя' : 'Продвинутая'}
                                </span>
                            </div>
                        )}

                        {tech.resources && tech.resources.length > 0 && (
                            <div className="tech-resources">
                                <strong>Ресурсы:</strong>
                                <ul>
                                    {tech.resources.slice(0, 2).map((resource, index) => (
                                        <li key={index}>
                                            <a href={resource} target="_blank" rel="noopener noreferrer">
                                                {new URL(resource).hostname}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="technology-meta">
                            <span className={`status status-${tech.status}`}>
                                {getStatusText(tech.status)}
                            </span>
                            <Link to={`/technology/${tech.id}`} className="btn-link">
                                Подробнее →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTechnologies.length === 0 && !loading && (
                <div className="empty-state">
                    {isSearchActive ? (
                        <>
                            <p>По вашему запросу ничего не найдено.</p>
                            <button
                                onClick={() => {
                                    setSearchResults([]);
                                    setIsSearchActive(false);
                                }}
                                className="btn btn-primary"
                            >
                                Показать все технологии
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Технологий не найдено.</p>
                            <Link to="/add-technology" className="btn btn-primary">
                                Добавить первую технологию
                            </Link>
                        </>
                    )}
                </div>
            )}

            <Modal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                title="Импорт технологий из API"
            >
                <RoadmapImporter onImport={handleImport} />
            </Modal>
        </div>
    );
}

export default TechnologyList;