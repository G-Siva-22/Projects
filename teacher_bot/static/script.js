document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const questionForm = document.getElementById('question-form');
    const questionInput = document.getElementById('question-input');
    const conversationContainer = document.getElementById('conversation-container');
    const audioPlayer = document.getElementById('audio-player');
    const audioPlayerContainer = document.querySelector('.audio-player-container');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const audioProgress = document.getElementById('audio-progress');
    
    // Add event listeners
    questionForm.addEventListener('submit', handleQuestionSubmit);
    playPauseBtn.addEventListener('click', toggleAudioPlayback);
    audioPlayer.addEventListener('timeupdate', updateAudioProgress);
    audioPlayer.addEventListener('ended', resetAudioPlayer);
    
    // Handle form submission
    async function handleQuestionSubmit(event) {
        event.preventDefault();
        
        const question = questionInput.value.trim();
        if (!question) return;
        
        // Add user message to conversation
        addMessageToConversation('user', question);
        
        // Clear input
        questionInput.value = '';
        
        // Show loading indicator
        const loadingIndicator = addLoadingIndicator();
        
        try {
            // Send request to backend
            const response = await fetch('/ask_teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });
            
            if (!response.ok) {
                throw new Error('Failed to get response');
            }
            
            const data = await response.json();
            
            // Remove loading indicator
            loadingIndicator.remove();
            
            // Add teacher's response to conversation
            addMessageToConversation('teacher', data.response);
            
            // Setup audio player
            setupAudioPlayer(data.audio);
            
        } catch (error) {
            console.error('Error:', error);
            
            // Remove loading indicator
            loadingIndicator.remove();
            
            // Show error message
            addMessageToConversation('teacher', 'Sorry, I encountered an error while processing your question. Please try again.');
        }
        
        // Scroll to bottom of conversation
        scrollToBottom();
    }
    
    // Add message to conversation
    function addMessageToConversation(role, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = role === 'user' ? 'user-message' : 'teacher-message';
        
        const isUser = role === 'user';
        const alignmentClass = isUser ? 'justify-end' : '';
        
        messageDiv.innerHTML = `
            <div class="flex items-start gap-3 ${alignmentClass}">
                ${isUser ? '' : `
                <div class="teacher-avatar flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                </div>
                `}
                <div class="message-bubble ${isUser ? 'bg-purple-600 text-white' : 'bg-indigo-50 text-slate-700'} p-4 rounded-lg ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[85%]">
                    <p>${message}</p>
                </div>
                ${isUser ? `
                <div class="user-avatar flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        
        // Add animation classes
        messageDiv.classList.add('message-enter');
        conversationContainer.appendChild(messageDiv);
        
        // Trigger animation
        setTimeout(() => {
            messageDiv.classList.add('message-enter-active');
        }, 10);
    }
    
    // Add loading indicator
    function addLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'teacher-message';
        loadingDiv.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="teacher-avatar flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                </div>
                <div class="message-bubble bg-indigo-50 p-4 rounded-lg rounded-tl-none">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        
        conversationContainer.appendChild(loadingDiv);
        scrollToBottom();
        return loadingDiv;
    }
    
    // Setup audio player
    function setupAudioPlayer(audioSrc) {
        audioPlayer.src = audioSrc;
        audioPlayerContainer.classList.remove('hidden');
        
        // Reset play button icon to play
        updatePlayPauseButton(false);
        
        // Reset progress bar
        audioProgress.style.width = '0%';
    }
    
    // Toggle audio playback
    function toggleAudioPlayback() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            updatePlayPauseButton(true);
        } else {
            audioPlayer.pause();
            updatePlayPauseButton(false);
        }
    }
    
    // Update play/pause button icon
    function updatePlayPauseButton(isPlaying) {
        if (isPlaying) {
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            `;
        } else {
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
            `;
        }
    }
    
    // Update audio progress bar
    function updateAudioProgress() {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        audioProgress.style.width = `${percentage}%`;
    }
    
    // Reset audio player when audio ends
    function resetAudioPlayer() {
        updatePlayPauseButton(false);
        audioProgress.style.width = '0%';
    }
    
    // Scroll to bottom of conversation
    function scrollToBottom() {
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }
});