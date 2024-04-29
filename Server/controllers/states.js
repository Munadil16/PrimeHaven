import { states } from "../utils/states.js";

const showStates = (req, res) => {
  res.json(states);
};

export { showStates };
