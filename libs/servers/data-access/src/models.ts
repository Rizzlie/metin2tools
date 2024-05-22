export interface Server {
  name: string;
  slug: string;
  type: string;
}

export interface ServerItems {
  [serverSlug: string]: {
    [id: string]: Omit<ServerItem, 'serverSlug'>;
  };
}

export interface ServerItem {
  id: string;
  name: string;
  serverSlug: string;
  price: number;
}

export interface ServersState {
  servers: Server[];
  serverItems: ServerItems;
}
