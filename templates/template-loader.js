// Template loader for header and footer
class TemplateLoader {
  static async loadTemplate(templatePath, targetSelector, replacements = {}) {
    try {
      const response = await fetch(templatePath);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${templatePath}`);
      }
      
      let html = await response.text();
      
      // Replace placeholders with actual values
      Object.keys(replacements).forEach(key => {
        const placeholder = `{{${key}}}`;
        html = html.replace(new RegExp(placeholder, 'g'), replacements[key]);
      });
      
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.innerHTML = html;
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }

  static async loadHeader(homePath = '') {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      // Use different header template for homepage
      const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
      const headerTemplate = isHomePage ? 'header-home.html' : 'header.html';
      
      await this.loadTemplate(`${homePath}templates/${headerTemplate}`, '#header-placeholder', {
        HOME_PATH: homePath
      });
    }
  }

  static async loadFooter(homePath = '') {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      await this.loadTemplate(`${homePath}templates/footer.html`, '#footer-placeholder');
    }
  }

  static async init(homePath = '') {
    await Promise.all([
      this.loadHeader(homePath),
      this.loadFooter(homePath)
    ]);
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Determine the home path based on current location
  const path = window.location.pathname;
  let homePath = '';
  
  if (path.includes('/pages/ui-ux/')) {
    homePath = '../../';
  } else if (path.includes('/pages/creative-arts/')) {
    homePath = '../../';
  }
  
  TemplateLoader.init(homePath);
});
