import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { creatorsAPI, ticketsAPI, campaignsAPI, eventsAPI } from './api';

// Data type configurations with validation rules
export const dataTypeConfigs = {
  creators: {
    name: 'Creators',
    apiEndpoint: 'creators',
    validationRules: [
      { field: 'username', required: true, type: 'string', minLength: 1, maxLength: 50 },
      { field: 'email', required: true, type: 'email' },
      { field: 'tikTokId', required: true, type: 'string', pattern: /^@[a-zA-Z0-9._]+$/ },
      { field: 'phone', required: true, type: 'string', pattern: /^\+?[\d\s-()]+$/ },
      { field: 'followers', required: true, type: 'number' },
      { field: 'diamonds', required: true, type: 'number' },
      { field: 'category', required: true, type: 'string' },
      { field: 'manager', required: true, type: 'string' },
      { field: 'agency', required: true, type: 'string' }
    ],
    transformers: {
      email: (value) => value.toLowerCase().trim(),
      tikTokId: (value) => value.startsWith('@') ? value : `@${value}`,
      followers: (value) => parseInt(value) || 0,
      diamonds: (value) => parseInt(value) || 0
    }
  },
  managers: {
    name: 'Managers',
    apiEndpoint: 'managers',
    validationRules: [
      { field: 'username', required: true, type: 'string', minLength: 1, maxLength: 50 },
      { field: 'email', required: true, type: 'email' },
      { field: 'role', required: true, type: 'string' },
      { field: 'phone', required: true, type: 'string' },
      { field: 'department', required: true, type: 'string' },
      { field: 'hire_date', required: true, type: 'date' }
    ],
    transformers: {
      email: (value) => value.toLowerCase().trim(),
      role: (value) => value.toLowerCase()
    }
  },
  events: {
    name: 'Events',
    apiEndpoint: 'events',
    validationRules: [
      { field: 'title', required: true, type: 'string', minLength: 1, maxLength: 200 },
      { field: 'start_date', required: true, type: 'date' },
      { field: 'end_date', required: true, type: 'date' },
      { field: 'description', required: true, type: 'string', maxLength: 1000 },
      { field: 'location', required: true, type: 'string' },
      { field: 'max_participants', required: true, type: 'number' },
      { field: 'category', required: true, type: 'string' }
    ],
    transformers: {
      max_participants: (value) => parseInt(value) || null
    }
  },
  campaigns: {
    name: 'Campaigns',
    apiEndpoint: 'campaigns',
    validationRules: [
      { field: 'title', required: true, type: 'string', minLength: 1, maxLength: 200 },
      { field: 'start_date', required: true, type: 'date' },
      { field: 'end_date', required: true, type: 'date' },
      { field: 'description', required: true, type: 'string', maxLength: 1000 },
      { field: 'objectives', required: true, type: 'string' },
      { field: 'bonus', required: true, type: 'number' },
      { field: 'creator_ids', required: true, type: 'array' }
    ],
    transformers: {
      bonus: (value) => parseFloat(value) || 0,
      creator_ids: (value) => {
        if (typeof value === 'string') {
          return value.split(',').map(id => id.trim()).filter(id => id);
        }
        return Array.isArray(value) ? value : [];
      }
    }
  },
  tickets: {
    name: 'Support Tickets',
    apiEndpoint: 'tickets',
    validationRules: [
      { field: 'title', required: true, type: 'string', minLength: 1, maxLength: 200 },
      { field: 'description', required: true, type: 'string', minLength: 1, maxLength: 2000 },
      { field: 'creator_id', required: true, type: 'string' },
      { field: 'category', required: true, type: 'string' },
      { field: 'priority', required: true, type: 'string' },
      { field: 'status', required: true, type: 'string' },
      { field: 'manager_id', required: true, type: 'string' }
    ],
    transformers: {
      priority: (value) => value?.toLowerCase() || 'medium',
      status: (value) => value?.toLowerCase() || 'open',
      category: (value) => value?.toLowerCase() || 'general'
    },
    relationships: {
      creator_id: 'creators',
      manager_id: 'managers'
    }
  },
  companies: {
    name: 'Companies',
    apiEndpoint: 'companies',
    validationRules: [
      { field: 'name', required: true, type: 'string', minLength: 1, maxLength: 200 },
      { field: 'email', required: true, type: 'email' },
      { field: 'phone', required: true, type: 'string' },
      { field: 'address', required: true, type: 'string' },
      { field: 'website', required: true, type: 'string' },
      { field: 'industry', required: true, type: 'string' }
    ],
    transformers: {
      email: (value) => value.toLowerCase().trim(),
      website: (value) => {
        if (value && !value.startsWith('http')) {
          return `https://${value}`;
        }
        return value;
      }
    }
  },
  users: {
    name: 'Users',
    apiEndpoint: 'users',
    validationRules: [
      { field: 'username', required: true, type: 'string', minLength: 1, maxLength: 50 },
      { field: 'email', required: true, type: 'email' },
      { field: 'password', required: true, type: 'string', minLength: 6 },
      { field: 'role', required: true, type: 'string' },
      { field: 'first_name', required: true, type: 'string' },
      { field: 'last_name', required: true, type: 'string' },
      { field: 'phone', required: true, type: 'string' },
      { field: 'active', required: true, type: 'boolean' }
    ],
    transformers: {
      email: (value) => value.toLowerCase().trim(),
      role: (value) => value.toLowerCase(),
      active: (value) => {
        if (typeof value === 'boolean') return value;
        return ['true', '1', 'yes', 'on', 'active'].includes(String(value).toLowerCase());
      }
    }
  }
};

