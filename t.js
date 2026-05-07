<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playful File Manager</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        background: '#FFFDF5',
                        foreground: '#1E293B',
                        muted: '#F1F5F9',
                        mutedForeground: '#64748B',
                        accent: '#8B5CF6',
                        accentForeground: '#FFFFFF',
                        secondary: '#F472B6',
                        tertiary: '#FBBF24',
                        quaternary: '#34D399',
                        border: '#E2E8F0',
                    },
                    fontFamily: {
                        heading: ['Outfit', 'system-ui', 'sans-serif'],
                        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
                    },
                    boxShadow: {
                        'hard': '4px 4px 0px 0px #1E293B',
                        'hard-hover': '6px 6px 0px 0px #1E293B',
                        'hard-active': '2px 2px 0px 0px #1E293B',
                        'soft-hard': '8px 8px 0px 0px #E2E8F0',
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #FFFDF5;
            background-image: radial-gradient(#CBD5E1 1.5px, transparent 1.5px);
            background-size: 24px 24px;
            color: #1E293B;
        }

        .candy-btn {
            background-color: #8B5CF6;
            color: white;
            font-weight: 700;
            border-radius: 9999px;
            border: 2px solid #1E293B;
            box-shadow: 4px 4px 0px #1E293B;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .candy-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px #1E293B;
        }

        .candy-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px #1E293B;
        }

        .candy-btn-secondary {
            background-color: transparent;
            color: #1E293B;
            font-weight: 700;
            border-radius: 9999px;
            border: 2px solid #1E293B;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .candy-btn-secondary:hover {
            background-color: #FBBF24;
            transform: translate(-2px, -2px);
            box-shadow: 4px 4px 0px #1E293B;
        }

        .sticker-card {
            background-color: #FFFFFF;
            border: 2px solid #1E293B;
            border-radius: 16px;
            box-shadow: 4px 4px 0px #E2E8F0;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            cursor: pointer;
        }

        .sticker-card:hover {
            transform: rotate(-1deg) scale(1.02);
            box-shadow: 6px 6px 0px #F472B6;
        }

        .geometric-input {
            background-color: #FFFFFF;
            border: 2px solid #1E293B;
            border-radius: 8px;
            color: #1E293B;
            padding: 10px;
            font-family: ui-monospace, SFMono-Regular, monospace;
            transition: all 0.2s;
            width: 100%;
        }

        .geometric-input:focus {
            outline: none;
            box-shadow: 4px 4px 0px #8B5CF6;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
        }
        ::-webkit-scrollbar-track {
            background: #FFFDF5;
            border-left: 2px solid #1E293B;
        }
        ::-webkit-scrollbar-thumb {
            background: #F472B6;
            border: 2px solid #1E293B;
            border-radius: 9999px;
        }

        /* Syntax Highlight Editor CSS Sync (FIX PRESISI 100%) */
        #editor-container {
            position: relative;
            flex: 1;
            width: 100%;
            height: 100%;
            background: #FFFDF5;
        }

        #highlight-layer, #code-editor {
            font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace !important;
            font-size: 0.875rem !important; 
            line-height: 1.5rem !important;
            letter-spacing: normal !important;
            padding: 1rem !important; 
            margin: 0 !important;
            border: none !important;
            box-sizing: border-box !important;
            tab-size: 4 !important;
            position: absolute !important;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100% !important;
            height: 100% !important;
            text-align: left !important;
            white-space: pre !important;
            word-spacing: normal !important;
            word-break: normal !important;
            overflow-wrap: normal !important;
        }

        #code-editor {
            /* Trik Anti WebView Freeze: 1% terlihat agar dirender sistem Android */
            color: rgba(30, 41, 59, 0.01) !important; 
            background: transparent !important;
            caret-color: #1E293B !important;
            z-index: 10;
            overflow: auto !important;
            resize: none !important;
        }

        #highlight-layer {
            z-index: 0;
            overflow: hidden !important; 
            color: #1E293B;
        }

        #highlight-code {
            font-family: inherit !important;
            font-size: inherit !important;
            line-height: inherit !important;
            padding: 0 !important;
            margin: 0 !important;
            tab-size: inherit !important;
            display: block; 
        }
        
        /* FIX WORD WRAP MENTOK KANAN */
        .word-wrap-active, 
        .word-wrap-active #highlight-code {
            white-space: pre-wrap !important;
            word-break: break-word !important; 
            overflow-wrap: break-word !important;
            overflow-x: hidden !important;
            max-width: 100% !important; /* Paksa memotong agar tidak bisa geser horizontal */
        }

        pre[class*="language-"], code[class*="language-"] {
            background: transparent !important;
            text-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
        }
    </style>
