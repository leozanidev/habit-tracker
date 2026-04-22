import style from "./Modal.module.css";

const DelModal = ({ habit, delHabit, modalCancel, delModalStatus }) => {
  return (
    <div
      className={`${style.mainModalContainer} ${delModalStatus ? style.modalContainerActive : style.modalContainerDeactive}`}
      onClick={(e) => modalCancel()}>
      <div
        className={`${style.modal} ${delModalStatus ? style.modalActive : style.modalDeactive}`}
        role="dialog"
        aria-modal={true}
        aria-label="Confirmar exclusão"
        onClick={(e) => e.stopPropagation()}>
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
