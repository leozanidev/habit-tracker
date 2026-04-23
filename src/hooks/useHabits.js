import { useState, useEffect } from "react";

// Importando funções de requisição HTTP
import {
  getHabits,
  createHabit,
  deleteHabit,
  updateHabit,
} from "../services/habitServices";

import { toast } from "react-toastify";

export default function useHabits() {
  // Todos states da aplicação
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [delModalStatus, setDelModalStatus] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [habitList, setHabitList] = useState([]);

  // Carregando a lista de hábitos
  useEffect(() => {
    async function loadHabits() {
      try {
        setIsLoading(true);
        const habitList = await getHabits();
        setHabitList(habitList);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Houve um erro ao carregar os hábitos.");
      }
    }
    loadHabits();
  }, []);

  // Função para criação de novos hábitos
  async function addHabit(title) {
    try {
      setIsLoading(true);
      const habit = {
        title,
        completedDays: [],
        createdAt: new Date().toLocaleDateString(),
      };
      const newHabit = await createHabit(habit);
      const newHabitList = [...habitList, newHabit];
      setHabitList(newHabitList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Houve um erro ao criar o hábito.");
    }
  }

  //   Função de alternância do status do hábito
  async function doneToday(habit) {
    try {
      setIsLoading(true);
      const habitId = habit.id;
      const today = new Date().toLocaleDateString();
      let newHabit = {};
      if (habit.completedDays.includes(today)) {
        const arrWithoutToday = habit.completedDays.filter(
          (date) => date !== today,
        );
        newHabit = { ...habit, completedDays: arrWithoutToday };
        await updateHabit(newHabit);
      } else {
        const newCompletedDays = [...habit.completedDays, today];
        newHabit = { ...habit, completedDays: newCompletedDays };
        await updateHabit(newHabit);
      }

      const updatedList = habitList.map((habit) => {
        if (habit.id === habitId) {
          return newHabit;
        } else return habit;
      });
      setHabitList(updatedList);
      setIsLoading(false);
      return today;
    } catch (error) {
      setIsLoading(false);
      toast.error("Houve um erro na alteração de status do hábito.");
    }
  }

  // Função para deletar o hábito
  async function delHabit() {
    try {
      setIsLoading(true);
      const habitId = selectedHabit.id;
      await deleteHabit(habitId);
      const newList = habitList.filter((habit) => habit.id !== habitId);
      setHabitList(newList);
      setSelectedHabit(null);
      setDelModalStatus(false);
      setIsLoading(false);
      toast.success("Hábito excluído com sucesso");
    } catch (error) {
      setIsLoading(false);
      toast.error("Houve um erro ao deletar o item.");
    }
  }

  // Função para editar hábitos
  async function editHabitFunc(newTitle) {
    try {
      setIsLoading(true);
      const habitId = selectedHabit.id;
      const updatedHabit = { ...selectedHabit, title: newTitle };
      await updateHabit(updatedHabit);
      const newHabitList = habitList.map((habit) => {
        if (habit.id == habitId) {
          return updatedHabit;
        }
        return habit;
      });
      setHabitList(newHabitList);
      setEditModalStatus(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Houve um erro ao editar o item.");
    }
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
    isLoading,
    addHabit,
    doneToday,
    showDelModal,
    showEditModal,
    modalCancel,
    editHabitFunc,
    delHabit,
  };
}
