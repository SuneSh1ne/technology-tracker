import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'completed',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX',
        status: 'in-progress',
        notes: '',
        category: 'frontend'
    },
    {
        id: 3,
        title: 'State Management',
        description: 'Работа с состоянием компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 4,
        title: 'React Hooks',
        description: 'Изучение основных хуков: useState, useEffect',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 5,
        title: 'Отклеить этикетки от бананов',
        description: 'Долгий тяжкий ручной труд',
        status: 'in-progress',
        notes: '',
        category: 'backend'
    }
];

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const addTechnology = (technology) => {
        const newTechnology = {
            id: Date.now(),
            ...technology,
            status: 'not-started',
            notes: ''
        };
        setTechnologies(prev => [...prev, newTechnology]);
    };

    const deleteTechnology = (id) => {
        setTechnologies(prev => prev.filter(tech => tech.id !== id));
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return {
        technologies,
        setTechnologies,
        updateStatus,
        updateNotes,
        addTechnology,
        deleteTechnology,
        progress: calculateProgress()
    };
}

export default useTechnologies;