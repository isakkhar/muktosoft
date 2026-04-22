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


class ServiceFeature(models.Model):
    """Features for a specific service."""
    service = models.ForeignKey(Service, related_name='features', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='check', help_text='Icon key from frontend')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.service.title} - {self.title}"


class ServiceStep(models.Model):
    """Workflow steps for a specific service."""
    service = models.ForeignKey(Service, related_name='steps', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='search', help_text='Icon key from frontend')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.service.title} - Step {self.order}: {self.title}"


class ServiceTechStack(models.Model):
    """Technologies used in the service."""
    service = models.ForeignKey(Service, related_name='tech_stack', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True, help_text='Icon key or URL')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.service.title} - {self.name}"


class ServiceFAQ(models.Model):
    """FAQs specific to a service."""
    service = models.ForeignKey(Service, related_name='faqs', on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    answer = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Service FAQ'

    def __str__(self):
        return f"{self.service.title} - {self.question}"


class ServiceTestimonial(models.Model):
    """Testimonials specific to a service."""
    service = models.ForeignKey(Service, related_name='testimonials', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True)
    text = models.TextField()
    rating = models.IntegerField(default=5)
    image = models.ImageField(upload_to='services/testimonials/', blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.service.title} - {self.name}"


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
    # Mission & Vision
    mission_title = models.CharField(max_length=200, default='Our Mission', blank=True)
    mission_description = models.TextField(default='To empower businesses with innovative software solutions that drive growth, efficiency, and digital transformation.', blank=True)
    vision_title = models.CharField(max_length=200, default='Our Vision', blank=True)
    vision_description = models.TextField(default='To be the leading technology partner for businesses worldwide, creating impactful digital experiences that shape the future.', blank=True)

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
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True, help_text='Client photo')
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


class CoreValue(models.Model):
    """Company core values."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='star', help_text='Icon key: star, heart, shield, target, lightbulb, handshake')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class CompanyTimeline(models.Model):
    """Company milestones timeline."""
    year = models.CharField(max_length=10)
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.year} - {self.title}"


class ClientLogo(models.Model):
    """Client/partner logos."""
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='clients/')
    url = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class WorkProcess(models.Model):
    """How we work — step by step."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='search', help_text='Icon key: search, pencil, code, rocket')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Work Process Step'

    def __str__(self):
        return self.title


class FAQ(models.Model):
    """Frequently asked questions."""
    question = models.CharField(max_length=300)
    answer = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question


class Product(models.Model):
    """Main product model."""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    tagline = models.CharField(max_length=300, blank=True, help_text="Short catchy phrase")
    description = models.TextField(help_text="Short description for cards")
    detail_description = models.TextField(help_text="Full description for detail page")
    logo = models.ImageField(upload_to='products/logos/', help_text="Square logo for cards")
    hero_image = models.ImageField(upload_to='products/hero/', blank=True, null=True, help_text="Banner image for detail page")
    demo_link = models.URLField(blank=True, null=True)
    video_link = models.URLField(blank=True, null=True)
    brochure_file = models.FileField(upload_to='products/brochures/', blank=True, null=True)
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


class ProductFeature(models.Model):
    """Features for a specific product."""
    product = models.ForeignKey(Product, related_name='features', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='check', help_text='Icon key from frontend')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.title} - {self.title}"


class ProductScreenshot(models.Model):
    """Screenshots/Gallery for a product."""
    product = models.ForeignKey(Product, related_name='screenshots', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/screenshots/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.title} Screenshot"


class ProductTechStack(models.Model):
    """technologies used in the product."""
    product = models.ForeignKey(Product, related_name='tech_stack', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True, help_text='Icon key or URL')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.title} - {self.name}"


class ProductFAQ(models.Model):
    """FAQs specific to a product."""
    product = models.ForeignKey(Product, related_name='faqs', on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    answer = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Product FAQ'

    def __str__(self):
        return f"{self.product.title} - {self.question}"


class ProductPricingPlan(models.Model):
    """Pricing plans for a product."""
    product = models.ForeignKey(Product, related_name='pricing_plans', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=50)
    period = models.CharField(max_length=50, default='month', help_text='e.g. month, year, one-time')
    description = models.TextField(blank=True)
    features_list = models.TextField(help_text='Enter features separated by new lines')
    button_text = models.CharField(max_length=50, default='Get Started')
    button_link = models.CharField(max_length=200, blank=True)
    is_popular = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.title} - {self.name}"

class NewsletterSubscription(models.Model):
    """Newsletter subscriptions."""
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Newsletter Subscription'
        verbose_name_plural = 'Newsletter Subscriptions'

    def __str__(self):
        return self.email

class ChatbotLead(models.Model):
    """Leads captured from the chatbot."""
    name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Chatbot Lead'
        verbose_name_plural = 'Chatbot Leads'

    def __str__(self):
        return f"{self.name} ({self.mobile})"


class RoadmapStep(models.Model):
    """Roadmap steps for the working plan."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Roadmap Step'
        verbose_name_plural = 'Roadmap Steps'

    def __str__(self):
        return f"Step {self.order + 1}: {self.title}"


class RoadmapStepItem(models.Model):
    """Specific items/tasks within a roadmap step."""
    step = models.ForeignKey(RoadmapStep, related_name='items', on_delete=models.CASCADE)
    text = models.CharField(max_length=300)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Roadmap Step Item'

    def __str__(self):
        return self.text
