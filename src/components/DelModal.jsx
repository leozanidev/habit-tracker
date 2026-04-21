import style from "./DelModal.module.css";

const DelModal = ({ habit, delHabit, delCancel, modalStatus }) => {
  return (
    <div
      className={`${style.mainModalContainer} ${modalStatus ? style.modalContainerActive : style.modalContainerDeactive}`}>
      <div
        className={`${style.modal} ${modalStatus ? style.modalActive : style.modalDeactive}`}>
        <h2>{`Tem certeza que deseja excluir o hábito ${habit ? habit.title : ""}?`}</h2>
        <div className={style.actionBox}>
          <button
            className={`${style.modalBtn} ${style.confirmBtn}`}
            onClick={delHabit}>
            Excluir
          </button>
          <button
            className={`${style.modalBtn} ${style.cancelBtn}`}
            onClick={delCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelModal;
