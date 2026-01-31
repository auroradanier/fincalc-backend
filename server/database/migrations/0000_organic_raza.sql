CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"parent_id" text,
	"locale" text DEFAULT 'en',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "article_comments" (
	"id" text PRIMARY KEY NOT NULL,
	"article_id" text NOT NULL,
	"user_id" text NOT NULL,
	"user_name" text NOT NULL,
	"content" text NOT NULL,
	"parent_id" text,
	"thread_level" integer DEFAULT 0,
	"moderation_status" text DEFAULT 'pending',
	"metadata" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "article_content" (
	"id" text PRIMARY KEY NOT NULL,
	"article_id" text NOT NULL,
	"locale" text NOT NULL,
	"title" text,
	"description" text,
	"content" text NOT NULL,
	"metadata" text
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"titles" jsonb,
	"descriptions" jsonb,
	"user_id" text NOT NULL,
	"user_name" text NOT NULL,
	"status" text DEFAULT 'draft',
	"category_slug" text,
	"allow_comments" boolean DEFAULT true,
	"is_featured" boolean DEFAULT false,
	"is_pinned" boolean DEFAULT false,
	"moderation_status" text DEFAULT 'pending',
	"comment_count" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"primary_locale" text DEFAULT 'en',
	"metadata" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"filename" text NOT NULL,
	"original_name" text NOT NULL,
	"mime_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"width" integer,
	"height" integer,
	"asset_type" text NOT NULL,
	"source" text,
	"hash" text,
	"tags" text,
	"metadata" text
);
--> statement-breakpoint
CREATE TABLE "content_moderation_log" (
	"id" text PRIMARY KEY NOT NULL,
	"content_id" text NOT NULL,
	"content_type" text NOT NULL,
	"user_id" text,
	"action" text NOT NULL,
	"metadata" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"impersonatedBy" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"emailVerified" boolean DEFAULT false,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"role" text DEFAULT 'user',
	"banned" boolean DEFAULT false,
	"banReason" text,
	"banExpires" timestamp,
	"lang" text DEFAULT 'en',
	"current_plan_id" integer DEFAULT 0,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "article_categories_slug_locale_idx" ON "article_categories" USING btree ("slug","locale");--> statement-breakpoint
CREATE INDEX "article_categories_parent_id_idx" ON "article_categories" USING btree ("parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "article_categories_slug_locale_unique" ON "article_categories" USING btree ("slug","locale");--> statement-breakpoint
CREATE INDEX "article_comments_article_id_idx" ON "article_comments" USING btree ("article_id");--> statement-breakpoint
CREATE INDEX "article_comments_parent_id_idx" ON "article_comments" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "article_comments_moderation_status_idx" ON "article_comments" USING btree ("moderation_status");--> statement-breakpoint
CREATE INDEX "article_content_article_id_idx" ON "article_content" USING btree ("article_id");--> statement-breakpoint
CREATE UNIQUE INDEX "article_content_article_locale_unique" ON "article_content" USING btree ("article_id","locale");--> statement-breakpoint
CREATE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "articles_user_id_idx" ON "articles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "articles_status_moderation_idx" ON "articles" USING btree ("status","moderation_status");--> statement-breakpoint
CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "articles_slug_unique" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "assets_user_id_idx" ON "assets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "assets_created_at_idx" ON "assets" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "content_moderation_log_content_idx" ON "content_moderation_log" USING btree ("content_id","content_type");--> statement-breakpoint
CREATE INDEX "content_moderation_log_created_at_idx" ON "content_moderation_log" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "user_current_plan_idx" ON "user" USING btree ("current_plan_id");