import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
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
            </div>
        </div>
    );
}

export default QuickActions;