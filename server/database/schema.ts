import { pgTable, text, integer, boolean, timestamp, serial, index, uniqueIndex } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  role: text('role').default('user'),
  banned: boolean('banned').default(false),
  banReason: text('banReason'),
  banExpires: timestamp('banExpires'),
})

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

// User uploaded images and assets
export const assets = pgTable('assets', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  fileSize: integer('file_size').notNull(), // in bytes
  width: integer('width'), // for images
  height: integer('height'), // for images
  assetType: text('asset_type').notNull(), // image, doc, etc.
  source: text('source'), // upload, generated, etc.
  hash: text('hash'), // Perceptual hash for image similarity searches (only for image types)
  tags: text('tags'), // JSON array of tags
  metadata: text('metadata'), // JSON field for additional information like description, memo, etc.
}, (table) => [
  index('assets_user_id_idx').on(table.userId), // For filtering user's assets
  index('assets_created_at_idx').on(table.createdAt), // For sorting by date
])

export const articles = pgTable('articles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(), // Base slug (language-agnostic)

  // Author and ownership
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(),

  // Publishing and status
  status: text('status').default('draft'), // draft, published, private

  // Categorization
  categorySlug: text('category_slug'), // References slug in articleCategories
  // Content features
  allowComments: boolean('allow_comments').default(true),
  isFeatured: boolean('is_featured').default(false),
  isPinned: boolean('is_pinned').default(false),

  // Current moderation status
  moderationStatus: text('moderation_status').default('pending'), // pending, approved, rejected, deleted

  // Engagement metrics
  commentCount: integer('comment_count').default(0),
  viewCount: integer('view_count').default(0),

  // Primary language (the original language this article was created in)
  primaryLocale: text('primary_locale').default('en'),

  // Metadata (additional settings, SEO, featured image, etc.)
  metadata: text('metadata'), // JSON for featured image, SEO, settings, etc.

  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('articles_slug_idx').on(table.slug), // For URL lookups
  index('articles_user_id_idx').on(table.userId), // For author's articles
  index('articles_status_moderation_idx').on(table.status, table.moderationStatus), // Compound index for filtering
  index('articles_created_at_idx').on(table.createdAt), // For sorting by date
  uniqueIndex('articles_slug_unique').on(table.slug), // Ensure unique URLs
])

// Article content in different languages
export const articleContent = pgTable('article_content', {
  id: text('id').primaryKey(),
  articleId: text('article_id').notNull(),
  locale: text('locale').notNull(), // en, de, es, fr, ja, ko, zh, zh-Hant
  title: text('title').notNull(),
  description: text('description'), // Brief summary/excerpt
  content: text('content').notNull(), // Markdown content
  metadata: text('metadata'), // JSON for all metadata: SEO, Schema.org, og tags, etc.
}, (table) => [
  index('article_content_article_id_idx').on(table.articleId), // For finding content by article
  uniqueIndex('article_content_article_locale_unique').on(table.articleId, table.locale), // Ensure one per language
])

// Unified content moderation history/log (for both articles and comments)
export const contentModerationLog = pgTable('content_moderation_log', {
  id: text('id').primaryKey(),

  // Content reference (can be article or comment)
  contentId: text('content_id').notNull(), // ID of the article or comment
  contentType: text('content_type').notNull(), // 'article' or 'comment'

  userId: text('user_id'), // User ID who performed the moderation action
  action: text('action').notNull(), // submitted, approved, rejected, deleted, etc

  // Moderation details and context (reports, reasons, notes, etc.)
  metadata: text('metadata'), // JSON for all moderation context
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('content_moderation_log_content_idx').on(table.contentId, table.contentType), // Compound index for content lookup
  index('content_moderation_log_created_at_idx').on(table.createdAt), // For sorting by date
  // Removed: separate contentId, contentType, userId indexes (compound covers most cases)
])

// Article categories
export const articleCategories = pgTable('article_categories', {
  id: text('id').primaryKey(), // Unique ID per language version
  name: text('name').notNull(),
  slug: text('slug').notNull(), // Same English slug across all locales
  description: text('description'),
  parentId: text('parent_id'), // For hierarchical categories
  locale: text('locale').default('en'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('article_categories_slug_locale_idx').on(table.slug, table.locale), // Compound for category lookups
  index('article_categories_parent_id_idx').on(table.parentId), // For hierarchical queries
  uniqueIndex('article_categories_slug_locale_unique').on(table.slug, table.locale), // Ensure unique per language
])

// Article comments
export const articleComments = pgTable('article_comments', {
  id: text('id').primaryKey(),
  articleId: text('article_id').notNull(),
  userId: text('user_id').notNull(), // Required - only registered users can comment
  userName: text('user_name').notNull(), // For display name
  content: text('content').notNull(),
  parentId: text('parent_id'), // For nested comments
  threadLevel: integer('thread_level').default(0),

  // Comments only need moderation status, no publishing status needed
  moderationStatus: text('moderation_status').default('pending'), // pending, approved, rejected, spam, deleted

  metadata: text('metadata'), // JSON for IP, user agent, moderation notes, etc.
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('article_comments_article_id_idx').on(table.articleId), // For loading article comments
  index('article_comments_parent_id_idx').on(table.parentId), // For nested comment threads
  index('article_comments_moderation_status_idx').on(table.moderationStatus), // For moderation queue
])
