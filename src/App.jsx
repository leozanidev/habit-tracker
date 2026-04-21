// Importando HOOKS
import { useState, useEffect } from "react";

// Biblioteca para feedback
import { toast, ToastContainer } from "react-toastify";

// Importando meus componentes
import HabitForm from "./components/HabitForm";
import HabitItem from "./components/HabitItem";
import DelModal from "./components/DelModal";

// Importando estilo
import styles from "./App.module.css";

function App() {
  // Função para pegar itens salvos no localStorage
  function getLocalStorageList() {
    const loadHabitList = localStorage.getItem("habitListJson");
    if (loadHabitList == null) {
      return [];
    } else {
      return JSON.parse(loadHabitList);
    }
  }
  const [habitList, setHabitList] = useState(getLocalStorageList());
  const [selectedHabit, setSelectedHabit] = useState();
  const [modalStatus, setModalStatus] = useState(false);
  if (modalStatus) {
    document.body.classList.add(`${styles.noScroll}`);
  } else {
    document.body.classList.remove(`${styles.noScroll}`);
  }

  // Função que pega o novo hábito e insere na lista de hábitos
  function addHabit(title) {
    const habit = {
      id: Date.now(),
      title,
      completedDays: [],
      createdAt: new Date().toLocaleDateString(),
    };

    const newHabitList = [...habitList, habit];
    setHabitList(newHabitList);
  }

  // useEffect para salvar dados no localStorage
  useEffect(() => {
    const habitListJson = JSON.stringify(habitList);
    localStorage.setItem("habitListJson", habitListJson);
  }, [habitList]);

  // Função para funcionalidade de hábito realizado no dia
  function doneToday(habitId) {
    const today = new Date().toLocaleDateString();
    const updatedList = habitList.map((habit) => {
      if (habit.id == habitId) {
        // Se o hábito estiver como feito hoje: cria um novo array que não contenha o hoje para passar para completedDays e mudar o estado do hábito para não feito
        if (habit.completedDays.includes(today)) {
          const newArrWithoutToday = habit.completedDays.filter(
            (date) => date != today,
          );
          const updatedHabit = { ...habit, completedDays: newArrWithoutToday };
          return updatedHabit;
        } else {
          const completedDays = habit.completedDays;
          const newCompletedDays = [...completedDays, today];
          const updatedHabit = { ...habit, completedDays: newCompletedDays };
          return updatedHabit;
        }
      } else return habit;
    });

    setHabitList(updatedList);
    return today;
  }

  // Função para calcular a sequência de dias
  function calculateStreak(completedDays) {
    let streak = 0;
    // Validando completedDAys
    if (completedDays.length == 0) {
      return streak;
    }

    // Gerando um array com datas formatadas
    const dateArray = [];
    for (let i = 0; i < completedDays.length; i++) {
      const date = completedDays[i];
      const splitDate = date.split("/");
      const day = Number(splitDate[0]);
      const month = Number(splitDate[1]) - 1;
      const year = Number(splitDate[2]);
      const newDate = new Date(year, month, day);
      newDate.setHours(0, 0, 0, 0);
      dateArray.push(newDate);
    }

    const lastDay = dateArray[dateArray.length - 1].getTime();
    const trueToday = new Date();
    trueToday.setHours(0, 0, 0, 0);
    const today = trueToday.getTime();
    const trueYesterday = new Date();
    trueYesterday.setDate(trueYesterday.getDate() - 1);
    trueYesterday.setHours(0, 0, 0, 0);
    const yesterday = trueYesterday.getTime();
    // Condicional para verificar se o streak existe
    if (lastDay != today && lastDay != yesterday) {
      streak = 0;
      return streak;
    } else {
      streak = 1;
    }

    // Loop para contar quantos dias de streak
    for (let i = dateArray.length - 1; i > 0; i--) {
      const x = dateArray[i];
      const copyX = new Date(x.getFullYear(), x.getMonth(), x.getDate());
      copyX.setDate(copyX.getDate() - 1);
      copyX.setHours(0, 0, 0, 0);
      const compX = copyX.getTime();
      const y = dateArray[i - 1];
      const copyY = new Date(y.getFullYear(), y.getMonth(), y.getDate());
      copyY.setHours(0, 0, 0, 0);
      const compY = copyY.getTime();
      if (compX == compY) {
        streak += 1;
      } else {
        return streak;
      }
    }
    console.log(streak);
    return streak;
  }

  // Função para definir exibição de modal
  function showModal(habit) {
    setSelectedHabit(habit);
    setModalStatus(true);
  }

  // Função para deleta o hábito
  function delHabit() {
    const habitId = selectedHabit.id;
    const newList = habitList.filter((habit) => habit.id !== habitId);
    setHabitList(newList);
    setSelectedHabit(null);
    setModalStatus(false);
    toast.success("Hábito excluído com sucesso");
  }

  // Função para cancelar a exclusão do hábito
  function delCancel() {
    setSelectedHabit(null);
    setModalStatus(false);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainTitle}>
        <h1>Habit Tracker</h1>
      </div>
      <div className={styles.formContainerDiv}>
        <HabitForm addHabit={addHabit} />
      </div>
      <div className={styles.itemsContainer}>
        {habitList.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            doneToday={doneToday}
            calculateStreak={calculateStreak}
            showModal={showModal}
          />
        ))}
        <DelModal
          habit={selectedHabit}
          delHabit={delHabit}
          delCancel={delCancel}
          modalStatus={modalStatus}
        />
        <ToastContainer
          position="top-center"
          closeOnClick={true}
          closeButton={false}
          autoClose={3000}
          pauseOnHover={true}
          hideProgressBar={true}
        />
      </div>
    </div>
  );
}

export default App;
