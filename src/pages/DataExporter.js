import { useState } from 'react';
import './DataExporter.css';

function DataExporter({ technologies }) {
    const [exportFormat, setExportFormat] = useState('json');
    const [includeUserData, setIncludeUserData] = useState(true);

    const exportData = () => {
        const exportData = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            technologies: includeUserData
                ? technologies.map(tech => ({
                    ...tech,
                    userNotes: tech.notes || '',
                    userStatus: tech.status || 'not-started',
                    userDeadline: tech.deadline || ''
                }))
                : technologies.map(({ notes, status, deadline, ...tech }) => tech)
        };

        let dataStr, fileType, fileName;

        if (exportFormat === 'json') {
            dataStr = JSON.stringify(exportData, null, 2);
            fileType = 'application/json';
            fileName = `technology-roadmap-${new Date().toISOString().split('T')[0]}.json`;
        }

        const blob = new Blob([dataStr], { type: fileType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const canExport = technologies.length > 0;

    return (
        <div className="data-exporter">
            <h3>Экспорт данных</h3>

            <div className="export-options">
                <div className="form-group">
                    <label htmlFor="export-format">Формат экспорта</label>
                    <select
                        id="export-format"
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        aria-describedby="format-help"
                    >
                        <option value="json">JSON</option>
                        <option value="csv" disabled>CSV (скоро)</option>
                    </select>
                    <span id="format-help" className="help-text">
                        В настоящее время доступен только JSON формат
                    </span>
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={includeUserData}
                            onChange={(e) => setIncludeUserData(e.target.checked)}
                            aria-describedby="user-data-help"
                        />
                        Включить мои заметки и прогресс
                    </label>
                    <span id="user-data-help" className="help-text">
                        При включении будут экспортированы ваши личные заметки и статусы изучения
                    </span>
                </div>
            </div>

            {!canExport && (
                <div className="export-warning" role="alert">
                    ⚠️ Нет данных для экспорта. Добавьте технологии в трекер.
                </div>
            )}

            <button
                onClick={exportData}
                disabled={!canExport}
                className="btn-primary export-button"
                aria-describedby={canExport ? 'export-help' : 'export-warning'}
            >
                Экспортировать данные ({technologies.length})
            </button>

            <div id="export-help" className="help-text">
                Данные будут сохранены в выбранном формате на вашем устройстве
            </div>
        </div>
    );
}

export default DataExporter;