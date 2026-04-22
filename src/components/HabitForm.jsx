// Importando HOOKS
import { useState } from "react";

// Importando biblioteca para feedback
import { toast } from "react-toastify";

// Importando estilos
import style from "./HabitForm.module.css";

const HabitForm = ({ addHabit }) => {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      toast.error("O campo título é obrigatório");
      return;
    }
    addHabit(title.trim());
    setTitle("");
    toast.success("Hábito criado com sucesso");
  }

  return (
    <div className={style.formContainer}>
      <div className={style.formTitle}>
        <h2>Novo hábito</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título do hábito:</span>
          <input
            type="text"
            placeholder="Digite o nome do hábito"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button type="submit">Criar hábito!</button>
      </form>
    </div>
  );
};

export default HabitForm;
