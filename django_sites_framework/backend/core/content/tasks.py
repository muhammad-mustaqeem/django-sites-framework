from __future__ import absolute_import, unicode_literals
from celery import shared_task


@shared_task
def add(x, y):
    return x + y


@shared_task
def print_server_ip(ip):
    return (f'Current IP {ip}')
