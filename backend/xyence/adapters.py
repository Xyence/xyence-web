import os

from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.http import HttpResponseForbidden


def _allowed_domains():
    raw = os.environ.get("ALLOWED_LOGIN_DOMAINS", "xyence.io")
    return {domain.strip().lower() for domain in raw.split(",") if domain.strip()}


def _email_domain(email):
    if not email or "@" not in email:
        return ""
    return email.split("@", 1)[1].lower()


class DomainRestrictedSocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        email = sociallogin.user.email or sociallogin.account.extra_data.get("email")
        return _email_domain(email) in _allowed_domains()

    def pre_social_login(self, request, sociallogin):
        email = sociallogin.user.email or sociallogin.account.extra_data.get("email")
        if _email_domain(email) not in _allowed_domains():
            raise ImmediateHttpResponse(
                HttpResponseForbidden("Email domain is not allowed.")
            )
        if sociallogin.user and sociallogin.user.pk and not sociallogin.user.is_staff:
            sociallogin.user.is_staff = True
            sociallogin.user.save(update_fields=["is_staff"])

    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        email = user.email or getattr(sociallogin.account, "extra_data", {}).get("email")
        if email and hasattr(user, "username"):
            if user.username != email:
                user.username = email
                user.save(update_fields=["username"])
        if not user.is_staff:
            user.is_staff = True
            user.save(update_fields=["is_staff"])
        return user
