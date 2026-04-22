// Função auxiliar que formata array de datas
function formatDates(completedDays) {
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

  return dateArray;
}

// Função para calcular a sequência de dias
export function calculateStreak(completedDays) {
  let streak = 0;
  // Validando completedDays
  if (completedDays.length === 0) {
    return streak;
  }

  // Array com datas formatadas
  const dateArray = formatDates(completedDays);

  // Verificando se o streak está ativo
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

// Função para definir mensagem do streak no item
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

// Função para calcular o maior streak Histórico
export function calculateLongestStreak(completedDays) {
  let longestStreak = 1;
  let currentStreak = 1;
  // verifica se ja algum dia ja foi feito
  if (completedDays.length === 0) {
    return 0;
  }
  // Array com datas formatadas
  const dateArray = formatDates(completedDays);

  // Percorrendo o array para achar o maior streak histórico
  for (let i = 0; i < dateArray.length - 1; i++) {
    const x = dateArray[i];
    const copyX = new Date(x.getFullYear(), x.getMonth(), x.getDate());
    copyX.setDate(copyX.getDate() + 1);
    copyX.setHours(0, 0, 0, 0);
    const compX = copyX.getTime();
    const y = dateArray[i + 1];
    const copyY = new Date(y.getFullYear(), y.getMonth(), y.getDate());
    copyY.setHours(0, 0, 0, 0);
    const compY = copyY.getTime();
    if (compX === compY) {
      currentStreak += 1;
    }
    if (compX !== compY) {
      currentStreak = 1;
    }
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }
  }
  return longestStreak;
}

// Função para definir mensagem do longestStreak
export function longestStreakMsg(longestStreak) {
  let msg = "";
  if (longestStreak === 0) {
    msg = "Inicie sua sequência completando pelo menos um dia";
  } else if (longestStreak === 1) {
    msg = "Você ja concluiu um dia, continue!";
  } else {
    msg = `Parabéns! Sua maior sequência é de ${longestStreak} dias.`;
  }

  return msg;
}
