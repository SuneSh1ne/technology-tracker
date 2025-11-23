import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const totalTechnologies = technologies.length;
    const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
    const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;

    const progressPercentage = totalTechnologies > 0
        ? Math.round((completedTechnologies / totalTechnologies) * 100)
        : 0;

    const getProgressLevel = () => {
        if (progressPercentage >= 80) return 'high';
        if (progressPercentage >= 50) return 'medium';
        return 'low';
    };

    return (
        <div className="progress-header">
            <div className="progress-header__stats">
                <div className="progress-stat">
                    <span className="progress-stat__value">{totalTechnologies}</span>
                    <span className="progress-stat__label">Всего технологий</span>
                </div>
                <div className="progress-stat">
                    <span className="progress-stat__value">{completedTechnologies}</span>
                    <span className="progress-stat__label">Изучено</span>
                </div>
                <div className="progress-stat">
                    <span className="progress-stat__value">{inProgressTechnologies}</span>
                    <span className="progress-stat__label">В процессе</span>
                </div>
                <div className="progress-stat">
                    <span className="progress-stat__value">{notStartedTechnologies}</span>
                    <span className="progress-stat__label">Не начато</span>
                </div>
                <div className="progress-stat">
                    <span className="progress-stat__value">{progressPercentage}%</span>
                    <span className="progress-stat__label">Прогресс</span>
                </div>
            </div>

            <div className="progress-bar">
                <div className="progress-bar__info">
                    <span>Общий прогресс изучения</span>
                    <span>{progressPercentage}%</span>
                </div>
                <div className="progress-bar__container">
                    <div
                        className={`progress-bar__fill progress-bar__fill--${getProgressLevel()}`}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;