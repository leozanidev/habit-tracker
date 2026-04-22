// Importando estilos
import { calculateStreak, streakMessage } from "../utils/habitUtils";
import style from "./HabitItem.module.css";

const HabitItem = ({ doneToday, habit, showDelModal, showEditModal }) => {
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
            onClick={() => doneToday(habit.id)}>
            Feito hoje
          </button>
        ) : (
          <button
            className={`${style.stateBtn} ${style.stateBtnPending}`}
            onClick={() => doneToday(habit.id)}>
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
      </div>
    </div>
  );
};

export default HabitItem;
