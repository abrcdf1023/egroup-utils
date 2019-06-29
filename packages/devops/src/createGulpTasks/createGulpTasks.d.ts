interface CreateGulpTasksConfig {
  serverDir: string;
  buildJsp: string;
  buildFolder: string;
}

export default function createGulpTasks(config: CreateGulpTasksConfig): void;
