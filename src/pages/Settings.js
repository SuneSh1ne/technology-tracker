import { Link } from 'react-router-dom';
import './Settings.css';

function Settings() {
    const handleExportData = () => {
        const technologies = JSON.parse(localStorage.getItem('technologies') || '[]');
        const dataStr = JSON.stringify(technologies, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'technologies-backup.json';
        link.click();
    };

    const handleClearData = () => {
        if (window.confirm('Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.')) {
            localStorage.removeItem('technologies');
            window.location.reload(); // Перезагружаем приложение
        }
    };

    const handleResetToDemo = () => {
        if (window.confirm('Восстановить демо-данные? Текущие данные будут потеряны.')) {
            localStorage.removeItem('technologies');
            window.location.reload();
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/" className="back-link">← Назад на главную</Link>
                <h1>Настройки</h1>
            </div>

            <div className="settings-grid">
                <div className="setting-card">
                    <h3>Управление данными</h3>
                    <p>Экспортируйте или очистите ваши данные</p>
                    <div className="setting-actions">
                        <button onClick={handleExportData} className="btn btn-warning">
                            📥 Экспорт данных
                        </button>
                        <button onClick={handleClearData} className="btn btn-danger">
                            🗑️ Очистить все данные
                        </button>
                        <button onClick={handleResetToDemo} className="btn btn-secondary">
                            🔄 Восстановить демо-данные
                        </button>
                    </div>
                </div>

                <div className="setting-card">
                    <h3>Внешний вид</h3>
                    <div className="setting-option">
                        <label>
                            <input type="checkbox" />
                            Темная тема
                        </label>
                    </div>
                    <div className="setting-option">
                        <label>
                            <input type="checkbox" defaultChecked />
                            Анимированные прогресс-бары
                        </label>
                    </div>
                </div>

                <div className="setting-card">
                    <h3>О приложении</h3>
                    <div className="about-info">
                        <p><strong>Трекер технологий</strong></p>
                        <p>Версия: 1.0.0</p>
                        <p>Разработано для изучения React Router</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;