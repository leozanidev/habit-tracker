import style from "./Modal.module.css";

const DelModal = ({ habit, delHabit, modalCancel, delModalStatus }) => {
  return (
    <div
      className={`${style.mainModalContainer} ${delModalStatus ? style.modalContainerActive : style.modalContainerDeactive}`}>
      <div
        className={`${style.modal} ${delModalStatus ? style.modalActive : style.modalDeactive}`}>
        <h2>{`Tem certeza que deseja excluir o hábito ${habit ? habit.title : ""}?`}</h2>
        <div className={style.actionBox}>
          <button
            className={`${style.modalBtn} ${style.confirmBtn}`}
            onClick={delHabit}>
            Excluir
          </button>
          <button
            className={`${style.modalBtn} ${style.cancelBtn}`}
            onClick={modalCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelModal;
