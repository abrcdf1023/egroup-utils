interface CreateGulpTasksConfig {
  serverDir: string;
  buildFolder: string;
  indexPath?: string;
}

export default function createGulpTasks(config: CreateGulpTasksConfig): void;
