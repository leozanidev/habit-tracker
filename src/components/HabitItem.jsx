// Importando estilos
import { calculateStreak, streakMessage } from "../utils/habitUtils";
import style from "./HabitItem.module.css";

const HabitItem = ({ doneToday, habit, showDelModal, showEditModal }) => {
  function handleStatusClick(e) {
    e.preventDefault();
    doneToday(habit.id);
  }

  function handleDelClick(e) {
    e.preventDefault();
    showDelModal(habit);
  }

  function handleEditClick(e) {
    e.preventDefault();
    showEditModal(habit);
  }

  const today = new Date().toLocaleDateString();
  const streak = calculateStreak(habit.completedDays);
  let mensagem = streakMessage(streak);
  return (
    <div className={style.item}>
      <h3 className={style.itemTitle}>{habit.title}</h3>
      <div className={style.itemDetails}>
        {habit.completedDays.includes(today) ? (
          <button
            className={`${style.stateBtn} ${style.stateBtnDone}`}
            onClick={handleStatusClick}>
            Feito hoje
          </button>
        ) : (
          <button
            className={`${style.stateBtn} ${style.stateBtnPending}`}
            onClick={handleStatusClick}>
            Por fazer
          </button>
        )}
        <div className={style.actionBox}>
          <button className={style.delBtn} onClick={handleDelClick}>
            Excluir
          </button>
          <button className={style.editBtn} onClick={handleEditClick}>
            Editar
          </button>
        </div>
        <span>{mensagem}</span>
      </div>
    </div>
  );
};

export default HabitItem;
