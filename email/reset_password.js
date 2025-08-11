import ui from '@joystick.js/ui-canary';

const ResetPassword = ui.component({
  render: ({ props }) => {
    return `
      <p>To reset your password, please visit the link below. If you did not request a password reset, you can ignore this.</p>
      <p><a href="${props?.url}">Reset Password</a></p>
    `;
  },
});

export default ResetPassword;