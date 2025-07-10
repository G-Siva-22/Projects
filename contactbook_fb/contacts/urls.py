from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('contacts/', views.contact_list, name='contact_list'),
    path('add/', views.add_contact, name='add_contact'),
    path('edit/<contact_id>/', views.edit_contact, name='edit_contact'),
    path('delete/<contact_id>/', views.delete_contact, name='delete_contact'),
    path('export_csv/', views.export_contacts_csv, name='export_contacts_csv'),  # New route for CSV export
]
