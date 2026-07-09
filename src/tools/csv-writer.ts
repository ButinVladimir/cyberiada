import 'reflect-metadata';
import { readFile } from 'fs/promises';
import path from 'path';
import get from 'lodash/get';
import { createObjectCsvWriter } from 'csv-writer';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type IFormatter } from '@shared/index';
import { ICsvWriterRequest, ICsvWriterTool, ISnapshot } from './interfaces';

const { lazyInject } = decorators;

export class CsvWriterTool implements ICsvWriterTool {
  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private _request: ICsvWriterRequest;

  constructor(request: ICsvWriterRequest) {
    this._request = request;
  }

  async write(): Promise<void> {
    console.log('Started writing CSV file');

    const snapshots = await this.readSnapshotsFile();
    const records = snapshots.map(this.snapshotMapper);

    await this.writeOutputFile(records);

    console.log('Finished writing');
  }

  private async readSnapshotsFile(): Promise<ISnapshot[]> {
    const inputFilePath = path.join(__dirname, '../../cli-data/snapshots', this._request.snapshotsFile);

    console.log(`Reading input from the file ${inputFilePath}`);

    const fileContent = await readFile(inputFilePath, { encoding: 'utf8' });

    return JSON.parse(fileContent) as ISnapshot[];
  }

  private async writeOutputFile(records: any[]): Promise<void> {
    const outputFilePath = path.join(__dirname, '../../cli-data/csv-output', this._request.outputFile);

    const header = [
      {
        id: 'timestamp',
        title: 'Timestamp',
      },
    ];

    for (const column of this._request.columns) {
      header.push({
        id: column.id,
        title: column.title,
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: outputFilePath,
      header: header,
    });

    await csvWriter.writeRecords(records);

    console.log(`Written records to the file ${outputFilePath}`);
  }

  private snapshotMapper = (snapshot: ISnapshot) => {
    const result: any = {
      timestamp: this._formatter.formatTimeShort(snapshot.timestamp),
    };

    for (const column of this._request.columns) {
      result[column.id] = get(snapshot.state, column.value);
    }

    return result;
  };
}
