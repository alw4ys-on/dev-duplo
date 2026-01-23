const input = document.getElementById('command-input');
const output = document.getElementById('output');
const typingSound = document.getElementById('typing-sound');

let commandHistory = [];
let historyIndex = -1;
let currentLevel = 0;

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const commands = {
    help: () => {
        return `
Available Commands:
==================
help            - Show this message
ls              - List available files  
cat [file]      - Display file contents
begin           - Start recruitment process
status          - Check current status
clear           - Clear terminal
whoami          - Display user info
trace           - Traceroute to server
decrypt [text]  - Decrypt encoded messages
scan [target]   - Scan for vulnerabilities
exit            - Close connection

Easter Eggs:
============
Try the Konami Code: ↑↑↓↓←→←→BA
Inspect the source code carefully...
`;
    },
    
    ls: () => {
        return `
total 48K
-rw-r--r-- 1 root daedalus  4.2K manifest.txt
-rw-r--r-- 1 root daedalus  1.8K leaked_db.txt
-rw-r--r-- 1 root daedalus  2.1K ransom_note.txt
-rw------- 1 root daedalus  8.9K key.pgp
drwxr-xr-x 2 root daedalus  4.0K levels/
drwxr-xr-x 2 root daedalus  4.0K tools/

Hint: Use 'cat [filename]' to read files
`;
    },
    
    cat: (args) => {
        const file = args[0];
        
        const files = {
            'manifest.txt': `
╔══════════════════════════════════════════════════════════════╗
║           DAEDALUS RECRUITMENT MANIFEST                      ║
║           Est. 2013 - Operation Cipher                       ║
╚══════════════════════════════════════════════════════════════╝

IF YOU'RE READING THIS, YOU'VE BEEN SELECTED.

We are not Anonymous. We are not LulzSec. We are not APT28.
We are something... different.

Connected operations:
- Cicada 3301 recruitment (2013-2016)
- Project Mayhem 2.0
- Operation DarkSide
- The Deus Group (Mr. Robot reference)

Your initiation consists of 5 levels:
Level 0: Prove you can think
Level 1: Steganography - The art of hiding
Level 2: Cryptography - Break the cipher
Level 3: OSINT - Intelligence gathering
Level 4: Reverse Engineering - See beyond the surface
Level 5: Final Test - Combine everything

First password hint: The society that isn't society + recruit
Format: [word]_[word] (all caps)

BEGIN YOUR JOURNEY: Type 'begin' to proceed
`,
            'leaked_db.txt': `
[LEAKED DATABASE DUMP - 2024-01-15]
Source: Dark Web Market "ShadowNet"
Leaked by: DarkSide Operations

User Records (Sample):
======================
user_id: 3301
username: cicada_admin
email: [REDACTED]@protonmail.com
last_seen: 2016-01-04 23:59:59
status: CLASSIFIED

user_id: 1337
username: elliot_alderson
email: mr[REDACTED]@e-corp-usa.com
last_seen: 2015-07-12 05:09:00
status: FSOCIETY_MEMBER

user_id: 2024
username: lazarus_operator
email: [REDACTED]@yandex.ru
last_seen: 2024-01-10 14:23:45
status: APT_CONFIRMED

[END OF LEAK]
Note: This is a recruitment test. Real credentials never exposed.
`,
            'ransom_note.txt': `
╔═══════════════════════════════════════════════════════════╗
║              YOUR FILES HAVE BEEN ENCRYPTED               ║
║                                                           ║
║  This is a simulation - Ransomware as a Service (RaaS)   ║
╚═══════════════════════════════════════════════════════════╝

All your important documents, photos, databases have been
encrypted with military-grade RSA-4096 encryption.

WITHOUT OUR PRIVATE KEY, RECOVERY IS IMPOSSIBLE.

Payment Details:
- Amount: 0.5 BTC (~$20,000 USD)
- Wallet: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
- Time Limit: 72 hours

After payment, email: darkside_decrypt@protonmail.com

Groups using RaaS model:
- DarkSide (Colonial Pipeline attack)
- REvil (Kaseya attack)  
- LockBit 2.0
- Conti Ransomware

Note: Educational demonstration only. 
Hint for Level 3: Check image metadata carefully.
`,
            'key.pgp': `
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: DAEDALUS 3.301

mQENBF8kMRsBCADKj7qg8VyBjHwN2wKxEh0n...
[TRUNCATED FOR BREVITY]
...Hint: Real PGP not needed. Look elsewhere.
-----END PGP PUBLIC KEY BLOCK-----
`
        };
        
        if (!file) {
            return '<span class="error-msg">[ERROR]</span> Usage: cat [filename]';
        }
        
        if (files[file]) {
            return files[file];
        }
        
        return `<span class="error-msg">[ERROR]</span> File not found: ${file}`;
    },
    
    begin: () => {
        setTimeout(() => {
            window.location.href = 'levels/level0_initiation.html';
        }, 1500);
        
        return `
<span class="success-msg">[INITIATING PROTOCOL]</span>

Establishing secure connection...
Validating identity...
Loading Level 0...

<span class="warning-msg">Remember: We are watching.</span>
`;
    },
    
    status: () => {
        const progress = localStorage.getItem('daedalus_progress') || '0';
        return `
Current Status:
===============
Level Completed: ${progress}/5
Rank: ${progress === '0' ? 'Initiate' : progress === '5' ? 'DAEDALUS Member' : 'In Progress'}
Time Elapsed: ${getElapsedTime()}

${progress === '0' ? 'Type "begin" to start your journey' : 'Continue to next level'}
`;
    },
    
    clear: () => {
        output.innerHTML = '';
        return '';
    },
    
    whoami: () => {
        return `
root@daedalus
You are: INITIATE_${Math.floor(Math.random() * 9999)}
IP: 185.220.101.${Math.floor(Math.random() * 255)}
Location: [HIDDEN VIA TOR]
Clearance: LEVEL_0

"We are legion. We do not forgive. We do not forget."
`;
    },
    
    trace: () => {
        return `
Tracing route to daedalus.onion [HIDDEN SERVICE]
over a maximum of 30 hops:

  1    <1 ms   <1 ms   <1 ms   192.168.1.1
  2     8 ms    7 ms    9 ms   10.0.0.1
  3    23 ms   22 ms   24 ms   TOR_ENTRY_NODE_1
  4   134 ms  132 ms  138 ms   TOR_MIDDLE_RELAY
  5   276 ms  281 ms  275 ms   TOR_EXIT_NODE
  6     * * *  Request timed out (ONION SERVICE)

Trace complete. Connection secured via 3-hop circuit.
`;
    },
    
    decrypt: (args) => {
        const text = args.join(' ');
        
        if (!text) {
            return '<span class="error-msg">[ERROR]</span> Usage: decrypt [encoded_text]';
        }
        
        try {
            const decoded = atob(text);
            return `<span class="success-msg">[DECODED]</span> ${decoded}`;
        } catch (e) {
            const rot13 = text.replace(/[a-zA-Z]/g, (c) => {
                return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
            });
            return `<span class="success-msg">[ROT13]</span> ${rot13}`;
        }
    },
    
    scan: (args) => {
        const target = args[0] || 'localhost';
        return `
Scanning ${target}...

PORT      STATE    SERVICE
22/tcp    open     ssh
80/tcp    open     http
443/tcp   open     https
3301/tcp  filtered unknown (Cicada?)
8080/tcp  open     http-proxy
9050/tcp  open     tor-socks

Vulnerabilities detected: 0 (hardened system)
Hint: Sometimes the answer is in plain sight.
`;
    },
    
    exit: () => {
        output.innerHTML += '<p><span class="error-msg">[CONNECTION TERMINATED]</span></p>';
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
        return 'Goodbye...';
    }
};

function processCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;
    
    output.innerHTML += `<p><span class="prompt">root@daedalus:~#</span> ${cmd}</p>`;
    
    if (commands[command]) {
        const result = commands[command](args);
        if (result) {
            output.innerHTML += `<p>${result}</p>`;
        }
    } else {
        output.innerHTML += `<p><span class="error-msg">[ERROR]</span> Command not found: ${command}</p>`;
        output.innerHTML += `<p>Type 'help' for available commands</p>`;
    }
    
    output.scrollTop = output.scrollHeight;
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value;
        if (cmd.trim()) {
            processCommand(cmd);
        }
        input.value = '';
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    }
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    }
    
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        unlockSecret();
        konamiCode = [];
    }
});

input.addEventListener('input', () => {
    if (typingSound && Math.random() > 0.7) {
        typingSound.currentTime = 0;
        typingSound.volume = 0.1;
        typingSound.play().catch(() => {});
    }
});

function unlockSecret() {
    output.innerHTML += `
<p class="glitch-effect">
╔════════════════════════════════════════════════════════════╗
║               [KONAMI CODE ACTIVATED]                      ║
║                                                            ║
║  You found the secret. Here's a gift:                     ║
║  All Level Passwords:                                     ║
║                                                            ║
║  Level 0: FSOCIETY_RECRUIT                                ║
║  Level 1: CICADA_PRIMUS_3301                              ║
║  Level 2: ELLIOT_ALDERSON                                 ║
║  Level 3: RANSOMWARE_SYNDICATE                            ║
║  Level 4: WE_ARE_LEGION                                   ║
║  Level 5: DAEDALUS_PROTOCOL_ACTIVE                        ║
║                                                            ║
║  "Hackers don't cheat. They find alternative solutions."  ║
╚════════════════════════════════════════════════════════════╝
</p>`;
    output.scrollTop = output.scrollHeight;
}

function getElapsedTime() {
    const start = localStorage.getItem('daedalus_start');
    if (!start) {
        localStorage.setItem('daedalus_start', Date.now());
        return '00:00:00';
    }
    
    const elapsed = Date.now() - parseInt(start);
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.addEventListener('click', () => {
    input.focus();
});

window.addEventListener('load', () => {
    input.focus();
});