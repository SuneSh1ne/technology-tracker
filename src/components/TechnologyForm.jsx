import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import './TechnologyForm.css';

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
    const { showSnackbar } = useApp();

    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || '',
        resources: initialData.resources || ['']
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Название технологии обязательно';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Название должно содержать минимум 2 символа';
        } else if (formData.title.trim().length > 50) {
            newErrors.title = 'Название не должно превышать 50 символов';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание технологии обязательно';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Описание должно содержать минимум 10 символов';
        }

        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }

        formData.resources.forEach((resource, index) => {
            if (resource && !isValidUrl(resource)) {
                newErrors[`resource_${index}`] = 'Введите корректный URL';
            }
        });

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources];
        newResources[index] = value;
        setFormData(prev => ({
            ...prev,
            resources: newResources
        }));
    };

    const addResourceField = () => {
        setFormData(prev => ({
            ...prev,
            resources: [...prev.resources, '']
        }));
    };

    const removeResourceField = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                resources: newResources
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid) {
            const cleanedData = {
                ...formData,
                resources: formData.resources.filter(resource => resource.trim() !== '')
            };

            onSave(cleanedData);

            showSnackbar(
                initialData.title
                    ? 'Технология успешно обновлена!'
                    : 'Технология успешно добавлена!',
                'success'
            );
        } else {
            showSnackbar('Пожалуйста, исправьте ошибки в форме', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="technology-form" noValidate>
            <h2>{initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}</h2>

            <div className="form-group">
                <label htmlFor="title" className="required">
                    Название технологии
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                    placeholder="Например: React, Node.js, TypeScript"
                    aria-describedby={errors.title ? 'title-error' : undefined}
                    aria-required="true"
                    aria-invalid={!!errors.title}
                    required
                />
                {errors.title && (
                    <span id="title-error" className="error-message" role="alert">
                        {errors.title}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="description" className="required">
                    Описание
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={errors.description ? 'error' : ''}
                    placeholder="Опишите, что это за технология и зачем её изучать..."
                    aria-describedby={errors.description ? 'description-error' : undefined}
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    required
                />
                {errors.description && (
                    <span id="description-error" className="error-message" role="alert">
                        {errors.description}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="category">Категория</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    aria-describedby="category-help"
                >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                    <option value="devops">DevOps</option>
                    <option value="database">Базы данных</option>
                    <option value="tools">Инструменты</option>
                </select>
                <span id="category-help" className="help-text">
                    Выберите категорию технологии
                </span>
            </div>

            <div className="form-group">
                <label htmlFor="difficulty">Уровень сложности</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    aria-describedby="difficulty-help"
                >
                    <option value="beginner">Начинающий</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                </select>
                <span id="difficulty-help" className="help-text">
                    Оцените сложность изучения технологии
                </span>
            </div>

            <div className="form-group">
                <label htmlFor="deadline">
                    Планируемая дата освоения
                </label>
                <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={errors.deadline ? 'error' : ''}
                    aria-describedby={errors.deadline ? 'deadline-error' : 'deadline-help'}
                    aria-invalid={!!errors.deadline}
                />
                {errors.deadline ? (
                    <span id="deadline-error" className="error-message" role="alert">
                        {errors.deadline}
                    </span>
                ) : (
                    <span id="deadline-help" className="help-text">
                        Необязательное поле - установите целевой срок изучения
                    </span>
                )}
            </div>

            <div className="form-group">
                <label>Ресурсы для изучения</label>
                {formData.resources.map((resource, index) => (
                    <div key={index} className="resource-field">
                        <input
                            type="url"
                            value={resource}
                            onChange={(e) => handleResourceChange(index, e.target.value)}
                            placeholder="https://example.com"
                            className={errors[`resource_${index}`] ? 'error' : ''}
                            aria-describedby={errors[`resource_${index}`] ? `resource-${index}-error` : undefined}
                            aria-invalid={!!errors[`resource_${index}`]}
                        />
                        {formData.resources.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeResourceField(index)}
                                className="remove-resource"
                                aria-label="Удалить ресурс"
                            >
                                ×
                            </button>
                        )}
                        {errors[`resource_${index}`] && (
                            <span
                                id={`resource-${index}-error`}
                                className="error-message"
                                role="alert"
                            >
                                {errors[`resource_${index}`]}
                            </span>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addResourceField}
                    className="add-resource"
                >
                    + Добавить ещё ресурс
                </button>
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="btn-primary"
                    aria-describedby={!isFormValid ? 'form-validation-info' : undefined}
                >
                    {initialData.title ? 'Обновить технологию' : 'Добавить технологию'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-secondary"
                >
                    Отмена
                </button>
            </div>

            {!isFormValid && (
                <div id="form-validation-info" className="form-validation-info" role="status">
                    ⚠️ Заполните все обязательные поля корректно
                </div>
            )}
        </form>
    );
}

export default TechnologyForm;