import './FilterTabs.css';

function FilterTabs({ activeFilter, onFilterChange, technologies }) {
    const filters = [
        { key: 'all', label: 'Все', count: technologies.length },
        { key: 'completed', label: 'Выполнены', count: technologies.filter(t => t.status === 'completed').length },
        { key: 'in-progress', label: 'В процессе', count: technologies.filter(t => t.status === 'in-progress').length },
        { key: 'not-started', label: 'Не начаты', count: technologies.filter(t => t.status === 'not-started').length }
    ];

    return (
        <div className="filter-tabs">
            <h3>Фильтр по статусу</h3>
            <div className="filter-tabs__container">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        className={`filter-tabs__tab ${activeFilter === filter.key ? 'filter-tabs__tab--active' : ''}`}
                        onClick={() => onFilterChange(filter.key)}
                    >
                        {filter.label} ({filter.count})
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterTabs;