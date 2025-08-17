import joystick from "@joystick.js/ui";

const Button = joystick.component({
  render: ({ props, when }) => {
    return `
      ${when(
        props?.href,
        `<a href="${props.href}" class="mod-button ${props.theme ? `mod-button-${props?.theme}` : ''} ${
          props.classes || ''
        }" target="${props.target || "_self"}">${props.label || ''}</a>`
      )}
      ${when(
        !props?.href,
        `<button class="mod-button ${props.theme ? `mod-button-${props?.theme}` : ''} ${props.classes || ''}">${props.label || ''}</button>`
      )}
    `;
  },
});

export default Button;