// --- Utility Functions ---

// Parse CSV file
async function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => reject(error)
    });
  });
}

// Parse Excel file
async function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

// Validate single value
function validateValue(value, rule) {
  if (rule.required && (value === null || value === undefined || value === '')) {
    return { isValid: false, error: `${rule.field} is required` };
  }
  if (!rule.required && (value === null || value === undefined || value === '')) {
    return { isValid: true };
  }
  switch (rule.type) {
    case 'string':
      if (typeof value !== 'string') {
        return { isValid: false, error: `${rule.field} must be a string` };
      }
      if (rule.minLength && value.length < rule.minLength) {
        return { isValid: false, error: `${rule.field} must be at least ${rule.minLength} characters` };
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return { isValid: false, error: `${rule.field} must be no more than ${rule.maxLength} characters` };
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return { isValid: false, error: `${rule.field} format is invalid` };
      }
      break;
    case 'number':
      const num = Number(value);
      if (isNaN(num)) {
        return { isValid: false, error: `${rule.field} must be a valid number` };
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { isValid: false, error: `${rule.field} must be a valid email address` };
      }
      break;
    case 'date':
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { isValid: false, error: `${rule.field} must be a valid date` };
      }
      break;
    case 'boolean':
      if (typeof value !== 'boolean' && !['true', 'false', '1', '0', 'yes', 'no'].includes(String(value).toLowerCase())) {
        return { isValid: false, error: `${rule.field} must be a boolean value` };
      }
      break;
    case 'array':
      if (!Array.isArray(value) && typeof value !== 'string') {
        return { isValid: false, error: `${rule.field} must be an array or comma-separated string` };
      }
      break;
  }
  if (rule.customValidator && !rule.customValidator(value)) {
    return { isValid: false, error: `${rule.field} failed custom validation` };
  }
  return { isValid: true };
}

// Transform value according to data type config
function transformValue(value, field, config) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (config.transformers && config.transformers[field]) {
    return config.transformers[field](value);
  }
  return value;
}

// Validate and transform data
async function validateAndTransformData(data, dataType) {
  const config = dataTypeConfigs[dataType];
  if (!config) {
    throw new Error(`Unknown data type: ${dataType}`);
  }

  const result = {
    success: false,
    totalRows: data.length,
    successfulImports: 0,
    failedImports: 0,
    errors: [],
    warnings: [],
    data: []
  };

  const processedData = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const processedRow = {};
    let hasErrors = false;

    for (const rule of config.validationRules) {
      const value = row[rule.field];
      const validation = validateValue(value, rule);
      if (!validation.isValid) {
        result.errors.push({
          row: i + 1,
          field: rule.field,
          error: validation.error,
          value
        });
        hasErrors = true;
        continue;
      }
      const transformedValue = transformValue(value, rule.field, config);
      if (transformedValue !== null) {
        processedRow[rule.field] = transformedValue;
      }
    }

    for (const [key, value] of Object.entries(row)) {
      if (!config.validationRules.find(rule => rule.field === key) && value !== null && value !== '') {
        processedRow[key] = value;
        result.warnings.push({
          row: i + 1,
          field: key,
          warning: 'Field not defined in validation rules',
          value
        });
      }
    }

    if (!hasErrors) {
      processedRow.id = `${dataType}-${Date.now()}-${i}`;
      processedData.push(processedRow);
      result.successfulImports++;
    } else {
      result.failedImports++;
    }
  }

  result.data = processedData;
  result.success = result.successfulImports > 0;

  return result;
}

