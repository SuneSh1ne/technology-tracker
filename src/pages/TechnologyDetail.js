import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './TechnologyDetail.css';

function TechnologyDetail({ technologies, updateStatus, updateNotes, deleteTechnology }) {
    const { techId } = useParams();
    const navigate = useNavigate();
    const [technology, setTechnology] = useState(null);
    const [localNotes, setLocalNotes] = useState('');

    useEffect(() => {
        const tech = technologies.find(t => t.id === parseInt(techId));
        setTechnology(tech);
        setLocalNotes(tech?.notes || '');
    }, [techId, technologies]);

    const handleStatusChange = (newStatus) => {
        updateStatus(parseInt(techId), newStatus);
        setTechnology(prev => ({ ...prev, status: newStatus }));
    };

    const handleNotesChange = (newNotes) => {
        setLocalNotes(newNotes);
        updateNotes(parseInt(techId), newNotes);
    };

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
            deleteTechnology(parseInt(techId));
            navigate('/technologies');
        }
    };

    if (!technology) {
        return (
            <div className="page">
                <h1>Технология не найдена</h1>
                <p>Технология с ID {techId} не существует.</p>
                <Link to="/technologies" className="btn">
                    ← Назад к списку
                </Link>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <h1>{technology.title}</h1>
            </div>

            <div className="technology-detail">
                <div className="detail-section">
                    <h3>Описание</h3>
                    <p>{technology.description}</p>
                </div>

                <div className="detail-section">
                    <h3>Статус изучения</h3>
                    <div className="status-buttons">
                        <button
                            onClick={() => handleStatusChange('not-started')}
                            className={technology.status === 'not-started' ? 'active' : ''}
                        >
                            Не начато
                        </button>
                        <button
                            onClick={() => handleStatusChange('in-progress')}
                            className={technology.status === 'in-progress' ? 'active' : ''}
                        >
                            В процессе
                        </button>
                        <button
                            onClick={() => handleStatusChange('completed')}
                            className={technology.status === 'completed' ? 'active' : ''}
                        >
                            Завершено
                        </button>
                    </div>
                    <p>Текущий статус: <strong>{technology.status}</strong></p>
                </div>

                <div className="detail-section">
                    <h3>Мои заметки</h3>
                    <textarea
                        value={localNotes}
                        onChange={(e) => handleNotesChange(e.target.value)}
                        placeholder="Записывайте сюда важные моменты..."
                        rows="4"
                        className="notes-textarea"
                    />
                </div>

                <div className="detail-actions">
                    <button onClick={handleDelete} className="btn btn-danger">
                        Удалить технологию
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TechnologyDetail;