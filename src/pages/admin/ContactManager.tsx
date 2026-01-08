import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Download, 
  Search, 
  Eye, 
  Calendar,
  Mail,
  User,
  Phone,
  MessageSquare
} from 'lucide-react';
import { getContactSubmissions, subscribeContactSubmissions, deleteContactSubmission } from '@/integrations/firebase/contactService';
import type { ContactSubmission } from '@/integrations/firebase/types';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { collection, addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';
import { formatDate, formatDateTime } from '@/utils/dateUtils';

const COLLECTION_NAME = 'contact_submissions';

interface ContactSubmissionRow {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string; // ISO string from service
  company?: string;
  phone?: string;
}

const ContactManager: React.FC = () => {
  const [contacts, setContacts] = useState<ContactSubmissionRow[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactSubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    // Initial fetch + realtime subscribe
    fetchContacts();
    
    const unsubscribe = subscribeContactSubmissions((rows) => {
      const mapped = rows.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        company: s.company,
        phone: s.phone,
        message: s.message,
        created_at: typeof s.created_at === 'string' ? s.created_at : new Date().toISOString()
      }));
      setContacts(mapped);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.phone && contact.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  const fetchContacts = async () => {
    try {
      const submissions = await getContactSubmissions();
      // Map service shape to table row shape
      const rows: ContactSubmissionRow[] = submissions.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        company: s.company,
        message: s.message,
        created_at: typeof s.created_at === 'string' ? s.created_at : new Date().toISOString()
      }));
      setContacts(rows);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredContacts.map(contact => ({
        Name: contact.name,
        Company: contact.company || 'N/A',
        Email: contact.email,
        Phone: contact.phone || 'N/A',
        Message: contact.message,
        'Date Submitted': formatDate(contact.created_at)
      }))
    );
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Submissions');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
    saveAs(data, `contact-submissions-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const deleteContact = async (contactId: string) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await deleteContactSubmission(contactId);
        setContacts(contacts.filter(contact => contact.id !== contactId));
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Contact Manager
            </h1>
            <p className="text-muted-foreground">Loading contacts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Contact Manager
          </h1>
          <p className="text-muted-foreground">
            Manage contact form submissions ({contacts.length} total)
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={exportToExcel}
            className="bg-gradient-primary neon-ring hover:shadow-glow"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4 glass">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts by name, company, email, phone, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Contacts Table */}
      <Card className="glass">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{contact.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{contact.company}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {contact.phone ? (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{contact.phone}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm line-clamp-1">{contact.message}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDate(contact.created_at)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center space-x-2">
                                  <MessageSquare className="h-5 w-5" />
                                  <span>Contact Details</span>
                                </DialogTitle>
                              </DialogHeader>
                              
                              {selectedContact && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                                      <p className="text-foreground">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                                      <p className="text-foreground">{selectedContact.email}</p>
                                    </div>
                                    {selectedContact.company && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Company</label>
                                        <p className="text-foreground">{selectedContact.company}</p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                                    <div className="p-3 bg-secondary rounded-lg">
                                      <p className="text-foreground whitespace-pre-wrap">
                                        {selectedContact.message}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                                    <p className="text-foreground">
                                      {formatDateTime(selectedContact.created_at)}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteContact(contact.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-2">
                        <MessageSquare className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm ? 'No contacts found matching your search' : 'No contact submissions yet'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ContactManager;


