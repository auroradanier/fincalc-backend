import { pgTable, text, integer, index, uniqueIndex, serial, timestamp, boolean, jsonb, bigint } from 'drizzle-orm/pg-core'

export const designs = pgTable('designs', {
  id: serial('id').primaryKey(),
  uuid: text('uuid').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail'),
  designData: jsonb('design_data').notNull(),
  width: integer('width'),
  height: integer('height'),
  isPublic: boolean('is_public').default(false),
  templateId: integer('template_id'),
  tags: text('tags'),
  viewCount: integer('view_count').default(0),
  version: integer('version').default(1),
  isDeleted: boolean('is_deleted').default(false),
}, (table) => [
  index('designs_uuid_idx').on(table.uuid),
  index('designs_user_id_idx').on(table.userId),
  index('designs_created_at_idx').on(table.createdAt),
  index('designs_is_deleted_idx').on(table.isDeleted),
])

// Template categories for organizing templates (hierarchical)
export const templateCategories = pgTable('template_categories', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  parentCategoryId: integer('parent_category_id'), // null for root categories
  level: integer('level').default(0), // 0 for root, 1 for subcategory, etc.
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
}, (table) => [
  index('template_categories_parent_id_idx').on(table.parentCategoryId),
  uniqueIndex('template_categories_name_parent_idx').on(table.name, table.parentCategoryId),
])

// Public templates - separate from user designs for better organization
export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  designUuid: text('design_uuid'), // UUID of the design this template was created from
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  thumbnail: text('thumbnail'), // URL to thumbnail image
  designData: jsonb('design_data').notNull(), // JSON object containing the complete design
  width: integer('width'),
  height: integer('height'),
  aspectRatio: text('aspect_ratio'), // Aspect ratio string (e.g., '16:9', '9:16', '1:1')
  categoryId: integer('category_id').notNull(), // Reference to templateCategories
  templateType: text('template_type').notNull().default('design'), // Template type: blank, design, etc
  prompt: text('prompt'), // AI generation prompt for AI-generated templates
  tags: jsonb('tags'), // JSON array of tags for categorization
  isPremium: boolean('is_premium').default(false),
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  viewCount: integer('view_count').default(0),
  usageCount: integer('usage_count').default(0),
  likeCount: integer('like_count').default(0),
  sortOrder: integer('sort_order').default(0),
  metadata: jsonb('metadata'), // JSON object for additional information
}, (table) => [
  index('templates_category_id_idx').on(table.categoryId),
  index('templates_created_at_idx').on(table.createdAt),
  index('templates_aspect_ratio_idx').on(table.aspectRatio),
  index('templates_template_type_idx').on(table.templateType),
  index('templates_tags_idx').using('gin', table.tags), // GIN index for JSONB tags searches
])

// User uploaded images and assets
export const assets = pgTable('assets', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  fileName: text('file_name').notNull().unique(),
  originalName: text('original_name'),
  description: text('description'), // Description of what the file is
  mimeType: text('mime_type'),
  fileSize: integer('file_size'), // in bytes
  width: integer('width'), // for images
  height: integer('height'), // for images
  assetType: text('asset_type'), // image, file, etc.
  source: text('source'), // upload, generated, etc.
  target: text('target').notNull().default('default'), // designs, templates, or default
  hash: text('hash'), // Perceptual hash for image similarity searches (only for image types)
  tags: text('tags'), // JSON array of tags
  prompt: text('prompt'), // AI generation prompt for AI-generated images
  aiGenerated: boolean('ai_generated').default(false), // Whether image was AI-generated
  metadata: jsonb('metadata'), // JSON object for additional information.
  isPublic: boolean('is_public').default(false),
}, (table) => [
  index('assets_user_id_idx').on(table.userId),
  index('assets_asset_type_idx').on(table.assetType),
  index('assets_target_idx').on(table.target),
  index('assets_created_at_idx').on(table.createdAt),
  index('assets_hash_idx').on(table.hash), // Keep for similarity searches
])

