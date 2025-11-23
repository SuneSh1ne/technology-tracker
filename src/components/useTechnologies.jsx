import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
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
    }
];

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    // Функция для обновления статуса технологии
    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev => 
            prev.map(tech => 
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    // Функция для обновления заметок
    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev => 
            prev.map(tech => 
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    // Функция для расчета общего прогресса
    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return {
        technologies,
        updateStatus,
        updateNotes,
        progress: calculateProgress()
    };
}

export default useTechnologies;