import fs from 'fs/promises';

const api = {
  getters: {
    index: {
      get: async (_input = {}, context = {}) => {
        const package_json = JSON.parse(await fs.readFile('node_modules/@joystick.js/ui-canary/package.json', 'utf-8'));

        return {
          version: package_json?.version,
          stars: await fetch(
            `https://api.github.com/repos/cheatcode/joystick`
          ).then(async (response) => {
            const repo = await response.json();
            return repo?.stargazers_count;
          }),
        }
      },
    },
  },
  setters: {},
};

export default api;