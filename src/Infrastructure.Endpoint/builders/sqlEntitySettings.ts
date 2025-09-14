export class SqlEntitySettings {
  tableName: string;
  columns: SqlColumnSettings[];
  schema?: string | undefined;
  constructor(
    tableName: string,
    columns: SqlColumnSettings[],
    schema?: string
  ) {
    this.tableName = tableName;
    this.columns = columns;
    this.schema = schema;
  }
}

export class SqlColumnSettings {
  name: string;
  domainName: string;
  parameterName: string;
  isPrimaryKey: boolean;

  constructor(name:string, domainName:string, parameterName:string, isPrimaryKey:boolean){
    this.name=name;
    this.domainName=domainName;
    this.parameterName=parameterName;
    this.isPrimaryKey=isPrimaryKey;
  }
}
