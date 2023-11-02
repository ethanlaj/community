import * as XLSX from 'xlsx';

// Define the shape of each sheet object
type SheetData = {
  name: string;
  data: any[]; // replace 'any' with a more specific type if possible
};

// Update the function parameter to use the SheetData array type
const exportToExcel = (sheets: SheetData[], fileName: string): void => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Loop over the sheets array
  sheets.forEach((sheet) => {
    // Convert each sheet's data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(sheet.data);

    // Add the worksheet to the workbook with the sheet's name
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
  });

  // Write the workbook to a file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default exportToExcel;
