import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  FileText, 
  Briefcase, 
  Users, 
  TrendingUp,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface DashboardStats {
  totalContacts: number;
  totalBlogs: number;
  totalCareers: number;
  recentContacts: number;
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  createdAt: Timestamp;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalBlogs: 0,
    totalCareers: 0,
    recentContacts: 0
  });
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch contact submissions
        const contactsQuery = query(collection(db, 'contacts'));
        const contactsSnapshot = await getDocs(contactsQuery);
        const totalContacts = contactsSnapshot.size;

        // Fetch recent contacts (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentContactsQuery = query(
          collection(db, 'contacts'),
          where('createdAt', '>=', Timestamp.fromDate(sevenDaysAgo)),
          orderBy('createdAt', 'desc')
        );
        const recentContactsSnapshot = await getDocs(recentContactsQuery);
        const recentContacts = recentContactsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as RecentContact[];

        // Fetch blogs
        const blogsQuery = query(collection(db, 'blogs'));
        const blogsSnapshot = await getDocs(blogsQuery);
        const totalBlogs = blogsSnapshot.size;

        // Fetch careers
        const careersQuery = query(collection(db, 'careers'));
        const careersSnapshot = await getDocs(careersQuery);
        const totalCareers = careersSnapshot.size;

        setStats({
          totalContacts,
          totalBlogs,
          totalCareers,
          recentContacts: recentContacts.length
        });

        setRecentContacts(recentContacts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      href: '/admin/contacts'
    },
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      icon: FileText,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      href: '/admin/blogs'
    },
    {
      title: 'Job Openings',
      value: stats.totalCareers,
      icon: Briefcase,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      href: '/admin/careers'
    },
    {
      title: 'Recent Contacts',
      value: stats.recentContacts,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      href: '/admin/contacts'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 glass animate-pulse">
              <div className="h-4 bg-secondary rounded mb-4"></div>
              <div className="h-8 bg-secondary rounded mb-2"></div>
              <div className="h-3 bg-secondary rounded w-2/3"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to the Stravex Technologies admin panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6 glass hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <Link to={stat.href}>
              <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-xs">
                View details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Recent Contacts
            </h2>
            <Link to="/admin/contacts">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </div>
          
          {recentContacts.length > 0 ? (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">
                      {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {contact.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {contact.subject}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {contact.createdAt.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recent contacts</p>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 glass">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          
          <div className="space-y-3">
            <Link to="/admin/contacts">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Manage Contact Submissions
              </Button>
            </Link>
            
            <Link to="/admin/blogs">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create New Blog Post
              </Button>
            </Link>
            
            <Link to="/admin/careers">
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="mr-2 h-4 w-4" />
                Add Job Opening
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;


