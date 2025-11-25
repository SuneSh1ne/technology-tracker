import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology({ onAddTechnology }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'frontend'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() && formData.description.trim()) {
            onAddTechnology(formData);
            navigate('/technologies');
        } else {
            alert('Пожалуйста, заполните все обязательные поля');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <h1>Добавить технологию</h1>
            </div>

            <form onSubmit={handleSubmit} className="add-technology-form">
                <div className="form-group">
                    <label htmlFor="title">Название технологии *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Категория</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="database">Базы данных</option>
                        <option value="tools">Инструменты</option>
                        <option value="other">Другое</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Добавить технологию
                    </button>
                    <Link to="/technologies" className="btn btn-secondary">
                        Отмена
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default AddTechnology;