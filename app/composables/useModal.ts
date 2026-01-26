import { ref } from 'vue'
import type { ModalConfig } from '~/config/types'

// Global modal state
const modalState = ref({
    isOpen: false,
    config: null as ModalConfig | null,
    currentItem: null as any,
    currentHandler: null as any
})

const modalRef = ref<any>(null)

export const useModal = () => {
    const openModal = (config: ModalConfig, item: any, handler: any) => {
        modalState.value = {
            isOpen: true,
            config,
            currentItem: item,
            currentHandler: handler
        }
    }

    const closeModal = () => {
        modalState.value = {
            isOpen: false,
            config: null,
            currentItem: null,
            currentHandler: null
        }
    }

    const submitModal = async (formData: Record<string, any>) => {
        if (modalState.value.currentHandler && modalState.value.currentItem) {
            try {
                if (modalRef.value) {
                    modalRef.value.setSubmitting(true)
                }

                const result = await (modalState.value.currentHandler as any)(
                    modalState.value.currentItem,
                    formData
                )

                if (result?.success) {
                    closeModal()
                    return result
                }
            } catch (error: any) {
                if (modalRef.value) {
                    modalRef.value.setError(error.message || 'An error occurred')
                }
                throw error
            } finally {
                if (modalRef.value) {
                    modalRef.value.setSubmitting(false)
                }
            }
        }
    }

    const setModalRef = (ref: any) => {
        modalRef.value = ref
    }

    return {
        modalState,
        openModal,
        closeModal,
        submitModal,
        setModalRef
    }
}
