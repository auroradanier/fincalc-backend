import { GoogleGenAI, Modality } from '@google/genai'

// Lazy-loaded AI client instance
let aiClient: GoogleGenAI | null = null
const config = useRuntimeConfig()

export async function generateContent(prompt: string): Promise<string> {
  try {
    // Initialize AI client if not already done
    if (!aiClient) {
      const apiKey = config.geminiApiKey
      
      if (!apiKey) {
        throw new Error('Gemini API key not configured')
      }
      
      aiClient = new GoogleGenAI({ apiKey })
    }
    
    // Generate content using the recommended model
    const response = await aiClient.models.generateContent({
      model: config.googleModel,
      contents: prompt,
    })
    
    return response.text || ''
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}

export async function generateImage(prompt: string, inputImage?: string): Promise<{ imageData: string; text?: string | null; mimeType?: string }> {
  try {
    // Initialize AI client if not already done
    if (!aiClient) {
      const apiKey = config.geminiApiKey
      
      if (!apiKey) {
        throw new Error('Gemini API key not configured')
      }
      
      aiClient = new GoogleGenAI({ apiKey })
    }
    
    // Prepare contents for image generation based on the sample code
    let contents: any
    
    if (inputImage) {
      // Text-with-image-to-image: include both text prompt and input image
      // Detect MIME type from base64 data or default to image/jpeg
      let mimeType = 'image/jpeg'; // Default
      if (inputImage.startsWith('/9j/')) {
        mimeType = 'image/jpeg';
      } else if (inputImage.startsWith('iVBORw0KGgo')) {
        mimeType = 'image/png';
      } else if (inputImage.startsWith('R0lGOD')) {
        mimeType = 'image/gif';
      } else if (inputImage.startsWith('UklGR')) {
        mimeType = 'image/webp';
      }
      
      contents = [
        { text: prompt },
        {
          inlineData: {
            mimeType: mimeType,
            data: inputImage // Base64 encoded image data
          }
        }
      ]
    } else {
      // Text-to-image: only text prompt
      contents = [{ text: prompt }]
    }
    
    console.log('google image model', config.googleImageModel)

    const response = await aiClient.models.generateContent({
      model: config.googleImageModel,
      config: {
        responseModalities: ['IMAGE', 'TEXT']
      },
      contents
    })
    
    
    // Extract image data and optional text from response
    let imageData = null
    let text = null
    
    if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            text = part.text
          } else if (part.inlineData && part.inlineData.data) {
            // Handle both ArrayBuffer and base64 string cases
            const data = part.inlineData.data as any
            const mimeType = part.inlineData.mimeType
            console.log('Image data details:', {
              mimeType,
              dataType: typeof data,
              isArrayBuffer: data instanceof ArrayBuffer,
              dataLength: data.length || data.byteLength
            })
            
            if (data instanceof ArrayBuffer) {
              // Convert ArrayBuffer to base64
              const buffer = Buffer.from(data)
              imageData = buffer.toString('base64')
            } else if (typeof data === 'string') {
              imageData = data
            } else {
              console.error('Unexpected image data type:', typeof data)
            }
          }
        }
      }
    
    if (!imageData) {
      throw new Error('No image data received from Gemini API')
    }
    
    return {
      imageData: String(imageData),
      text: text ? String(text) : null,
      mimeType: String(response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.mimeType || '')
    }
  } catch (error) {
    console.error('Gemini Image Generation API error:', error)
    throw error
  }
}