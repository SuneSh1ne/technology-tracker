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
        // Здесь можно добавить логику для скачивания файла
        console.log('Данные для экспорта:', dataStr);
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

                <Modal
                    isOpen={showExportModal}
                    onClose={() => setShowExportModal(false)}
                    title="Экспорт данных"
                >
                    <p>Данные успешно подготовлены для экспорта!</p>
                    <p>Проверьте консоль разработчика для просмотра данных.</p>
                    <button onClick={() => setShowExportModal(false)}>
                        Закрыть
                    </button>
                </Modal>
            </div>
        </div>
    );
}

export default QuickActions;