// Save data to appropriate API
async function saveData(dataType, data) {
  const config = dataTypeConfigs[dataType];
  if (!config) {
    throw new Error(`Unknown data type: ${dataType}`);
  }

  switch (dataType) {
    case 'creators':
      for (const item of data) {
        await creatorsAPI.create(item);
      }
      break;
    case 'tickets':
      for (const item of data) {
        await ticketsAPI.create(item);
      }
      break;
    case 'campaigns':
      for (const item of data) {
        await campaignsAPI.create(item);
      }
      break;
    case 'events':
      for (const item of data) {
        await eventsAPI.create(item);
      }
      break;
    default:
      // For other data types, we'll simulate the save
      console.log(`Saving ${dataType} data:`, data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  }
}

// Export data to Excel
async function exportToExcel(dataType, data, filename) {
  const config = dataTypeConfigs[dataType];
  if (!config) {
    throw new Error(`Unknown data type: ${dataType}`);
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, config.name);

  const fileName = filename || `${dataType}_export_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

// Generate template
async function generateTemplate(dataType) {
  const config = dataTypeConfigs[dataType];
  if (!config) {
    throw new Error(`Unknown data type: ${dataType}`);
  }

  const sampleData = {};
  config.validationRules.forEach(rule => {
    switch (rule.type) {
      case 'string':
        sampleData[rule.field] = `Sample ${rule.field}`;
        break;
      case 'number':
        sampleData[rule.field] = 123;
        break;
      case 'email':
        sampleData[rule.field] = 'example@email.com';
        break;
      case 'date':
        sampleData[rule.field] = new Date().toISOString().split('T')[0];
        break;
      case 'boolean':
        sampleData[rule.field] = true;
        break;
      case 'array':
        sampleData[rule.field] = 'item1,item2,item3';
        break;
      default:
        sampleData[rule.field] = 'Sample value';
    }
  });

  const worksheet = XLSX.utils.json_to_sheet([sampleData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `${config.name} Template`);

  XLSX.writeFile(workbook, `${dataType}_template.xlsx`);
}

// Get field mappings suggestions
function getFieldMappingSuggestions(csvFields, dataType) {
  const config = dataTypeConfigs[dataType];
  if (!config) {
    return {};
  }

  const suggestions = {};
  const systemFields = config.validationRules.map(rule => rule.field);

  csvFields.forEach(csvField => {
    const normalizedCsvField = csvField.toLowerCase().replace(/[\s_-]/g, '');

    const matchedField = systemFields.find(systemField => {
      const normalizedSystemField = systemField.toLowerCase().replace(/[\s_-]/g, '');
      return normalizedSystemField === normalizedCsvField ||
        normalizedSystemField.includes(normalizedCsvField) ||
        normalizedCsvField.includes(normalizedSystemField);
    });

    if (matchedField) {
      suggestions[csvField] = matchedField;
    }
  });

  return suggestions;
}

// Batch operations
async function batchImport(files, dataType) {
  const results = [];

  for (const file of files) {
    try {
      let data;
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'csv') {
        data = await parseCSV(file);
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        data = await parseExcel(file);
      } else {
        throw new Error(`Unsupported file type: ${fileExtension}`);
      }

      const result = await validateAndTransformData(data, dataType);

      if (result.success) {
        await saveData(dataType, result.data);
      }

      results.push(result);
    } catch (error) {
      results.push({
        success: false,
        totalRows: 0,
        successfulImports: 0,
        failedImports: 0,
        errors: [{ error: error.message }],
        warnings: [],
        data: []
      });
    }
  }

  return results;
}

// Export all as a plain object for named import
export const bulkDataService = {
  parseCSV,
  parseExcel,
  validateValue,
  transformValue,
  validateAndTransformData,
  saveData,
  exportToExcel,
  generateTemplate,
  getFieldMappingSuggestions,
  batchImport
};

