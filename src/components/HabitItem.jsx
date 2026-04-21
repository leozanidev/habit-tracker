// Importando estilos
import style from "./HabitItem.module.css";

const HabitItem = ({ doneToday, habit, calculateStreak, showModal }) => {
  function handleStatusClick(e) {
    e.preventDefault();
    doneToday(habit.id);
  }

  function handleDelClick(e) {
    e.preventDefault();
    showModal(habit);
  }

  const today = new Date().toLocaleDateString();
  const streak = calculateStreak(habit.completedDays);
  let mensagem = "";
  if (streak == 0) {
    mensagem = "Não desanime, vamos lá!";
  } else if (streak == 1) {
    mensagem = "Um dia já foi!";
  } else {
    mensagem = `🔥${streak} dias seguidos!`;
  }
  return (
    <div className={style.item}>
      <h3>{habit.title}</h3>
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
        <button className={style.delBtn} onClick={handleDelClick}>
          Excluir
        </button>
        <span>{mensagem}</span>
      </div>
    </div>
  );
};

export default HabitItem;
