// Biblioteca rechart pra gráficos
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Importando estilos
import style from "./HabitChart.module.css";

const HabitBarChart = ({ habitList }) => {
  const chartHabitList = habitList.map((habit) => ({
    title: habit.title,
    daysGone: habit.completedDays.length,
  }));

  return (
    <div className={style.chartMainContainer}>
      <h2>Gráfico de hábitos</h2>
      <ResponsiveContainer width="80%" height={400} margin={"0 auto"}>
        <BarChart
          barSize={25}
          width="100%"
          height="70vh"
          data={chartHabitList}
          fill="#a3e2f3">
          <XAxis dataKey={"title"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"daysGone"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitBarChart;
