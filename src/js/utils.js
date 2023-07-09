export const switchDarkMode = () => {
  const html = document.querySelector("html");
  const toggleDarkMode = document.querySelector("#toggleDarkMode");

  if (localStorage.getItem("mode") === "dark") {
    html.classList.add("dark");
    toggleDarkMode.checked = true;
  }

  toggleDarkMode.addEventListener("input", () => {
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  });
};
