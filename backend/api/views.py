from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    SiteSettings, HeroSection, HeroFloatingCard, Service, AboutSection, StatItem,
    PortfolioItem, WhyChooseUsItem, Testimonial, CTASection,
    Project, TeamMember, Contact,
    CoreValue, CompanyTimeline, ClientLogo, WorkProcess, FAQ,
    Service, ServiceFeature, ServiceStep, ServiceTechStack, ServiceFAQ, ServiceTestimonial,
    Product, NewsletterSubscription, ChatbotLead,
    RoadmapStep, RoadmapStepItem
)
from .serializers import (
    SiteSettingsSerializer, HeroSectionSerializer, HeroFloatingCardSerializer,
    ServiceSerializer, ServiceDetailSerializer,
    AboutSectionSerializer, StatItemSerializer, PortfolioItemSerializer,
    WhyChooseUsItemSerializer, TestimonialSerializer, CTASectionSerializer,
    ProjectSerializer, TeamMemberSerializer, ContactSerializer,
    CoreValueSerializer, CompanyTimelineSerializer, ClientLogoSerializer,
    WorkProcessSerializer, FAQSerializer,
    ProductSerializer, ProductDetailSerializer,
    NewsletterSubscriptionSerializer, ChatbotLeadSerializer,
    RoadmapStepSerializer
)


class ChatbotLeadViewSet(viewsets.ModelViewSet):
    queryset = ChatbotLead.objects.all()
    serializer_class = ChatbotLeadSerializer


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
    team_members = TeamMember.objects.all()
    core_values = CoreValue.objects.all()
    timeline = CompanyTimeline.objects.all()
    client_logos = ClientLogo.objects.all()
    work_process = WorkProcess.objects.all()
    faqs = FAQ.objects.all()
    products = Product.objects.all()
    roadmap_steps = RoadmapStep.objects.all()
    projects = Project.objects.all()

    data = {
        'site_settings': SiteSettingsSerializer(site_settings, context={'request': request}).data if site_settings else None,
        'hero': HeroSectionSerializer(hero).data if hero else None,
        'hero_cards': HeroFloatingCardSerializer(hero_cards, many=True).data,
        'services': ServiceSerializer(services, many=True).data,
        'about': AboutSectionSerializer(about, context={'request': request}).data if about else None,
        'stats': StatItemSerializer(stats, many=True).data,
        'portfolio': PortfolioItemSerializer(portfolio, many=True, context={'request': request}).data,
        'why_choose': WhyChooseUsItemSerializer(why_choose, many=True).data,
        'testimonials': TestimonialSerializer(testimonials, many=True, context={'request': request}).data,
        'cta': CTASectionSerializer(cta).data if cta else None,
        'team_members': TeamMemberSerializer(team_members, many=True, context={'request': request}).data,
        'core_values': CoreValueSerializer(core_values, many=True).data,
        'timeline': CompanyTimelineSerializer(timeline, many=True).data,
        'client_logos': ClientLogoSerializer(client_logos, many=True, context={'request': request}).data,
        'work_process': WorkProcessSerializer(work_process, many=True).data,
        'faqs': FAQSerializer(faqs, many=True).data,
        'products': ProductSerializer(products, many=True, context={'request': request}).data,
        'roadmap_steps': RoadmapStepSerializer(roadmap_steps, many=True).data,
        'projects': ProjectSerializer(projects, many=True, context={'request': request}).data,
    }
    return Response(data)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceSerializer


@api_view(['GET'])
def service_detail(request, slug):
    """Get a single service by slug with full details."""
    try:
        service = Service.objects.get(slug=slug)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=404)
    return Response(ServiceDetailSerializer(service, context={'request': request}).data)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    serializer_class = ContactSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """Product list and details."""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductSerializer


@api_view(['GET'])
def product_detail(request, slug):
    """Get a single product by slug with full details."""
    try:
        product = Product.objects.get(slug=slug)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)
    return Response(ProductDetailSerializer(product, context={'request': request}).data)

class NewsletterSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer

    def create(self, request, *args, **kwargs):
        # Override create to handle already subscribed emails gracefully
        email = request.data.get('email')
        if NewsletterSubscription.objects.filter(email=email).exists():
            return Response({'message': 'Already subscribed!'}, status=200)
        return super().create(request, *args, **kwargs)
