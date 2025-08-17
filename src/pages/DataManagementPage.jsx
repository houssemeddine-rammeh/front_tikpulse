import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  Snackbar,
  Switch
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  GetApp as DownloadIcon,
  Preview as PreviewIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Edit,
  People as PeopleIcon,
  Event as EventIcon,
  Campaign as CampaignIcon,
  Support,
  Business as CompanyIcon,
  AdminPanelSettings as AdminIcon,
  FileDownload,
  Upload,
  BatchPrediction,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { useTranslation } from 'react-i18next';
import { bulkDataService, dataTypeConfigs } from '../services/bulkDataService';

// Data types that can be imported
export const DataType = {
  CREATORS: 'creators',
  MANAGERS: 'managers',
  EVENTS: 'events',
  CAMPAIGNS: 'campaigns',
  TICKETS: 'tickets',
  COMPANIES: 'companies',
  USERS: 'users'
};

// Field mapping 

// Enhanced data type configurations for UI
const uiDataTypeConfigs = {
  [DataType.CREATORS]: {
    name: 'Creators',
    icon: <PeopleIcon />,
    color: '#2196f3',
    description: 'Import TikTok creators with their profiles and statistics'
  },
  [DataType.MANAGERS]: {
    name: 'Managers',
    icon: <AdminIcon />,
    color: '#ff9800',
    description: 'Import managers and administrators with their roles'
  },
  [DataType.EVENTS]: {
    name: 'Events',
    icon: <EventIcon />,
    color: '#4caf50',
    description: 'Import events, campaigns, and activities'
  },
  [DataType.CAMPAIGNS]: {
    name: 'Campaigns',
    icon: <CampaignIcon />,
    color: '#9c27b0',
    description: 'Import marketing campaigns and brand partnerships'
  },
  [DataType.TICKETS]: {
    name: 'Support Tickets',
    icon: <CampaignIcon />,
    color: '#f44336',
    description: 'Import support tickets and customer issues'
  },
  [DataType.COMPANIES]: {
    name: 'Companies',
    icon: <CompanyIcon />,
    color: '#607d8b',
    description: 'Import company profiles and business information'
  },
  [DataType.USERS]: {
    name: 'Users',
    icon: <PeopleIcon />,
    color: '#795548',
    description: 'Import system users and their access credentials'
  }
};

const DataManagementPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [selectedDataType, setSelectedDataType] = useState(DataType.CREATORS);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [fieldMappings, setFieldMappings] = useState([]);
  const [importResult, setImportResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [batchMode, setBatchMode] = useState(false);

  // File upload handling
  const onDrop = useCallback((acceptedFiles) => {
    if (batchMode) {
      setUploadedFiles(acceptedFiles);
      setCurrentStep(1);
    } else {
      const file = acceptedFiles[0];
      if (file) {
        setUploadedFiles([file]);
        parseFile(file);
      }
    }
  }, [batchMode]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: batchMode
  });

  // File parsing
  const parseFile = async (file) => {
    try {
      setIsProcessing(true);
      let data;
      
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'csv') {
        data = await bulkDataService.parseCSV(file);
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        data = await bulkDataService.parseExcel(file);
      } else {
        throw new Error(`Unsupported file type: ${fileExtension}`);
      }

      setParsedData(data);
      generateFieldMappings(Object.keys(data[0] || {}));
      setCurrentStep(1);
      setSnackbarMessage(`Successfully parsed ${data.length} rows from ${file.name}`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('File parsing error:', error);
      setSnackbarMessage(`Error parsing file: ${error.message}`);
      setSnackbarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate field mappings with auto-suggestions
  const generateFieldMappings = (csvFields) => {
    const config = dataTypeConfigs[selectedDataType];
    if (!config) return;

    const suggestions = bulkDataService.getFieldMappingSuggestions(csvFields, selectedDataType);
    
    const mappings = csvFields.map(csvField => {
      const suggestedField = suggestions[csvField] || '';
      const rule = config.validationRules.find(r => r.field === suggestedField);
      
      return {
        csvField,
        systemField: suggestedField,
        required: rule?.required || false,
        dataType: (rule?.type?.dataType) || 'string'
      };
    });
    
    setFieldMappings(mappings);
  };

  // Process import
  const processImport = async () => {
    try {
      setIsProcessing(true);

      if (batchMode) {
        // Batch import multiple files
        const results = await bulkDataService.batchImport(uploadedFiles, selectedDataType);
        const combinedResult = {
          success: results.some(r => r.success),
          totalRows: results.reduce((sum, r) => sum + r.totalRows, 0),
          successfulImports: results.reduce((sum, r) => sum + r.successfulImports, 0),
          failedImports: results.reduce((sum, r) => sum + r.failedImports, 0),
          errors: results.flatMap(r => r.errors),
          warnings: results.flatMap(r => r.warnings),
          data: results.flatMap(r => r.data)
        };
        setImportResult(combinedResult);
      } else {
        // Single file import
        const result = await bulkDataService.validateAndTransformData(parsedData, selectedDataType);
        
        if (result.success) {
          await bulkDataService.saveData(selectedDataType, result.data);
        }
        
        setImportResult(result);
      }

      setCurrentStep(2);
      setSnackbarMessage('Import process completed!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Import error:', error);
      setSnackbarMessage(`Import failed: ${error.message}`);
      setSnackbarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download template
  const downloadTemplate = async (dataType) => {
    try {
      await bulkDataService.generateTemplate(dataType);
      const config = uiDataTypeConfigs[dataType];
      if (config) {
        setSnackbarMessage(`Template downloaded for ${config.name}`);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Template download error:', error);
      setSnackbarMessage('Failed to download template');
      setSnackbarOpen(true);
    }
  };

  // Export existing data
  const exportData = async (dataType) => {
    try {
      await bulkDataService.exportToExcel(dataType, []);
    } catch (error) {
      console.error('Export failed:', error);
      throw new Error(`Export failed for ${dataType}: ${error.message}`);
    }
  };

  // Reset import process
  const resetImport = () => {
    setCurrentStep(0);
    setUploadedFiles([]);
    setParsedData([]);
    setFieldMappings([]);
    setImportResult(null);
    setIsProcessing(false);
    setBatchMode(false);
  };

  const steps = batchMode ? [t('pages.dataManagement.uploadFiles'), t('pages.dataManagement.processBatch')] : [t('pages.dataManagement.uploadFile'), t('pages.dataManagement.mapFields'), t('pages.dataManagement.reviewImport')];

  if (user?.role !== UserRole.ADMIN) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('pages.dataManagement.accessDenied')}
        </Typography>
        <Typography variant="body1">
          {t('pages.dataManagement.noPermission')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('pages.dataManagement.title')}
      </Typography>

      {/* Batch Mode Switch */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={batchMode}
              onChange={(e) => {
                setBatchMode(e.target.checked);
                resetImport();
              }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RefreshIcon />
              <Typography>{t('pages.dataManagement.batchImportMode')}</Typography>
            </Box>
          }
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {batchMode 
            ? t('pages.dataManagement.uploadMultipleFiles')
            : t('pages.dataManagement.uploadOneFile')
          }
        </Typography>
      </Paper>

      {/* Data Type Selection */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('pages.dataManagement.selectDataType')}
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(uiDataTypeConfigs).map(([key, config]) => {
            const dataConfig = dataTypeConfigs[key];
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 2,
                      borderColor: 'primary.main'
                    },
                    border: '1px solid',
                    borderColor: selectedDataType === key ? 'primary.main' : 'transparent',
                    borderRadius: 2
                  }}
                  onClick={() => {
                    setSelectedDataType(key);
                    resetImport();
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Box sx={{ color: config.color, mb: 1 }}>
                      {config.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {config.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      {dataConfig?.validationRules.filter(r => r.required).length || 0} {t('pages.dataManagement.requiredFields')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      {config.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pt: 0 }}>
                    <Button 
                      size="small" 
                      startIcon={<DownloadIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadTemplate(key);
                      }}
                    >
                      {t('pages.dataManagement.template')}
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<FileDownload />}
                      onClick={(e) => {
                        e.stopPropagation();
                        exportData(key);
                      }}
                    >
                      Export
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Import Process */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Import {uiDataTypeConfigs[selectedDataType]?.name || selectedDataType}
          </Typography>
          {currentStep > 0 && (
            <Button onClick={resetImport} startIcon={<DeleteIcon />}>
              Reset
            </Button>
          )}
        </Box>

        {/* Stepper */}
        <Stepper activeStep={currentStep} sx={{ mb: 4 }} orientation={isMobile ? "vertical" : "horizontal"}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        {currentStep === 0 && (
          <Box>
            {/* File Upload */}
            <Paper
              {...getRootProps()}
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: isDragActive ? 'primary.main' : 'grey.300',
                bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                cursor: 'pointer',
                mb: 3
              }}
            >
              <input {...getInputProps()} />
              <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isDragActive 
                  ? 'Drop the files here' 
                  : batchMode 
                    ? 'Drag & drop multiple files here, or click to select'
                    : 'Drag & drop a file here, or click to select'
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supports CSV, XLSX, and XLS files
              </Typography>
              {batchMode && (
                <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                  {uploadedFiles.length} files selected
                </Typography>
              )}
            </Paper>

            {/* Field Requirements */}
            {!batchMode && dataTypeConfigs[selectedDataType] && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom color="error">
                    Required Fields
                  </Typography>
                  <List dense>
                    {dataTypeConfigs[selectedDataType].validationRules
                      .filter(rule => rule.required)
                      .map((rule) => (
                        <ListItem key={rule.field}>
                          <ListItemIcon>
                            <ErrorIcon color="error" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={rule.field} 
                            secondary={`Type: ${rule.type}`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom color="info">
                    Optional Fields
                  </Typography>
                  <List dense>
                    {dataTypeConfigs[selectedDataType].validationRules
                      .filter(rule => !rule.required)
                      .map((rule) => (
                        <ListItem key={rule.field}>
                          <ListItemIcon>
                            <WarningIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={rule.field} 
                            secondary={`Type: ${rule.type}`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
            )}

            {/* Uploaded Files Preview */}
            {uploadedFiles.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Uploaded Files
                </Typography>
                <List>
                  {uploadedFiles.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <UploadIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={file.name}
                        secondary={`${(file.size / 1024).toFixed(1)} KB`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button 
                  variant="contained" 
                  onClick={processImport}
                  disabled={!uploadedFiles.length || isProcessing}
                  sx={{ mt: 2 }}
                >
                  Process Import
                </Button>
              </Box>
            )}
          </Box>
        )}

        {currentStep === 1 && !batchMode && (
          <Box>
            {/* Field Mapping */}
            <Typography variant="h6" gutterBottom>
              Map CSV Fields to System Fields
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Map your CSV columns to the corresponding system fields. Required fields must be mapped.
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>CSV Field</TableCell>
                    <TableCell>System Field</TableCell>
                    <TableCell>Required</TableCell>
                    <TableCell>Data Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fieldMappings.map((mapping, index) => (
                    <TableRow key={mapping.csvField}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {mapping.csvField}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <Select
                            value={mapping.systemField}
                            onChange={(e) => {
                              const newMappings = [...fieldMappings];
                              const selectedField = e.target.value;
                              const rule = dataTypeConfigs[selectedDataType]?.validationRules.find(r => r.field === selectedField);
                              
                              newMappings[index].systemField = selectedField;
                              newMappings[index].required = rule?.required || false;
                              newMappings[index].dataType = (rule?.type['dataType']) || 'string';
                              setFieldMappings(newMappings);
                            }}
                          >
                            <MenuItem value="">
                              <em>Skip this field</em>
                            </MenuItem>
                            {dataTypeConfigs[selectedDataType]?.validationRules.map((rule) => (
                              <MenuItem key={rule.field} value={rule.field}>
                                {rule.field} ({rule.type})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        {mapping.required && (
                          <Chip label="Required" size="small" color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={mapping.dataType} 
                          size="small" 
                          color={mapping.dataType === 'email' ? 'primary' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => setPreviewDialogOpen(true)} startIcon={<PreviewIcon />}>
                Preview Data
              </Button>
              <Button 
                variant="contained" 
                onClick={processImport}
                disabled={!fieldMappings.some(m => m.systemField && m.required) || isProcessing}
              >
                Process Import
              </Button>
            </Box>
          </Box>
        )}

        {(currentStep === 2 || (currentStep === 1 && batchMode)) && importResult && (
          <Box>
            {/* Import Results */}
            <Typography variant="h6" gutterBottom>
              Import Results
            </Typography>

            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label={`Errors (${importResult.errors.length})`} />
              <Tab label={`Warnings (${importResult.warnings.length})`} />
              <Tab label={`Success (${importResult.successfulImports})`} />
            </Tabs>

            <Box sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
              {activeTab === 0 && (
                importResult.errors.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Row</TableCell>
                          <TableCell>Field</TableCell>
                          <TableCell>Error</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {importResult.errors.map((error, index) => (
                          <TableRow key={index}>
                            <TableCell>{error.row}</TableCell>
                            <TableCell>{error.field}</TableCell>
                            <TableCell>{error.error}</TableCell>
                            <TableCell>{error.value?.toString() || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="success">No errors found!</Alert>
                )
              )}

              {activeTab === 1 && (
                importResult.warnings.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Row</TableCell>
                          <TableCell>Field</TableCell>
                          <TableCell>Warning</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {importResult.warnings.map((warning, index) => (
                          <TableRow key={index}>
                            <TableCell>{warning.row}</TableCell>
                            <TableCell>{warning.field}</TableCell>
                            <TableCell>{warning.warning}</TableCell>
                            <TableCell>{warning.value?.toString() || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">No warnings found!</Alert>
                )
              )}

              {activeTab === 2 && (
                <Alert severity="success">
                  Successfully imported {importResult.successfulImports} records!
                  {batchMode && ` Processed ${uploadedFiles.length} files.`}
                </Alert>
              )}
            </Box>

            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={resetImport}>
                Import More Data
              </Button>
              <Button variant="contained" onClick={() => window.location.reload()}>
                View Imported Data
              </Button>
            </Box>
          </Box>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
          </Box>
        )}
      </Paper>

      {/* Preview Dialog */}
      <Dialog 
        open={previewDialogOpen} 
        onClose={() => setPreviewDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Data Preview</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {fieldMappings
                    .filter(m => m.systemField)
                    .map(mapping => (
                      <TableCell key={mapping.systemField}>
                        {mapping.systemField}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {parsedData.slice(0, 10).map((row, index) => (
                  <TableRow key={index}>
                    {fieldMappings
                      .filter(m => m.systemField)
                      .map(mapping => (
                        <TableCell key={mapping.systemField}>
                          {row[mapping.csvField]?.toString() || 'N/A'}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {parsedData.length > 10 && (
            <Typography variant="caption" sx={{ mt: 1 }}>
              Showing first 10 rows
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default DataManagementPage; 

