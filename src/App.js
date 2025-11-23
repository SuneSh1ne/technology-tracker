import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

function App() {
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'completed'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'in-progress'
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'not-started'
        }
    ]);

    const updateTechnologyStatus = (id) => {
        setTechnologies(prevTech => prevTech.map(tech => {
            if (tech.id === id) {
                const statusOrder = ['not-started', 'in-progress', 'completed'];
                const currentIndex = statusOrder.indexOf(tech.status);
                const nextIndex = (currentIndex + 1) % statusOrder.length;
                return { ...tech, status: statusOrder[nextIndex] };
            }
            return tech;
        }));
    };

    const markAllAsCompleted = () => {
        setTechnologies(prevTech => prevTech.map(tech => ({
            ...tech,
            status: 'completed'
        })));
    };

    const resetAllStatuses = () => {
        setTechnologies(prevTech => prevTech.map(tech => ({
            ...tech,
            status: 'not-started'
        })));
    };

    const randomNextTechnology = () => {
        const notStartedTech = technologies.filter(tech => tech.status === 'not-started');
        if (notStartedTech.length > 0) {
            const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
            updateTechnologyStatus(randomTech.id);
        } else {
            alert('Все технологии уже начаты или завершены!');
        }
    };
    
    const [activeFilter, setActiveFilter] = useState('all');
    const filteredByStatus = technologies.filter(tech => {
        switch (activeFilter) {
            case 'not-started':
                return tech.status === 'not-started';
            case 'in-progress':
                return tech.status === 'in-progress';
            case 'completed':
                return tech.status === 'completed';
            default:
                return true;
        }
    });

    return (
        <div className="App">
            <header className="App-header">
                <h1>Трекер изучения технологий</h1>
                <ProgressHeader technologies={technologies} />
            </header>
            <main className="App-main">
                <QuickActions
                    onMarkAllCompleted={markAllAsCompleted}
                    onResetAll={resetAllStatuses}
                    onRandomNext={randomNextTechnology}
                />

                <FilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    technologies={technologies}
                />

                <div className="technologies-grid">
                    {filteredByStatus.map(tech => (
                        <div key={tech.id} className="technology-item">
                                <TechnologyCard
                                    id={tech.id}
                                    title={tech.title}
                                    description={tech.description}
                                    status={tech.status}
                                    onStatusChange={updateTechnologyStatus}
                                />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;