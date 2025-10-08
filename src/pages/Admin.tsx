import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getContactSubmissions, deleteContactSubmission } from "@/integrations/firebase/contactService";
import { RefreshCw, Mail, User, MessageSquare, Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();
  const { logout, user } = useAuth();

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      setDeleting(id);
      await deleteContactSubmission(id);
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      toast({
        title: "Success",
        description: "Submission deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Admin{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage contact form submissions and view analytics
              </p>
            </div>
            <div className="flex items-center gap-3">
              {user?.email && (
                <Badge variant="outline" className="hidden sm:inline">
                  {user.email}
                </Badge>
              )}
              <Button variant="outline" onClick={logout}>
                Log out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{submissions.length}</p>
                <p className="text-muted-foreground">Total Submissions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/10 rounded-full">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {submissions.filter(sub => {
                    const today = new Date();
                    const submissionDate = new Date(sub.created_at);
                    return submissionDate.toDateString() === today.toDateString();
                  }).length}
                </p>
                <p className="text-muted-foreground">Today's Submissions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <RefreshCw className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <Button 
                  onClick={fetchSubmissions} 
                  disabled={loading}
                  variant="outline"
                  size="sm"
                >
                  {loading ? "Refreshing..." : "Refresh Data"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Submissions List */}
        <Card className="p-6 bg-card border-border">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Contact Submissions</h2>
              <Badge variant="outline">
                {submissions.length} total
              </Badge>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No submissions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="p-6 bg-secondary border-border">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{submission.name}</h3>
                            {submission.company && (
                              <p className="text-sm text-primary font-medium">{submission.company}</p>
                            )}
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {formatDate(submission.created_at)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSubmission(submission.id)}
                            disabled={deleting === submission.id}
                            className="text-destructive hover:text-destructive"
                          >
                            {deleting === submission.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pl-11">
                        <p className="text-muted-foreground leading-relaxed">
                          {submission.message}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
