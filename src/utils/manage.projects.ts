import { Command } from "@tauri-apps/api/shell";

  export const executeNode = async (path: string, scripts : Record<string, string>, executeCallback : () => void) => {
    if (!scripts || Object.keys(scripts).length === 0) {
      console.log('No hay scripts definidos en el package.json.');
      console.log('Ejecutando npm run start...');
      console.log('npm run start');
      executeCallback();
      return;
    }

    const nodeScriptNames = ['start', 'dev', 'server', 'run'];
    const nodeScript = Object.keys(scripts).find(script => {
      return nodeScriptNames.some(name => script.includes(name));
    });

    if (nodeScript) {
      const npmLaunch = new Command(
          'cmd',
          ['/c', `start npm run ${nodeScript} .`],
          { cwd: path },
      )
      try {
          console.log(`Ejecutando el script ${nodeScript}...`)
          const child = await npmLaunch.spawn();
          console.log(child);
          executeCallback();
      } catch (err) {
          console.log(err);
      } finally {
          console.log('Final')
      } 
    } else {
      console.log('No se encontró ningún script de Node.js conocido en el package.json.');
      console.log('Ejecutando npm run start...');
      executeCallback();
    }
  }

export const executeMavenOrSpring = (pathToExecute : string, executeCallback : () => void) => {

}