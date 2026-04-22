import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function useHabits() {
  // Todos states da aplicação
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [delModalStatus, setDelModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);

  /* Defino a habitList com base no que foi guardado no localStorage
    Lazy Initializer: passar uma função dentro no useState para
    que ela só execute uma vez, e não toda vez que o componente renderizar  */
  const [habitList, setHabitList] = useState(() => {
    const loadHabitList = localStorage.getItem("habitListJson");
    if (loadHabitList == null) {
      return [];
    } else {
      return JSON.parse(loadHabitList);
    }
  });

  // UseEffect para atualizar o localStorage com a lista mais recente toda vez que ela for modificada
  useEffect(() => {
    const habitListJson = JSON.stringify(habitList);
    localStorage.setItem("habitListJson", habitListJson);
  }, [habitList]);

  // Função para criação de novos hábitos
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

  //   Função de alternância do status do hábito
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

  // Função para deletar o hábito
  function delHabit() {
    const habitId = selectedHabit.id;
    const newList = habitList.filter((habit) => habit.id !== habitId);
    setHabitList(newList);
    setSelectedHabit(null);
    setDelModalStatus(false);
    toast.success("Hábito excluído com sucesso");
  }

  // Função para editar hábitos
  function editHabitFunc(newTitle) {
    const habitId = selectedHabit.id;
    const newHabitList = habitList.map((habit) => {
      if (habit.id == habitId) {
        const updatedHabit = { ...habit, title: newTitle };
        return updatedHabit;
      }
      return habit;
    });

    setHabitList(newHabitList);
    setEditModalStatus(false);
  }

  // Função para definir exibição de modal
  function showDelModal(habit) {
    setSelectedHabit(habit);
    setDelModalStatus(true);
  }

  // Função para cancelar a exclusão ou edição do hábito
  function modalCancel() {
    setSelectedHabit(null);
    if (editModalStatus) {
      setEditModalStatus(false);
    }
    if (delModalStatus) {
      setDelModalStatus(false);
    }
  }

  // UseEffect para detectar o teclado e fecaar o modal com ESC
  function watchKeyboard(e) {
    console.log(e);
    console.log(e.key);
    if (e.key === "Escape") {
      modalCancel();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", watchKeyboard);
    return () => {
      window.removeEventListener("keydown", watchKeyboard);
    };
  }, [showDelModal, showEditModal]);

  // Função que abre o modal de edição
  function showEditModal(habit) {
    setSelectedHabit(habit);
    setEditModalStatus(true);
  }

  return {
    selectedHabit,
    delModalStatus,
    editModalStatus,
    habitList,
    addHabit,
    doneToday,
    showDelModal,
    showEditModal,
    modalCancel,
    editHabitFunc,
    delHabit,
  };
}
