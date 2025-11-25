import { useState } from 'react';
import './BulkStatusEditor.css';

function BulkStatusEditor({ technologies, onStatusUpdate }) {
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [newStatus, setNewStatus] = useState('not-started');

    // Обработчик выбора технологии
    const handleTechSelect = (techId) => {
        setSelectedTechs(prev =>
            prev.includes(techId)
                ? prev.filter(id => id !== techId)
                : [...prev, techId]
        );
    };

    // Обработчик выбора всех
    const handleSelectAll = () => {
        if (selectedTechs.length === technologies.length) {
            setSelectedTechs([]);
        } else {
            setSelectedTechs(technologies.map(tech => tech.id));
        }
    };

    // Применение нового статуса к выбранным технологиям
    const applyStatus = () => {
        if (selectedTechs.length === 0) {
            alert('Выберите хотя бы одну технологию');
            return;
        }

        selectedTechs.forEach(techId => {
            onStatusUpdate(techId, newStatus);
        });

        // Очищаем выбор после применения
        setSelectedTechs([]);
        alert(`Статус обновлен для ${selectedTechs.length} технологий`);
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
        <div className="bulk-status-editor">
            <h3>Массовое редактирование статусов</h3>

            <div className="bulk-controls">
                <div className="status-selector">
                    <label htmlFor="bulk-status">Установить статус:</label>
                    <select
                        id="bulk-status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="not-started">Не начато</option>
                        <option value="in-progress">В процессе</option>
                        <option value="completed">Изучено</option>
                    </select>
                </div>

                <button
                    onClick={applyStatus}
                    disabled={selectedTechs.length === 0}
                    className="btn-primary apply-button"
                >
                    Применить к {selectedTechs.length} технологиям
                </button>
            </div>

            <div className="selection-info">
                <label className="select-all-checkbox">
                    <input
                        type="checkbox"
                        checked={selectedTechs.length === technologies.length && technologies.length > 0}
                        onChange={handleSelectAll}
                        indeterminate={selectedTechs.length > 0 && selectedTechs.length < technologies.length}
                    />
                    Выбрать все ({technologies.length})
                </label>
                <span>Выбрано: {selectedTechs.length}</span>
            </div>

            <div className="technologies-list">
                {technologies.map(tech => (
                    <div key={tech.id} className="tech-item">
                        <label className="tech-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedTechs.includes(tech.id)}
                                onChange={() => handleTechSelect(tech.id)}
                            />
                            <span className="tech-info">
                                <strong>{tech.title}</strong>
                                <span className={`current-status status-${tech.status}`}>
                                    Текущий статус: {getStatusText(tech.status)}
                                </span>
                            </span>
                        </label>
                    </div>
                ))}
            </div>

            {technologies.length === 0 && (
                <div className="empty-state">
                    Нет технологий для редактирования
                </div>
            )}
        </div>
    );
}

export default BulkStatusEditor;