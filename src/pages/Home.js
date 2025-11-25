import { Link } from 'react-router-dom';
import './Home.css';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import TechnologyCard from '../components/TechnologyCard';
import RoadmapImporter from '../components/RoadmapImporter';

function Home({ technologies, progress, updateStatus, onImportTechnology, apiData, loading, error }) {
    const safeTechnologies = technologies || [];
    const recentTechnologies = safeTechnologies.slice(0, 6);
    const inProgressTech = safeTechnologies.filter(tech => tech.status === 'in-progress');

    const handleAddFromApi = async (techData) => {
        try {
            await onImportTechnology(techData);
            alert(`Технология "${techData.title}" успешно добавлена в трекер!`);
        } catch (err) {
            alert(`Ошибка при добавлении: ${err.message}`);
        }
    };

    return (
        <div className="page">
            <ProgressHeader
                progress={progress}
                total={safeTechnologies.length}
            />

            <QuickActions />

            {/* Импортер дорожных карт на главной */}
            <RoadmapImporter onImport={onImportTechnology} />

            {inProgressTech.length > 0 && (
                <section className="section">
                    <h2>В процессе изучения</h2>
                    <div className="technologies-grid">
                        {inProgressTech.map(tech => (
                            <TechnologyCard
                                key={tech.id}
                                id={tech.id}
                                title={tech.title}
                                description={tech.description}
                                status={tech.status}
                                onStatusChange={updateStatus}
                            />
                        ))}
                    </div>
                </section>
            )}

            <section className="section">
                <div className="section-header">
                    <h2>Недавние технологии</h2>
                    <Link to="/technologies" className="btn-link">
                        Все технологии →
                    </Link>
                </div>
                <div className="technologies-grid">
                    {recentTechnologies.map(tech => (
                        <TechnologyCard
                            key={tech.id}
                            id={tech.id}
                            title={tech.title}
                            description={tech.description}
                            status={tech.status}
                            onStatusChange={updateStatus}
                        />
                    ))}
                </div>
            </section>

            {/* Пример данных из API */}
            {apiData && apiData.length > 0 && (
                <section className="section">
                    <h2>📚 Доступные технологии из API</h2>
                    <p className="section-description">
                        Эти технологии можно добавить в ваш трекер одним кликом
                    </p>
                    <div className="api-tech-preview">
                        {apiData.map(tech => (
                            <div key={tech.id} className="api-tech-item">
                                <div className="api-tech-content">
                                    <h4>{tech.title}</h4>
                                    <p>{tech.description}</p>
                                    <div className="api-tech-meta">
                                        <span className={`category category-${tech.category}`}>
                                            {tech.category}
                                        </span>
                                        <span className={`difficulty difficulty-${tech.difficulty}`}>
                                            {tech.difficulty === 'beginner' ? '🎯 Начальная' :
                                                tech.difficulty === 'intermediate' ? '⚡ Средняя' : '🚀 Продвинутая'}
                                        </span>
                                    </div>
                                    {tech.resources && tech.resources.length > 0 && (
                                        <div className="api-tech-resources">
                                            <strong>Ресурсы:</strong>
                                            <div className="resource-links">
                                                {tech.resources.slice(0, 2).map((resource, index) => (
                                                    <a
                                                        key={index}
                                                        href={resource}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resource-link"
                                                    >
                                                        📎 {new URL(resource).hostname}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleAddFromApi(tech)}
                                    className="btn btn-primary add-tracker-btn"
                                >
                                    ➕ Добавить в трекер
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Home;