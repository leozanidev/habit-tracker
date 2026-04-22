import { useEffect, useState } from "react";
import style from "./Modal.module.css";
import { toast } from "react-toastify";

const EditModal = ({ habit, modalCancel, editHabit, editModalStatus }) => {
  const [newTitle, setNewTitle] = useState("");
  useEffect(() => {
    if (habit) {
      setNewTitle(habit.title);
    }
  }, [editModalStatus]);

  function editHandleChange(e) {
    setNewTitle(e.target.value);
  }

  function handleEdit() {
    if (newTitle.trim() === "") {
      toast.error("O campo título é obrigatório");
      return;
    }
    editHabit(newTitle);
    setNewTitle("");
    toast.success("Hábito editado com sucesso");
  }
  return (
    <div
      className={`${style.mainModalContainer} ${editModalStatus ? style.modalContainerActive : style.modalContainerDeactive}`}>
      <div
        className={`${style.modal} ${editModalStatus ? style.modalActive : style.modalDeactive}`}>
        <h2>{`Editando o hábito: ${habit ? habit.title : ""}.`}</h2>
        <div className={style.editInput}>
          <label>
            <span>Título</span>
            <input type="text" value={newTitle} onChange={editHandleChange} />
          </label>
        </div>
        <div className={style.actionBox}>
          <button
            className={`${style.modalBtn} ${style.confirmBtn}`}
            onClick={handleEdit}>
            Salvar
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

export default EditModal;
