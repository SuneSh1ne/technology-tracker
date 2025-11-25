import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressBar from './components/ProgressBar';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';
import TechnologyNotes from './components/TechnologyNotes';
import useTechnologies from './hooks/useTechnologies';

function App() {
    const { technologies, updateStatus, updateNotes, progress } = useTechnologies();

    const markAllAsCompleted = () => {
        technologies.forEach(tech => {
            if (tech.status !== 'completed') {
                updateStatus(tech.id, 'completed');
            }
        });
    };

    const resetAllStatuses = () => {
        technologies.forEach(tech => {
            updateStatus(tech.id, 'not-started');
        });
    };

    const randomNextTechnology = () => {
        const notStartedTech = technologies.filter(tech => tech.status === 'not-started');
        if (notStartedTech.length > 0) {
            const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
            updateStatus(randomTech.id, 'in-progress');
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
                <ProgressBar
                    progress={progress}
                    label="Общий прогресс"
                    color="#4CAF50"
                    animated={true}
                    height={20}
                />
            </header>
            <main className="App-main">
                <QuickActions
                    onMarkAllCompleted={markAllAsCompleted}
                    onResetAll={resetAllStatuses}
                    onRandomNext={randomNextTechnology}
                    technologies={technologies}
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
                                    onStatusChange={(id) => {
                                        const statusOrder = ['not-started', 'in-progress', 'completed'];
                                        const currentIndex = statusOrder.indexOf(tech.status);
                                        const nextIndex = (currentIndex + 1) % statusOrder.length;
                                        updateStatus(id, statusOrder[nextIndex]);
                                    }}
                                />
                                <TechnologyNotes
                                    notes={tech.notes}
                                    onNotesChange={updateNotes}
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