use to_do_list;
db.dropDatabase();

db.tasks.insertMany([
  {
    task: "finish lab",
    complete: false,
  },
  {
    task: "show index in browser",
    complete: true,
  },
  {
    task: "graduate",
    complete: false,
  }
]);
