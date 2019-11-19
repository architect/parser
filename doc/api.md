```typescript

interface ArcFile {
  app: array;
  aws: array;
  macros?: string[];
  cdn?: array;
  static?: Static;
  http?: HTTP;
  ws?: WS;
  events?: Events;
  queues?: Queues;
  scheduled?: Scheduled;
  tables?: Tables;
  indexes?: Indexes;
}

// [['fingerprint', true], ['folder', 'dist']]
interface Static extends Tuple

// [['get', '/'], ['post', '/login']]
interface HTTP {
  [index: number]: Route;
}

// ['get', '/']
interface Route {
  [index: number]: string;
  length: number = 2;
}

// ['action', 'join']
interface WS {
  [index: number]: string;
}

interface Events {
  [index: number]: string;
}

interface Queues {
  [index: number]: string;
}

interface Scheduled {
  [index: number]: string;
}

interface Tables {
  [index: number]: Table;
}

interface Indexes {
  [index: number]: Table;
}

// {'my-table-name': {key: 'value', secondKey: true}}
interface Table {
  [index: string]: object;
}

// [['foo', 'bar'], ['foo', 'buz']]
interface Tuple {
  [index: number]: Vector;
}

// ['fingerprint', true]
interface Vector {
  [index: number]: number | string | boolean;
}
```

# `parse(text: string) => object`

indiscriminate plaintext arc parsed into plain javascript object

# `parse.architect(arc: string) => object`

validates OpenJS Architect expected schema

# `parse.json(json: string) => object`

accepts json but otherwise an alias for `parse.architect` 

# `parse.yaml(yaml: string) => object`

accepts yaml but otherwise an alias for `parse.architect` 

# `parse.stringify(source: arcfile) => string`

stringify an arcfile instance
