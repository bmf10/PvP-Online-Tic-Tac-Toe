import { nanoid } from "nanoid";

const getPlayerId = () => {
  const playerId = localStorage.getItem("playerId");
  if (!playerId) {
    const newId = nanoid(5);
    localStorage.setItem("playerId", newId);
    return newId;
  }
  return playerId;
};

export default getPlayerId;
