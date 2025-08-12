const sw_KE = {
  'ui/pages/index/index.js': {
    panels: {
      star_on_github: {
        title: 'Toa Nyota kwenye GitHub',
        subtitle: 'Jiunge na {{stars}} wengine kupata masasisho ya hivi karibuni.',
        button: '<i class="mod-icon-brand-github"></i> Toa Nyota kwenye GitHub'
      },
      documentation: {
        title: 'Nyaraka',
        subtitle: 'Njia bora ya kujifunza na kuzoea Joystick.',
        button: '<i class="mod-icon-book"></i> Tembelea Nyaraka'
      },
      community: {
        title: 'Jiunge na Jumuiya',
        subtitle: 'Kutana na wasanidi wengine wa Joystick na kupata msaada.',
        button: '<i class="mod-icon-brand-discord"></i> Jiunge Nasi'
      },
      dark_mode: {
        title_on: 'Washa Hali ya Giza',
        title_off: 'Zima Hali ya Giza',
        subtitle_on: 'Washa hali ya giza katika programu hii.',
        subtitle_off: 'Zima hali ya giza katika programu hii.'
      },
      language: {
        title: 'Lugha',
        subtitle: 'Weka mapendeleo yako ya lugha.'
      }
    },
    websockets: {
      connected: 'WebSockets zimeunganishwa ({{timestamp}})',
      disconnected: 'WebSockets hazijaungana'
    },
    footer: {
      copyright: '© {{year}} CheatCode Software LLC'
    }
  },
  'ui/pages/not_found/index.js': {
    title: '404: Ukurasa Haujapatikana',
    subtitle: 'Tafadhali angalia URL na ujaribu tena.',
    button: '<i class="mod-icon-arrow-left"></i> Rudi Nyuma'
  },
};

export default sw_KE;