</head>
<body class="font-body h-screen flex flex-col md:flex-row overflow-hidden relative">

    <div id="full-loader" class="fixed inset-0 bg-[#1E293B]/80 backdrop-blur-sm z-[9999] hidden flex-col items-center justify-center">
        <div class="w-16 h-16 border-4 border-white/20 border-t-accent rounded-full animate-spin"></div>
        <div id="loader-text" class="mt-4 font-heading font-bold text-white tracking-widest uppercase text-center px-4">Memproses...</div>
    </div>

    <div id="sidebar-container" class="w-full md:w-1/3 lg:w-1/4 bg-white border-r-2 border-b-2 md:border-b-0 border-[#1E293B] shadow-hard flex flex-col z-10 h-1/2 md:h-full transition-all duration-300">
        <div class="p-4 border-b-2 border-[#1E293B] bg-tertiary flex justify-between items-center">
            <h1 class="font-heading font-extrabold text-2xl uppercase tracking-wider flex items-center gap-2">
                <div class="w-8 h-8 bg-white rounded-full border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0_0_#1E293B]">
                    🚀
                </div>
                Repo
            </h1>
            <button onclick="toggleViewMode()" id="mode-toggle-btn" class="candy-btn-secondary px-3 py-1 text-xs uppercase tracking-wider bg-white">
                👁️ Mode: Default
            </button>
        </div>
        
        <div class="p-3 flex gap-2 border-b-2 border-[#1E293B] bg-[#FFFDF5]">
            <button onclick="promptCreateFile()" class="candy-btn-secondary px-2 py-2 text-xs flex-1 flex justify-center items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                File
            </button>
            <button onclick="promptCreateFolder()" class="candy-btn-secondary px-2 py-2 text-xs flex-1 flex justify-center items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
                Folder
            </button>
            <button onclick="document.getElementById('file-upload').click()" class="candy-btn-secondary px-2 py-2 text-xs flex-1 flex justify-center items-center gap-1 !bg-quaternary !text-[#1E293B] hover:!bg-accent hover:!text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Upload
            </button>
            <input type="file" id="file-upload" class="hidden" multiple onchange="handleFileUpload(event)">
        </div>

        <div class="p-2 bg-white border-b-2 border-[#1E293B]">
            <input type="text" id="search-input" oninput="filterFiles()" class="geometric-input !py-1 !px-3 text-sm" placeholder="🔍 Cari file di sini...">
        </div>

        <div class="p-2 bg-muted border-b-2 border-[#1E293B] text-sm font-bold flex items-center gap-2 overflow-x-auto whitespace-nowrap" id="breadcrumb">
            </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-3" id="file-list">
            </div>
    </div>

    <div id="main-editor-container" class="w-full md:w-2/3 lg:w-3/4 flex flex-col h-1/2 md:h-full relative p-4 md:p-8 transition-all duration-300">
        <div class="absolute top-10 right-10 w-32 h-32 bg-secondary rounded-full mix-blend-multiply opacity-20 pointer-events-none"></div>
        <div class="absolute bottom-10 left-10 w-24 h-24 bg-quaternary rotate-45 mix-blend-multiply opacity-20 pointer-events-none"></div>

        <div class="bg-white border-2 border-[#1E293B] rounded-xl shadow-hard flex flex-col flex-1 relative z-10 overflow-visible">
            
            <div class="p-4 border-b-2 border-[#1E293B] bg-accent flex justify-between items-center z-30">
                <div class="flex items-center gap-2 truncate pr-2">
                    <button id="btn-back-editor" onclick="closeEditor()" class="hidden w-8 h-8 rounded-full bg-white border-2 border-[#1E293B] items-center justify-center text-[#1E293B] hover:bg-tertiary shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>

                    <h2 id="current-file-name" class="font-heading font-bold text-white text-lg flex items-center gap-2 truncate">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        <span class="truncate" id="file-name-span">Pilih file untuk diedit</span>
                    </h2>
                </div>

                <div class="flex items-center gap-2 shrink-0 relative">
                    <button onclick="saveFile()" class="candy-btn px-4 py-2 flex items-center gap-2 bg-white text-accent border-white hover:border-[#1E293B] hover:text-[#1E293B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                        <span class="hidden md:inline">Save</span>
                    </button>
                    
                    <button onclick="toggleEditorMenu()" class="w-10 h-10 rounded-full bg-white border-2 border-transparent hover:border-[#1E293B] flex items-center justify-center text-accent hover:text-[#1E293B] transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </button>

                    <div id="editor-dropdown" class="hidden absolute top-12 right-0 bg-white border-2 border-[#1E293B] rounded-xl shadow-[4px_4px_0_0_#1E293B] w-56 flex flex-col overflow-hidden z-50">
                        <button onclick="execUndo()" class="px-4 py-3 text-left font-bold text-sm border-b-2 border-slate-100 hover:bg-tertiary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg> Undo
                        </button>
                        <button onclick="execRedo()" class="px-4 py-3 text-left font-bold text-sm border-b-2 border-slate-100 hover:bg-tertiary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg> Redo
                        </button>
                        
                        <button onclick="toggleWordWrap()" id="btn-word-wrap" class="px-4 py-3 text-left font-bold text-sm border-b-2 border-slate-100 hover:bg-tertiary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg> 
                            Bungkus Kata: Off
                        </button>

                        <button onclick="showEditorSearch()" class="px-4 py-3 text-left font-bold text-sm border-b-2 border-slate-100 hover:bg-tertiary flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Search Teks
                        </button>
                        <button onclick="deleteCurrentFile()" class="px-4 py-3 text-left font-bold text-sm border-b-2 border-slate-100 hover:bg-secondary hover:text-white flex items-center gap-2 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Hapus File
                        </button>
                        <button onclick="closeEditor()" class="px-4 py-3 text-left font-bold text-sm hover:bg-muted flex items-center gap-2 text-[#1E293B]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Keluar Editor
                        </button>
                    </div>
                </div>
            </div>

            <div id="editor-search-bar" class="hidden absolute top-16 right-4 bg-white border-2 border-[#1E293B] shadow-hard rounded-lg p-2 z-40 flex items-center gap-2">
                <input type="text" id="editor-search-input" placeholder="Cari kata..." class="geometric-input !py-1 !px-2 w-32 text-sm">
                <button onclick="findNextText()" class="candy-btn-secondary !bg-tertiary px-2 py-1 text-sm">Cari</button>
                <button onclick="closeEditorSearch()" class="w-7 h-7 rounded-full bg-muted border-2 border-[#1E293B] flex items-center justify-center font-bold">X</button>
            </div>
            
            <div class="flex-1 relative bg-[#FFFDF5] w-full h-full overflow-hidden flex flex-col rounded-b-xl">
                
                <div id="editor-container" class="relative flex-1 w-full h-full">
                    <pre id="highlight-layer" class="absolute inset-0 z-0 pointer-events-none" aria-hidden="true"><code id="highlight-code" class="language-plaintext"></code></pre>
                    <textarea id="code-editor" 
                              oninput="updateHighlight(this.value)" 
                              onscroll="syncScroll(this)" 
                              onpaste="handlePaste(event)"
                              class="absolute inset-0 w-full h-full resize-none focus:outline-none bg-transparent z-10 overflow-auto" 
                              spellcheck="false" 
                              autocapitalize="off" 
                              autocomplete="off" 
                              autocorrect="off" 
                              data-gramm="false"
                              placeholder="Tulis kode di sini..."></textarea>
                </div>

                <div id="image-preview-container" class="hidden flex-1 w-full h-full items-center justify-center p-4 overflow-auto z-10">
                    <img id="image-preview" class="max-w-full max-h-full rounded shadow-hard border-2 border-[#1E293B]" src="">
                </div>
            </div>

        </div>
    </div>

    <script src="config.js"></script>
    <script src="languages.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>

    <script>
        const API_BASE = `https://api.github.com/repos/${CONFIG.user}/${CONFIG.repo}/contents/`;
        
        function getHeaders() {
            return {
                "Authorization": `token ${CONFIG.token}`,
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            };
        }

        const encodeBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
        const decodeBase64 = (str) => decodeURIComponent(escape(atob(str)));

        let currentPath = '';
        let currentEditingFile = null;
        let currentEditingSha = null; 

        // SISTEM VIEW MODE (DEFAULT / EDITOR)
        let viewMode = localStorage.getItem('playful_view_mode') || 'default';
        
        // SISTEM BUNGKUS KATA (WORD WRAP)
        let isWordWrap = localStorage.getItem('playful_word_wrap') === 'true';

        const fileListEl = document.getElementById('file-list');
        const breadcrumbEl = document.getElementById('breadcrumb');
        const editorEl = document.getElementById('code-editor');
        const fileNameEl = document.getElementById('current-file-name');
        const fileNameSpan = document.getElementById('file-name-span');
        const btnBackEditor = document.getElementById('btn-back-editor');
        
        const loaderEl = document.getElementById('full-loader');
        const loaderTextEl = document.getElementById('loader-text');
        const searchInput = document.getElementById('search-input');

        const sidebarCont = document.getElementById('sidebar-container');
        const mainEditorCont = document.getElementById('main-editor-container');
        const modeToggleBtn = document.getElementById('mode-toggle-btn');

        // LOGIKA BUNGKUS KATA (WORD WRAP)
        function applyWordWrap() {
            const editor = document.getElementById('code-editor');
            const highlight = document.getElementById('highlight-layer');
            const btn = document.getElementById('btn-word-wrap');
            
            const wrapIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="15" y1="12" x2="3" y2="12"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>`;

            if (isWordWrap) {
                editor.classList.add('word-wrap-active');
                highlight.classList.add('word-wrap-active');
                if(btn) btn.innerHTML = `${wrapIcon} Bungkus Kata: On`;
            } else {
                editor.classList.remove('word-wrap-active');
                highlight.classList.remove('word-wrap-active');
                if(btn) btn.innerHTML = `${wrapIcon} Bungkus Kata: Off`;
            }
        }

        function toggleWordWrap() {
            isWordWrap = !isWordWrap;
            localStorage.setItem('playful_word_wrap', isWordWrap);
            applyWordWrap();
            toggleEditorMenu(); 
        }

        function toggleViewMode() {
            viewMode = viewMode === 'default' ? 'editor' : 'default';
            localStorage.setItem('playful_view_mode', viewMode);
            applyViewMode();
        }

        function applyViewMode() {
            if (viewMode === 'editor') {
                modeToggleBtn.innerHTML = '👁️ Mode: Editor';
                if (currentEditingFile) {
                    sidebarCont.className = "hidden";
                    mainEditorCont.className = "w-full flex flex-col h-screen relative p-2 md:p-4 transition-all duration-300";
                    btnBackEditor.classList.remove('hidden');
                    btnBackEditor.classList.add('flex');
                } else {
                    sidebarCont.className = "w-full bg-white border-r-2 border-[#1E293B] shadow-hard flex flex-col z-10 h-screen transition-all duration-300";
                    mainEditorCont.className = "hidden";
                    btnBackEditor.classList.add('hidden');
                    btnBackEditor.classList.remove('flex');
                }
            } else {
                modeToggleBtn.innerHTML = '👁️ Mode: Default';
                sidebarCont.className = "w-full md:w-1/3 lg:w-1/4 bg-white border-r-2 border-b-2 md:border-b-0 border-[#1E293B] shadow-hard flex flex-col z-10 h-1/2 md:h-full transition-all duration-300";
                mainEditorCont.className = "w-full md:w-2/3 lg:w-3/4 flex flex-col h-1/2 md:h-full relative p-4 md:p-8 transition-all duration-300";
                btnBackEditor.classList.add('hidden');
                btnBackEditor.classList.remove('flex');
            }
        }

        function toggleEditorMenu() {
            const menu = document.getElementById('editor-dropdown');
            menu.classList.toggle('hidden');
        }

        function execUndo() {
            document.execCommand('undo');
            updateHighlight(editorEl.value);
            toggleEditorMenu();
        }
        function execRedo() {
            document.execCommand('redo');
            updateHighlight(editorEl.value);
            toggleEditorMenu();
        }

        let lastSearchIndex = 0;
        function showEditorSearch() {
            document.getElementById('editor-search-bar').classList.remove('hidden');
            toggleEditorMenu();
        }
        function closeEditorSearch() {
            document.getElementById('editor-search-bar').classList.add('hidden');
            lastSearchIndex = 0;
        }
        function findNextText() {
            const term = document.getElementById('editor-search-input').value.toLowerCase();
            if(!term) return;
            const content = editorEl.value.toLowerCase();
            const idx = content.indexOf(term, lastSearchIndex);
            if(idx !== -1) {
                editorEl.focus();
                editorEl.setSelectionRange(idx, idx + term.length);
                
                const textBefore = content.substring(0, idx);
                const lineCount = textBefore.split('\n').length;
                editorEl.scrollTop = (lineCount > 5 ? lineCount - 5 : 0) * 20; 
                syncScroll(editorEl);
                
                lastSearchIndex = idx + term.length;
            } else {
                lastSearchIndex = 0;
                alert("Teks tidak ditemukan lagi.");
            }
        }

        function deleteCurrentFile() {
            toggleEditorMenu();
            if(!currentEditingFile) return;
            deleteItem(currentEditingFile, currentEditingSha);
        }

        function closeEditor() {
            currentEditingFile = null;
            currentEditingSha = null;
            editorEl.value = '';
            updateHighlight("");
            fileNameSpan.innerText = 'Pilih file untuk diedit';
            document.getElementById('editor-container').classList.remove('hidden');
            document.getElementById('image-preview-container').classList.add('hidden');
            document.getElementById('image-preview-container').classList.remove('flex');
            const menu = document.getElementById('editor-dropdown');
            if(!menu.classList.contains('hidden')) menu.classList.add('hidden');
            closeEditorSearch();
            applyViewMode(); 
        }

        function showLoader(text) {
            loaderTextEl.innerText = text;
            loaderEl.classList.remove('hidden');
            loaderEl.classList.add('flex');
        }

        function hideLoader() {
            loaderEl.classList.add('hidden');
            loaderEl.classList.remove('flex');
        }

        function filterFiles() {
            const query = searchInput.value.toLowerCase();
            const items = fileListEl.querySelectorAll('.sticker-card'); 
            items.forEach(item => {
                const nameEl = item.querySelector('.truncate');
                if (nameEl) {
                    const fileName = nameEl.innerText.toLowerCase();
                    if(fileName.includes(query)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    item.style.display = 'flex';
                }
            });
        }

        function syncScroll(el) {
            const highlightLayer = document.getElementById('highlight-layer');
            highlightLayer.scrollTop = el.scrollTop;
            highlightLayer.scrollLeft = el.scrollLeft;
        }

        // FUNGSI NORMALISASI PASTE (Mencegah Ghost Cursor saat copy paste kode panjang)
        function handlePaste(e) {
            setTimeout(() => {
                // Hapus karakter /r bawaan Windows/Copy-Paste agar sejalan murni dengan elemen <pre>
                if (editorEl.value.includes('\r')) {
                    const pos = editorEl.selectionStart;
                    editorEl.value = editorEl.value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                    editorEl.selectionStart = editorEl.selectionEnd = pos;
                }
                updateHighlight(editorEl.value);
            }, 10);
        }

        // FUNGSI HIGHLIGHT (DIPERBAIKI TOTAL UNTUK ANTI GHOST CURSOR DAN LAG FREEZE)
        let highlightTimeout;
        function updateHighlight(text) {
            try {
                let codeEl = document.getElementById('highlight-code');
                let textToSync = text;
                
                // Tambahkan spasi gaib di akhir jika diakhiri line break agar kotak editor tidak meleset
                if (textToSync && textToSync[textToSync.length-1] === "\n") {
                    textToSync += " ";
                }
                
                codeEl.textContent = textToSync;
                
                // Anti-Lag: Jika teks terlalu panjang (> 80.000 char), matikan Syntax Highlight
                if (textToSync.length > 80000) {
                    return; 
                }
                
                // Beri jeda 300ms agar pengetikan tidak patah-patah
                clearTimeout(highlightTimeout);
                highlightTimeout = setTimeout(() => {
                    if (window.Prism) {
                        try {
                            Prism.highlightElement(codeEl);
                        } catch(err) {
                            console.warn("Prism Highlight Error:", err);
                        }
                    }
                }, 300);
            } catch (e) {
                console.warn("Update Highlight Error:", e);
            }
        }

        window.onload = () => {
            applyViewMode(); 
            applyWordWrap(); 
            loadFiles('');
        };

        async function loadFiles(path = '') {
            showLoader("Memuat repositori...");
            currentPath = path;
            renderBreadcrumb();
            if (searchInput) searchInput.value = ''; 
            fileListEl.innerHTML = '<div class="p-4 text-center font-bold">Memuat data dari GitHub...</div>';
            
            try {
                const cleanPath = path.replace(/\/$/, ""); 
                const cacheBuster = `?t=${new Date().getTime()}`;
                const res = await fetch(API_BASE + cleanPath + cacheBuster, { headers: getHeaders() });
                
                if (!res.ok) throw new Error(await res.text());
                
                let files = await res.json();
                if (!Array.isArray(files)) files = [];
                
                fileListEl.innerHTML = '';

                if (path !== '') {
                    const upPath = path.substring(0, path.lastIndexOf('/')) || '';
                    const upDiv = document.createElement('div');
                    upDiv.className = 'sticker-card p-3 flex items-center gap-3 bg-muted';
                    upDiv.onclick = () => loadFiles(upPath);
                    upDiv.innerHTML = `
                        <div class="w-8 h-8 rounded-full bg-white border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0_0_#1E293B]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
                        </div>
                        <span class="font-heading font-bold">.. (Kembali)</span>
                    `;
                    fileListEl.appendChild(upDiv);
                }

                files.sort((a, b) => {
                    if (a.type === b.type) return a.name.localeCompare(b.name);
                    return a.type === 'dir' ? -1 : 1;
                });

                files.forEach(file => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'sticker-card p-3 flex items-center justify-between group';
                    
                    const isDir = file.type === 'dir';
                    const iconColor = isDir ? 'text-tertiary' : 'text-accent';
                    const icon = isDir 
                        ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`
                        : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;

                    itemDiv.innerHTML = `
                        <div class="flex items-center gap-3 cursor-pointer flex-1 overflow-hidden" onclick="${isDir ? `loadFiles('${file.path}')` : `openFile('${file.path}', '${file.sha}')`}">
                            <div class="w-8 h-8 rounded-full bg-white border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0_0_#1E293B] ${iconColor}">
                                ${icon}
                            </div>
                            <span class="font-bold truncate">${file.name}</span>
                        </div>
                        <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            ${!isDir ? `
                            <button onclick="copyRawUrl('${file.path}')" class="w-8 h-8 rounded-full bg-quaternary border-2 border-[#1E293B] flex items-center justify-center hover:scale-110 transition-transform" title="Copy Raw Link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </button>
                            ` : ''}
                            <button onclick="promptRename('${file.path}', '${file.name}', '${file.sha}')" class="w-8 h-8 rounded-full bg-tertiary border-2 border-[#1E293B] flex items-center justify-center hover:scale-110 transition-transform" title="Rename">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </button>
                            <button onclick="deleteItem('${file.path}', '${file.sha}')" class="w-8 h-8 rounded-full bg-secondary border-2 border-[#1E293B] flex items-center justify-center hover:scale-110 transition-transform" title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    `;
                    fileListEl.appendChild(itemDiv);
                });
            } catch (err) {
                alert('Gagal memuat file: Pastikan konfigurasi di config.js sudah benar.\nDetail: ' + err);
            } finally {
                hideLoader();
            }
        }

        function renderBreadcrumb() {
            if (!currentPath) {
                breadcrumbEl.innerHTML = '<span>🏠 / root</span>';
                return;
            }
            const parts = currentPath.split('/');
            let html = '<span class="cursor-pointer hover:text-accent" onclick="loadFiles(\'\')">🏠 root</span>';
            let buildPath = '';
            parts.forEach(part => {
                if(!part) return;
                buildPath += (buildPath ? '/' : '') + part;
                html += ` / <span class="cursor-pointer hover:text-accent" onclick="loadFiles('${buildPath}')">${part}</span>`;
            });
            breadcrumbEl.innerHTML = html;
        }

        async function openFile(filePath, sha) {
            showLoader("Membuka file...");
            try {
                currentEditingFile = filePath;
                currentEditingSha = sha; 
                
                fileNameSpan.innerText = filePath.split('/').pop();
                
                applyViewMode();

                const ext = filePath.split('.').pop().toLowerCase();
                const imgExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico'];

                if (imgExts.includes(ext)) {
                    document.getElementById('editor-container').classList.add('hidden');
                    document.getElementById('image-preview-container').classList.remove('hidden');
                    document.getElementById('image-preview-container').classList.add('flex');
                    
                    const rawUrl = `https://raw.githubusercontent.com/${CONFIG.user}/${CONFIG.repo}/${CONFIG.branch}/${filePath}`;
                    document.getElementById('image-preview').src = rawUrl + `?t=${new Date().getTime()}`;
                    
                } else {
                    document.getElementById('editor-container').classList.remove('hidden');
                    document.getElementById('image-preview-container').classList.add('hidden');
                    document.getElementById('image-preview-container').classList.remove('flex');
                    
                    editorEl.value = "Memuat isi file dari GitHub...";
                    updateHighlight(editorEl.value);

                    const cacheBuster = `?t=${new Date().getTime()}`;
                    const res = await fetch(API_BASE + filePath + cacheBuster, { headers: getHeaders() });
                    if (!res.ok) throw new Error("Gagal mengambil file");
                    
                    const data = await res.json();
                    editorEl.value = decodeBase64(data.content || "");

                    let lang = getLanguageFromExtension(ext);
                    document.getElementById('highlight-code').className = `language-${lang}`;
                    updateHighlight(editorEl.value);
                }

            } catch (err) {
                editorEl.value = "";
                updateHighlight("");
                alert('Gagal membuka file: ' + err);
                closeEditor(); 
            } finally {
                hideLoader();
            }
        }

        async function saveFile() {
            if (!currentEditingFile) {
                alert('Tidak ada file yang sedang diedit!');
                return;
            }
            
            const ext = currentEditingFile.split('.').pop().toLowerCase();
            const imgExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico'];
            if (imgExts.includes(ext)) {
                alert('Gambar tidak dapat diedit secara teks. Gunakan fitur upload untuk menimpa gambar.');
                return;
            }

            showLoader("Menyimpan ke GitHub...");
            try {
                const content = encodeBase64(editorEl.value);
                
                const res = await fetch(API_BASE + currentEditingFile, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        message: `Update ${currentEditingFile} via File Manager`,
                        content: content,
                        sha: currentEditingSha, 
                        branch: CONFIG.branch
                    })
                });
                
                if (!res.ok) throw new Error("Gagal menyimpan ke GitHub");
                
                const data = await res.json();
                currentEditingSha = data.content.sha; 
                
                fileNameSpan.parentElement.style.transform = 'scale(1.05)';
                setTimeout(() => fileNameSpan.parentElement.style.transform = 'scale(1)', 200);
                alert("Berhasil disimpan ke GitHub!");
            } catch (err) {
                alert('Gagal menyimpan file: ' + err);
            } finally {
                hideLoader();
            }
        }

        async function promptCreateFile() {
            const name = prompt('Masukkan nama file baru (cth: script.js):');
            if (!name) return;
            const newPath = currentPath ? `${currentPath}/${name}` : name;
            
            showLoader("Membuat file di GitHub...");
            try {
                const res = await fetch(API_BASE + newPath, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        message: `Create ${newPath}`,
                        content: encodeBase64(""), 
                        branch: CONFIG.branch
                    })
                });
                
                if (!res.ok) throw new Error("Gagal membuat file");
                
                const data = await res.json();
                editorEl.value = "";
                updateHighlight("");
                currentEditingFile = newPath;
                currentEditingSha = data.content.sha;
                
                document.getElementById('editor-container').classList.remove('hidden');
                document.getElementById('image-preview-container').classList.add('hidden');
                document.getElementById('image-preview-container').classList.remove('flex');

                fileNameSpan.innerText = name;
                applyViewMode(); 
                
                await loadFiles(currentPath);
            } catch (err) {
                alert('Error: ' + err);
                hideLoader(); 
            }
        }

        async function promptCreateFolder() {
            const name = prompt('Masukkan nama folder baru:');
            if (!name) return;
            const newPath = currentPath ? `${currentPath}/${name}/.gitkeep` : `${name}/.gitkeep`;
            
            showLoader("Membuat folder di GitHub...");
            try {
                const res = await fetch(API_BASE + newPath, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        message: `Create folder ${name}`,
                        content: encodeBase64(""),
                        branch: CONFIG.branch
                    })
                });
                
                if (!res.ok) throw new Error("Gagal membuat folder");
                
                await loadFiles(currentPath);
            } catch (err) {
                alert('Error: ' + err);
                hideLoader();
            }
        }

        async function promptRename(oldPath, oldName, sha) {
            const newName = prompt('Ubah nama menjadi:', oldName);
            if (!newName || newName === oldName) return;
            
            const basePath = oldPath.substring(0, oldPath.lastIndexOf('/'));
            const newPath = basePath ? `${basePath}/${newName}` : newName;

            showLoader("Mengubah nama file...");
            try {
                const cacheBuster = `?t=${new Date().getTime()}`;
                const getRes = await fetch(API_BASE + oldPath + cacheBuster, { headers: getHeaders() });
                const oldData = await getRes.json();
                
                const createRes = await fetch(API_BASE + newPath, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        message: `Rename ${oldPath} to ${newPath}`,
                        content: oldData.content, 
                        branch: CONFIG.branch
                    })
                });
                if (!createRes.ok) throw new Error("Gagal membuat file baru untuk rename");
                
                const newData = await createRes.json();

                await fetch(API_BASE + oldPath, {
                    method: 'DELETE',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        message: `Delete old ${oldPath} after rename`,
                        sha: sha,
                        branch: CONFIG.branch
                    })
                });
                
                if (currentEditingFile === oldPath) {
                    currentEditingFile = newPath;
                    currentEditingSha = newData.content.sha;
                    fileNameSpan.innerText = newName;
                }
                
                await loadFiles(currentPath);
            } catch (err) {
                alert('Error Rename: ' + err);
                hideLoader();
            }
        }

        async function deleteItem(itemPath, sha) {
            if (!confirm(`Yakin ingin menghapus ${itemPath} dari GitHub?`)) return;
            
            showLoader("Menghapus file...");
            try {
                const res = await fetch(API_BASE + itemPath, {
                    method: 'DELETE',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        message: `Delete ${itemPath}`,
                        sha: sha,
                        branch: CONFIG.branch
                    })
                });
                
                if (!res.ok) throw new Error("Gagal menghapus file");

                if (currentEditingFile === itemPath) {
                    closeEditor(); 
                }
                
                await loadFiles(currentPath);
            } catch (err) {
                alert('Error: ' + err);
                hideLoader();
            }
        }

        async function handleFileUpload(event) {
            const files = event.target.files;
            if (!files || files.length === 0) return;

            showLoader("Mengupload " + files.length + " file...");
            let successCount = 0;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = file.name;
                const targetPath = currentPath ? `${currentPath}/${fileName}` : fileName;

                try {
                    const base64Content = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const base64Str = reader.result.split(',')[1];
                            resolve(base64Str);
                        };
                        reader.onerror = error => reject(error);
                        reader.readAsDataURL(file);
                    });

                    let existingSha = null;
                    try {
                        const cacheBuster = `?t=${new Date().getTime()}`;
                        const getRes = await fetch(API_BASE + targetPath + cacheBuster, { headers: getHeaders() });
                        if (getRes.ok) {
                            const existingData = await getRes.json();
                            existingSha = existingData.sha;
                        }
                    } catch(e) {}

                    const bodyData = {
                        message: `Upload ${fileName} via File Manager`,
                        content: base64Content,
                        branch: CONFIG.branch
                    };
                    if (existingSha) bodyData.sha = existingSha; 

                    const res = await fetch(API_BASE + targetPath, {
                        method: 'PUT',
                        headers: getHeaders(),
                        body: JSON.stringify(bodyData)
                    });

                    if (!res.ok) throw new Error("Gagal mengupload " + fileName);
                    successCount++;
                } catch (err) {
                    alert(`Error upload ${fileName}: ` + err.message);
                }
            }

            event.target.value = '';

            if (successCount > 0) {
                await loadFiles(currentPath);
            } else {
                hideLoader();
            }
        }

        function copyRawUrl(filePath) {
            const rawUrl = `https://raw.githubusercontent.com/${CONFIG.user}/${CONFIG.repo}/${CONFIG.branch}/${filePath}`;
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(rawUrl).then(() => {
                    alert("Raw Link berhasil disalin!\n\n" + rawUrl);
                }).catch(err => {
                    alert("Gagal menyalin link: " + err);
                });
            } else {
                let textArea = document.createElement("textarea");
                textArea.value = rawUrl;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    alert("Raw Link berhasil disalin!\n\n" + rawUrl);
                } catch (err) {
                    alert("Gagal menyalin link via fallback: " + err);
                }
                textArea.remove();
            }
        }
    </script>
</body>
</html>
