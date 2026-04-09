// Mobile Navigation
document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Media Library Data
const mediaData = {
    books: [
        { title: "The Path of Faith", url: "https://example.com/book1.pdf", type: "PDF" },
        { title: "Walking in Purpose", url: "https://example.com/book2.pdf", type: "PDF" },
        { title: "Divine Wisdom", url: "https://example.com/book3.pdf", type: "PDF" }
    ],
    audio: [
        { title: "Sunday Sermon - Faith", url: "https://example.com/sermon1.mp3", duration: "45:30" },
        { title: "Wednesday Service - Prayer", url: "https://example.com/sermon2.mp3", duration: "38:15" }
    ],
    video: [
        { title: "The Power of Worship", url: "https://www.youtube.com/embed/VIDEO_ID", type: "YouTube" },
        { title: "Healing Service", url: "https://www.youtube.com/embed/VIDEO_ID2", type: "YouTube" }
    ],
    music: [
        { title: "Worship Medley", url: "https://example.com/worship1.mp3", duration: "12:30" },
        { title: "Hymns of Glory", url: "https://example.com/hymns.mp3", duration: "28:45" }
    ]
};

// Populate Books
function populateBooks() {
    const booksGrid = document.getElementById('books-grid');
    if (booksGrid) {
        booksGrid.innerHTML = mediaData.books.map(book => `
            <div class="media-card">
                <div style="background: #c9a96e; height: 150px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-book-bible" style="font-size: 4rem; color: white;"></i>
                </div>
                <h3>${book.title}</h3>
                <p>Format: ${book.type}</p>
                <a href="${book.url}" class="download-btn" download>Download Now</a>
            </div>
        `).join('');
    }
}

// Populate Audio
function populateAudio() {
    const audioList = document.getElementById('audio-list');
    if (audioList) {
        audioList.innerHTML = mediaData.audio.map(audio => `
            <div class="media-card">
                <div style="background: #4a90e2; height: 100px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-head-side-headphones" style="font-size: 3rem; color: white;"></i>
                </div>
                <h3>${audio.title}</h3>
                <p>Duration: ${audio.duration}</p>
                <audio controls style="width: 100%; margin: 10px 0;">
                    <source src="${audio.url}" type="audio/mpeg">
                </audio>
                <a href="${audio.url}" class="download-btn" download>Download Audio</a>
            </div>
        `).join('');
    }
}

// Tab Switching
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.media-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));
            
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active-section');
        });
    });
}

// Video Call Support
function initVideoCalls() {
    const startVideoBtn = document.getElementById('startVideoCall');
    const startAudioBtn = document.getElementById('startAudioCall');
    
    if (startVideoBtn) {
        startVideoBtn.addEventListener('click', () => {
            const domain = 'meet.jit.si';
            const options = {
                roomName: `GodsTabernacle-${Date.now()}`,
                width: '100%',
                height: 500,
                parentNode: document.body,
                userInfo: {
                    displayName: 'Visitor'
                }
            };
            
            // Create modal for call
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.zIndex = '10000';
            modal.style.padding = '20px';
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '20px';
            closeBtn.style.padding = '10px 20px';
            closeBtn.style.backgroundColor = '#c9a96e';
            closeBtn.style.border = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.zIndex = '10001';
            closeBtn.onclick = () => document.body.removeChild(modal);
            
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            
            const api = new JitsiMeetExternalAPI(domain, {
                ...options,
                parentNode: modal
            });
            
            // Log missed call if not answered after 30 seconds (simplified)
            setTimeout(() => {
                logMissedCall('Video Call');
            }, 30000);
        });
    }
    
    if (startAudioBtn) {
        startAudioBtn.addEventListener('click', () => {
            alert('Audio call feature: Use WhatsApp or phone for voice calls');
            logMissedCall('Audio Call');
        });
    }
}

// Missed Calls Management
function logMissedCall(type) {
    const missedCalls = JSON.parse(localStorage.getItem('missedCalls') || '[]');
    missedCalls.push({
        type: type,
        timestamp: new Date().toLocaleString(),
        from: 'Website Visitor'
    });
    localStorage.setItem('missedCalls', JSON.stringify(missedCalls));
    displayMissedCalls();
}

function displayMissedCalls() {
    const missedCallsList = document.getElementById('missedCallsList');
    if (missedCallsList) {
        const missedCalls = JSON.parse(localStorage.getItem('missedCalls') || '[]');
        if (missedCalls.length === 0) {
            missedCallsList.innerHTML = '<p>No missed calls recorded</p>';
        } else {
            missedCallsList.innerHTML = missedCalls.map(call => `
                <div style="padding: 10px; margin: 5px 0; background: white; border-left: 3px solid #c9a96e;">
                    <strong>${call.type}</strong> - ${call.timestamp}<br>
                    Caller: ${call.from}
                </div>
            `).join('');
        }
    }
}

function clearMissedCalls() {
    localStorage.removeItem('missedCalls');
    displayMissedCalls();
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    populateBooks();
    populateAudio();
    initTabs();
    initVideoCalls();
    displayMissedCalls();
    
    const clearBtn = document.getElementById('clearMissedCalls');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearMissedCalls);
    }
});

// API endpoint for your existing app (simulated)
window.bookAPI = {
    getBooks: () => mediaData.books,
    getDownloadUrl: (bookTitle) => {
        const book = mediaData.books.find(b => b.title === bookTitle);
        return book ? book.url : null;
    }
};
