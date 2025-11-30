# Portfolio Website

Modern, responsive portfolio website built with Tailwind CSS, GSAP animations, and Swiper.js

## 🚀 Features

- ✅ **Modern UI/UX** - Clean, professional design with gradient themes
- ✅ **Dark/Light Mode** - Toggle between themes with localStorage persistence
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Smooth Animations** - GSAP-powered scroll animations
- ✅ **Project Slider** - Swiper.js carousel with autoplay
- ✅ **Lightbox Gallery** - Fullscreen image viewer with keyboard navigation
- ✅ **Interactive Modals** - Detailed project information
- ✅ **Contact Form** - PHP mail handler with PHPMailer & Gmail SMTP

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with modern features
- **JavaScript ES6+** - Dynamic functionality
- **PHP 7.4+** - Backend mail handler
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Swiper.js** - Touch slider
- **PHPMailer** - Email sending library
- **Siemens iX** - Web components (ready for future use)

## 📂 Project Structure

```
webix/
├── index.html              # Main page
├── contact.html            # Contact page (standalone)
├── send.php                # PHP mail handler
├── config.example.php      # Email config template
├── config.php              # Email config (gitignored)
├── css/
│   └── style.css          # Custom styles
├── js/
│   ├── data.js            # Project data
│   └── app.js             # Main logic
├── images/
│   ├── pts/               # PTS project images
│   ├── routeoptimizer/    # Route optimizer images
│   └── uzman web site/    # Uzman website images
├── PHPMailer/
│   └── src/               # PHPMailer library
└── README.md
```

## 🎨 Color Palette

- **Primary Gradient**: Indigo (#4f46e5) → Purple (#7c3aed) → Blue (#3b82f6)
- **Neutral Light**: Zinc-50 to Zinc-200
- **Neutral Dark**: Zinc-800 to Zinc-900
- **Accent**: Purple (#8b5cf6)

## 🌐 Live Projects

1. **PTS - Personnel Tracking System**: https://pts-one.vercel.app/personnel
2. **UZMAN Website**: https://uzman-website-q5ve.vercel.app/
3. **Route Optimizer**: https://uzman-routeoptimizer-u6il.vercel.app/

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AhmetBoy/portfolio.git
cd portfolio
```

2. **Setup Email Configuration** (for contact form):
```bash
# Copy the example config file
cp config.example.php config.php

# Edit config.php and add your Gmail credentials
# You need a Gmail App Password (not your regular password)
# Visit: https://myaccount.google.com/apppasswords
```

3. **For Local Development** (PHP required):
```bash
# Start PHP built-in server
php -S localhost:8000

# Open browser
open http://localhost:8000
```

4. **For Static Preview** (without contact form):
```bash
# Just open index.html
open index.html
```

### 📧 Contact Form Setup

The contact form requires PHP and uses PHPMailer with Gmail SMTP.

**Steps:**
1. Copy `config.example.php` to `config.php`
2. Get Gmail App Password: https://myaccount.google.com/apppasswords
3. Update credentials in `config.php`
4. Upload to a PHP hosting (000webhost, InfinityFree, etc.)

**Note:** `config.php` is gitignored for security - never commit your credentials!

## 📝 Customization

### Adding New Projects

Edit `js/data.js`:

```javascript
{
    id: "project-id",
    title: "Project Title",
    description: "Project description...",
    type: "Project Type",
    techStack: ["Tech1", "Tech2", "Tech3"],
    images: ["images/folder/image1.png", "images/folder/image2.png"],
    repoUrl: "https://github.com/...",
    liveUrl: "https://..."
}
```

### Changing Colors

Edit Tailwind config in `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#your-color',
                'accent': '#your-color'
            }
        }
    }
}
```

## 🎯 Features Breakdown

### Dark Mode
- Automatic theme detection
- Manual toggle
- LocalStorage persistence
- Smooth transitions

### Animations
- Hero section fade-in
- Scroll-triggered project reveal
- Hover effects on cards
- Modal entrance animations

### Slider
- Auto-play (5s delay)
- Touch/swipe support
- Keyboard navigation
- Responsive breakpoints
- Custom SVG arrows

### Lightbox
- Fullscreen image viewer
- Keyboard controls (arrows, ESC)
- Touch gestures
- Zoom support (3x)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Ahmet**
- GitHub: [@AhmetBoy](https://github.com/AhmetBoy)

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [Swiper.js](https://swiperjs.com/)
- [Siemens iX](https://ix.siemens.io/)

---

**⭐ Star this repo if you found it helpful!**
