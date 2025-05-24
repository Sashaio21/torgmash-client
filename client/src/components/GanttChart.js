import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { Typography, Paper } from '@mui/material';

// Фильтрация задач текущего месяца
const filterCurrentMonthTasks = (tasks) => {
  const now = new Date();
  const start = startOfMonth(now).getTime();
  const end = endOfMonth(now).getTime();

  return tasks.filter((task) => {
    const created = new Date(task.createdAt).getTime();
    const deadline = new Date(task.deadline).getTime();

    // Задача попадает в текущий месяц, если она начинается или заканчивается в этом месяце
    return (
      isWithinInterval(created, { start, end }) ||
      isWithinInterval(deadline, { start, end })
    );
  });
};

const transformTasksToData = (tasks) => {
  const monthStart = startOfMonth(new Date()).getTime();

  return tasks.map((task) => {
    const start = (new Date(task.createdAt).getTime() - monthStart) / (1000 * 60 * 60 * 24);
    const end = (new Date(task.deadline).getTime() - monthStart) / (1000 * 60 * 60 * 24);

    return {
      name: task.titleTask,
      start,
      duration: end - start,
      status: task.statusTask,
    };
  });
};


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { start, duration, name, status } = payload[0].payload;
    const monthStart = startOfMonth(new Date());
    const startDate = new Date(monthStart.getTime() + start * 24 * 60 * 60 * 1000);
    const endDate = new Date(monthStart.getTime() + (start + duration) * 24 * 60 * 60 * 1000);

    return (
      <Paper sx={{ padding: 1 }}>
        <Typography variant="subtitle2"><strong>{name}</strong></Typography>
        <Typography variant="body2">Статус: {status}</Typography>
        <Typography variant="body2">С: {format(startDate, 'dd.MM.yyyy')}</Typography>
        <Typography variant="body2">По: {format(endDate, 'dd.MM.yyyy')}</Typography>
      </Paper>
    );
  }
  return null;
};


const GanttChart = ({ tasks }) => {
  const filteredTasks = filterCurrentMonthTasks(tasks);

  if (!filteredTasks || filteredTasks.length === 0) {
    return <Typography variant="h6">Нет задач за текущий месяц</Typography>;
  }

  const data = transformTasksToData(filteredTasks);
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24);

  // Шаг оси X: 7 дней
  const step = 7;
  const ticks = Array.from(
    { length: Math.ceil(daysInMonth / step) + 1 },
    (_, i) => i * step
  );

  return (
    <div style={{ width: '100%', height: 50 * data.length + 100 }}>
      <Typography variant="h5" gutterBottom>
        Диаграмма Ганта — текущий месяц
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <XAxis
            type="number"
            domain={[0, daysInMonth]}
            ticks={ticks}
            tickFormatter={(day) =>
              format(new Date(monthStart.getTime() + day * 24 * 60 * 60 * 1000), 'dd.MM')
            }
          />
          <YAxis type="category" dataKey="name" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="start" stackId="a" fill="transparent" />
          <Bar dataKey="duration" stackId="a" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};



export default GanttChart;
