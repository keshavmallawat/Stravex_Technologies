import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  MoreHorizontal, 
  Eye, 
  Loader2, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { 
  getCareerPosts, 
  deleteCareerPost, 
  type CareerPost 
} from '@/integrations/firebase/careerService';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle 
} from '@/components/ui/dialog';
import { formatDate } from '@/utils/dateUtils';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  applyLink?: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const CareersManager: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time' as const,
    description: '',
    requirements: '',
    benefits: '',
    salary: '',
    applyLink: '',
    active: true
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const jobsQuery = query(
        collection(db, 'careers'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(jobsQuery);
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JobOpening[];
      
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(req => req.trim()),
        benefits: formData.benefits.split('\n').filter(benefit => benefit.trim()),
        updatedAt: Timestamp.now(),
        ...(editingJob ? {} : { createdAt: Timestamp.now() })
      };

      if (editingJob) {
        // Update existing job
        await updateDoc(doc(db, 'careers', editingJob.id), jobData);
      } else {
        // Create new job
        await addDoc(collection(db, 'careers'), jobData);
      }

      // Reset form
      resetForm();
      setIsDialogOpen(false);
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: '',
      requirements: '',
      benefits: '',
      salary: '',
      applyLink: '',
      active: true
    });
    setEditingJob(null);
  };

  const handleEdit = (job: JobOpening) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements.join('\n'),
      benefits: job.benefits.join('\n'),
      salary: job.salary || '',
      applyLink: job.applyLink || '',
      active: job.active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job opening?')) {
      try {
        await deleteDoc(doc(db, 'careers', jobId));
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const toggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'careers', jobId), {
        active: !currentStatus,
        updatedAt: Timestamp.now()
      });
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, active: !currentStatus } : job
      ));
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-500/10 text-green-500';
      case 'part-time': return 'bg-blue-500/10 text-blue-500';
      case 'contract': return 'bg-purple-500/10 text-purple-500';
      case 'internship': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Careers Manager
            </h1>
            <p className="text-muted-foreground">Loading job openings...</p>
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
            Careers Manager
          </h1>
          <p className="text-muted-foreground">
            Manage job openings ({jobs.length} total, {jobs.filter(j => j.active).length} active)
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-primary neon-ring hover:shadow-glow"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Job Opening
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingJob ? 'Edit Job Opening' : 'Create New Job Opening'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Job Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Engineering, Marketing, Sales"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Remote, Mumbai, Bangalore"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Job Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Salary (Optional)</label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g., ₹8-12 LPA, Competitive"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Apply Link (Optional)</label>
                  <Input
                    value={formData.applyLink}
                    onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Job Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed job description..."
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Requirements (one per line)</label>
                  <Textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience&#10;Proficiency in React"
                    rows={6}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Benefits (one per line)</label>
                  <Textarea
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    placeholder="Health insurance&#10;Flexible working hours&#10;Professional development"
                    rows={6}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-foreground">Active (visible on careers page)</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-primary neon-ring hover:shadow-glow"
                >
                  {editingJob ? 'Update Job' : 'Create Job'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Jobs Table */}
      <Card className="glass">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{job.title}</p>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{job.department}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getJobTypeColor(job.type)}>
                        {job.type.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={job.active ? 'default' : 'secondary'}>
                        {job.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatDate(job.createdAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(job)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleJobStatus(job.id, job.active)}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        {job.applyLink && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(job.applyLink, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(job.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <Briefcase className="h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">No job openings yet</p>
                      <Button 
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-gradient-primary neon-ring hover:shadow-glow"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Job
                      </Button>
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

export default CareersManager;


