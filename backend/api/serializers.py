from rest_framework import serializers
from .models import (
    SiteSettings, HeroSection, HeroFloatingCard, Service, AboutSection, StatItem,
    PortfolioItem, WhyChooseUsItem, Testimonial, CTASection,
    Project, TeamMember, Contact,
    CoreValue, CompanyTimeline, ClientLogo, WorkProcess, FAQ,
    Service, ServiceFeature, ServiceStep, ServiceTechStack, ServiceFAQ, ServiceTestimonial,
    Product, ProductFeature, ProductScreenshot, ProductTechStack, ProductFAQ, ProductPricingPlan,
    NewsletterSubscription, ChatbotLead
)


class ChatbotLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatbotLead
        fields = '__all__'


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = '__all__'


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = '__all__'


class HeroFloatingCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroFloatingCard
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = '__all__'


class ServiceStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceStep
        fields = '__all__'


class ServiceTechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTechStack
        fields = '__all__'


class ServiceFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFAQ
        fields = '__all__'


class ServiceTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTestimonial
        fields = '__all__'


class ServiceDetailSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)
    steps = ServiceStepSerializer(many=True, read_only=True)
    tech_stack = ServiceTechStackSerializer(many=True, read_only=True)
    faqs = ServiceFAQSerializer(many=True, read_only=True)
    testimonials = ServiceTestimonialSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = '__all__'


class StatItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatItem
        fields = '__all__'


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = '__all__'


class WhyChooseUsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsItem
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class CTASectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTASection
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'


class CompanyTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyTimeline
        fields = '__all__'


class ClientLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientLogo
        fields = '__all__'


class WorkProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProcess
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class ProductFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeature
        fields = '__all__'


class ProductScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductScreenshot
        fields = '__all__'


class ProductTechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTechStack
        fields = '__all__'


class ProductFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFAQ
        fields = '__all__'


class ProductPricingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPricingPlan
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductDetailSerializer(serializers.ModelSerializer):
    features = ProductFeatureSerializer(many=True, read_only=True)
    screenshots = ProductScreenshotSerializer(many=True, read_only=True)
    tech_stack = ProductTechStackSerializer(many=True, read_only=True)
    faqs = ProductFAQSerializer(many=True, read_only=True)
    pricing_plans = ProductPricingPlanSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
