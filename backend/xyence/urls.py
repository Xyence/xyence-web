from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

def healthcheck(_request):
    return JsonResponse(
        {"status": "ok", "admin": "/admin/", "articles": "/api/articles/"},
    )

urlpatterns = [
    path("", healthcheck),
    path("admin/", admin.site.urls),
    path("api/", include("articles.urls")),
    path("accounts/", include("allauth.urls")),
    path("ckeditor5/", include("django_ckeditor_5.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
