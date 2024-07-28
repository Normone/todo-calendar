import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../entities';
import { Button } from '../..'; 
import './TodoList.css';


export const TodoList = ({ date, tasks, addTask, updateTasks }) => {
    // Состояние для хранения новой задачи, которую пользователь хочет добавить
    const [newTask, setNewTask] = useState('');

    // Функция для добавления новой задачи в список
    const handleAddTask = () => {
        // Проверяем, что новая задача не пустая
        if (newTask.trim() !== '') {
        // Вызываем функцию addTask, передавая новую задачу с начальным статусом "не выполнено"
        addTask({ title: newTask, points: 10, completed: false });
        // Очищаем поле ввода после добавления задачи
        setNewTask('');
        }
    };

    // Функция для переключения статуса выполнения задачи
    const toggleTaskCompletion = (index) => {
        // Создаем копию массива задач
        const updatedTasks = [...tasks];
        
        // Меняем статус выполнения задачи на противоположный
        updatedTasks[index].completed = !updatedTasks[index].completed;
        
        // Вызываем функцию updateTasks с обновленным массивом задач
        updateTasks(updatedTasks);
    };

    // Вычисляем общее количество баллов за день
    const totalPoints = tasks.reduce((sum, task) => {
        return task.completed ? sum + task.points : sum;
    }, 0);

    return (
        <div>
        {/* Заголовок с отображением выбранной даты */}
        <h2>{date.toLocaleDateString()}</h2>

        {/* Поле ввода для добавления новой задачи */}
        <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} // Обновляем состояние при вводе
        />
        {/* Кнопка для добавления задачи */}
        <button onClick={handleAddTask}>Add Task</button>

        {/* Список задач, отображаемый на основе переданных props */}
        <ul>
            {tasks.map((task, index) => (
            <li
                key={index}
                style={{
                textDecoration: task.completed ? 'line-through' : 'none', // Зачеркиваем выполненные задачи
                color: task.completed ? 'gray' : 'inherit', // Меняем цвет выполненных задач
                }}
            >
                {task.title} ({task.points} points)
                <button onClick={() => toggleTaskCompletion(index)}>
                {task.completed ? 'Отменить' : 'Выполнено'}
                </button>
            </li>
            ))}
        </ul>

        {/* Отображение общего количества баллов за день */}
        <p>Total points for the day: {totalPoints}</p>
        </div>
    );
    }