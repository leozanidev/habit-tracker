// Função para calcular a sequência de dias
export function calculateStreak(completedDays) {
  let streak = 0;
  // Validando completedDAys
  if (completedDays.length === 0) {
    return streak;
  }

  // Gerando um array com datas formatadas
  const dateArray = [];
  for (let i = 0; i < completedDays.length; i++) {
    const date = completedDays[i];
    const splitDate = date.split("/");
    const day = Number(splitDate[0]);
    const month = Number(splitDate[1]) - 1;
    const year = Number(splitDate[2]);
    const newDate = new Date(year, month, day);
    newDate.setHours(0, 0, 0, 0);
    dateArray.push(newDate);
  }

  const lastDay = dateArray[dateArray.length - 1].getTime();
  const trueToday = new Date();
  trueToday.setHours(0, 0, 0, 0);
  const today = trueToday.getTime();
  const trueYesterday = new Date();
  trueYesterday.setDate(trueYesterday.getDate() - 1);
  trueYesterday.setHours(0, 0, 0, 0);
  const yesterday = trueYesterday.getTime();
  // Condicional para verificar se o streak existe
  if (lastDay !== today && lastDay !== yesterday) {
    streak = 0;
    return streak;
  } else {
    streak = 1;
  }

  // Loop para contar quantos dias de streak
  for (let i = dateArray.length - 1; i > 0; i--) {
    const x = dateArray[i];
    const copyX = new Date(x.getFullYear(), x.getMonth(), x.getDate());
    copyX.setDate(copyX.getDate() - 1);
    copyX.setHours(0, 0, 0, 0);
    const compX = copyX.getTime();
    const y = dateArray[i - 1];
    const copyY = new Date(y.getFullYear(), y.getMonth(), y.getDate());
    copyY.setHours(0, 0, 0, 0);
    const compY = copyY.getTime();
    if (compX === compY) {
      streak += 1;
    } else {
      return streak;
    }
  }
  return streak;
}

// Funçaõ para definir mensagem do streak no item
export function streakMessage(streak) {
  let mensagem = "";
  if (streak === 0) {
    mensagem = "Não desanime, vamos lá!";
  } else if (streak == 1) {
    mensagem = "Um dia já foi!";
  } else {
    mensagem = `🔥${streak} dias seguidos!`;
  }
  return mensagem;
}
