import joystick from "@joystick.js/ui";

const App = joystick.component({
  render: ({ props, component }) => {
    return `
      <div class="app-layout">
        <div class="mod-container">
          ${component(props.page, props)}
        </div>
      </div>
    `;
  },
});

export default App;
