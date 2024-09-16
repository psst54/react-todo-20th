function App() {
  const STATE_LIST = [
    { title: 'Open', id: 'open' },
    { title: 'In Progress', id: 'in-progress' },
    { title: 'Done', id: 'done' },
  ];

  return (
    <div className="wrapper">
      <div className="container">
        <header>
          <h1>Header</h1>
        </header>
        <main className="kanban-board">
          {STATE_LIST.map((state) => (
            <section className="kanban-board-column" id={`${state.id}-column`}>
              <h2>{state.title}</h2>
              <hr className={`${state.id}-hr`} />
              <ul class="subject-list" id={`${state.id}-subject-list`}></ul>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
