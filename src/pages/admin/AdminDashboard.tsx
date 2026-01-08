import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  FileText,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDate } from '@/utils/dateUtils';

interface DashboardStats {
  totalContacts: number;
  recentContacts: number;
  totalBlogs: number;
  recentBlogs: number;
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: Timestamp;
}

interface RecentBlog {
  id: string;
  title: string;
  created_at: Timestamp;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    recentContacts: 0,
    totalBlogs: 0,
    recentBlogs: 0
  });
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch contact submissions from correct collection
        const contactsQuery = query(collection(db, 'contact_submissions'));
        const contactsSnapshot = await getDocs(contactsQuery);
        const totalContacts = contactsSnapshot.size;

        // Fetch recent contacts (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentContactsQuery = query(
          collection(db, 'contact_submissions'),
          where('created_at', '>=', Timestamp.fromDate(sevenDaysAgo)),
          orderBy('created_at', 'desc')
        );
        const recentContactsSnapshot = await getDocs(recentContactsQuery);
        const recentContacts = recentContactsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as RecentContact[];

        // Fetch blog posts
        const blogsQuery = query(collection(db, 'blogs'));
        const blogsSnapshot = await getDocs(blogsQuery);
        const totalBlogs = blogsSnapshot.size;

        // Fetch recent blogs (last 7 days)
        const recentBlogsQuery = query(
          collection(db, 'blogs'),
          where('created_at', '>=', Timestamp.fromDate(sevenDaysAgo)),
          orderBy('created_at', 'desc')
        );
        const recentBlogsSnapshot = await getDocs(recentBlogsQuery);
        const recentBlogs = recentBlogsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as RecentBlog[];

        setStats({
          totalContacts,
          recentContacts: recentContacts.length,
          totalBlogs,
          recentBlogs: recentBlogs.length
        });

        setRecentContacts(recentContacts.slice(0, 5));
        setRecentBlogs(recentBlogs.slice(0, 5));
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
      title: 'Recent Contacts',
      value: stats.recentContacts,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
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
      title: 'Recent Blogs',
      value: stats.recentBlogs,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      href: '/admin/blogs'
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
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(contact.created_at)}
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

        {/* Recent Blogs */}
        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Recent Blogs
            </h2>
            <Link to="/admin/blogs">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </div>
          
          {recentBlogs.length > 0 ? (
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm line-clamp-1">
                      {blog.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(blog.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recent blogs</p>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 glass">
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link to="/admin/contacts">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Manage Contact Submissions
            </Button>
          </Link>
          <Link to="/admin/blogs">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Manage Blog Posts
            </Button>
          </Link>
          <Link to="/admin/blogs/new">
            <Button className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Create New Blog Post
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;


