// =========================
// FAHAD TECH - TOOLS DATABASE
// =========================

const toolsData = [
    // ===== AI WEBSITES =====
    { name: "Bytez", description: "Access hundreds of AI models", category: "ai", icon: "fas fa-robot", link: "https://chat.openai.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Claude AI", description: "Anthropic's AI assistant", category: "ai", icon: "fas fa-brain", link: "https://claude.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Google Gemini", description: "Google's multimodal AI", category: "ai", icon: "fas fa-gem", link: "https://gemini.google.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Perplexity AI", description: "AI-powered search engine", category: "ai", icon: "fas fa-search", link: "https://www.perplexity.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Microsoft Copilot", description: "AI assistant from Microsoft", category: "ai", icon: "fas fa-robot", link: "https://copilot.microsoft.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "DeepSeek AI", description: "Advanced AI chat model", category: "ai", icon: "fas fa-comments", link: "https://chat.deepseek.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Meta AI", description: "Meta's AI assistant", category: "ai", icon: "fas fa-meta", link: "https://meta.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Eleven Labs", description: "AI voice generation", category: "ai", icon: "fas fa-microphone", link: "https://elevenlabs.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Soundraw", description: "AI music generation", category: "ai", icon: "fas fa-music", link: "https://soundraw.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Suno AI", description: "Create songs with AI", category: "ai", icon: "fas fa-music", link: "https://suno.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Udio", description: "AI music generator", category: "ai", icon: "fas fa-headphones", link: "https://udio.com", type: "free", creditCost: 5, requiresAuth: true },

    // ===== PHOTO AI =====
    { name: "AI Exploria", description: "AI image prompts", category: "photo", icon: "fas fa-lightbulb", link: "https://www.aixploria.com/en/nano-banana-prompt-list-free/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Leonardo AI", description: "Generate stunning images", category: "photo", icon: "fas fa-palette", link: "https://leonardo.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Midjourney", description: "AI image generation", category: "photo", icon: "fas fa-image", link: "https://www.midjourney.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Stable Diffusion", description: "Open-source AI images", category: "photo", icon: "fas fa-image", link: "https://huggingface.co/spaces/stabilityai/stable-diffusion", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Playground AI", description: "Create and edit images", category: "photo", icon: "fas fa-paint-brush", link: "https://playgroundai.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Bing Image Creator", description: "DALL-E powered generator", category: "photo", icon: "fas fa-image", link: "https://www.bing.com/create", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Ideogram AI", description: "AI with typography", category: "photo", icon: "fas fa-font", link: "https://ideogram.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Krea AI", description: "Real-time AI images", category: "photo", icon: "fas fa-bolt", link: "https://krea.ai", type: "free", creditCost: 5, requiresAuth: true },

    // ===== VIDEO MAKERS =====
    { name: "150k Reels Bundle", description: "Free Reels Bundles", category: "video", icon: "fas fa-film", link: "https://www.mediafire.com/file/m5goybw5jfvtplq/150k_Reels_Bundle_By_Technical-Fahad_.pdf/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Runway ML", description: "AI video editing", category: "video", icon: "fas fa-video", link: "https://runwayml.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "CapCut Online", description: "Free online video editor", category: "video", icon: "fas fa-cut", link: "https://www.capcut.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Pictory AI", description: "Text to videos", category: "video", icon: "fas fa-file-video", link: "https://pictory.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "InVideo", description: "AI video creation", category: "video", icon: "fas fa-video", link: "https://invideo.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Kaiber AI", description: "AI video generation", category: "video", icon: "fas fa-film", link: "https://kaiber.ai", type: "free", creditCost: 5, requiresAuth: true },
    { name: "HeyGen", description: "AI avatar videos", category: "video", icon: "fas fa-user-circle", link: "https://heygen.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Synthesia", description: "AI video creation", category: "video", icon: "fas fa-video", link: "https://synthesia.io", type: "free", creditCost: 5, requiresAuth: true },

    // ===== OSINT TOOLS =====
    { name: "OSINT Framework", description: "Complete OSINT resources", category: "osint", icon: "fas fa-search", link: "https://osintframework.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "OSINT Place", description: "Ultimate OSINT resources", category: "osint", icon: "fas fa-globe", link: "https://www.osint.place", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Shodan", description: "Search internet devices", category: "osint", icon: "fas fa-search", link: "https://www.shodan.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Hunter.io", description: "Find email addresses", category: "osint", icon: "fas fa-envelope", link: "https://hunter.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Google Takeout", description: "Download Google data", category: "osint", icon: "fas fa-download", link: "https://takeout.google.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Have I Been Pwned", description: "Check email breaches", category: "osint", icon: "fas fa-exclamation-triangle", link: "https://haveibeenpwned.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "IntelX", description: "OSINT intelligence search", category: "osint", icon: "fas fa-search", link: "https://intelx.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "SIM Owner Details PK", description: "Pakistan SIM database", category: "osint", icon: "fas fa-mobile-alt", link: "https://www.simownerdetailss.com.pk/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "SIM Database PK", description: "Pakistan SIM information", category: "osint", icon: "fas fa-database", link: "https://pakdata.pk/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "IP Tracker", description: "Track IP addresses", category: "osint", icon: "fas fa-map-marker-alt", link: "https://www.ip-tracker.org/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Wayback Machine", description: "View archived websites", category: "osint", icon: "fas fa-history", link: "https://archive.org/web", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Censys", description: "Internet asset discovery", category: "osint", icon: "fas fa-search", link: "https://search.censys.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Dehashed", description: "Search breached credentials", category: "osint", icon: "fas fa-key", link: "https://dehashed.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Spyse", description: "Cybersecurity search", category: "osint", icon: "fas fa-shield-alt", link: "https://spyse.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Greynoise", description: "Internet noise analysis", category: "osint", icon: "fas fa-chart-line", link: "https://greynoise.io", type: "free", creditCost: 5, requiresAuth: true },

    // ===== TELEGRAM BOTS =====
    { name: "Fahad Tricks Bot", description: "Official hacking bot", category: "telegram", icon: "fab fa-telegram", link: "https://t.me/fahad_tricks_bot", type: "premium", creditCost: 0, requiresAuth: false },
    { name: "2nd Bot", description: "Official FAHAD TECH bot", category: "telegram", icon: "fab fa-telegram", link: "https://t.me/Shgssubot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Save Video Bot", description: "Download videos", category: "telegram", icon: "fas fa-download", link: "https://t.me/savevideobot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "YouTube Downloader Bot", description: "Download YouTube videos", category: "telegram", icon: "fab fa-youtube", link: "https://t.me/youtubedownloader_bot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Spotify Downloader Bot", description: "Download music", category: "telegram", icon: "fab fa-spotify", link: "https://t.me/spotifysavebot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Image to Text Bot", description: "Extract text from images", category: "telegram", icon: "fas fa-file-alt", link: "https://t.me/ImageToTextBot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "URL Shortener Bot", description: "Create short URLs", category: "telegram", icon: "fas fa-link", link: "https://t.me/URLShortenerBot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Proxy Bot", description: "Get Telegram proxies", category: "telegram", icon: "fas fa-shield-alt", link: "https://t.me/proxy_bot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "ID Bot", description: "Get Telegram IDs", category: "telegram", icon: "fas fa-id-card", link: "https://t.me/getidsbot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "File Converter Bot", description: "Convert file formats", category: "telegram", icon: "fas fa-exchange-alt", link: "https://t.me/FileConverterBot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Virus Total Bot", description: "Scan files for viruses", category: "telegram", icon: "fas fa-shield-virus", link: "https://t.me/virus_total_bot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Instagram Downloader Bot", description: "Download Instagram content", category: "telegram", icon: "fab fa-instagram", link: "https://t.me/InstagramBot", type: "free", creditCost: 5, requiresAuth: true },
    { name: "TikTok Downloader Bot", description: "Download TikTok videos", category: "telegram", icon: "fab fa-tiktok", link: "https://t.me/TikTokDownloaderBot", type: "free", creditCost: 5, requiresAuth: true },

    // ===== ENCODERS =====
    { name: "Base64 Decode", description: "Encode/decode Base64", category: "encoder", icon: "fas fa-code", link: "https://www.base64decode.org/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "MD5 Generator", description: "Generate MD5 hashes", category: "encoder", icon: "fas fa-hashtag", link: "https://www.md5hashgenerator.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "CyberChef", description: "Cyber Swiss Army knife", category: "encoder", icon: "fas fa-utensils", link: "https://gchq.github.io/CyberChef/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "URL Encoder", description: "Encode/decode URLs", category: "encoder", icon: "fas fa-link", link: "https://www.urlencoder.org", type: "free", creditCost: 5, requiresAuth: true },
    { name: "JWT Decoder", description: "Decode JWT tokens", category: "encoder", icon: "fas fa-key", link: "https://jwt.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Hash Generator", description: "Generate various hashes", category: "encoder", icon: "fas fa-hashtag", link: "https://passwordsgenerator.net/sha256-hash-generator/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Cryptii", description: "Modular conversion tool", category: "encoder", icon: "fas fa-exchange-alt", link: "https://cryptii.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "ROT13 Converter", description: "ROT13 cipher tool", category: "encoder", icon: "fas fa-rotate-right", link: "https://rot13.com", type: "free", creditCost: 5, requiresAuth: true },

    // ===== SOCIAL MEDIA =====
    { name: "Zefoy", description: "Free TikTok likes", category: "social", icon: "fab fa-tiktok", link: "https://zefoy.com/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "YT Watch Time", description: "Increase YouTube watch time", category: "social", icon: "fab fa-youtube", link: "https://youtube-free-views.vercel.app/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "FB Black Badge", description: "Facebook badge trick", category: "social", icon: "fab fa-facebook", link: "https://www.mediafire.com/file/dv2yjl5hjhp9mop/FB_Black_Badge_Trick.7z/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "FB Emoji Name", description: "Facebook stylish name", category: "social", icon: "fab fa-facebook", link: "https://www.mediafire.com/file/qfvn0jonaj0ql7z/FACEBOOK_EMOJI_NAME_ID_NEW_UPDATE_2025_Trick_Master.mp4/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Instagram Downloader", description: "Download Instagram content", category: "social", icon: "fab fa-instagram", link: "https://saveig.app", type: "free", creditCost: 5, requiresAuth: true },
    { name: "TikTok Downloader", description: "Download TikTok videos", category: "social", icon: "fab fa-tiktok", link: "https://ssstik.io", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Twitter Downloader", description: "Download Twitter videos", category: "social", icon: "fab fa-twitter", link: "https://twdown.net", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Facebook Downloader", description: "Download Facebook videos", category: "social", icon: "fab fa-facebook", link: "https://fdown.net", type: "free", creditCost: 5, requiresAuth: true },
    { name: "TikTok UK/USA Method", description: "TikTok region unlock", category: "social", icon: "fas fa-globe", link: "https://www.mediafire.com/file/iat9tlglyxp30qk/TikTok_UK_USA_Methode.mp4/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "TikTok Viral Trick", description: "Make videos go viral", category: "social", icon: "fas fa-fire", link: "https://youtu.be/YG-nh-GL0yw?si=Pu2dzqs2k0_lc0kn", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Social Blade", description: "Social media stats", category: "social", icon: "fas fa-chart-bar", link: "https://socialblade.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Hashtag Generator", description: "Generate hashtags", category: "social", icon: "fas fa-hashtag", link: "https://hashtagify.me", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Later", description: "Social media scheduling", category: "social", icon: "fas fa-calendar", link: "https://later.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "WhatsApp See More Maker", description: "Create See More messages", category: "social", icon: "fab fa-whatsapp", link: "https://manytools.org/facebook-twitter/whatsapp-read-more/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "WA See More Generator", description: "Long preview generator", category: "social", icon: "fab fa-whatsapp", link: "https://seemore.app/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "WhatsApp Font Generator", description: "Stylish WhatsApp fonts", category: "social", icon: "fas fa-font", link: "https://lingojam.com/WhatsappFont", type: "free", creditCost: 5, requiresAuth: true },

    // ===== MOD APPS =====
    { name: "LiteAPKs", description: "Premium APKs for free", category: "mods", icon: "fas fa-mobile-alt", link: "https://liteapks.com/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "An1.com", description: "Modded apps and games", category: "mods", icon: "fas fa-gamepad", link: "https://an1.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Modyolo", description: "Free modded APKs", category: "mods", icon: "fas fa-mobile", link: "https://modyolo.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "GB WhatsApp", description: "Modified WhatsApp", category: "mods", icon: "fab fa-whatsapp", link: "https://gbwa.me", type: "free", creditCost: 5, requiresAuth: true },
    { name: "YouTube Vanced", description: "Ad-free YouTube", category: "mods", icon: "fab fa-youtube", link: "https://vancedapp.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Spotify Premium Mod", description: "Free Spotify Premium", category: "mods", icon: "fab fa-spotify", link: "https://spotifypremiummod.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "CapCut Mod", description: "Premium video editor", category: "mods", icon: "fas fa-video", link: "https://capcutmod.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "PicsArt Mod", description: "Premium photo editor", category: "mods", icon: "fas fa-image", link: "https://picsartmodapk.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "FM WhatsApp", description: "Feature-rich WhatsApp mod", category: "mods", icon: "fab fa-whatsapp", link: "https://fmwhatsapp.net", type: "free", creditCost: 5, requiresAuth: true },

    // ===== HACKING TOOLS (Educational) =====
    { name: "CCTV Hacking", description: "CCTV hack tutorial", category: "hacking", icon: "fas fa-video", link: "https://youtu.be/r6a1KhujWzY?si=b_OaNwwEGNcFmSaF", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Hack Speaker (Linux)", description: "Hack speakers using Linux", category: "hacking", icon: "fas fa-volume-up", link: "https://youtu.be/RJzvw390Lfo?si=QtawIwMAUQ4tjQcD", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Full Mobile Hack", description: "Complete mobile hacking toolkit", category: "hacking", icon: "fas fa-mobile-alt", link: "https://www.mediafire.com/file/c98cx4pg4uo2ypi/Phone+Hack.zip/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "WhatsApp Hack", description: "WhatsApp hacking method", category: "hacking", icon: "fab fa-whatsapp", link: "https://www.mediafire.com/file/il64l4ov4oi1txf/WHATSAPP_HACK_NEW_METHOD.zip/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "WhatsApp Meta Verify", description: "Meta verification trick", category: "hacking", icon: "fas fa-check-circle", link: "https://www.mediafire.com/file/cf9ojkp8j4zs4is/Meta-verifyed-secuirty.method.mp4/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Easy Camera Hack", description: "Camera hacking tricks", category: "hacking", icon: "fas fa-camera", link: "https://www.mediafire.com/file/ahagakdq0649l2l/CamHack_Trick.zip/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Location Hack", description: "GPS location hacking", category: "hacking", icon: "fas fa-map-marker-alt", link: "https://www.mediafire.com/file/spbrrpnm6qmf08v/Location+Hack.zip/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Hacking Links", description: "Collection of hacking links", category: "hacking", icon: "fas fa-link", link: "https://www.facebook.com/share/v/1AmmzeNBgw/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "WhatsApp Ban", description: "WhatsApp ban solution", category: "hacking", icon: "fab fa-whatsapp", link: "https://fahad-tech.vercel.app/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Unban Report APK", description: "Unban tool", category: "hacking", icon: "fas fa-unlock", link: "https://www.mediafire.com/file/g7thic6ro8dwi03/UNBAN_APK_1.0.apk/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Proxy for Telegram", description: "Telegram proxy app", category: "hacking", icon: "fas fa-shield-alt", link: "https://play.google.com/store/apps/details?id=org.socialsigma.deeproxy", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Unlimited Gmail", description: "Create unlimited Gmail", category: "hacking", icon: "fas fa-envelope", link: "https://www.mediafire.com/file/watf6hh6jhgx995/GMAIL_WITHOUT_PHONE_NUMBERS_.zip/file", type: "free", creditCost: 5, requiresAuth: true },

    // ===== PRANK TOOLS =====
    { name: "EasyPaisa Fake", description: "Fake EasyPaisa screenshot", category: "prank", icon: "fas fa-money-bill", link: "https://www.mediafire.com/file/mp674dg7n6mgh2d/EasyPaisa_screenshot_real_signed.apk/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "JazzCash Fake", description: "Fake JazzCash screenshot", category: "prank", icon: "fas fa-money-bill", link: "https://www.mediafire.com/file/mp674dg7n6mgh2d/EasyPaisa_screenshot_real_signed.apk/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Fake CNIC Maker", description: "Create fake CNIC", category: "prank", icon: "fas fa-id-card", link: "https://fakecnic.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Fake SMS Maker", description: "Create fake SMS", category: "prank", icon: "fas fa-sms", link: "https://www.mediafire.com/file/y3iv2jjjrshsf3e/ALL_SOCIAL_MEDIA_FAKE_SS(1).zip/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Fake GPS", description: "Change GPS location", category: "prank", icon: "fas fa-map-marker-alt", link: "https://play.google.com/store/apps/details?id=com.lexa.fakegps", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Hidden Camera", description: "Hidden camera methods", category: "prank", icon: "fas fa-camera", link: "https://www.mediafire.com/file/7qtxyi17ovgpyvc/MOBILE_HIDDEN_CAMERA_METHOD.zip/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Phone Control App", description: "Remote phone control", category: "prank", icon: "fas fa-mobile-alt", link: "https://www.mediafire.com/file/sfr8otsjsnko6ro/VID_20260105_000842_815.mp4.mkv/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Prank Dial", description: "Prank call generator", category: "prank", icon: "fas fa-phone", link: "https://prankdial.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Hackertyper", description: "Fake hacker screen", category: "prank", icon: "fas fa-keyboard", link: "https://hackertyper.net", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Geek Prank", description: "Windows XP prank", category: "prank", icon: "fas fa-desktop", link: "https://geekprank.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Fake Update", description: "Fake Windows update", category: "prank", icon: "fas fa-sync", link: "https://fakeupdate.net", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Prank Me Not", description: "Collection of pranks", category: "prank", icon: "fas fa-laugh", link: "https://prankmenot.com", type: "free", creditCost: 5, requiresAuth: true },

    // ===== COURSES =====
    { name: "Termux Course", description: "Complete Termux tutorial", category: "courses", icon: "fas fa-terminal", link: "https://youtu.be/GX2dI8zXM5k", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Bug Bounty Course", description: "Bug hunting from scratch", category: "courses", icon: "fas fa-bug", link: "https://mega.nz/folder/96AhRazA#Qci5-I29JIQobl4btJ7w0g", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Android Hacking Course", description: "Android pentesting", category: "courses", icon: "fab fa-android", link: "https://mega.nz/folder/GzhlULjb#J2jHHd3_jc2SIOnQ4ouiDA", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Canva Full Course", description: "Complete Canva design", category: "courses", icon: "fas fa-palette", link: "https://drive.google.com/file/d/1Vvepbb4OdfbgEKO8uCkdKaYrh-F7OE0W/view", type: "free", creditCost: 5, requiresAuth: true },
    { name: "500 TB Courses", description: "Massive course collection", category: "courses", icon: "fas fa-database", link: "https://drive.google.com/drive/mobile/folders/1CgN7DE3pNRNh_4BA_zrrMLqWz6KquwuD", type: "free", creditCost: 5, requiresAuth: true },
    { name: "YT SEO Course", description: "YouTube SEO mastery", category: "courses", icon: "fab fa-youtube", link: "https://drive.google.com/drive/folders/1KCUwXuCUDFgBWfervuTsUUH9WG5u_zKg", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Full Editing Pack", description: "Video editing resources", category: "courses", icon: "fas fa-film", link: "https://drive.google.com/drive/folders/1gO574IiKBUGt4STvyuLYrArOqWDpg_tL", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Memes Pack", description: "Meme collection", category: "courses", icon: "fas fa-laugh", link: "https://drive.google.com/drive/folders/1O8Tz_6Ida0mrzgY83v_XF8B3kF4A1JdD", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Biggest Designer Bundle", description: "Designer resources", category: "courses", icon: "fas fa-drafting-compass", link: "https://drive.google.com/drive/u/0/mobile/folders/1o4wRKokQsDlcG0669dsjaXX-E7-VOMro", type: "free", creditCost: 5, requiresAuth: true },

    // ===== GAMING =====
    { name: "Vice City", description: "GTA Vice City with cheats", category: "gaming", icon: "fas fa-gamepad", link: "https://www.mediafire.com/file/90p8Gqpb5DTM06v2O/GTA+Vice+City.7z/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "GTA San Andreas", description: "GTA San Andreas", category: "gaming", icon: "fas fa-gamepad", link: "https://www.mediafire.com/file/eYuBQkn9w7WwL513B/GTA+San+Andreas.7z/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Cheat Engine", description: "Game hacking tool", category: "gaming", icon: "fas fa-cog", link: "https://www.cheatengine.org", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Lucky Patcher", description: "Modify Android apps", category: "gaming", icon: "fab fa-android", link: "https://www.luckypatchers.com", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Game Guardian", description: "Game hacker for Android", category: "gaming", icon: "fas fa-shield-alt", link: "https://gameguardian.net", type: "free", creditCost: 5, requiresAuth: true },

    // ===== FONTS =====
    { name: "3K Pixellab Fonts", description: "3000+ fonts for PixelLab", category: "fonts", icon: "fas fa-font", link: "https://www.mediafire.com/file/gna1ub9930w24mu/2999+_Font_Pixellab.7z/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Stylish Keyboard", description: "Custom keyboard fonts", category: "fonts", icon: "fas fa-keyboard", link: "https://www.mediafire.com/file/6apm1gduu1tbdl0/FontsType_2.5.210904.apk/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Font Generator", description: "Generate stylish fonts", category: "fonts", icon: "fas fa-font", link: "https://devile146.github.io/Fahad_Tech/", type: "free", creditCost: 5, requiresAuth: true },

    // ===== UTILITIES =====
    { name: "Mobile Fast Setting", description: "Mobile settings trick", category: "utility", icon: "fas fa-tachometer-alt", link: "https://youtu.be/PUpPzZwsqC8?si=pb75Xx9lJJkHgEwk", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Solve Unofficial Problem", description: "Fix app issues", category: "utility", icon: "fas fa-wrench", link: "https://youtu.be/fX6DSOublok?si=Zo8rQCYI-LmnypAz", type: "free", creditCost: 5, requiresAuth: true },
    { name: "100L5", description: "Online Tools Provider", category: "utility", icon: "fas fa-tools", link: "https://10015.io/", type: "free", creditCost: 5, requiresAuth: true },
    { name: "Remove Phone Ads", description: "Remove mobile ads", category: "utility", icon: "fas fa-ban", link: "https://www.mediafire.com/file/f5heqs9y32pe97o/Mobile_Ads_Solution.mp4/file", type: "free", creditCost: 5, requiresAuth: true },
    { name: "OWNER", description: "Official owner page", category: "utility", icon: "fas fa-user", link: "https://devile146.github.io/Techweb/", type: "free", creditCost: 5, requiresAuth: true },

    // ===== PREMIUM TOOLS =====
    { name: "Fahad Tech Website", description: "Professional hacking Tools Website", category: "premium", icon: "fas fa-crown", link: "https://wa.me/923251138959", type: "premium", creditCost: 0, requiresAuth: false },
    { name: "Gallery Hack", description: "Make Any Type Of Gallery Rat APK", category: "premium", icon: "fas fa-crown", link: "https://wa.me/923251138959", type: "premium", creditCost: 0, requiresAuth: false },
    { name: "Premium Bot", description: "Collection of premium Tricks & Tools", category: "premium", icon: "fas fa-crown", link: "https://wa.me/923251138959", type: "premium", creditCost: 0, requiresAuth: false },
    { name: "Devile-X Toolkit", description: "Advanced Hacking Toolkit", category: "premium", icon: "fas fa-crown", link: "https://wa.me/923251138959", type: "premium", creditCost: 0, requiresAuth: false },
    { name: "Make Your Own Toolkit", description: "Custom toolkit creation", category: "premium", icon: "fas fa-crown", link: "https://wa.me/923251138959", type: "premium", creditCost: 0, requiresAuth: false }
];
