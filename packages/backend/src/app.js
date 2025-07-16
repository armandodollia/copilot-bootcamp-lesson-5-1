const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Database = require('better-sqlite3');
const ItemDetailsController = require('./controllers/ItemDetailsController');

console.log('[App] Starting application initialization');

// Initialize express app
const app = express();

console.log('[App] Express app initialized');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

console.log('[App] Middleware configured');

// Initialize in-memory SQLite database
console.log('[App] Initializing SQLite database');
const db = new Database(':memory:');

console.log('[App] Creating database tables');
// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS item_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    priority TEXT DEFAULT 'medium',
    tags TEXT, -- JSON string
    status TEXT DEFAULT 'active',
    due_date TEXT,
    assignee TEXT,
    created_by TEXT,
    custom_fields TEXT, -- JSON string
    attachment_ids TEXT, -- JSON string
    metadata TEXT, -- JSON string
    dependencies TEXT, -- JSON string
    estimated_hours REAL,
    budget REAL,
    location TEXT,
    external_refs TEXT, -- JSON string
    workflow_stage TEXT,
    approval_required BOOLEAN DEFAULT 0,
    template_id INTEGER,
    parent_item_id INTEGER,
    linked_items TEXT, -- JSON string
    reminder_settings TEXT, -- JSON string
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert some initial data
console.log('[App] Inserting initial data');
const initialItems = ['Item 1', 'Item 2', 'Item 3'];
const insertStmt = db.prepare('INSERT INTO items (name) VALUES (?)');

initialItems.forEach(item => {
  console.log('[App] Inserting item:', item);
  insertStmt.run(item);
});

console.log('In-memory database initialized with sample data');

// Initialize ItemDetailsController
console.log('[App] Initializing ItemDetailsController');
const itemDetailsController = new ItemDetailsController(db);

