interface CreateGulpTasksConfig {
  serverDir: string;
  buildFolder: string;
  buildJsp?: string;
}

export default function createGulpTasks(config: CreateGulpTasksConfig): void;
