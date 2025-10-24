import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  User,
  Building2,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import type { Contact } from "@myhi2025/shared";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const USER_TYPE_COLORS: Record<string, string> = {
  patient: "bg-blue-500",
  physician: "bg-green-500",
  hospital: "bg-purple-500",
  laboratory: "bg-yellow-500",
  pharmacy: "bg-pink-500",
  emergency: "bg-red-500",
  hmo: "bg-indigo-500",
  business: "bg-cyan-500",
  investor: "bg-orange-500",
  partner: "bg-teal-500",
  other: "bg-gray-500",
};

export default function AdminContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all");
  const { toast } = useToast();

  // Fetch contacts
  const {
    data: contacts = [],
    isLoading,
    isError,
    error,
  } = useQuery<Contact[]>({
    queryKey: [api.admin.contacts],
  });

  // Sync to Zoho CRM
  const syncToZohoMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(api.admin.syncContactsToZoho, "POST", {});
    },
    onSuccess: (data: any) => {
      toast({
        title: "Sync completed",
        description:
          data.message || `Synced ${data.success} contacts successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Sync failed",
        description: error.message || "Failed to sync contacts to Zoho CRM",
        variant: "destructive",
      });
    },
  });

  // Filter contacts based on search and type
  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${contact.title || ""} ${contact.firstName} ${
      contact.lastName
    }`.toLowerCase();
    const matchesSearch =
      fullName.includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      (contact.organization?.toLowerCase() || "").includes(query) ||
      contact.message.toLowerCase().includes(query);

    const matchesType =
      userTypeFilter === "all" || contact.userType === userTypeFilter;

    return matchesSearch && matchesType;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Title",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "City",
      "Country",
      "User Type",
      "Organization",
      "Message",
      "Date",
    ];
    const csvData = filteredContacts.map((contact) => [
      contact.title || "",
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phone || "",
      contact.city || "",
      contact.country || "",
      contact.userType,
      contact.organization || "",
      contact.message.replace(/"/g, '""'), // Escape quotes
      contact.createdAt
        ? format(new Date(contact.createdAt), "yyyy-MM-dd HH:mm:ss")
        : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `contacts_${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6" data-testid="admin-contacts-page">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold" data-testid="contacts-title">
            Contact Form Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all contact form submissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => syncToZohoMutation.mutate()}
            disabled={contacts.length === 0 || syncToZohoMutation.isPending}
            variant="outline"
            data-testid="button-sync-zoho"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                syncToZohoMutation.isPending ? "animate-spin" : ""
              }`}
            />
            Sync to Zoho CRM
          </Button>
          <Button
            onClick={exportToCSV}
            disabled={filteredContacts.length === 0}
            data-testid="button-export-csv"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="stat-total-contacts">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-filtered-contacts">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Filtered Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredContacts.length}</div>
          </CardContent>
        </Card>
        <Card data-testid="stat-today-contacts">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                contacts.filter((c) => {
                  const today = new Date();
                  const contactDate = c.createdAt
                    ? new Date(c.createdAt)
                    : null;
                  return (
                    contactDate &&
                    contactDate.toDateString() === today.toDateString()
                  );
                }).length
              }
            </div>
          </CardContent>
        </Card>
        <Card data-testid="stat-this-week-contacts">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                contacts.filter((c) => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  const contactDate = c.createdAt
                    ? new Date(c.createdAt)
                    : null;
                  return contactDate && contactDate >= weekAgo;
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search by name, email, organization, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-contacts"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">User Type</label>
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger data-testid="select-user-type-filter">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="physician">Health Professional</SelectItem>
                  <SelectItem value="hospital">Hospital or Clinic</SelectItem>
                  <SelectItem value="laboratory">Medical Diagnostic</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="emergency">EMS Provider</SelectItem>
                  <SelectItem value="hmo">HMO</SelectItem>
                  <SelectItem value="business">
                    Corporates or Businesses
                  </SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="partner">Potential Partner</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading contacts...
            </div>
          ) : isError ? (
            <div
              className="text-center py-8 text-destructive"
              data-testid="contacts-error-message"
            >
              <p className="font-semibold">Failed to load contacts</p>
              <p className="text-sm mt-2">
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred"}
              </p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-testid="no-contacts-message"
            >
              {contacts.length === 0
                ? "No contacts yet"
                : "No contacts match your filters"}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className="hover:bg-muted/50 transition-colors"
                  data-testid={`contact-card-${contact.id}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <User className="h-5 w-5 text-muted-foreground" />
                              <span
                                className="font-semibold text-lg"
                                data-testid={`contact-name-${contact.id}`}
                              >
                                {contact.title ? `${contact.title} ` : ""}
                                {contact.firstName} {contact.lastName}
                              </span>
                            </div>
                            <Badge
                              className={`${
                                USER_TYPE_COLORS[contact.userType] ||
                                "bg-gray-500"
                              } text-white`}
                              data-testid={`contact-type-${contact.id}`}
                            >
                              {contact.userType}
                            </Badge>
                          </div>
                          {contact.createdAt && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span data-testid={`contact-date-${contact.id}`}>
                                {format(
                                  new Date(contact.createdAt),
                                  "MMM dd, yyyy HH:mm"
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a
                              href={`mailto:${contact.email}`}
                              className="hover:underline"
                              data-testid={`contact-email-${contact.id}`}
                            >
                              {contact.email}
                            </a>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <span data-testid={`contact-phone-${contact.id}`}>
                                {contact.phone}
                              </span>
                            </div>
                          )}
                          {contact.organization && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building2 className="h-4 w-4" />
                              <span
                                data-testid={`contact-organization-${contact.id}`}
                              >
                                {contact.organization}
                              </span>
                            </div>
                          )}
                          {contact.country && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span
                                className="text-base"
                                data-testid={`contact-country-${contact.id}`}
                              >
                                🌍 {contact.country}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2">
                          <p className="text-sm font-medium mb-1">Message:</p>
                          <p
                            className="text-sm text-muted-foreground whitespace-pre-wrap"
                            data-testid={`contact-message-${contact.id}`}
                          >
                            {contact.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
