from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def _create_user(self, username, email, password, first_name='', last_name=''):
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        return user

    def create_user(self, username, email, password, first_name='', last_name=''):
        user = self._create_user(username, email, password, first_name, last_name)
        user.save()
        return user

    def create_staffuser(self, username, email, password, first_name='', last_name=''):
        user = self._create_user(username, email, password, first_name, last_name)
        user.is_staff = True
        user.save()
        return user

    def create_superuser(self, username, email, password, first_name='', last_name=''):
        user = self._create_user(username, email, password, first_name, last_name)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user
