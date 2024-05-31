import * as XLSX from 'xlsx';
import { Client } from '../../../backend-api/v1/model/client';

// REF: https://github.com/idris-rampurawala/ng-data-export/blob/master/src/app/services/export.service.ts

export const EXCEL_EXTENSION = '.xlsx';
export const CSV_EXTENSION = '.csv';
export const CSV_TYPE = 'text/plain;charset=utf-8';

export interface ExcelJson {
  data: Array<any>;
  header?: Array<string>;
  skipHeader?: boolean;
  origin?: string | number;
}

export const exportClientListToExcel = (
  items: Client[],
  fileName: string
): any => {
  const edata: Array<ExcelJson> = [];
  const udt: ExcelJson = {
    data: [
      { A: 'User Data' }, // title
      { A: '#', B: 'First Name', C: 'Last Name', D: 'Handle' }, // table header
    ],
    skipHeader: true,
  };
  items.forEach(item => {
    udt.data.push({
      A: item.id,
      B: item.name,
      C: item.email,
      D: item.phone,
    });
  });
  edata.push(udt);

  // adding more data just to show "how we can keep on adding more data"
  const bd = {
    data: [
      // chart title
      { A: 'Some more data', B: '' },
      { A: '#', B: 'First Name', C: 'Last Name', D: 'Handle' }, // table header
    ],
    skipHeader: true,
  };
  items.forEach(item => {
    bd.data.push({
      A: String(item.id),
      B: item.name ?? '',
      C: item.email ?? '',
      D: item.phone ?? '',
    });
  });
  edata.push(bd);
  exportJsonToExcel(edata, fileName);
};

/**
 * Creates XLSX option from the Json data. Use this to customize the sheet by adding arbitrary rows and columns.
 *
 * @param json Json data to create xlsx.
 * @param fileName filename to save as.
 */
export const exportJsonToExcel = (
  json: ExcelJson[],
  fileName: string
): void => {
  // inserting first blank row
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
    json[0].data,
    getOptions(json[0])
  );

  for (let i = 1, length = json.length; i < length; i++) {
    // adding a dummy row for separation
    XLSX.utils.sheet_add_json(
      worksheet,
      [{}],
      getOptions(
        {
          data: [],
          skipHeader: true,
        },
        -1
      )
    );
    XLSX.utils.sheet_add_json(worksheet, json[i].data, getOptions(json[i], -1));
  }
  const workbook: XLSX.WorkBook = {
    Sheets: { Sheet1: worksheet },
    SheetNames: ['Sheet1'],
  };
  // save to file
  XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
};

/**
 * Creates the XLSX option from the data.
 *
 * @param json Json data to create xlsx.
 * @param origin XLSX option origin.
 * @returns options XLSX options.
 */
export const getOptions = (json: ExcelJson, origin?: number): any => {
  // adding actual data
  const options: any = {
    skipHeader: true,
    origin: -1,
    header: [],
  };
  options.skipHeader = json.skipHeader ? json.skipHeader : false;
  if (!options.skipHeader && json.header && json.header.length) {
    options.header = json.header;
  }
  if (origin) {
    options.origin = origin ? origin : -1;
  }
  return options;
};
