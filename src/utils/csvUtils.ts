
/**
 * CSV Utility Functions
 * 
 * Provides utilities for converting data to CSV format and handling CSV file downloads
 * - Handles special characters and escaping in CSV
 * - Supports custom column mapping and headers
 * - Provides proper file download with UTF-8 BOM for Excel compatibility
 */

/**
 * Convert data to CSV string format
 * @param data Array of objects to convert
 * @param columns Optional mapping of columns to include and their display names
 * @returns CSV formatted string
 */
export const convertToCSV = <T extends Record<string, any>>(
  data: T[],
  columns?: Record<keyof T, string>
): string => {
  if (!data || data.length === 0) return '';

  // Determine columns to include
  const keys = columns 
    ? Object.keys(columns) as Array<keyof T>
    : Object.keys(data[0]) as Array<keyof T>;
  
  // Create header row
  const headers = columns
    ? keys.map(key => columns[key])
    : keys.map(key => String(key));
  
  // Process data rows
  const rows = data.map(item => {
    return keys.map(key => {
      const value = item[key];
      let cellValue = value === null || value === undefined ? '' : String(value);
      
      // Escape quotes in cell values and wrap in quotes if necessary
      if (cellValue.includes(',') || cellValue.includes('"') || cellValue.includes('\n')) {
        cellValue = cellValue.replace(/"/g, '""');
        cellValue = `"${cellValue}"`;
      }
      
      return cellValue;
    }).join(',');
  });
  
  // Combine header and data rows
  return [headers.join(','), ...rows].join('\n');
};

/**
 * Download data as a CSV file
 * @param data Array of objects to download
 * @param filename Filename for the downloaded CSV
 * @param columns Optional mapping of columns to include and their display names
 */
export const downloadCSV = <T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: Record<keyof T, string>
): void => {
  const csvContent = convertToCSV(data, columns);
  
  // Add UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.csv');
  link.style.visibility = 'hidden';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
};
