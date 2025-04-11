// Export Email Template Script
// Run with: node scripts/export-email.js

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

// Run the export utility
require('../src/utils/export-email-template');
