export const setCurrentGroup = (group) =>
  window.localStorage.setItem("currentGroup", JSON.stringify(group));

export const getCurrentGroup = () =>
  JSON.parse(window.localStorage.getItem("currentGroup"));
