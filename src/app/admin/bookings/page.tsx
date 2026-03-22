
'use client';

import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2, ShieldAlert, Lock, ArrowRight, MessageSquare, Bike } from 'lucide-react';
import { useEffect, useState } from 'react';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminBookingsPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);

  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  
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

  const { data: bookings, isLoading: isLoadingBookings } = useCollection(bookingsQuery);
  const { data: inquiries, isLoading: isLoadingInquiries, error: inquiriesError } = useCollection(inquiriesQuery);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'chhaya@vns') {
      setIsAdminAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
      setPassword('');
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
                {passError && <p className="text-xs font-bold text-destructive italic uppercase text-center animate-bounce">Incorrect Password. Access Denied.</p>}
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
          <p className="text-muted-foreground text-sm font-medium">Manage all customer inquiries and bookings in one place.</p>
        </div>
      </div>

      <Tabs defaultValue="test-rides" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
          <TabsTrigger value="test-rides" className="flex items-center gap-2">
            <Bike className="h-4 w-4" /> Test Rides
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Enquiries
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
                      </TableRow>
                    ))}
                    {(!bookings || bookings.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-20">
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
                      </TableRow>
                    ))}
                    {(!inquiries || inquiries.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-20">
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
      </Tabs>
    </div>
  );
}
