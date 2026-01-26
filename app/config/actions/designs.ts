import type { H3Event } from 'h3'

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Helper function to update timestamps in design data
const updateDesignDataTimestamps = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => updateDesignDataTimestamps(item))
  }

  if (data && typeof data === 'object') {
    const updated: any = {}
    for (const [key, value] of Object.entries(data)) {
      // Update timestamp fields to current time - using exact keys from designs table schema
      if (['createdAt', 'updatedAt'].includes(key)) {
        updated[key] = new Date().toISOString()
      } else {
        updated[key] = updateDesignDataTimestamps(value)
      }
    }
    return updated
  }

  return data
}

export const designActions = {
  async setAsTemplate(item: any, event?: H3Event) {
    let designData
    try {
      designData = typeof item.designData === 'string'
        ? JSON.parse(item.designData)
        : item.designData
    } catch (e) {
      throw new Error('Invalid design data format')
    }

    const cleanedData = updateDesignDataTimestamps(designData)

    let existingTemplate = null
    const checkResult = await $fetch(`/api/v1/templates?designUuid=${item.uuid}`, {
      method: 'GET'
    }).catch(() => ({ success: false, data: { items: [] } }))

    if (checkResult.success && 'data' in checkResult && checkResult.data && 'items' in checkResult.data && Array.isArray(checkResult.data.items) && checkResult.data.items.length > 0) {
      existingTemplate = checkResult.data.items.find((template: any) =>
        template.designUuid === item.uuid
      )
    }

    let thumbnailPath = ''
    try {
      const previewResponse = await $fetch('/api/image/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          designId: item.id,
          pageNumber: 1,
          generateThumbnail: true
        }),
      })

      if (!previewResponse.success) {
        throw new Error(previewResponse.message || 'Preview generation failed')
      }

      if (!previewResponse.thumbnailUrl) {
        throw new Error('Thumbnail URL not returned from preview generation')
      }

      thumbnailPath = previewResponse.thumbnailUrl
    } catch (previewError) {
      throw new Error(`Thumbnail generation failed: ${previewError instanceof Error ? previewError.message : 'Unknown error'}`)
    }

    const templateData = {
      title: item.title,
      description: item.description || '',
      designUuid: item.uuid,
      designData: JSON.stringify(cleanedData),
      width: item.width,
      height: item.height,
      aspectRatio: (item.width && item.height) ? `${Number(item.width) / gcd(Number(item.width), Number(item.height))}:${Number(item.height) / gcd(Number(item.width), Number(item.height))}` : null,
      tags: item.tags,
      categoryId: 1,
      userId: item.userId,
      thumbnail: thumbnailPath,
      isActive: true,
      isPremium: false,
      isFeatured: false
    }

    let templateResult: any
    if (existingTemplate) {
      templateResult = await $fetch(`/api/v1/templates/${existingTemplate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...templateData,
          id: existingTemplate.id
        }),
      })
    } else {
      templateResult = await $fetch('/api/v1/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      })
    }

    const templateId = existingTemplate ? existingTemplate.id : templateResult.data?.id
    const updateData = {
      id: item.id,
      templateId: templateId
    }

    await $fetch(`/api/v1/designs/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    return {
      success: true,
      message: existingTemplate ? 'Template successfully updated' : 'Design successfully set as template',
      templateId: templateId
    }
  },

  async downloadPreview(item: any, event?: H3Event) {
    const previewResponse = await $fetch('/api/image/preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        designId: item.id,
        pageNumber: 1,
        generateThumbnail: false
      }),
    })

    if (previewResponse.success && previewResponse.imageData) {
      return {
        success: true,
        imageData: previewResponse.imageData,
        filename: `design-${item.id}-preview.webp`,
        message: 'Preview image generated successfully'
      }
    } else {
      throw new Error(`Preview generation failed: ${previewResponse.message || 'Unknown error'}`)
    }
  }
}

export default designActions