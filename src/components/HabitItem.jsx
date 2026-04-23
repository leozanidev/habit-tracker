// Importando estilos
import {
  calculateStreak,
  streakMessage,
  calculateLongestStreak,
  longestStreakMsg,
} from "../utils/habitUtils";
import style from "./HabitItem.module.css";

const HabitItem = ({ doneToday, habit, showDelModal, showEditModal }) => {
  const today = new Date().toLocaleDateString();
  const streak = calculateStreak(habit.completedDays);
  const longestStreak = calculateLongestStreak(habit.completedDays);
  const mensagem = streakMessage(streak);
  const longestStreakMessage = longestStreakMsg(longestStreak);
  return (
    <div className={style.item}>
      <h3 className={style.itemTitle}>{habit.title}</h3>
      <div className={style.itemDetails}>
        {habit.completedDays.includes(today) ? (
          <button
            className={`${style.stateBtn} ${style.stateBtnDone}`}
            onClick={() => doneToday(habit)}>
            Feito hoje
          </button>
        ) : (
          <button
            className={`${style.stateBtn} ${style.stateBtnPending}`}
            onClick={() => doneToday(habit)}>
            Por fazer
          </button>
        )}
        <div className={style.actionBox}>
          <button className={style.delBtn} onClick={() => showDelModal(habit)}>
            Excluir
          </button>
          <button
            className={style.editBtn}
            onClick={() => showEditModal(habit)}>
            Editar
          </button>
        </div>
        <span>{mensagem}</span>
        <span>{longestStreakMessage}</span>
      </div>
    </div>
  );
};

export default HabitItem;
