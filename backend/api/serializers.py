from rest_framework import serializers
from .models import (
    SiteSettings, HeroSection, HeroFloatingCard, Service, AboutSection, StatItem,
    PortfolioItem, WhyChooseUsItem, Testimonial, CTASection,
    Project, TeamMember, Contact,
    CoreValue, CompanyTimeline, ClientLogo, WorkProcess, FAQ
)


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