// Fonts table for dynamic font management
export const fonts = pgTable('fonts', {
  id: serial('id').primaryKey(),
  name: jsonb('name').notNull(), // JSONB field for localized names: {"zh": "思源宋体", "en": "Source Sans Pro"}
  family: text('family').notNull(), // CSS font-family value: "Noto Sans CJK", "Inter"
  language: text('language').notNull(), // Primary language/script: "zh", "ja", "ko", "en", etc.
  category: text('category'), // sans-serif, serif, cursive, monospace, system
  source: text('source'), // bunny, google, custom, system, zeo, fontsource
  variants: jsonb('variants').notNull(), // Array of font variants: [{ weight: 400, url: "..." }, { weight: 700, url: "..." }]
  description: text('description'), // AI-friendly description for font characteristics and use cases
  isPremium: boolean('is_premium').default(false),
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  usageCount: integer('usage_count').default(0), // Usage count for tracking font popularity
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('fonts_family_idx').on(table.family),
  uniqueIndex('fonts_family_idx_unique').on(table.family), // Now unique per family since variants are in JSON
  index('fonts_category_idx').on(table.category),
  index('fonts_language_idx').on(table.language), // Index for language filtering
  index('fonts_name_idx').using('gin', table.name), // GIN index for JSONB name searches
  index('fonts_variants_idx').using('gin', table.variants), // GIN index for JSONB variants searches
  index('fonts_source_idx').on(table.source),
])

// AI Chats - groups of related messages
export const aiChats = pgTable('ai_chats', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  sessionId: text('session_id'),
  designId: text('design_id'), // Changed from integer to text to store UUID
  isDeleted: boolean('is_deleted').default(false),
}, (table) => [
  index('ai_chats_user_id_idx').on(table.userId),
  index('ai_chats_design_id_idx').on(table.designId),
  index('ai_chats_created_at_idx').on(table.createdAt),
  index('ai_chats_session_id_idx').on(table.sessionId),
])

// AI Chat messages - individual messages within chats
export const aiChatMessages = pgTable('ai_chat_messages', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  sessionId: text('session_id'),
  runId: text('run_id'), // Run ID from remote server for run-based polling
  role: text('role').notNull(),
  content: text('content'),
  messageType: text('message_type'), //text, tool_call
  metadata: jsonb('metadata'),
  parentMessageId: integer('parent_message_id'), // For threaded
  isDeleted: boolean('is_deleted').default(false),
}, (table) => [
  index('ai_messages_session_id_idx').on(table.sessionId),
  index('ai_messages_run_id_idx').on(table.runId),
  index('ai_messages_created_at_idx').on(table.createdAt)
])

// AI Models - define available AI models and their costs
export const aiModels = pgTable('ai_models', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // Model display name
  code: text('code').notNull(), // Model code for API calls
  description: text('description'), // Model description
  category: text('category').notNull(), // Model category: 'text', 'image', 'audio', 'video', 'multimodal'
  cost: integer('cost').notNull(), // Credits per use
  isPremium: boolean('is_premium').default(false), // Whether this is a premium model
  allowAttachments: boolean('allow_attachments').default(false), // Whether this model supports attachments
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  metadata: jsonb('metadata'), // Additional model details
}, (table) => [
  index('ai_models_is_active_idx').on(table.isActive),
  index('ai_models_category_idx').on(table.category),
])

