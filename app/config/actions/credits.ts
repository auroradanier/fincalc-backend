import type { H3Event } from 'h3'

export const creditActions = {
  async grantCreditToUser(item: any, formData?: { amount: number, description: string, shouldExpire: boolean }) {
    try {
      // If formData is not provided, this is being called from the old flow
      // Return a special flag to indicate modal should be shown
      if (!formData) {
        return { showModal: true, user: item }
      }

      const { amount, description, shouldExpire } = formData

      // Validate amount
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error('Please enter a valid credit amount')
      }

      // Calculate expiration date if needed
      let expiresAt = null
      if (shouldExpire) {
        expiresAt = new Date()
        expiresAt.setFullYear(expiresAt.getFullYear() + 1)
      }

      // Create new credit package - use item.id since this is now called from user table
      const creditData: any = {
        userId: item.id, // Changed from item.userId to item.id since this is the user record
        amount: Number(amount),
        remaining: Number(amount),
        source: 'admin_grant',
        metadata: {
          grantedBy: 'admin',
          description: description,
          userEmail: item.email, // Add user email for reference
          userName: item.name // Add user name for reference
        }
      }

      // Only add expiresAt if credits should expire
      if (expiresAt !== null) {
        creditData.expiresAt = expiresAt
      }

      console.log('Creating credit grant:', creditData)

      const creditResult = await $fetch('/api/v1/userCredits', {
        method: 'POST',
        body: creditData, // $fetch automatically handles JSON serialization
      }) as any

      if (!creditResult.success) {
        throw new Error(creditResult.message || 'Failed to grant credits')
      }

      // Create transaction record
      const transactionData = {
        userId: item.id, // Changed from item.userId to item.id
        creditPackageId: creditResult.data.id,
        amount: Number(amount),
        type: 'grant',
        category: 'admin_grant',
        description: `Admin granted ${amount} credits to ${item.name} (${item.email}): ${description}`,
        metadata: {
          grantedBy: 'admin',
          userEmail: item.email,
          userName: item.name
        }
      }

      await $fetch('/api/v1/creditTransactions', {
        method: 'POST',
        body: transactionData, // $fetch automatically handles JSON serialization
      })

      return {
        success: true,
        message: `Successfully granted ${amount} credits to ${item.name} (${item.email})`,
        creditPackageId: creditResult.data.id
      }
    } catch (error) {
      console.error('Error in grantCreditToUser:', error)
      throw error
    }
  }
}

export default creditActions