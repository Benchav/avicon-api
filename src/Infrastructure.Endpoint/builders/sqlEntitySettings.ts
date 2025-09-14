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
  name: string; //name of the column in sql database
  domainName: string; //name of the column in project code
  //parameterName: string; //name to use like parameter with @ like @name
  isPrimaryKey: boolean;
  public get parameterName(): string {
    return `@${this.name}`;
  }

  constructor(name:string, domainName:string, parameterName:string, isPrimaryKey:boolean){
    this.name=name;
    this.domainName=domainName;
    //this.parameterName=parameterName;
    this.isPrimaryKey=isPrimaryKey;
  }
}
