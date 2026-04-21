const nlp = require("compromise");

const chrono = require("chrono-node");

const extractTask = (text) => {
  const doc = nlp(text);

  // Looking for sentences that contain a verb (an action)
  // We look for specific triggers like "call", "email", "meeting", "buy"
  const actionTerms = [
    "call",
    "email",
    "meet",
    "buy",
    "submit",
    "send",
    "finish",
  ];

  // 2. Try to find a date in the text
  const dueDate = chrono.parseDate(text);

  // 3. If a date is found, we assume that sentence is a task
  if (dueDate) {
    console.log("!!! Task Found for Date:", dueDate);
    return {
      description: text.trim(),
      date: dueDate,
    };
  }
  console.log("No task found in this note.");

  return null;
};

module.exports = extractTask;
