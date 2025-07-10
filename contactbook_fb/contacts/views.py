import csv
from django.shortcuts import render, redirect
from django.http import HttpResponse
from firebase_config import db  # Firebase configuration
from .forms import ContactForm

# Home view
def home(request):
    return render(request, 'contacts/home.html')

# List all contacts
def contact_list(request):
    # Fetch all contacts from Firebase
    contacts_ref = db.collection('contacts')
    contacts = [doc.to_dict() | {'id': doc.id} for doc in contacts_ref.stream()]
    return render(request, 'contacts/contact_list.html', {'contacts': contacts})

# Export contacts to CSV
def export_contacts_csv(request):
    # Create the HTTP response with CSV content type
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="contacts.csv"'

    # Create a CSV writer
    writer = csv.writer(response)

    # Write the header row
    writer.writerow(['Name', 'Phone Number', 'Email'])

    # Fetch all contacts from Firebase
    contacts_ref = db.collection('contacts')
    contacts = [doc.to_dict() for doc in contacts_ref.stream()]

    # Write data rows
    for contact in contacts:
        writer.writerow([contact.get('name', ''), contact.get('phone', ''), contact.get('email', '')])

    return response

# Add a new contact
def add_contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            db.collection('contacts').add(data)  # Add data to Firebase
            return redirect('contact_list')
    else:
        form = ContactForm()
    return render(request, 'contacts/add_contact.html', {'form': form})

# Edit an existing contact
def edit_contact(request, contact_id):
    # Fetch the contact from Firebase
    contact_ref = db.collection('contacts').document(contact_id)
    contact_data = contact_ref.get().to_dict()

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            updated_data = form.cleaned_data
            contact_ref.set(updated_data)  # Update data in Firebase
            return redirect('contact_list')
    else:
        form = ContactForm(initial=contact_data)
    return render(request, 'contacts/edit_contact.html', {'form': form, 'contact_id': contact_id})

# Delete a contact
def delete_contact(request, contact_id):
    # Delete the contact from Firebase
    contact_ref = db.collection('contacts').document(contact_id)
    contact_ref.delete()
    return redirect('contact_list')
