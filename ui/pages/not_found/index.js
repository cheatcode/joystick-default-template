import joystick from "@joystick.js/ui-canary";

const NotFound = joystick.component({
  css: {
    min: {
      width: {
        0: `
          .mod-blank-state-dashed {
            max-width: 500px;
            margin: 40px auto;
            border: none;
          }
        `,
      },
    },
  },
  events: {
    'click .go-back': (event = {}) => {
      history.back();
    },
  },
  render: ({ i18n, props }) => {
    return `
      <div class="not-found-page">
        <div class="mod-blank-state-dashed">
          <div class="mod-blank-state-dashed-icon">
            <i class="mod-icon-server-crash"></i>
          </div>
          <h2 class="mod-blank-state-dashed-title">${i18n('title')}</h2>
          <p class="mod-blank-state-dashed-subtitle">${i18n('subtitle')}</p>
          <div class="mod-blank-state-dashed-actions">
            <button class="mod-button mod-button-brand mod-button-icon-prefixed go-back">${i18n('button')}</button>
          </div>
        </div>        
      </div>
    `;
  },
});

export default NotFound;
