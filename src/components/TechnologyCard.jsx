import React from 'react';
import { useApp } from '../contexts/AppContext';
import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
    const { showSnackbar } = useApp();

    const getStatusIcon = () => {
        switch (status) {
            case 'completed':
                return '✅';
            case 'in-progress':
                return '🔄';
            case 'not-started':
                return '⏳';
            default:
                return '❓';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'completed':
                return 'Изучено';
            case 'in-progress':
                return 'В процессе';
            case 'not-started':
                return 'Не начато';
            default:
                return 'Неизвестно';
        }
    };

    const getNextStatusText = () => {
        switch (status) {
            case 'completed':
                return 'возобновить';
            case 'in-progress':
                return 'завершить';
            case 'not-started':
                return 'начать';
            default:
                return 'изменить';
        }
    };

    const handleClick = () => {
        const newStatus = status === 'not-started' ? 'in-progress'
            : status === 'in-progress' ? 'completed'
                : 'not-started';

        onStatusChange(id, newStatus);

        const statusMessages = {
            'not-started': 'Изучение технологии начато!',
            'in-progress': 'Технология отмечена как завершённая!',
            'completed': 'Статус технологии сброшен'
        };

        showSnackbar(statusMessages[newStatus], 'info');
    };

    return (
        <div
            className={`technology-card technology-card--${status}`}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
            title={`Нажмите чтобы ${getNextStatusText()} изучение`}
        >
            <div className="technology-card__header">
                <h3 className="technology-card__title">{title}</h3>
                <span className="technology-card__status-icon">{getStatusIcon()}</span>
            </div>
            <p className="technology-card__description">{description}</p>
            <div className="technology-card__footer">
                <span className={`technology-card__status technology-card__status--${status}`}>
                    {getStatusText()}
                </span>
            </div>
        </div>
    );
}

export default TechnologyCard;