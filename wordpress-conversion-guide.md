# WordPress Conversion Guide

This React application has been structured to follow WordPress theme conventions, making it easier to convert to an actual WordPress site.

## Current Structure (React/WordPress-Style)

```
/templates/          → WordPress theme template files
/pages/             → WordPress page templates
/components/
  /common/          → Reusable theme components (header.php, footer.php)
  /sections/        → Template parts
  /ui/             → Component library (can become PHP functions)
```

## WordPress Conversion Steps

### 1. Template Files
Convert these React templates to PHP:

- `/templates/DefaultTemplate.tsx` → `index.php`, `page.php`
- `/pages/HomePage.tsx` → `front-page.php` or `home.php`
- `/components/common/Header.tsx` → `header.php`
- `/components/common/Footer.tsx` → `footer.php`

### 2. Component Sections
Convert section components to template parts:

- `/components/sections/HeroSection.tsx` → `template-parts/hero-section.php`
- `/components/sections/ProgramsSection.tsx` → `template-parts/programs-section.php`
- `/components/sections/AboutSection.tsx` → `template-parts/about-section.php`

### 3. WordPress Features to Implement

#### Custom Post Types
```php
// Register Programs Custom Post Type
function register_programs_post_type() {
    register_post_type('programs', [
        'label' => 'Programs',
        'public' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
        'has_archive' => true,
    ]);
}
add_action('init', 'register_programs_post_type');
```

#### Custom Fields (ACF or native)
- Program duration
- Program level
- Program category
- Program features
- Program icon/color

#### Menus
- Register navigation menus in `functions.php`
- Convert navigation arrays to `wp_nav_menu()`

#### Widgets
- Newsletter signup widget
- Social media widget
- Contact information widget

### 4. Database Structure

#### Programs Table (Custom Post Type)
- ID, title, content, featured image
- Custom fields for program details

#### Students/Users
- Extend WordPress user system
- Add student portal functionality
- User roles: student, instructor, admin

### 5. Required WordPress Files

#### Essential Theme Files
```
style.css           (Theme stylesheet with header comment)
index.php           (Main template fallback)
functions.php       (Theme functions and features)
header.php          (Site header)
footer.php          (Site footer)
front-page.php      (Homepage template)
single-programs.php (Individual program pages)
archive-programs.php (Programs listing page)
page.php            (Standard pages)
404.php             (Error page)
```

#### Theme Configuration
```php
// functions.php
function academy_theme_setup() {
    // Add theme support
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
    add_theme_support('custom-logo');
    
    // Register navigation menus
    register_nav_menus([
        'primary' => 'Primary Navigation',
        'footer' => 'Footer Navigation'
    ]);
}
add_action('after_setup_theme', 'academy_theme_setup');
```

### 6. Styling Considerations

#### Tailwind CSS in WordPress
- Use WordPress-compatible build process
- Consider converting to standard CSS for better compatibility
- Or use Tailwind with WordPress-specific configuration

#### CSS Classes
The current semantic CSS classes (like `.hero-section`, `.program-card`) are already WordPress-friendly and can be maintained.

### 7. Functionality Migration

#### Student Login
- Integrate with WordPress user system
- Create custom login/registration forms
- Add student dashboard pages

#### Contact Forms
- Use Contact Form 7 or custom forms
- Integrate with WordPress form handling

#### Newsletter
- Integrate with Mailchimp, ConvertKit, or similar
- Store subscribers in WordPress database

### 8. Security Considerations

- Sanitize all user inputs
- Use WordPress nonces for forms
- Implement proper user capabilities
- Follow WordPress coding standards

### 9. SEO and Performance

- Add proper meta tags
- Implement schema markup for programs
- Optimize images and assets
- Use WordPress caching plugins

### 10. Next Steps

1. Set up local WordPress development environment
2. Create new theme directory
3. Convert React components to PHP templates
4. Set up custom post types and fields
5. Implement WordPress-specific functionality
6. Test and optimize

This structure provides a solid foundation for WordPress conversion while maintaining the design and functionality of the current React application.
```

## WordPress Plugin Recommendations

- **Advanced Custom Fields (ACF)** - For program custom fields
- **Contact Form 7** - For contact forms
- **Yoast SEO** - For search engine optimization
- **WP Rocket** - For caching and performance
- **UpdraftPlus** - For backups
- **Wordfence** - For security