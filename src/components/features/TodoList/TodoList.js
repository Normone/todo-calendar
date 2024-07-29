import React, { useState, useRef, useContext } from 'react';
import { ThemeContext } from '../../entities';
import { Button, Text } from '../../';
import './TodoList.css';


export const TodoList = ({ date, tasks, addTask, updateTasks, className=''}) => {

    const scrollableRef = useRef(null);
    const { theme, dispatch } = useContext(ThemeContext);

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
        if (scrollableRef.current) {
            setTimeout(() => {
                // scrollableRef.current.scrollTo(0, scrollableRef.current.scrollHeight);
                scrollableRef.current.lastChild.scrollIntoView(true)
            }, 50);
            
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
        <div className={`todoList ${theme} ${className}`} >
            {/* Заголовок с отображением выбранной даты */}
            <Text>{date.toLocaleDateString()}</Text>

            {/* Поле ввода для добавления новой задачи */}
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)} // Обновляем состояние при вводе
            />
            {/* Кнопка для добавления задачи */}
            <Button onClick={handleAddTask}>Add Task</Button>

            {/* Список задач, отображаемый на основе переданных props */}
            <ul ref={scrollableRef}>
                {tasks.map((task, index) => (
                <li
                    key={index}
                    style={{
                    textDecoration: task.completed ? 'line-through' : 'none', // Зачеркиваем выполненные задачи
                    color: task.completed ? 'white' : 'inherit', // Меняем цвет выполненных задач
                    }}
                >
                    <Text className='points'>({task.points})</Text>
                    <Text className='title'>{task.title}</Text>
                    <Button onClick={() => toggleTaskCompletion(index)}>
                        {task.completed ? 'Отменить' : 'Выполнено'}
                    </Button>
                </li>
                ))}
            </ul>

            {/* Отображение общего количества баллов за день */}
            <Text>Total points for the day: {totalPoints}</Text>
        </div>
    );
    }