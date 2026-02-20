from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    SiteSettings, HeroSection, HeroFloatingCard, Service, AboutSection, StatItem,
    PortfolioItem, WhyChooseUsItem, Testimonial, CTASection,
    Project, TeamMember, Contact
)
from .serializers import (
    SiteSettingsSerializer, HeroSectionSerializer, HeroFloatingCardSerializer,
    ServiceSerializer,
    AboutSectionSerializer, StatItemSerializer, PortfolioItemSerializer,
    WhyChooseUsItemSerializer, TestimonialSerializer, CTASectionSerializer,
    ProjectSerializer, TeamMemberSerializer, ContactSerializer
)


@api_view(['GET'])
def homepage_data(request):
    """Single API endpoint that returns ALL homepage data at once."""
    site_settings = SiteSettings.objects.first()
    hero = HeroSection.objects.first()
    hero_cards = HeroFloatingCard.objects.all()
    services = Service.objects.all()
    about = AboutSection.objects.first()
    stats = StatItem.objects.all()
    portfolio = PortfolioItem.objects.all()
    why_choose = WhyChooseUsItem.objects.all()
    testimonials = Testimonial.objects.all()
    cta = CTASection.objects.first()

    data = {
        'site_settings': SiteSettingsSerializer(site_settings, context={'request': request}).data if site_settings else None,
        'hero': HeroSectionSerializer(hero).data if hero else None,
        'hero_cards': HeroFloatingCardSerializer(hero_cards, many=True).data,
        'services': ServiceSerializer(services, many=True).data,
        'about': AboutSectionSerializer(about, context={'request': request}).data if about else None,
        'stats': StatItemSerializer(stats, many=True).data,
        'portfolio': PortfolioItemSerializer(portfolio, many=True, context={'request': request}).data,
        'why_choose': WhyChooseUsItemSerializer(why_choose, many=True).data,
        'testimonials': TestimonialSerializer(testimonials, many=True).data,
        'cta': CTASectionSerializer(cta).data if cta else None,
    }
    return Response(data)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


@api_view(['GET'])
def service_detail(request, slug):
    """Get a single service by slug."""
    try:
        service = Service.objects.get(slug=slug)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=404)
    return Response(ServiceSerializer(service, context={'request': request}).data)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
