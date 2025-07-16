import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';

/**
 * ItemDetails component for managing detailed item information
 * This component has several issues that need refactoring:
 * - Long parameter lists
 * - Missing error handling and logging
 * - Dead code
 * - Runtime errors
 */
function ItemDetails({ 
  open, 
  onClose, 
  itemId, 
  itemName,
  itemDescription,
  itemCategory,
  itemPriority,
  itemTags,
  itemStatus,
  itemDueDate,
  itemAssignee,
  itemCreatedBy,
  itemCreatedAt,
  itemUpdatedAt,
  showAdvanced,
  enableNotifications,
  autoSave,
  readOnly,
  onSave,
  onDelete,
  onUpdate,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onTagsChange,
  onAssigneeChange,
  onDueDateChange,
  onDescriptionChange,
  onNameChange,
  allowEdit,
  allowDelete,
  showHistory,
  historyData,
  validationRules,
  customFields,
  permissions
}) {
  console.log('[ItemDetails] Component rendered');
  console.log('[ItemDetails] Props:', {
    open,
    onClose,
    itemId,
    itemName,
    itemDescription,
    itemCategory,
    itemPriority,
    itemTags,
    itemStatus,
    itemDueDate,
    itemAssignee,
    itemCreatedBy,
    itemCreatedAt,
    itemUpdatedAt,
    showAdvanced,
    enableNotifications,
    autoSave,
    readOnly,
    onSave,
    onDelete,
    onUpdate,
    onStatusChange,
    onPriorityChange,
    onCategoryChange,
    onTagsChange,
    onAssigneeChange,
    onDueDateChange,
    onDescriptionChange,
    onNameChange,
    allowEdit,
    allowDelete,
    showHistory,
    historyData,
    validationRules,
    customFields,
    permissions
  });

  const [localName, setLocalName] = useState(itemName || '');
  const [localDescription, setLocalDescription] = useState(itemDescription || '');
  const [localCategory, setLocalCategory] = useState(itemCategory || '');
  const [localPriority, setLocalPriority] = useState(itemPriority || 'medium');
  const [localTags, setLocalTags] = useState(itemTags || []);
  const [localStatus, setLocalStatus] = useState(itemStatus || 'active');
  const [localDueDate, setLocalDueDate] = useState(itemDueDate || '');
  const [localAssignee, setLocalAssignee] = useState(itemAssignee || '');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  console.log('[ItemDetails] Local state initialized:', {
    localName,
    localDescription,
    localCategory,
    localPriority,
    localTags,
    localStatus,
    localDueDate,
    localAssignee,
    errors,
    isValid,
    isDirty
  });

  // Dead code - unused variables and functions
  const unusedVariable = 'This is never used';
  const anotherUnusedVar = { data: 'unused', count: 0 };
  
  function deadFunction() {
    console.log('This function is never called');
    return false;
  }
  
  function anotherDeadFunction(param1, param2, param3) {
    // This function exists but is never used
    const result = param1 + param2 + param3;
    return result * 2;
  }

  // This useEffect has a bug - missing dependency
  useEffect(() => {
    console.log('[ItemDetails] useEffect triggered - has missing dependency bug');
    console.log('[ItemDetails] itemId:', itemId);
    if (itemId) {
      console.log('[ItemDetails] Attempting to fetch item details - this will cause an error');
      // This will cause a runtime error because fetchItemDetails is not defined
      fetchItemDetails(itemId);
    }
  }, []);

  // Missing error handling and logging in this function
  const handleSave = () => {
    console.log('[ItemDetails] handleSave called');
    console.log('[ItemDetails] Current local state:', {
      localName,
      localDescription,
      localCategory,
      localPriority,
      localTags,
      localStatus,
      localDueDate,
      localAssignee
    });
    
    try {
      // No validation or error handling
      const updatedItem = {
        id: itemId,
        name: localName,
        description: localDescription,
        category: localCategory,
        priority: localPriority,
        tags: localTags,
        status: localStatus,
        dueDate: localDueDate,
        assignee: localAssignee
      };
      
      console.log('[ItemDetails] Built updated item:', updatedItem);
      
      // This might fail but no error handling
      if (onSave) {
        console.log('[ItemDetails] Calling onSave callback');
        onSave(updatedItem);
      }
      
      setIsDirty(false);
      console.log('[ItemDetails] handleSave completed successfully');
    } catch (error) {
      console.error('[ItemDetails] Error in handleSave:', error.message);
      console.error('[ItemDetails] Full error details:', error);
    }
  };

  // Function with long parameter list that should be refactored
  const validateAndUpdateItem = (
    name,
    description, 
    category,
    priority,
    tags,
    status,
    dueDate,
    assignee,
    createdBy,
    permissions,
    validationRules,
    customFields,
    showAdvanced,
    enableNotifications,
    autoSave,
    readOnly,
    allowEdit,
    allowDelete
  ) => {
    // No logging of inputs or validation steps
    let valid = true;
    const newErrors = {};

    if (!name || name.trim().length === 0) {
      valid = false;
      newErrors.name = 'Name is required';
    }

    if (category && !['work', 'personal', 'urgent'].includes(category)) {
      valid = false;
      newErrors.category = 'Invalid category';
    }

    // This will cause a runtime error - undefined method
    if (dueDate && !validateDate(dueDate)) {
      valid = false;
      newErrors.dueDate = 'Invalid due date';
    }

    setErrors(newErrors);
    setIsValid(valid);
    return valid;
  };

  // Another function with too many parameters
  const processItemUpdate = (
    itemData,
    updateType,
    timestamp,
    userId,
    userRole,
    permissions,
    validationLevel,
    notificationSettings,
    auditEnabled,
    backupEnabled,
    versionControl,
    conflictResolution,
    retryCount,
    timeout,
    batchMode,
    asyncMode
  ) => {
    // No error handling or logging
    if (updateType === 'bulk') {
      // Process bulk update
      return processBulkUpdate(itemData, userId, permissions);
    } else if (updateType === 'single') {
      // Process single update
      return processSingleUpdate(itemData, userId, timestamp);
    }
    
    // This will cause an error because these functions don't exist
    return processGenericUpdate(itemData);
  };

  // Dead code - unused event handlers
  const handleUnusedClick = () => {
    console.log('This handler is never attached to any element');
  };

  const handleAnotherUnusedEvent = (event) => {
    event.preventDefault();
    // More unused code
    return false;
  };

  const handleInputChange = (field, value) => {
    console.log('[ItemDetails] handleInputChange called');
    console.log('[ItemDetails] Field:', field, 'Value:', value);
    
    setIsDirty(true);
    
    switch (field) {
      case 'name':
        console.log('[ItemDetails] Updating name field');
        setLocalName(value);
        // Missing validation and logging
        if (onNameChange) {
          console.log('[ItemDetails] Calling onNameChange callback');
          onNameChange(value);
        }
        break;
      case 'description':
        console.log('[ItemDetails] Updating description field');
        setLocalDescription(value);
        if (onDescriptionChange) {
          console.log('[ItemDetails] Calling onDescriptionChange callback');
          onDescriptionChange(value);
        }
        break;
      case 'category':
        console.log('[ItemDetails] Updating category field');
        setLocalCategory(value);
        if (onCategoryChange) {
          console.log('[ItemDetails] Calling onCategoryChange callback');
          onCategoryChange(value);
        }
        break;
      case 'priority':
        console.log('[ItemDetails] Updating priority field');
        setLocalPriority(value);
        onPriorityChange(value);
        break;
      case 'status':
        setLocalStatus(value);
        onStatusChange(value);
        break;
      case 'dueDate':
        setLocalDueDate(value);
        onDueDateChange(value);
        break;
      case 'assignee':
        setLocalAssignee(value);
        onAssigneeChange(value);
        break;
      default:
        console.log('[ItemDetails] Unhandled field type:', field);
        // No logging of unhandled cases
        break;
    }
    
    console.log('[ItemDetails] handleInputChange completed');
  };

  // This will cause a runtime error because formatDateTime is not defined
  const formatCreatedDate = (date) => {
    console.log('[ItemDetails] formatCreatedDate called with date:', date);
    console.log('[ItemDetails] Attempting to call formatDateTime - this will cause an error');
    try {
      const formatted = formatDateTime(date, 'yyyy-MM-dd HH:mm');
      console.log('[ItemDetails] Date formatted successfully:', formatted);
      return formatted;
    } catch (error) {
      console.error('[ItemDetails] Error formatting date:', error.message);
      console.error('[ItemDetails] Full error details:', error);
      return date; // Return original date as fallback
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {itemId ? 'Edit Item Details' : 'New Item Details'}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Item Name"
                value={localName}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                disabled={readOnly}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={localCategory}
                  label="Category"
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  disabled={readOnly}
                >
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={localDescription}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={readOnly}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={localPriority}
                  label="Priority"
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  disabled={readOnly}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={localStatus}
                  label="Status"
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  disabled={readOnly}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={localDueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                disabled={readOnly}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Assignee"
                value={localAssignee}
                onChange={(e) => handleInputChange('assignee', e.target.value)}
                disabled={readOnly}
              />
            </Grid>
            
            {showAdvanced && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Advanced Options
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enableNotifications}
                        onChange={(e) => {
                          // Missing function call - this will cause an error
                          handleNotificationToggle(e.target.checked);
                        }}
                      />
                    }
                    label="Enable Notifications"
                    disabled={readOnly}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoSave}
                        onChange={(e) => {
                          // Missing function - will cause runtime error
                          handleAutoSaveToggle(e.target.checked);
                        }}
                      />
                    }
                    label="Auto Save"
                    disabled={readOnly}
                  />
                </Grid>
              </>
            )}
            
            {itemCreatedAt && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {/* This will cause an error because formatCreatedDate calls undefined function */}
                  Created: {formatCreatedDate(itemCreatedAt)} by {itemCreatedBy}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        {allowEdit && !readOnly && (
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!isValid || !isDirty}
          >
            Save Changes
          </Button>
        )}
        {allowDelete && (
          <Button 
            onClick={() => {
              // Missing confirmation dialog - this could accidentally delete items
              onDelete(itemId);
            }} 
            color="error"
          >
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ItemDetails;
