from django.db import models


class SiteSettings(models.Model):
    """Global site settings — logo, favicon, site name, etc."""
    site_name = models.CharField(max_length=200, default='MuktoSoft')
    site_name_highlight = models.CharField(max_length=100, default='Soft', help_text='Part of site name shown in accent color')
    logo = models.ImageField(upload_to='site/', blank=True, null=True)
    favicon = models.ImageField(upload_to='site/', blank=True, null=True)
    footer_description = models.TextField(default='We help businesses transform their digital presence with custom software solutions.', blank=True)
    phone = models.CharField(max_length=30, default='+880 1234-567890', blank=True)
    email = models.EmailField(default='info@muktosoft.com', blank=True)
    address = models.CharField(max_length=300, default='Dhaka, Bangladesh', blank=True)
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    copyright_text = models.CharField(max_length=300, default='© 2026 MuktoSoft. All rights reserved.', blank=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return self.site_name


class HeroSection(models.Model):
    """Hero section content."""
    badge_text = models.CharField(max_length=200, default='Welcome to Mukto Soft')
    title_line1 = models.CharField(max_length=300, default='Innovative')
    title_highlight = models.CharField(max_length=200, default='IT Solutions')
    title_line2 = models.CharField(max_length=300, default='for Your Business Growth')
    description = models.TextField(default='We deliver cutting-edge technology solutions that transform businesses, boost efficiency, and drive digital innovation.')
    button_primary_text = models.CharField(max_length=100, default='Get Started')
    button_primary_link = models.CharField(max_length=300, default='/contact', blank=True)
    button_secondary_text = models.CharField(max_length=100, default='Our Services')
    button_secondary_link = models.CharField(max_length=300, default='/services', blank=True)

    class Meta:
        verbose_name = 'Hero Section'
        verbose_name_plural = 'Hero Section'

    def __str__(self):
        return 'Hero Section'


class HeroFloatingCard(models.Model):
    """Floating cards shown in the hero section graphic."""
    ICON_CHOICES = [
        ('bolt', '⚡ Fast / Bolt'),
        ('check', '✅ Checkmark / Uptime'),
        ('users', '👥 Users / Support'),
        ('shield', '🛡️ Shield / Security'),
        ('cloud', '☁️ Cloud'),
        ('code', '💻 Code'),
        ('star', '⭐ Star / Quality'),
        ('rocket', '🚀 Rocket / Launch'),
    ]
    title = models.CharField(max_length=100, help_text='e.g. Fast Delivery')
    subtitle = models.CharField(max_length=200, help_text='e.g. On-time deployment')
    icon = models.CharField(max_length=20, choices=ICON_CHOICES, default='bolt')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Hero Floating Card'
        verbose_name_plural = 'Hero Floating Cards'

    def __str__(self):
        return self.title


class Service(models.Model):
    """Services list."""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True, help_text='Auto-generated from title if left blank')
    description = models.TextField(help_text='Short description shown on cards')
    detail_description = models.TextField(blank=True, help_text='Full detailed description shown on the service detail page')
    icon = models.CharField(max_length=50, default='web', help_text='Icon key: web, mobile, cloud, security, consulting, marketing')
    image = models.ImageField(upload_to='services/', blank=True, null=True, help_text='Service detail page banner image')
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class AboutSection(models.Model):
    """About section content."""
    subtitle = models.CharField(max_length=200, default='About Mukto Soft')
    title = models.CharField(max_length=300, default='We Are Trusted IT Solutions Provider')
    description = models.TextField(default='With over a decade of experience, Mukto Soft has been at the forefront of technology innovation.')
    description2 = models.TextField(default='Our team of seasoned professionals brings expertise across diverse technology domains.', blank=True)
    image = models.ImageField(upload_to='about/', blank=True, null=True)
    experience_years = models.CharField(max_length=10, default='10+')
    experience_label = models.CharField(max_length=100, default='Years Experience')
    feature1 = models.CharField(max_length=200, default='Expert Development Team')
    feature2 = models.CharField(max_length=200, default='24/7 Technical Support')
    feature3 = models.CharField(max_length=200, default='Agile Methodology')
    feature4 = models.CharField(max_length=200, default='Quality Assurance')

    class Meta:
        verbose_name = 'About Section'
        verbose_name_plural = 'About Section'

    def __str__(self):
        return 'About Section'


class StatItem(models.Model):
    """Stats/counter items."""
    number = models.CharField(max_length=20)
    label = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.number} - {self.label}'


class PortfolioItem(models.Model):
    """Portfolio/project items."""
    title = models.CharField(max_length=200)
    tag = models.CharField(max_length=100, help_text='e.g. Web App, Mobile, Cloud')
    description = models.CharField(max_length=300, blank=True)
    image = models.ImageField(upload_to='portfolio/', blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class WhyChooseUsItem(models.Model):
    """Why Choose Us list items."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Why Choose Us Item'
        verbose_name_plural = 'Why Choose Us Items'

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Client testimonials."""
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    text = models.TextField()
    rating = models.IntegerField(default=5)
    avatar_letter = models.CharField(max_length=2, help_text='Initial letter for avatar', blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class CTASection(models.Model):
    """Call to Action section."""
    title = models.CharField(max_length=300, default="Ready to Transform Your Business?")
    description = models.TextField(default="Let's discuss how our technology solutions can help your business grow.")
    button_text = models.CharField(max_length=100, default='Start a Project')
    button_link = models.CharField(max_length=300, default='/contact')

    class Meta:
        verbose_name = 'CTA Section'
        verbose_name_plural = 'CTA Section'

    def __str__(self):
        return 'CTA Section'


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/')
    linkedin_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"
