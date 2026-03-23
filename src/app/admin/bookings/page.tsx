'use client';

import { useCollection, useFirestore, useMemoFirebase, useUser, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2, Lock, ArrowRight, MessageSquare, Bike, Briefcase, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function AdminBookingsPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const { toast } = useToast();

  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  
  // Strictly require password every time - No session persistence
  useEffect(() => {
    if (!isUserLoading && !user && auth && isAdminAuthenticated) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth, isAdminAuthenticated]);

  // Query for Test Ride Bookings
  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore || !user || !isAdminAuthenticated) return null;
    return query(collection(firestore, 'test_ride_bookings'), orderBy('submittedAt', 'desc'));
  }, [firestore, user, isAdminAuthenticated]);

  // Query for Contact Inquiries
  const inquiriesQuery = useMemoFirebase(() => {
    if (!firestore || !user || !isAdminAuthenticated) return null;
    return query(collection(firestore, 'contact_inquiries'), orderBy('submissionDate', 'desc'));
  }, [firestore, user, isAdminAuthenticated]);

  // Query for Job Applications
  const jobsQuery = useMemoFirebase(() => {
    if (!firestore || !user || !isAdminAuthenticated) return null;
    return query(collection(firestore, 'job_applications'), orderBy('submissionDate', 'desc'));
  }, [firestore, user, isAdminAuthenticated]);

  const { data: bookings, isLoading: isLoadingBookings } = useCollection(bookingsQuery);
  const { data: inquiries, isLoading: isLoadingInquiries } = useCollection(inquiriesQuery);
  const { data: jobs, isLoading: isLoadingJobs } = useCollection(jobsQuery);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use env variable or fallback for local testing
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Admin123';
    
    if (password === adminPassword) {
      setIsAdminAuthenticated(true);
      setPassError(false);
      toast({
        title: "Access Granted",
        description: "Welcome to the Leads Dashboard.",
      });
    } else {
      setPassError(true);
      setPassword('');
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Incorrect administrative password.",
      });
    }
  };

  const handleDelete = (collectionName: string, id: string) => {
    if (window.confirm('Are you sure you want to delete this record permanently?')) {
      try {
        const docRef = doc(firestore, collectionName, id);
        deleteDocumentNonBlocking(docRef);
        toast({
          title: "Deleted",
          description: "The record has been successfully removed.",
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: "An error occurred while trying to delete the record.",
        });
      }
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md shadow-2xl border-primary/20 glass-card">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-black font-headline uppercase italic tracking-tighter">
              Admin <span className="text-primary">Access</span>
            </CardTitle>
            <p className="text-muted-foreground text-sm font-medium">Please enter the administrative password to view leads.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Enter Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passError ? "border-destructive ring-destructive" : "h-12"}
                  required
                />
                {passError && <p className="text-xs font-bold text-destructive italic uppercase text-center animate-pulse">Access Denied</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold h-12 text-lg">
                Unlock Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isUserLoading || (isLoadingBookings && !bookings)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading secure leads...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline uppercase italic tracking-tighter">
            Leads <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Manage all customer inquiries, bookings, and job applications.</p>
        </div>
      </div>

      <Tabs defaultValue="test-rides" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mb-8">
          <TabsTrigger value="test-rides" className="flex items-center gap-2">
            <Bike className="h-4 w-4" /> Test Rides
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Enquiries
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Job Apps
          </TabsTrigger>
        </TabsList>

        <TabsContent value="test-rides">
          <Card className="glass-card shadow-2xl border-none">
            <CardHeader className="border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Test Ride Bookings</CardTitle>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary font-bold">
                {bookings?.length || 0} Leads
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="font-bold">Submission Time</TableHead>
                      <TableHead className="font-bold">Customer Name</TableHead>
                      <TableHead className="font-bold">Phone Number</TableHead>
                      <TableHead className="font-bold">Vehicle Model</TableHead>
                      <TableHead className="font-bold">Preferred Date</TableHead>
                      <TableHead className="font-bold">Address</TableHead>
                      <TableHead className="font-bold text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings?.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="text-xs font-medium text-muted-foreground">
                          {booking.submittedAt ? format(new Date(booking.submittedAt), 'MMM dd, yyyy • HH:mm') : 'N/A'}
                        </TableCell>
                        <TableCell className="font-bold text-blue-950">{booking.name}</TableCell>
                        <TableCell className="font-mono text-primary font-bold">{booking.phone}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 font-bold uppercase text-[10px]">
                            {booking.model}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-blue-900">{booking.date}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground italic">
                          {booking.address}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('test_ride_bookings', booking.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!bookings || bookings.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-20">
                          <p className="text-lg font-bold text-muted-foreground">No test ride leads yet</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries">
          <Card className="glass-card shadow-2xl border-none">
            <CardHeader className="border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Contact Form Inquiries</CardTitle>
              <Badge variant="outline" className="border-accent/20 bg-accent/5 text-accent font-bold">
                {inquiries?.length || 0} Inquiries
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="font-bold">Date</TableHead>
                      <TableHead className="font-bold">Customer Name</TableHead>
                      <TableHead className="font-bold">Contact Info</TableHead>
                      <TableHead className="font-bold">Subject</TableHead>
                      <TableHead className="font-bold">Message</TableHead>
                      <TableHead className="font-bold text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries?.map((inquiry) => (
                      <TableRow key={inquiry.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="text-xs font-medium text-muted-foreground">
                          {inquiry.submissionDate ? format(new Date(inquiry.submissionDate), 'MMM dd, yyyy') : 'N/A'}
                        </TableCell>
                        <TableCell className="font-bold text-blue-950">{inquiry.applicantName}</TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-primary">{inquiry.phone}</span>
                            <span className="text-muted-foreground truncate max-w-[150px]">{inquiry.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-bold uppercase whitespace-nowrap">
                            {inquiry.subject}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px] text-xs text-muted-foreground italic leading-relaxed">
                          {inquiry.message}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('contact_inquiries', inquiry.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!inquiries || inquiries.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-20">
                          <p className="text-lg font-bold text-muted-foreground">No contact inquiries yet</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card className="glass-card shadow-2xl border-none">
            <CardHeader className="border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Job Applications</CardTitle>
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 font-bold">
                {jobs?.length || 0} Applicants
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="font-bold">Date</TableHead>
                      <TableHead className="font-bold">Applicant Name</TableHead>
                      <TableHead className="font-bold">Contact Info</TableHead>
                      <TableHead className="font-bold">Role Interested</TableHead>
                      <TableHead className="font-bold">Address/Info</TableHead>
                      <TableHead className="font-bold text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs?.map((job) => (
                      <TableRow key={job.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="text-xs font-medium text-muted-foreground">
                          {job.submissionDate ? format(new Date(job.submissionDate), 'MMM dd, yyyy') : 'N/A'}
                        </TableCell>
                        <TableCell className="font-bold text-blue-950">{job.applicantName}</TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-primary">{job.phone}</span>
                            <span className="text-muted-foreground truncate max-w-[150px]">{job.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-bold uppercase text-[10px]">
                            {job.jobOpeningId}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px] text-xs text-muted-foreground italic leading-relaxed">
                          {job.coverLetter}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('job_applications', job.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!jobs || jobs.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-20">
                          <p className="text-lg font-bold text-muted-foreground">No job applications yet</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}