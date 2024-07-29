import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import { ThemeProvider } from './components/entities';
import { Wrapper, ThemeButtons, TodoList } from './components/features';
import { Text } from './components';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'



function App() {

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

  // Состояние для хранения выбранной даты
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Состояние для хранения задач для каждого дня
  const [tasksPerDay, setTasksPerDay] = useState({});



  // При монтировании компонента загружаем задачи из localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const dateString = selectedDate.toDateString();

    if (storedTasks && JSON.parse(storedTasks)[dateString]) {
      const parsedTasks = JSON.parse(storedTasks);
      // Если есть сохраненные задачи, используем их
      // setTasksPerDay(parsedTasks);
      setTasksPerDay((prevTasksPerDay) => ({
        ...prevTasksPerDay, ...parsedTasks
        
      }));
    } else {
      // Если задач нет в localStorage, инициализируем их для текущей даты
      setTasksPerDay((prevTasksPerDay) => ({
        ...prevTasksPerDay,
        [dateString]: initialTasks.map((task) => ({ ...task })),
      }));
    }
  }, [selectedDate]);


  // Обработчик изменения выбранной даты в календаре
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  // Функция для добавления задачи для выбранной даты
  const addTaskForDate = (task) => {
    const dateString = selectedDate.toDateString();
    const updatedTasks = {
      ...tasksPerDay,
      [dateString]: [...(tasksPerDay[dateString] || []), task],
    };
    setTasksPerDay(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Функция для обновления задач для выбранной даты
  const updateTasksForDate = (updatedTasks) => {
    const dateString = selectedDate.toDateString();
    // setTasksPerDay({
    //   ...tasksPerDay,
    //   [dateString]: updatedTasks,
    // });
    const updatedTasksState = {
      ...tasksPerDay,
      [dateString]: updatedTasks,
    };
    setTasksPerDay(updatedTasksState);
    localStorage.setItem('tasks', JSON.stringify(updatedTasksState));
  };

  // Функция подсчёта накопленных очков
  // const calcPoints = (tasks) {

  // }

  // Получаем задачи для выбранной даты
  const tasksForSelectedDate = tasksPerDay[selectedDate.toDateString()] || [];
  

  return (
    <div>
      <ThemeProvider>
        <Wrapper>
          {/* Отображаем календарь и передаем обработчик onDateChange */}
          <Calendar onChange={onDateChange} value={selectedDate} />
          
          {/* Отображаем список задач и передаем выбранную дату, задачи для этой даты и функцию для добавления задачи */}
          <TodoList
            date={selectedDate}
            tasks={tasksForSelectedDate}
            addTask={addTaskForDate}
            updateTasks={updateTasksForDate}
          />
        </Wrapper>
      </ThemeProvider>
    </div>
  );
}

export default App
