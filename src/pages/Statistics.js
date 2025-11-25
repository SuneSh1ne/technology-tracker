import { Link } from 'react-router-dom';
import './Statistics.css';

function Statistics({ technologies }) {
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    const total = technologies.length;

    const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const inProgressPercent = total > 0 ? Math.round((inProgress / total) * 100) : 0;
    const notStartedPercent = total > 0 ? Math.round((notStarted / total) * 100) : 0;

    // Статистика по категориям
    const categories = {};
    technologies.forEach(tech => {
        categories[tech.category] = (categories[tech.category] || 0) + 1;
    });

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/" className="back-link">← Назад на главную</Link>
                <h1>Статистика</h1>
            </div>

            <div className="statistics-grid">
                <div className="stat-card">
                    <h3>Общая статистика</h3>
                    <div className="stat-item">
                        <span>Всего технологий:</span>
                        <span>{total}</span>
                    </div>
                    <div className="stat-item">
                        <span>Изучено:</span>
                        <span>{completed} ({completedPercent}%)</span>
                    </div>
                    <div className="stat-item">
                        <span>В процессе:</span>
                        <span>{inProgress} ({inProgressPercent}%)</span>
                    </div>
                    <div className="stat-item">
                        <span>Не начато:</span>
                        <span>{notStarted} ({notStartedPercent}%)</span>
                    </div>
                </div>

                {/* Визуализация прогресса */}
                <div className="stat-card">
                    <h3>Визуализация прогресса</h3>
                    <div className="progress-bars">
                        <div className="progress-bar-item">
                            <span>Изучено ({completedPercent}%)</span>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill completed"
                                    style={{ width: `${completedPercent}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="progress-bar-item">
                            <span>В процессе ({inProgressPercent}%)</span>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill in-progress"
                                    style={{ width: `${inProgressPercent}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="progress-bar-item">
                            <span>Не начато ({notStartedPercent}%)</span>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill not-started"
                                    style={{ width: `${notStartedPercent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Статистика по категориям */}
                <div className="stat-card">
                    <h3>Распределение по категориям</h3>
                    {Object.entries(categories).map(([category, count]) => (
                        <div key={category} className="stat-item">
                            <span>{category}:</span>
                            <span>{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Statistics;