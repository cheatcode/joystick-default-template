import fs from 'fs/promises';

const api = {
  getters: {
    index: {
      get: async (_input = {}, context = {}) => {
        const package_json = JSON.parse(await fs.readFile('node_modules/@joystick.js/ui/package.json', 'utf-8'));

        let stars = 0;
        
        try {
          const response = await fetch(
            `https://api.github.com/repos/cheatcode/joystick`,
            { 
              signal: AbortSignal.timeout(5000) // 5 second timeout
            }
          );
          
          if (response.ok) {
            const repo = await response.json();
            stars = repo?.stargazers_count || 0;
          }
        } catch (error) {
          // Gracefully handle network errors, timeouts, etc.
          console.warn('Failed to fetch GitHub stars:', error.message);
          stars = 0;
        }

        return {
          version: package_json?.version,
          stars,
        }
      },
    },
  },
  setters: {},
};

export default api;
