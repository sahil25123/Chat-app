import {create} from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => {
        // Clear messages when switching conversations
        set({ selectedConversation, messages: [] });
    },
    messages: [],
    setMessages: (messages) => set({messages}),
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    })),
    clearMessages: () => set({ messages: [] }),
}));

export default useConversation;
