const url = "http://localhost:3001/habits";

async function getHabits() {
  try {
    const response = await fetch(url);
    const trueResponse = await response.json();
    return trueResponse;
  } catch (error) {
    throw error;
  }
}

async function createHabit(habit) {
  try {
    const objectPost = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(habit),
    };
    const sendHabit = await fetch(url, objectPost);
    const jsonSendHabit = await sendHabit.json();
    return jsonSendHabit;
  } catch (error) {
    throw error;
  }
}

async function deleteHabit(habitId) {
  try {
    const habitURL = url + `/${habitId}`;
    const deleteObject = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    };
    await fetch(habitURL, deleteObject);
  } catch (error) {
    throw error;
  }
}

async function updateHabit(habit) {
  try {
    const habitURL = url + `/${habit.id}`;
    const updateObject = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(habit),
    };
    const updateHabit = await fetch(habitURL, updateObject);
    const returnPUT = await updateHabit.json();
    return returnPUT;
  } catch (error) {
    throw error;
  }
}

export { getHabits, createHabit, deleteHabit, updateHabit };
