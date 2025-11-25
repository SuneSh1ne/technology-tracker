import { useState } from 'react';
import './QuickActions.css';
import Modal from './Modal';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) {
    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tech-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setShowExportModal(true);
    };

    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="quick-actions__buttons">
                <button
                    className="quick-actions__button quick-actions__button--complete"
                    onClick={onMarkAllCompleted}
                >
                    ✅ Отметить все как выполненные
                </button>
                <button
                    className="quick-actions__button quick-actions__button--reset"
                    onClick={onResetAll}
                >
                    🔄 Сбросить все статусы
                </button>
                <button
                    className="quick-actions__button quick-actions__button--random"
                    onClick={onRandomNext}
                >
                    🎲 Случайный выбор следующей технологии
                </button>
                <button
                    className="quick-actions__button quick-actions__button--export"
                    onClick={handleExport}
                >
                    📤 Экспорт данных
                </button>
            </div>

            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных"
            >
                <p>Данные успешно экспортированы!</p>
                <p>Файл был скачан в формате JSON.</p>
                <button className="quick-actions__button" onClick={() => setShowExportModal(false)}>
                    Закрыть
                </button>
            </Modal>
        </div>
    );
}

export default QuickActions;