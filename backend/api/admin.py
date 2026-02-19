from django.contrib import admin
from .models import (
    SiteSettings, HeroSection, HeroFloatingCard, Service, AboutSection, StatItem,
    PortfolioItem, WhyChooseUsItem, Testimonial, CTASection,
    Project, TeamMember, Contact
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'email', 'phone']
    fieldsets = (
        ('Brand', {'fields': ('site_name', 'site_name_highlight', 'logo', 'favicon')}),
        ('Contact Info', {'fields': ('phone', 'email', 'address')}),
        ('Social Media', {'fields': ('facebook_url', 'twitter_url', 'linkedin_url', 'instagram_url')}),
        ('Footer', {'fields': ('footer_description', 'copyright_text')}),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return True


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['badge_text']
    fieldsets = (
        ('Title', {'fields': ('badge_text', 'title_line1', 'title_highlight', 'title_line2')}),
        ('Content', {'fields': ('description',)}),
        ('Primary Button', {'fields': ('button_primary_text', 'button_primary_link')}),
        ('Secondary Button', {'fields': ('button_secondary_text', 'button_secondary_link')}),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return True


@admin.register(HeroFloatingCard)
class HeroFloatingCardAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'icon', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ['title']
    fieldsets = (
        ('Content', {'fields': ('subtitle', 'title', 'description', 'description2', 'image')}),
        ('Experience Badge', {'fields': ('experience_years', 'experience_label')}),
        ('Features', {'fields': ('feature1', 'feature2', 'feature3', 'feature4')}),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return True


@admin.register(StatItem)
class StatItemAdmin(admin.ModelAdmin):
    list_display = ['number', 'label', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'tag', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(WhyChooseUsItem)
class WhyChooseUsItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'rating', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(CTASection)
class CTASectionAdmin(admin.ModelAdmin):
    list_display = ['title']

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return True


admin.site.register(Project)
admin.site.register(TeamMember)
admin.site.register(Contact)

# Customize admin site
admin.site.site_header = 'MuktoSoft Admin Panel'
admin.site.site_title = 'MuktoSoft Admin'
admin.site.index_title = 'Website Management'
