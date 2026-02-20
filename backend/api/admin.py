from django.contrib import admin
from .models import (
    SiteSettings, HeroSection, HeroFloatingCard, Service, AboutSection, StatItem,
    PortfolioItem, WhyChooseUsItem, Testimonial, CTASection,
    Project, TeamMember, Contact,
    CoreValue, CompanyTimeline, ClientLogo, WorkProcess, FAQ,
    Product, ProductFeature, ProductScreenshot, ProductTechStack, ProductFAQ
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
    list_display = ['title', 'slug', 'icon', 'order']
    list_editable = ['order']
    ordering = ['order']
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        (None, {'fields': ('title', 'slug', 'icon', 'order')}),
        ('Content', {'fields': ('description', 'detail_description', 'image')}),
    )


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ['title']
    fieldsets = (
        ('Content', {'fields': ('subtitle', 'title', 'description', 'description2', 'image')}),
        ('Experience Badge', {'fields': ('experience_years', 'experience_label')}),
        ('Features', {'fields': ('feature1', 'feature2', 'feature3', 'feature4')}),
        ('Mission & Vision', {'fields': ('mission_title', 'mission_description', 'vision_title', 'vision_description')}),
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


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role']


@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(CompanyTimeline)
class CompanyTimelineAdmin(admin.ModelAdmin):
    list_display = ['year', 'title', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(ClientLogo)
class ClientLogoAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(WorkProcess)
class WorkProcessAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'order']
    list_editable = ['order']
    ordering = ['order']


admin.site.register(Project)
admin.site.register(Contact)

# Customize admin site
admin.site.site_header = 'Mukto Soft Admin Panel'
admin.site.site_title = 'Mukto Soft Admin'
admin.site.index_title = 'Website Management'


class ProductFeatureInline(admin.StackedInline):
    model = ProductFeature
    extra = 1


class ProductScreenshotInline(admin.StackedInline):
    model = ProductScreenshot
    extra = 1


class ProductTechStackInline(admin.StackedInline):
    model = ProductTechStack
    extra = 1


class ProductFAQInline(admin.StackedInline):
    model = ProductFAQ
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'order']
    list_editable = ['order']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProductFeatureInline, ProductScreenshotInline, ProductTechStackInline, ProductFAQInline]
    ordering = ['order']
