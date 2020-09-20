let students = [];

// Students

function defaultStudents() {
  return [
    {
      index: "2017/0047",
      name: "Mateja Ivanovic",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
    {
      index: "2017/1234",
      name: "Pera Peric",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
    {
      index: "2017/0001",
      name: "Moma Momic",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
    {
      index: "2017/0002",
      name: "Nina Ninic",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
    {
      index: "2017/0003",
      name: "Toma Tomic",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
    {
      index: "2017/0004",
      name: "Ana Anic",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
    {
      index: "2017/0005",
      name: "Mita Mitic",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
    {
      index: "2017/0006",
      name: "Mona Monic",
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
    },
  ];
}

function studentHtml({ index, name, h1, h2, h3, h4 }) {
  return `
  <div class="data-item">
    <div class="row">
      <div class="index">${index} </div>
      <div class="name">${name}</div>
    </div>
    <div class="more">
      <div class="homework">
        Domaci 1
        <div>
          <input type="text" value="${h1}" disabled />
          <i class="fas fa-pen"></i>
        </div>
      </div>
      <div class="homework">
        Domaci 2
        <div>
          <input type="text" value="${h2}" disabled />
          <i class="fas fa-pen"></i>
        </div>
      </div>
      <div class="homework">
        Domaci 3
        <div>
          <input type="text" value="${h3}" disabled />
          <i class="fas fa-pen"></i>
        </div>
      </div>
      <div class="homework">
        Domaci 4
        <div>
          <input type="text" value="${h4}" disabled />
          <i class="fas fa-pen"></i>
        </div>
      </div>
    </div>
  </div>
  `;
}

function loadStudents() {
  if (!localStorage.getItem("students")) {
    students = defaultStudents();
    localStorage.setItem("students", JSON.stringify(students));
  } else {
    students = JSON.parse(localStorage.getItem("students"));
  }
}

function showStudents(dataBox) {
  dataBox.innerHTML = "";

  loadStudents();

  students.forEach((student) => {
    const newEl = document.createElement("div");
    dataBox.appendChild(newEl);
    newEl.outerHTML = studentHtml(student);
  });

  addStudentsListeners();
}

function addStudentsListeners() {
  document.querySelectorAll(".row").forEach((row) => {
    $(row.nextElementSibling).slideToggle(0);

    row.addEventListener("click", (e) => {
      const hiddenBox = e.target.nextElementSibling;

      $(hiddenBox).slideToggle(400);
    });
  });

  document.querySelectorAll(".homework").forEach((homework) => {
    homework.addEventListener("click", (e) => {
      const pen = homework.lastElementChild.lastElementChild;
      const input = homework.lastElementChild.firstElementChild;

      if (input.disabled) {
        input.disabled = false;
        input.focus();
        const text = input.value;
        input.value = "";
        if (text != 0) {
          input.value = text;
        }

        pen.classList.toggle("red-pen");
      }
    });
  });

  document.querySelectorAll(".homework input").forEach((input) => {
    input.addEventListener("focusout", (e) => {
      focusOut(e);
    });

    input.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        e.target.blur();
      }
    });
  });

  function focusOut(e) {
    const thatInput = e.target;
    const pen = thatInput.nextElementSibling;
    thatInput.disabled = true;
    if (thatInput.value == "") {
      thatInput.value = "0";
    }
    pen.classList.remove("red-pen");

    updateData();
  }
}

function updateData() {
  let values = [];
  document.querySelectorAll(".homework input").forEach((input) => {
    values.push(input.value);
  });

  let x = 0;

  students.forEach((student) => {
    student.h1 = values[x++];
    student.h2 = values[x++];
    student.h3 = values[x++];
    student.h4 = values[x++];
  });

  localStorage.setItem("students", JSON.stringify(students));
}

// Export

export { showStudents, updateData };
