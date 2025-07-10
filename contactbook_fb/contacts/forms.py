from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, required=True, label='Name')
    phone = forms.CharField(max_length=15, required=True, label='Phone Number')
    email = forms.EmailField(required=True, label='Email')
