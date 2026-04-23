// Importando HOOKS
import useHabits from "./hooks/useHabits.js";

// Importando componentes
import HabitForm from "./components/HabitForm";
import HabitItem from "./components/HabitItem";
import DelModal from "./components/DelModal";
import EditModal from "./components/EditModal";
import HabitBarChart from "./components/HabitChart.jsx";
import { ToastContainer } from "react-toastify";

// Importando estilo
import styles from "./App.module.css";
import { useEffect } from "react";
import Loading from "./components/Loading.jsx";

function App() {
  const {
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
  } = useHabits();

  useEffect(() => {
    if (delModalStatus || editModalStatus) {
      document.body.classList.add(`${styles.noScroll}`);
    } else {
      document.body.classList.remove(`${styles.noScroll}`);
    }
  }, [delModalStatus, editModalStatus]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainTitle}>
        <h1>Habit Tracker</h1>
      </div>
      <div className={styles.formContainerDiv}>
        <HabitForm addHabit={addHabit} />
      </div>
      <div className={styles.itemsContainer}>
        {habitList.length === 0 && isLoading === true ? (
          <Loading />
        ) : (
          habitList.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              doneToday={doneToday}
              showDelModal={showDelModal}
              showEditModal={showEditModal}
            />
          ))
        )}
        <DelModal
          habit={selectedHabit}
          delHabit={delHabit}
          modalCancel={modalCancel}
          delModalStatus={delModalStatus}
        />
        <EditModal
          habit={selectedHabit}
          modalCancel={modalCancel}
          editHabit={editHabitFunc}
          editModalStatus={editModalStatus}
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
      <div className={styles.formContainerDiv}>
        <HabitBarChart habitList={habitList} />
      </div>
    </div>
  );
}

export default App;
