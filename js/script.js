const userRight = document.querySelector("#user-right");
const userLeft = document.querySelector("#user-left");

const subjectRight = document.querySelector("#card-right");
const subjectLeft = document.querySelector("#card-left");

const divSubject = document.querySelector(".card-subject");
const divInfo = document.querySelector(".info");

const inputSubject = document.querySelector("#input-subject");
const inputScore = document.querySelector("input-score");
const form = document.querySelector("form");

var ArryUser = [];
var ArrySubjects = [];
var ArrySubjectsScore = [];

var usersData = [];

var indexUsers = 0;
var sizeDataUsers = 0;

var indexUsersSubjects = 0; 
var sizeDataSubjects = 0;

fetch("./data/data.json")
  .then((data) => data.json())
  .then((data) => {
    usersData = data;
    sizeDataUsers = data.length - 1;
    getUser();
  });

const resetArray = () => {
  ArryUser = [];
  ArrySubjects = [];
  ArrySubjectsScore = [];
};

userRight.addEventListener("click", () => {
  if (indexUsers < sizeDataUsers) {
    indexUsers++;
    getUser();
  }
});
userLeft.addEventListener("click", () => {
  if (indexUsers != 0) {
    indexUsers--;
    getUser();
  }
});

const getUser = () => {
  const user = usersData[indexUsers];

  const name = user.name;
  const id = user.id;
  const subjects = user.subjects;

  resetArray();

  ArryUser.push(name, id);
  ArrySubjects.push(id, subjects);

  sizeDataSubjects = ArrySubjects.length;

  pushDataUser();
  PushSubjectsUser();
};

subjectRight.addEventListener("click", () => {
  if (indexUsersSubjects < sizeDataSubjects) {
    indexUsersSubjects++;
    PushSubjectsUser();
  }
});
subjectLeft.addEventListener("click", () => {
  if (indexUsersSubjects != 0) {
    indexUsersSubjects--;
    PushSubjectsUser();
  }
});

const PushSubjectsUser = () => {
  const id = ArrySubjects[0];
  const subjects = ArrySubjects[1][indexUsersSubjects]; //index

  inputSubject.value = subjects.name;

  const div = document.createElement("div");

  const name = document.createElement("p");
  name.innerText = `Materia: ${subjects.name}`;

  const teacher = document.createElement("p");
  teacher.innerText = `Maestro: ${subjects.teacher}`;

  div.appendChild(name);
  div.appendChild(teacher);

  ArrySubjectsScore = subjects.tasks;

  for (i in ArrySubjectsScore) {
    const task = document.createElement("p");
    const score = ArrySubjectsScore[i].score;
    task.innerText = `Score: ${score}`;
    if (score <= 50) {
      task.style.color = "red";
    }

    div.appendChild(task);
  }

  divSubject.innerHTML = "";
  divSubject.appendChild(div);
};

const pushDataUser = () => {
  const div = document.createElement("div");
  const userName = document.createElement("h1");
  const userId = document.createElement("h2");

  userName.innerText = ArryUser[0];
  userId.innerText = ArryUser[1];

  div.appendChild(userName);
  div.appendChild(userId);

  divInfo.innerHTML = "";
  divInfo.appendChild(div);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const addScore = () => {
  const score = inputScore.value;
  ArrySubjectsScore.push(score);
  PushSubjectsUser();
};