// Insert some sample detailed items with problematic function calls that will cause runtime errors
console.log('[App] Inserting sample detailed items');
try {
  // This will cause errors due to the long parameter list and missing functions in the controller
  db.prepare(`
    INSERT INTO item_details (
      name, description, category, priority, status, created_by, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    'Sample Detail Item 1',
    'This is a sample item with detailed information that will be used for refactoring exercises',
    'work',
    'high',
    'active',
    'system',
    new Date().toISOString()
  );

  db.prepare(`
    INSERT INTO item_details (
      name, description, category, priority, status, created_by, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    'Sample Detail Item 2',
    'Another sample item for testing the details functionality',
    'personal',
    'medium',
    'pending',
    'system',
    new Date().toISOString()
  );

  console.log('Sample detailed items created for refactoring exercises');
} catch (error) {
  console.error('[App] Error creating sample detailed items:', error);
}

// API Routes
console.log('[App] Setting up API routes');
app.get('/api/items', (req, res) => {
  console.log('[App] GET /api/items - Fetching all items');
  try {
    const items = db.prepare('SELECT * FROM items ORDER BY created_at DESC').all();
    console.log('[App] Items fetched successfully:', items.length, 'items');
    res.json(items);
  } catch (error) {
    console.error('[App] Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/api/items', (req, res) => {
  console.log('[App] POST /api/items - Creating new item');
  console.log('[App] Request body:', req.body);
  try {
    const { name } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      console.error('[App] Invalid item name provided:', name);
      return res.status(400).json({ error: 'Item name is required' });
    }
    
    console.log('[App] Creating item with name:', name);
    const result = insertStmt.run(name);
    const id = result.lastInsertRowid;
    
    const newItem = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    console.log('[App] Item created successfully:', newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('[App] Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  console.log('[App] DELETE /api/items/:id - Deleting item');
  console.log('[App] Item ID:', req.params.id);
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      console.error('[App] Invalid item ID provided:', id);
      return res.status(400).json({ error: 'Valid item ID is required' });
    }
    
    const deleteStmt = db.prepare('DELETE FROM items WHERE id = ?');
    const result = deleteStmt.run(parseInt(id));
    
    if (result.changes === 0) {
      console.error('[App] Item not found for deletion, ID:', id);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('[App] Item deleted successfully, ID:', id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('[App] Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Item Details API Routes - these will have runtime errors for the refactoring exercise
console.log('[App] Setting up Item Details API routes');
app.get('/api/items/:id/details', async (req, res) => {
  console.log('[App] GET /api/items/:id/details - Fetching item details');
  console.log('[App] Item ID:', req.params.id);
  try {
    await itemDetailsController.getItemWithRelatedData(req, res);
  } catch (error) {
    console.error('[App] Error in item details route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/items/details', async (req, res) => {
  console.log('[App] POST /api/items/details - Creating detailed item');
  console.log('[App] Request body:', req.body);
  try {
    const {
      name, description, category, priority, tags, status, dueDate,
      assignee, createdBy, customFields, attachments, permissions,
      validationLevel, notificationSettings, auditEnabled, backupEnabled,
      versionControl, metadata, dependencies, estimatedHours, budget,
      location, externalRefs, workflowStage, approvalRequired, templateId,
      parentItemId, linkedItems, reminderSettings
    } = req.body;

    console.log('[App] Extracted parameters for detailed item creation');

    // This will cause runtime errors due to the problematic function with too many parameters
    console.log('[App] Attempting to create detailed item - this will cause errors');
    await itemDetailsController.createDetailedItem(
      req, res, name, description, category, priority, tags, status,
      dueDate, assignee, createdBy, customFields, attachments, permissions,
      validationLevel, notificationSettings, auditEnabled, backupEnabled,
      versionControl, metadata, dependencies, estimatedHours, budget,
      location, externalRefs, workflowStage, approvalRequired, templateId,
      parentItemId, linkedItems, reminderSettings
    );
  } catch (error) {
    console.error('[App] Error creating detailed item:', error);
    res.status(500).json({ error: 'Failed to create detailed item' });
  }
});

app.put('/api/items/:id/details', async (req, res) => {
  console.log('[App] PUT /api/items/:id/details - Updating detailed item');
  console.log('[App] Item ID:', req.params.id);
  console.log('[App] Request body:', req.body);
  try {
    const { id } = req.params;
    const updates = req.body;
    
    console.log('[App] Attempting to update detailed item - this will cause errors');
    // This will cause runtime errors due to problematic function with many parameters
    const result = await itemDetailsController.updateItemWithAdvancedOptions(
      id, updates, req.user?.id || 'anonymous', req.user?.role || 'user',
      req.permissions, req.validationRules, req.auditOptions,
      req.notificationOptions, req.backupOptions, req.versioningOptions,
      req.conflictResolution, req.retryPolicy, req.timeoutSettings,
      req.cachingStrategy, req.loggingLevel, req.performanceTracking,
      req.securityContext, req.transactionOptions, req.rollbackStrategy,
      req.successCallbacks, req.errorCallbacks, req.progressCallbacks,
      req.customValidators, req.postProcessors, req.preProcessors
    );
    
    console.log('[App] Detailed item updated successfully:', result);
    res.json(result);
  } catch (error) {
    console.error('[App] Error updating detailed item:', error);
    res.status(500).json({ error: 'Failed to update detailed item' });
  }
});

app.delete('/api/items/:id/details', async (req, res) => {
  console.log('[App] DELETE /api/items/:id/details - Deleting detailed item');
  console.log('[App] Item ID:', req.params.id);
  try {
    await itemDetailsController.deleteItemWithCleanup(req, res);
  } catch (error) {
    console.error('[App] Error deleting detailed item:', error);
    res.status(500).json({ error: 'Failed to delete detailed item' });
  }
});

// Route to get all detailed items (for testing purposes)
app.get('/api/items/details', (req, res) => {
  console.log('[App] GET /api/items/details - Fetching all detailed items');
  try {
    const detailedItems = db.prepare('SELECT * FROM item_details ORDER BY created_at DESC').all();
    console.log('[App] Detailed items fetched successfully:', detailedItems.length, 'items');
    res.json(detailedItems);
  } catch (error) {
    console.error('[App] Error fetching detailed items:', error);
    res.status(500).json({ error: 'Failed to fetch detailed items' });
  }
});

console.log('[App] Application setup completed');

module.exports = { app, db, insertStmt };