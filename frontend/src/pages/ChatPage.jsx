import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ActiveTabSwitch from "../components/ActiveTabSwitch"; 
import ContactList from "../components/ContactList";
import ProfileHeader from "../components/ProfileHeader";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder";
import ChatsList from "../components/ChatsList";


function ChatPage() {
  const {logout} = useAuthStore();
  const {activeTab} = useChatStore();
  return (
    <div className="relaive w-full max-w-6xl h-[800px]">

      <BorderAnimatedContainer>
        {/* left side */}
        <div className = "w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
        <ProfileHeader/>
        <ActiveTabSwitch/>

        <div className= "flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList/> : <ContactList/>}
        </div>
        </div>

        {/* right side */}
        <div className= "flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
        {selectedUser ? <ChatContainer/> : <NoConversationPlaceHolder/>}

        </div>
      </BorderAnimatedContainer>

    </div>
  )
}

export default ChatPage
