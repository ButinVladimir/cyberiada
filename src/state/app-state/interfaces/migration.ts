export interface IMigration {
  migrate(parsedSaveData: any): any;
}
