import React, { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../zustand/useConversation';
import useGetConversation from '../hooks/useGetConversation.js'

function SearchBar() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations = [] } = useGetConversation();
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredConversations([]);
      return;
    }

    const filtered = conversations.filter(conversation => {
      if (!conversation || !conversation.fullName || !conversation.username) {
        return false;
      }
      
      const searchTerm = search.toLowerCase();
      const fullName = conversation.fullName?.toLowerCase() || '';
      const username = conversation.username?.toLowerCase() || '';
      
      return fullName.includes(searchTerm) || username.includes(searchTerm);
    });

    setFilteredConversations(filtered);
  }, [search, conversations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredConversations.length > 0) {
      setSelectedConversation(filteredConversations[0]);
      setSearch("");
    }
  };

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='Search conversations...' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-800 placeholder-gray-500'
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </form>
      
      {/* Search Results Dropdown */}
      {search && filteredConversations.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-10">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation._id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              onClick={() => {
                setSelectedConversation(conversation);
                setSearch("");
              }}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                {conversation.fullName?.[0] || '?'}
              </div>
              <div>
                <p className="font-medium text-gray-800">{conversation.fullName || 'Unknown User'}</p>
                <p className="text-sm text-gray-500">@{conversation.username || 'unknown'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
