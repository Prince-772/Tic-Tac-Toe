const btns = Array.from(document.querySelectorAll(".btn"));
const score_red_box = document.querySelector(".s1");
const score_green_box = document.querySelector(".s2");
const restart = document.querySelector(".restart");
const msg = document.querySelector(".msg");
const theme_btn = document.querySelector(".toggle-theme");
const cross_bar = document.querySelector(".play-area .cross");
let theme = "Light";
const win_condition = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
  ["C1", "C2", "C3"],
  ["A1", "B1", "C1"],
  ["A2", "B2", "C2"],
  ["A3", "B3", "C3"],
  ["A1", "B2", "C3"],
  ["A3", "B2", "C1"],
];
let red = [];
let green = [];
const red_symbol = "&#x2573;";
const green_symbol = "&#x25EF";
let score_red = 0;
let score_green = 0;
let first_turn = "Red";
let turn = first_turn;
let g_active = true;
let bg_color_red = "rgb(254, 45, 45)";
let bg_color_green = "rgb(86, 255, 70)";
msg.textContent = `${turn} Turn`;
turn === "Red"
  ? (msg.style.backgroundColor = bg_color_red)
  : (msg.style.backgroundColor = bg_color_green);

function clicked(event) {
  if (!g_active) return;
  let clicked_btn = event.target;
  let btn_id = clicked_btn.dataset.value;
  clicked_btn.classList.add("disabled");
  if (turn === "Red") {
    clicked_btn.style.color = "red";
    clicked_btn.innerHTML = red_symbol;
    red.push(btn_id);
    turn = "Green";
    msg.textContent = `${turn} Turn`;
    turn === "Red"
      ? (msg.style.backgroundColor = bg_color_red)
      : (msg.style.backgroundColor = bg_color_green);
    if (red.length >= 3) {
      check("Red");
    }
  } else {
    clicked_btn.style.color = "lime";
    clicked_btn.innerHTML = green_symbol;
    green.push(btn_id);
    turn = "Red";
    msg.textContent = `${turn} Turn`;
    turn === "Red"
      ? (msg.style.backgroundColor = bg_color_red)
      : (msg.style.backgroundColor = bg_color_green);
    if (green.length >= 3) {
      check("Green");
    }
  }
}
function check(player) {
  let to_check;
  player === "Red" ? (to_check = red) : (to_check = green);

  for (let combination of win_condition) {
    if (combination.every((id) => to_check.includes(id))) {
      console.log(to_check, combination);
      g_active = false;
      won(player, combination);
      return;
    }
  }
  if (red.length + green.length === 9 && g_active) {
    draw();
  }
}

function won(player, combination) {
  msg.textContent = `${player} Won`;
  let won_btns = btns.filter((btn) => {
    return combination.includes(btn.dataset.value);
  });
  won_btns.forEach((btn) => btn.classList.add("won"));
  if (player === "Red") {
    msg.style.backgroundColor = bg_color_red;
    score_red++;
    score_red_box.textContent = score_red;
  } else {
    msg.style.backgroundColor = bg_color_green;
    score_green++;
    score_green_box.textContent = score_green;
  }
  showCross(combination, player);
}

function restart_it() {
  cross_bar.className = "cross";
  g_active = true;
  if (first_turn === "Red") {
    first_turn = "Green";
  } else {
    first_turn = "Red";
  }
  turn = first_turn;
  btns.forEach((btn) => {
    btn.innerHTML = "";
    btn.classList.remove("disabled");
    btn.classList.remove("won");
  });
  msg.textContent = `${turn} Turn`;
  turn === "Red"
    ? (msg.style.backgroundColor = bg_color_red)
    : (msg.style.backgroundColor = bg_color_green);
  red = [];
  green = [];
}

function draw() {
  msg.textContent = "Draw";
  msg.style.backgroundColor = "skyblue";
}
function showCross(combination, player) {
  cross_bar.className = "cross";
  player === "Red"
    ? cross_bar.classList.add("red")
    : cross_bar.classList.add("green");

  switch (combination.join(",")) {
    case "A1,A2,A3":
      cross_bar.classList.add("vertical");
      cross_bar.classList.add("a1a2a3");
      break;
    case "B1,B2,B3":
      cross_bar.classList.add("vertical");
      cross_bar.classList.add("b1b2b3");
      break;
    case "C1,C2,C3":
      cross_bar.classList.add("vertical");
      cross_bar.classList.add("c1c2c3");
      break;
    case "A1,B1,C1":
      cross_bar.classList.add("horizontal");
      cross_bar.classList.add("a1b1c1");
      break;
    case "A2,B2,C2":
      cross_bar.classList.add("horizontal");
      cross_bar.classList.add("a2b2c2");
      break;
    case "A3,B3,C3":
      cross_bar.classList.add("horizontal");
      cross_bar.classList.add("a3b3c3");
      break;
    case "A1,B2,C3":
      cross_bar.classList.add("diagonal-right");
      break;
    case "A3,B2,C1":
      cross_bar.classList.add("diagonal-left");
      break;
  }
}
function toggle_theme() {
  theme_btn.classList.add("changing");
  if (theme === "Light") {
    theme = "Dark";
    theme_btn.querySelector(".theme-pointer").className = "moon theme-pointer";
    theme_btn.classList.add("dark");
    document.body.classList.add("dark");
    document.querySelector("main").classList.add("dark");
    document.querySelector("div.score").classList.add("dark");
    restart.classList.add("dark");
    btns.forEach((btn) => btn.classList.add("dark"));
  } else {
    theme = "Light";
    theme_btn.querySelector(".theme-pointer").className = "sun theme-pointer";
    theme_btn.classList.remove("dark");
    document.body.classList.remove("dark");
    document.querySelector("main").classList.remove("dark");
    document.querySelector("div.score").classList.remove("dark");
    restart.classList.remove("dark");
    btns.forEach((btn) => btn.classList.remove("dark"));
  }
}

btns.forEach((btn) => {
  btn.addEventListener("click", (event) => clicked(event));
});
restart.addEventListener("click", restart_it);