// AI Image Generations - track generation requests
export const aiImageGenerations = pgTable('ai_image_generations', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  prompt: text('prompt').notNull(),
  style: text('style'),
  ratio: text('ratio'),
  modelCode: text('model_code'), // AI model code used (references ai_models.code)
  cost: integer('cost'), // Cost in credits
  designId: text('design_id'), // UUID of the design
  attachments: jsonb('attachments'), // Array of attachment info
  status: text('status').notNull().default('pending'), // pending, completed, failed
  assetId: integer('asset_id'), // Reference to assets table
  metadata: jsonb('metadata'), // Additional details (pageId, elementId, error, etc.)
}, (table) => [
  index('ai_gen_user_id_idx').on(table.userId),
  index('ai_gen_status_idx').on(table.status),
  index('ai_gen_created_at_idx').on(table.createdAt),
])


export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique(),
  emailVerified: boolean('emailVerified').default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  role: text('role').default('user'),
  banned: boolean('banned').default(false),
  banReason: text('banReason'),
  banExpires: timestamp('banExpires'),
  lang: text('lang').default('en'),
  currentPlanId: integer('current_plan_id'), // Reference to pricingPlans (free, one-time, or subscription)
}, (table) => [
  index('user_current_plan_idx').on(table.currentPlanId),
])

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull(),
  impersonatedBy: text('impersonatedBy'),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// OAuth tables
