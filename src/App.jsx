import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import { ThemeProvider } from './components/entities';
import { Wrapper, ThemeButtons, TodoList } from './components/features';
import { Text } from './components';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'



function App() {

  // Состояние для хранения выбранной даты
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Состояние для хранения задач для каждого дня
  const [tasksPerDay, setTasksPerDay] = useState({});
  

  // Изначальный массив задач
  const initialTasks = [
    { title: "сделать зарядку", points: 10, completed: false },
    { title: "сделать упражнение на зрение", points: 10, completed: false },
    { title: "сходить на часовую прогулку", points: 10, completed: false },
    { title: "силовые тренировки", points: 10, completed: false },
    { title: "помыться", points: 10, completed: false },
    { title: "побриться", points: 10, completed: false },
    { title: "почистить зубы", points: 10, completed: false },
    { title: "подстричь ногти", points: 10, completed: false },
    { title: "помыть посуду", points: 10, completed: false },
    { title: "протереть стол", points: 10, completed: false },
    { title: "почистить ноут", points: 10, completed: false },
    { title: "почистить ковёр", points: 10, completed: false },
    { title: "помыть пол", points: 10, completed: false },
    { title: "сходить в магазин", points: 10, completed: false },
    { title: "приготовить поесть", points: 10, completed: false },
    { title: "полезный кодинг", points: 10, completed: false },
    { title: "обучение чему-то полезному", points: 10, completed: false },
    { title: "работа", points: 10, completed: false },
    { title: "поиск вакансий на hh", points: 10, completed: false }
  ];


  // При монтировании компонента загружаем задачи из localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const dateString = selectedDate.toDateString();

    if (storedTasks && JSON.parse(storedTasks)[dateString]) {
      const parsedTasks = JSON.parse(storedTasks);
      // Если есть сохраненные задачи, используем их
      setTasksPerDay(parsedTasks);
    } else {
      // Если задач нет в localStorage, инициализируем их для текущей даты
      setTasksPerDay((prevTasksPerDay) => ({
        ...prevTasksPerDay,
        [dateString]: initialTasks.map((task) => ({ ...task })),
      }));
    }
  }, [selectedDate]);

  // При изменении состояния tasksPerDay сохраняем его в localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksPerDay));
  }, [tasksPerDay]);

  // Обработчик изменения выбранной даты в календаре
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  // Функция для добавления задачи для выбранной даты
  const addTaskForDate = (task) => {
    const dateString = selectedDate.toDateString();
    setTasksPerDay({
      ...tasksPerDay,
      [dateString]: [...(tasksPerDay[dateString] || []), task],
    });
  };

  // Функция для обновления задач для выбранной даты
  const updateTasksForDate = (updatedTasks) => {
    const dateString = selectedDate.toDateString();
    // setTasksPerDay({
    //   ...tasksPerDay,
    //   [dateString]: updatedTasks,
    // });
    setTasksPerDay((prevUpdatedTasks) => ({
      ...prevUpdatedTasks,
      [dateString]: updatedTasks,
    }));
  };

  // Получаем задачи для выбранной даты
  const tasksForSelectedDate = tasksPerDay[selectedDate.toDateString()] || [];

  return (
    <div>
      {/* Отображаем календарь и передаем обработчик onDateChange */}
      <Calendar onChange={onDateChange} value={selectedDate} />
      
      {/* Отображаем список задач и передаем выбранную дату, задачи для этой даты и функцию для добавления задачи */}
      <TodoList
        date={selectedDate}
        tasks={tasksForSelectedDate}
        addTask={addTaskForDate}
        updateTasks={updateTasksForDate}
      />
    </div>
  );
}

export default App
