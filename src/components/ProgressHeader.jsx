import './ProgressHeader.css';

function ProgressHeader({ progress = 0, total = 0 }) {
    const safeProgress = Math.max(0, Math.min(100, progress || 0));
    const safeTotal = total || 0;

    return (
        <div className="progress-header">
            <h1>Трекер изучения технологий</h1>
            <div className="progress-info">
                <div className="progress-stats">
                    <span className="progress-percent">{safeProgress}%</span>
                    <span className="progress-text">
                        Изучено технологий: {safeTotal > 0 ? Math.round((safeTotal * safeProgress) / 100) : 0} из {safeTotal}
                    </span>
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${safeProgress}%` }}></div>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;