import { useState, useEffect, useCallback } from 'react';
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

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiData, setApiData] = useState([]);

    const fetchTechnologiesFromApi = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockApiTechnologies = [
                {
                    id: 100,
                    title: 'React',
                    description: 'Библиотека для создания пользовательских интерфейсов',
                    category: 'frontend',
                    difficulty: 'beginner',
                    resources: ['https://react.dev', 'https://ru.reactjs.org']
                },
                {
                    id: 101,
                    title: 'Node.js',
                    description: 'Среда выполнения JavaScript на сервере',
                    category: 'backend',
                    difficulty: 'intermediate',
                    resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/']
                },
                {
                    id: 102,
                    title: 'TypeScript',
                    description: 'Типизированное надмножество JavaScript',
                    category: 'language',
                    difficulty: 'intermediate',
                    resources: ['https://www.typescriptlang.org']
                }
            ];

            setApiData(mockApiTechnologies);
            return mockApiTechnologies;

        } catch (err) {
            setError('Не удалось загрузить технологии из API');
            console.error('Ошибка загрузки из API:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const importFromApi = useCallback(async (techData) => {
        try {
            setLoading(true);

            const newTech = {
                id: Date.now(),
                ...techData,
                status: 'not-started',
                notes: '',
                createdAt: new Date().toISOString()
            };

            setTechnologies(prev => [...prev, newTech]);
            return newTech;

        } catch (err) {
            setError('Не удалось импортировать технологию');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setTechnologies]);

    const importRoadmap = useCallback(async (roadmapUrl) => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 1500));

            const roadmapData = {
                technologies: [
                    {
                        title: 'JavaScript Fundamentals',
                        description: 'Основы JavaScript: переменные, функции, циклы',
                        category: 'frontend',
                        difficulty: 'beginner',
                        resources: ['https://learn.javascript.ru', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript']
                    },
                    {
                        title: 'DOM Manipulation',
                        description: 'Работа с Document Object Model',
                        category: 'frontend',
                        difficulty: 'beginner',
                        resources: ['https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model']
                    }
                ]
            };

            const importedTechs = [];
            for (const tech of roadmapData.technologies) {
                const newTech = await importFromApi(tech);
                importedTechs.push(newTech);
            }

            return importedTechs;

        } catch (err) {
            setError(`Ошибка импорта: ${err.message}`);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [importFromApi]);

    const updateStatus = useCallback((techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    }, [setTechnologies]);

    const updateNotes = useCallback((techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    }, [setTechnologies]);

    const addTechnology = useCallback((technology) => {
        const newTechnology = {
            id: Date.now(),
            ...technology,
            status: 'not-started',
            notes: '',
            createdAt: new Date().toISOString(),
            difficulty: technology.difficulty || 'beginner',
            deadline: technology.deadline || '',
            resources: technology.resources || []
        };
        setTechnologies(prev => [...prev, newTechnology]);
    }, [setTechnologies]);

    const deleteTechnology = useCallback((id) => {
        setTechnologies(prev => prev.filter(tech => tech.id !== id));
    }, [setTechnologies]);

    const calculateProgress = useCallback(() => {
        if (!technologies || technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    }, [technologies]);

    useEffect(() => {
        fetchTechnologiesFromApi();
    }, [fetchTechnologiesFromApi]);

    return {
        technologies: technologies || [],
        apiData: apiData || [],
        loading,
        error,

        setTechnologies,
        updateStatus,
        updateNotes,
        addTechnology,
        deleteTechnology,
        progress: calculateProgress(),

        fetchTechnologiesFromApi,
        importFromApi,
        importRoadmap,
        refetch: fetchTechnologiesFromApi
    };
}

export default useTechnologiesApi;