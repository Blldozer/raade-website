
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadCSV } from '@/utils/csvUtils';

/**
 * Props for the CSVExportButton component
 */
interface CSVExportButtonProps<T extends Record<string, any>> {
  /**
   * Data to be exported as CSV
   */
  data: T[];
  
  /**
   * Filename for the downloaded CSV (without extension)
   */
  filename: string;
  
  /**
   * Optional mapping of data field names to display names for CSV headers
   */
  columns?: Record<keyof T, string>;
  
  /**
   * Custom button text
   */
  buttonText?: string;
  
  /**
   * Additional CSS classes for the button
   */
  className?: string;
  
  /**
   * Disable the button when no data is available or during loading
   */
  disabled?: boolean;
}

/**
 * CSV Export Button Component
 * 
 * Provides a button to export data as a CSV file.
 * Handles the download process and disabled state.
 */
const CSVExportButton = <T extends Record<string, any>>({
  data,
  filename,
  columns,
  buttonText = "Export to CSV",
  className = "",
  disabled = false,
}: CSVExportButtonProps<T>) => {
  
  /**
   * Handle the export button click
   * Prevents export if disabled or no data
   */
  const handleExport = () => {
    if (disabled || !data.length) return;
    
    // Add timestamp to filename for uniqueness
    const timestampedFilename = `${filename}_${new Date().toISOString().slice(0,10)}`;
    downloadCSV(data, timestampedFilename, columns);
  };
  
  return (
    <Button 
      onClick={handleExport}
      disabled={disabled || data.length === 0}
      className={`flex items-center gap-2 ${className}`}
      variant="outline"
    >
      <Download className="h-4 w-4" />
      <span>{buttonText}</span>
    </Button>
  );
};

export default CSVExportButton;
