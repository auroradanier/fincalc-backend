ALTER TABLE "article_content" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "article_content" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
CREATE INDEX "article_content_created_at_idx" ON "article_content" USING btree ("created_at");