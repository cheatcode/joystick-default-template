import joystick from "@joystick.js/ui-canary";
import Button from "../../components/button/index.js";
import format_iso_to_human_readable from "../../../lib/format_iso_to_human_readable.js";
import supported_languages from "../../../lib/supported_languages.js";

const Index = joystick.component({
  test: {
    name: 'index_page',
  },
  data: async (api = {}) => {
    return {
      index: await api.get('index'),
    };
  },
  state: {
    websockets_connected: false,
  },
  websockets: (instance = {}) => {
    return {
      clock: {
        options: {
          logging: true,
          auto_reconnect: true,
        },
        events: {
          on_open: (connection = {}) => {
            instance.set_state({ websockets_connected: true }, () => {
              console.log('Connection to clock opened!');
            });
          },
          on_message: (message = {}) => {
            if (message?.timestamp) {
              instance.set_state({ timestamp: message?.timestamp });
            }
          },
          on_close: (code = 0, reason = '', connection = {}) => {
            instance.set_state({ websockets_connected: false }, () => {
              console.log('Connection to clock closed.', { code, reason });
            });
          },
        },
      },
    };
  },
  css: {
    min: {
      width: {
        0: `
          .index-page {
            padding: 20px 0;
          }

          .index-page > .directory > header {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          }

          .index-page > .directory > header > img {
            width: auto;
            height: 27px;
          }

          .index-page > .directory > header > p {
            margin-left: auto;
            color: var(--mod-neutral-a);
          }

          .index-page > .directory > footer {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }

          .index-page > .directory > footer p {
            color: var(--mod-neutral-8);
          }

          .index-page > .directory > footer ul {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .index-page > .directory > footer ul li a {
            text-decoration: none;
            color: var(--mod-neutral-b);
          }

          .index-page > .directory > footer ul li a:hover {
            color: var(--mod-brand);
          }
  
          .index-page > .directory > footer ul li.language {
            font-size: 22px;
            cursor: pointer;
          }

          .index-page > .directory > footer ul li.language:nth-child(2) {
            margin-right: 10px;
          }
        `,
        740: `
          .index-page > .directory {
            min-width: 650px;
            max-width: 650px;
            margin: 40px auto;
          }        
        `,
        1040: `
          .index-page > .directory {
            margin: 80px auto;
          }        
        `,
      }
    }
  },
  events: {
    'change [name="theme"]': (event = {}, instance = {}) => {
      event.preventDefault();
      instance.cookies.set('theme', instance?.props?.theme === 'light' ? 'dark' : 'light');
      location.href = location.href.split('?')[0] + '?t=' + Date.now();
    },
    'change [name="language"]': (event = {}, instance = {}) => {
      event.preventDefault();
      const language = event.target.value;
      instance.cookies.set('language', language);
      location.href = location.href.split('?')[0] + '?t=' + Date.now();
    },
  },
  render: ({ props, html, data, component, state, i18n, user, language, each }) => {
    return html`
      <div class="index-page">
        <div class="directory">
          <header>
            <img src="/joystick_logo_${props?.theme}.svg" alt="Joystick" />
            <p>v${data?.index?.version}</p>
          </header>
          <div class="mod-panel-group">
            <div class="mod-panel">
              <div class="mod-panel-center">
                <p class="mod-panel-title">${i18n('panels.star_on_github.title')}</p>
                <p class="mod-panel-subtitle">${i18n('panels.star_on_github.subtitle', { stars: data?.index?.stars })}</p>
              </div>
              <div class="mod-panel-right">
                ${component(Button, {
                  theme: 'brand',
                  classes: 'mod-button-icon-prefixed',
                  href: 'https://github.com/cheatcode/joystick',
                  target: '_blank',
                  label: i18n('panels.star_on_github.button'),
                })}
              </div>
            </div>
            <div class="mod-panel">
              <div class="mod-panel-center">
                <p class="mod-panel-title">${i18n('panels.documentation.title')}</p>
                <p class="mod-panel-subtitle">${i18n('panels.documentation.subtitle')}</p>
              </div>
              <div class="mod-panel-right">
                ${component(Button, {
                  theme: 'brand',
                  href: 'https://docs.cheatcode.co/joystick',
                  target: '_blank',
                  classes: 'mod-button-icon-prefixed',
                  label: i18n('panels.documentation.button'),
                })}
              </div>
            </div>
            <div class="mod-panel">
              <div class="mod-panel-center">
                <p class="mod-panel-title">${i18n('panels.community.title')}</p>
                <p class="mod-panel-subtitle">${i18n('panels.community.subtitle')}</p>
              </div>
              <div class="mod-panel-right">
                ${component(Button, {
                  theme: 'brand',
                  href: 'http://discord.cheatcode.co',
                  target: '_blank',
                  classes: 'mod-button-icon-prefixed',
                  label: i18n('panels.community.button'),
                })}
              </div>
            </div>
            <div class="mod-panel">
              <div class="mod-panel-center">
                <p class="mod-panel-title">${i18n('panels.language.title')}</p>
                <p class="mod-panel-subtitle">${i18n('panels.language.subtitle')}</p>
              </div>
              <div class="mod-panel-right">
                <div class="mod-select-input">
                  <select class="mod-input" name="language" value="${language}">
                    ${each(supported_languages, (supported_language) => {
                      return `<option ${language === supported_language.code ? 'selected="true"' : ''} value="${supported_language.code}">${supported_language.name}</option>`;
                    })}
                  </select>
                  <i class="mod-icon-chevron-down"></i>
                </div>
              </div>
            </div>
            <div class="mod-panel">
              <div class="mod-panel-center">
                <p class="mod-panel-title">${i18n(props?.theme === 'light' ? 'panels.dark_mode.title_on' : 'panels.dark_mode.title_off')}</p>
                <p class="mod-panel-subtitle">${i18n(props?.theme === 'light' ? 'panels.dark_mode.subtitle_on' : 'panels.dark_mode.subtitle_off')}</p>
              </div>
              <div class="mod-panel-right">
                <div class="mod-toggle-switch">
                  <input type="checkbox" name="theme" ${props?.theme === 'dark' ? 'checked="true"' : ''} />
                  <div class="mod-toggle-switch-handle"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mod-alert mod-alert-${state?.websockets_connected ? 'success' : 'warning'} mod-margin-top-20">
            <i class="mod-icon-cloud-lightning"></i>
            <header>
              <h5>${state?.websockets_connected ? i18n('websockets.connected', { timestamp: format_iso_to_human_readable(state?.timestamp || '') }) : i18n('websockets.disconnected')}</h5>
            </header>
          </div>
          <footer>
            <p>${i18n('footer.copyright', { year: new Date().getFullYear() })}</p>
            <ul>
              <li><a href="https://linkedin.com/company/cheatcodeco"><i class="mod-icon-brand-linkedin"></i></a></li>
              <li><a href="https://youtube.com/@cheatcodeco"><i class="mod-icon-brand-youtube"></i></a></li>
            </ul>
          </footer>
        </div>
      </div>
    `;
  },
});

export default Index;
