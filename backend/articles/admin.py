from django import forms
from django.contrib import admin, messages
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.urls import path

from .ai import generate_article_draft
from .models import Article, ArticleVersion, OpenAIConfig


class ArticleVersionInline(admin.TabularInline):
    model = ArticleVersion
    extra = 0
    fields = ("version_number", "source", "model_name", "created_at")
    readonly_fields = ("version_number", "source", "model_name", "created_at")


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "published_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "summary")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-published_at", "-created_at")
    inlines = [ArticleVersionInline]


@admin.register(ArticleVersion)
class ArticleVersionAdmin(admin.ModelAdmin):
    list_display = ("article", "version_number", "source", "model_name", "created_at")
    list_filter = ("source",)
    search_fields = ("article__title", "summary")
    readonly_fields = ("version_number", "created_at")
    actions = ["apply_version_to_article"]

    def apply_version_to_article(self, request, queryset):
        updated = 0
        for version in queryset:
            article = version.article
            article.title = version.title
            article.summary = version.summary
            article.body = version.body
            if article.status != "published":
                article.status = "draft"
            article.save()
            updated += 1
        self.message_user(request, f"Applied {updated} version(s) to articles.", messages.SUCCESS)

    apply_version_to_article.short_description = "Apply selected versions to their articles"


@admin.register(OpenAIConfig)
class OpenAIConfigAdmin(admin.ModelAdmin):
    list_display = ("name", "default_model", "updated_at")
    search_fields = ("name", "default_model")

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields["api_key"].widget = forms.PasswordInput(render_value=True)
        return form


class AIStudioForm(forms.Form):
    article = forms.ModelChoiceField(queryset=Article.objects.all(), required=False)
    prompt = forms.CharField(widget=forms.Textarea(attrs={"rows": 8}))
    model_override = forms.CharField(required=False, help_text="Optional model override.")


def ai_studio_view(request: HttpRequest) -> HttpResponse:
    config = OpenAIConfig.objects.first()
    if not config:
        messages.error(request, "Create an OpenAI Config before using AI Studio.")
        return redirect("/admin/articles/openaiconfig/")

    if request.method == "POST":
        form = AIStudioForm(request.POST)
        if form.is_valid():
            article = form.cleaned_data["article"]
            prompt = form.cleaned_data["prompt"]
            model_override = form.cleaned_data["model_override"] or None

            try:
                draft, _response = generate_article_draft(prompt, config, model_override)
            except Exception as exc:
                messages.error(request, f"OpenAI request failed: {exc}")
                return render(request, "admin/ai_studio.html", {"form": form, "config": config})

            title = draft.get("title") or "Untitled draft"
            summary = draft.get("summary", "")
            body = draft.get("body_html", "")

            if not article:
                article = Article.objects.create(
                    title=title,
                    summary=summary,
                    body=body,
                    status="draft",
                )
            else:
                article.title = title
                article.summary = summary
                article.body = body
                if article.status != "published":
                    article.status = "draft"
                article.save()

            ArticleVersion.objects.create(
                article=article,
                title=title,
                summary=summary,
                body=body,
                source="ai",
                prompt=prompt,
                model_name=model_override or config.default_model,
            )

            messages.success(request, "Draft saved. Review in the article editor.")
            return redirect(f"/admin/articles/article/{article.id}/change/")
    else:
        form = AIStudioForm()

    return render(request, "admin/ai_studio.html", {"form": form, "config": config})


def _inject_ai_studio_url(urls):
    return [
        path("ai-studio/", admin.site.admin_view(ai_studio_view), name="ai-studio"),
        *urls,
    ]


admin.site.get_urls = (lambda original: (lambda: _inject_ai_studio_url(original())))(
    admin.site.get_urls
)
