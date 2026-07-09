export interface ICsvWriterRequest {
  snapshotsFile: string;
  outputFile: string;
  columns: {
    id: string;
    title: string;
    value: string;
  }[];
}
