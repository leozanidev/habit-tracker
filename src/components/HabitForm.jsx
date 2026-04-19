// Importando HOOKS
import { useState } from "react";

// Importando estilos
import style from "./HabitForm.module.css";

const HabitForm = (props) => {
  const [title, setTitle] = useState("");

  // Função para pegar o valor do input
  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }
    props.addHabit(title);
    setTitle("");
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
            onChange={handleChange}
          />
        </label>
        <button type="submit">Criar hábito!</button>
      </form>
    </div>
  );
};

export default HabitForm;
