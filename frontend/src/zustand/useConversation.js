import {create} from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set((state) => {
        if (state.selectedConversation?._id !== selectedConversation?._id) {
            // Only clear if switching to a different conversation
            return { selectedConversation, messages: [] };
        }
        return { selectedConversation };
    }),
    messages: [],
    setMessages: (messages) => set((state) => ({
        messages: typeof messages === 'function' ? messages(state.messages) : messages
    })),
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    })),
    clearMessages: () => set({ messages: [] }),
}));

export default useConversation;
