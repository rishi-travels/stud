
'use client';

import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useEffect } from 'react';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase';

export default function AdminBookingsPage() {
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  
  // Ensure the user is signed in to view leads
  useEffect(() => {
    if (!isUserLoading && !user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'test_ride_bookings'), orderBy('submittedAt', 'desc'));
  }, [firestore]);

  const { data: bookings, isLoading, error } = useCollection(bookingsQuery);

  if (isUserLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading secure leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 max-w-2xl">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <ShieldAlert className="h-12 w-12 text-destructive" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Access Denied</h3>
              <p className="text-muted-foreground">
                You do not have the required permissions to view Lead data. Please ensure you are authorized.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline uppercase italic tracking-tighter">
            Test Ride <span className="text-primary">Leads</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Manage and track your customer interest in real-time.</p>
        </div>
        <Badge variant="outline" className="text-lg px-6 py-2 border-primary/20 bg-primary/5 text-primary font-bold">
          {bookings?.length || 0} Leads Found
        </Badge>
      </div>

      <Card className="glass-card shadow-2xl border-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-xl font-bold">Lead Management Table</CardTitle>
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
                  <TableHead className="font-bold">Residential Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings?.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="text-xs font-medium text-muted-foreground">
                      {booking.submittedAt ? format(new Date(booking.submittedAt), 'MMM dd, yyyy • HH:mm') : 'N/A'}
                    </TableCell>
                    <TableCell className="font-bold text-blue-950">{booking.name}</TableCell>
                    <TableCell className="font-mono text-primary">{booking.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
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
                      <div className="flex flex-col items-center space-y-2">
                        <p className="text-lg font-bold text-muted-foreground">No leads yet</p>
                        <p className="text-sm text-muted-foreground/60">Lead details will appear here as customers book test rides.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
