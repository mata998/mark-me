// Teachers
let teachers = [];

function defaultTeachers() {
  return [
    {
      index: "2017/0047",
      name: "Mateja Ivanovic",
      username: "mata998",
      password: "lozinka123",
      date: "23.11.2020.",
    },
    {
      index: "2017/0047",
      name: "Tea Teic",
      username: "tea998",
      password: "lozinka123",
      date: "23.11.2020.",
    },
    {
      index: "2017/0047",
      name: "Neko Nekic",
      username: "neko",
      password: "lozinka123",
      date: "23.11.2020.",
    },
    {
      index: "2017/0047",
      name: "Laza Lazic",
      username: "mata998",
      password: "lozinka123",
      date: "23.11.2020.",
    },
    {
      index: "2017/0047",
      name: "Laza Lazic",
      username: "mata998",
      password: "lozinka123",
      date: "23.11.2020.",
    },
    {
      index: "2017/0047",
      name: "Laza Lazic",
      username: "mata998",
      password: "lozinka123",
      date: "23.11.2020.",
    },
    {
      index: "2017/0047",
      name: "Laza Lazic",
      username: "mata998",
      password: "lozinka123",
      date: "23.11.2020.",
    },
    {
      index: "2017/1111",
      name: "Admin Admin",
      username: "admin",
      password: "admin",
      date: "23.11.2020.",
    },
  ];
}

function teacherHtml({ index, name, username, date }) {
  return `
    <div class="data-item">
        <div class="row">
            <div class="index">${index} </div>
            <div class="name">${name}</div>
        </div>
        <div class="more ">
            <div class="homework no-pointer"> Username: ${username} </div>
            <div class="homework no-pointer"> Zapoceo rad: ${date} </div>
        </div>
    </div>
    `;
}

function loadTeachers() {
  if (!localStorage.getItem("teachers")) {
    teachers = defaultTeachers();
    localStorage.setItem("teachers", JSON.stringify(teachers));
  } else {
    teachers = JSON.parse(localStorage.getItem("teachers"));
  }
}

function showTeachers(dataBox) {
  dataBox.innerHTML = "";

  loadTeachers();

  teachers.forEach((teacher) => {
    const newEl = document.createElement("div");
    dataBox.appendChild(newEl);
    newEl.outerHTML = teacherHtml(teacher);
  });

  addTeachersListeners();
}

function addTeachersListeners() {
  document.querySelectorAll(".row").forEach((row) => {
    $(row.nextElementSibling).slideToggle(0);

    row.addEventListener("click", (e) => {
      const hiddenBox = e.target.nextElementSibling;

      $(hiddenBox).slideToggle(400);
    });
  });
}

function validateLogin(username, password) {
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].username == username && teachers[i].password == password) {
      return true;
    }
  }

  return false;
}

export { showTeachers, validateLogin, loadTeachers };
