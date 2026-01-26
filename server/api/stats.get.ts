import { tables } from '~~/server/middleware/db'
import { sql } from 'drizzle-orm'
import { defineEventHandler, getQuery } from 'h3'
import { parseISO, isValid } from 'date-fns'

export default defineEventHandler(async (event) => {
  try {
    const db = event.context.db

    if (!db) {
      throw createError({
        statusCode: 500,
        message: 'Database not initialized'
      })
    }

    const query = getQuery(event)
    const startDate = query.startDate ? parseISO(query.startDate as string) : null
    const endDate = query.endDate ? parseISO(query.endDate as string) : null

    if (startDate && !isValid(startDate)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid start date'
      })
    }

    if (endDate && !isValid(endDate)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid end date'
      })
    }

    if (startDate && endDate && startDate > endDate) {
      throw createError({
        statusCode: 400,
        message: 'Start date must be before end date'
      })
    }

    const totalUsersResult = await db.execute(sql`SELECT COUNT(*) as count FROM "user"`)
    const totalDesignsResult = await db.execute(sql`SELECT COUNT(*) as count FROM designs`)
    const totalSubscriptionsResult = await db.execute(sql`SELECT COUNT(*) as count FROM user_subscriptions`)
    const totalOrdersResult = await db.execute(sql`SELECT COUNT(*) as count FROM orders`)
    
    let totalAiImages = 0
    try {
      const totalAiImagesResult = await db.execute(sql`SELECT COUNT(*) as count FROM ai_image_generations`)
      totalAiImages = Number(totalAiImagesResult.rows[0]?.count || 0)
    } catch (e) {
      totalAiImages = 0
    }

    const totalUsers = Number(totalUsersResult.rows[0]?.count || 0)
    const totalDesigns = Number(totalDesignsResult.rows[0]?.count || 0)
    const totalSubscriptions = Number(totalSubscriptionsResult.rows[0]?.count || 0)
    const totalOrders = Number(totalOrdersResult.rows[0]?.count || 0)

    let usersQuery = sql`SELECT DATE("createdAt") as date, COUNT(*) as count FROM "user"`
    let designsQuery = sql`SELECT DATE("created_at") as date, COUNT(*) as count FROM designs`
    let subscriptionsQuery = sql`SELECT DATE("created_at") as date, COUNT(*) as count FROM user_subscriptions`
    let ordersQuery = sql`SELECT DATE("created_at") as date, COUNT(*) as count FROM orders`
    let aiImagesQuery: any = null
    
    try {
      aiImagesQuery = sql`SELECT DATE("created_at") as date, COUNT(*) as count FROM ai_image_generations`
    } catch (e) {
      aiImagesQuery = null
    }

    if (startDate || endDate) {
      if (startDate && endDate) {
        usersQuery = sql`${usersQuery} WHERE "createdAt" >= ${startDate.toISOString()} AND "createdAt" <= ${endDate.toISOString()}`
        designsQuery = sql`${designsQuery} WHERE "created_at" >= ${startDate.toISOString()} AND "created_at" <= ${endDate.toISOString()}`
        subscriptionsQuery = sql`${subscriptionsQuery} WHERE "created_at" >= ${startDate.toISOString()} AND "created_at" <= ${endDate.toISOString()}`
        ordersQuery = sql`${ordersQuery} WHERE "created_at" >= ${startDate.toISOString()} AND "created_at" <= ${endDate.toISOString()}`
        if (aiImagesQuery) {
          aiImagesQuery = sql`${aiImagesQuery} WHERE "created_at" >= ${startDate.toISOString()} AND "created_at" <= ${endDate.toISOString()}`
        }
      } else if (startDate) {
        usersQuery = sql`${usersQuery} WHERE "createdAt" >= ${startDate.toISOString()}`
        designsQuery = sql`${designsQuery} WHERE "created_at" >= ${startDate.toISOString()}`
        subscriptionsQuery = sql`${subscriptionsQuery} WHERE "created_at" >= ${startDate.toISOString()}`
        ordersQuery = sql`${ordersQuery} WHERE "created_at" >= ${startDate.toISOString()}`
        if (aiImagesQuery) {
          aiImagesQuery = sql`${aiImagesQuery} WHERE "created_at" >= ${startDate.toISOString()}`
        }
      } else if (endDate) {
        usersQuery = sql`${usersQuery} WHERE "createdAt" <= ${endDate.toISOString()}`
        designsQuery = sql`${designsQuery} WHERE "created_at" <= ${endDate.toISOString()}`
        subscriptionsQuery = sql`${subscriptionsQuery} WHERE "created_at" <= ${endDate.toISOString()}`
        ordersQuery = sql`${ordersQuery} WHERE "created_at" <= ${endDate.toISOString()}`
        if (aiImagesQuery) {
          aiImagesQuery = sql`${aiImagesQuery} WHERE "created_at" <= ${endDate.toISOString()}`
        }
      }
    }

    usersQuery = sql`${usersQuery} GROUP BY DATE("createdAt") ORDER BY date ASC`
    designsQuery = sql`${designsQuery} GROUP BY DATE("created_at") ORDER BY date ASC`
    subscriptionsQuery = sql`${subscriptionsQuery} GROUP BY DATE("created_at") ORDER BY date ASC`
    ordersQuery = sql`${ordersQuery} GROUP BY DATE("created_at") ORDER BY date ASC`
    if (aiImagesQuery) {
      aiImagesQuery = sql`${aiImagesQuery} GROUP BY DATE("created_at") ORDER BY date ASC`
    }

    const usersByDateResult = await db.execute(usersQuery)
    const designsByDateResult = await db.execute(designsQuery)
    const subscriptionsByDateResult = await db.execute(subscriptionsQuery)
    const ordersByDateResult = await db.execute(ordersQuery)
    
    let aiImagesByDateResult: any = null
    if (aiImagesQuery) {
      try {
        aiImagesByDateResult = await db.execute(aiImagesQuery)
      } catch (e) {
        aiImagesByDateResult = null
      }
    }

    const usersByDate = usersByDateResult.rows.map((row: any) => ({
      date: row.date,
      count: Number(row.count)
    }))

    const designsByDate = designsByDateResult.rows.map((row: any) => ({
      date: row.date,
      count: Number(row.count)
    }))

    const subscriptionsByDate = subscriptionsByDateResult.rows.map((row: any) => ({
      date: row.date,
      count: Number(row.count)
    }))

    const ordersByDate = ordersByDateResult.rows.map((row: any) => ({
      date: row.date,
      count: Number(row.count)
    }))

    const aiImagesByDate = aiImagesByDateResult ? aiImagesByDateResult.rows.map((row: any) => ({
      date: row.date,
      count: Number(row.count)
    })) : []

    return {
      success: true,
      data: {
        totalUsers,
        totalDesigns,
        totalSubscriptions,
        totalOrders,
        totalAiImages,
        usersByDate,
        designsByDate,
        subscriptionsByDate,
        ordersByDate,
        aiImagesByDate,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString()
      }
    }
  } catch (error: any) {
    console.error('Stats API error:', error)
    return {
      success: false,
      message: error.message || 'Failed to fetch stats'
    }
  }
})
