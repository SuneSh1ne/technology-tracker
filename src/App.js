import { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';
import TechnologyNotes from './components/TechnologyNotes';

function App() {
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'completed',
            notes: ''
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'in-progress',
            notes: ''
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'not-started',
            notes: ''
        },
        {
            id: 4,
            title: 'React Hooks',
            description: 'Изучение основных хуков: useState, useEffect',
            status: 'not-started',
            notes: ''
        },
        {
            id: 5,
            title: 'Отклеить этикетки от бананов',
            description: 'Долгий тяжкий ручной труд',
            status: 'in-progress',
            notes: ''
        },
    ]);

    useEffect(() => {
        const saved = localStorage.getItem('techTrackerData');
        if (saved) {
            setTechnologies(JSON.parse(saved));
            console.log('Данные загружены из localStorage');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        console.log('Данные сохранены в localStorage');
    }, [technologies]);

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

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

    const [searchQuery, setSearchQuery] = useState('');

    const filteredTechnologies = filteredByStatus.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Поиск технологий..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span>Найдено: {filteredTechnologies.length}</span>
                </div>

                <FilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    technologies={technologies}
                />

                <div className="technologies-grid">
                    {filteredTechnologies.map(tech => (
                        <div key={tech.id} className="technology-item">
                                <TechnologyCard
                                    id={tech.id}
                                    title={tech.title}
                                    description={tech.description}
                                    status={tech.status}
                                    onStatusChange={updateTechnologyStatus}
                                />
                                <TechnologyNotes
                                    notes={tech.notes}
                                    onNotesChange={updateTechnologyNotes}
                                    techId={tech.id}
                                />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;