export const oauthApplication = pgTable('oauth_application', {
  id: text('id').primaryKey(),
  clientId: text('clientId').notNull().unique(),
  clientSecret: text('clientSecret'),
  name: text('name').notNull(),
  redirectURLs: text('redirectURLs'), // Comma-separated list of redirect URLs
  metadata: jsonb('metadata'), // Additional metadata for the OAuth client
  type: text('type'), // Type of OAuth client (e.g., web, mobile)
  disabled: boolean('disabled').default(false),
  userId: text('userId'), // ID of the user who owns the client (optional)
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const oauthAccessToken = pgTable('oauth_access_token', {
  id: text('id').primaryKey(),
  accessToken: text('accessToken').notNull().unique(),
  refreshToken: text('refreshToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  clientId: text('clientId').notNull(),
  userId: text('userId').notNull(),
  scopes: jsonb('scopes').notNull(), // Array of scopes granted
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const oauthConsent = pgTable('oauth_consent', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  clientId: text('clientId').notNull(),
  scopes: jsonb('scopes').notNull(), // Array of scopes consented to
  consentGiven: boolean('consentGiven').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Pricing plans - available subscription plans and credit packages
export const pricingPlans = pgTable('pricing_plans', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: text('name').notNull(), // Free, Basic, Pro, or credit package name
  slug: text('slug').notNull().unique(), // free, basic, pro, credits-100, credits-500
  type: text('type').notNull(), // subscription, one_time, top_up
  price: integer('price').notNull(), // Current/sale price in cents (e.g., 999 = $9.99)
  regularPrice: integer('regular_price'), // Original/market price in cents (null if no discount)
  currency: text('currency').notNull().default('USD'),
  billingPeriod: text('billing_period'), // monthly, yearly, null for one-time
  credits: integer('credits'), // Credits included (for subscriptions) or purchased (for one-time)
  storageLimit: integer('storage_limit'), // Storage limit in MB (converted to bytes in user_storage)
  features: jsonb('features'), // Array of feature keys: ["hd_export", "priority_support", "remove_watermark"]
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  tier: integer('tier').default(0), // Plan tier level for upgrade/downgrade logic (0=free, 1=basic, 2=pro, etc.)
  metadata: jsonb('metadata'), // Additional plan details
}, (table) => [
  index('pricing_plans_type_idx').on(table.type),
  index('pricing_plans_is_active_idx').on(table.isActive),
])

// User subscriptions - track user's current plan and membership status
export const userSubscriptions = pgTable('user_subscriptions', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  planId: integer('plan_id').notNull(), // Reference to pricingPlans
  status: text('status').notNull(), // active, canceled, expired, past_due
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'), // null for lifetime, date for expiration
  canceledAt: timestamp('canceled_at'),
  cancelReason: text('cancel_reason'),
  autoRenew: boolean('auto_renew').default(true),
  paymentProvider: text('payment_provider'), // stripe, paypal, etc.
  externalSubscriptionId: text('external_subscription_id'), // ID from payment provider
  metadata: jsonb('metadata'), // Additional subscription details
}, (table) => [
  index('user_subscriptions_user_id_idx').on(table.userId),
  index('user_subscriptions_status_idx').on(table.status),
  index('user_subscriptions_plan_id_idx').on(table.planId),
])

// Orders - keep all purchase history
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  orderNumber: text('order_number').notNull().unique(), // Human-readable order number
  type: text('type').notNull(), // subscription, credits, upgrade
  status: text('status').notNull(), // pending, completed, failed, refunded, canceled
  amount: integer('amount').notNull(), // Total amount in cents
  currency: text('currency').notNull().default('USD'),
  paymentProvider: text('payment_provider'), // stripe, paypal, etc.
  paymentMethod: text('payment_method'), // card, paypal, etc.
  externalOrderId: text('external_order_id'), // ID from payment provider
  externalPaymentId: text('external_payment_id'), // Payment/transaction ID from provider
  planId: integer('plan_id'), // Reference to pricingPlans if applicable
  subscriptionId: integer('subscription_id'), // Reference to userSubscriptions if applicable
  creditPackageId: integer('credit_package_id'), // Reference to userCredits if applicable
  items: jsonb('items').notNull(), // Array of order items with details
  billingDetails: jsonb('billing_details'), // Customer billing information
  refundedAt: timestamp('refunded_at'),
  refundAmount: integer('refund_amount'), // Refund amount in cents
  refundReason: text('refund_reason'),
  metadata: jsonb('metadata'), // Additional order details
}, (table) => [
  index('orders_user_id_idx').on(table.userId),
  index('orders_status_idx').on(table.status),
  index('orders_created_at_idx').on(table.createdAt),
  index('orders_order_number_idx').on(table.orderNumber),
])

// User credits - individual credit packages with expiration
export const userCredits = pgTable('user_credits', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  amount: integer('amount').notNull(), // Initial credit amount
  remaining: integer('remaining').notNull(), // Remaining credits in this package
  source: text('source').notNull(), // purchase, bonus, refund, admin_grant, promotion
  expiresAt: timestamp('expires_at'), // null for non-expiring credits
  isExpired: boolean('is_expired').default(false),
  metadata: jsonb('metadata'), // Additional details (order ID, promotion code, related entity IDs, etc.)
}, (table) => [
  index('user_credits_user_id_idx').on(table.userId),
  index('user_credits_expires_at_idx').on(table.expiresAt),
  index('user_credits_is_expired_idx').on(table.isExpired),
])

// Credit transactions for tracking all credit movements
export const creditTransactions = pgTable('credit_transactions', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  creditPackageId: integer('credit_package_id'), // Reference to userCredits if applicable
  amount: integer('amount').notNull(), // Positive for credits added, negative for credits spent
  type: text('type').notNull(), // grant, usage, refund, expiration, admin_adjustment
  category: text('category'), // ai_generation, template_download, export, etc.
  description: text('description'),
  metadata: jsonb('metadata'), // Additional transaction details (related entity IDs, feature details, etc.)
}, (table) => [
  index('credit_transactions_user_id_idx').on(table.userId),
  index('credit_transactions_created_at_idx').on(table.createdAt),
  index('credit_transactions_type_idx').on(table.type),
  index('credit_transactions_package_id_idx').on(table.creditPackageId),
])

// User Storage Usage - track total storage used per user
export const userStorage = pgTable('user_storage', {
  userId: text('user_id').notNull().primaryKey(),
  limitBytes: bigint('limit_bytes', { mode: 'number' }), // User's storage limit in bytes (converted from plan MB)
  usedBytes: bigint('used_bytes', { mode: 'number' }).default(0), // Total storage used in bytes
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('user_storage_user_id_idx').on(table.userId),
])
